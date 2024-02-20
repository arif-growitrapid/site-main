"use server";

import { Filter, ObjectId } from "mongodb";
import {
    COURSE_PROVIDERS,
    COURSE_PROVIDER_NAMES,
    COURSE_PROVIDER_URLS
} from "../types/courses.type";
import * as cheerio from 'cheerio';

import type { CourseMetaType, CoursesTypes, DBCourseType } from "../types/courses.type";
import { Response, ServerFunctionResponse } from "./functions";
import { matchPermissions } from "./auth";
import clientPromise from "@/db/db";
import config from "@/config";

export async function createCourse(provider: keyof typeof COURSE_PROVIDER_NAMES, newCourse: Partial<DBCourseType<typeof provider>>): Promise<ServerFunctionResponse<DBCourseType<typeof provider> | null>> {
    try {
        // Match permissions to create course
        const t = await matchPermissions(["course_add"]);
        const { session, isMatched } = t ?? { session: null, isMatched: false };

        if (!isMatched) {
            return Response("error", null, 403, "Permission denied");
        }

        const client = await clientPromise;
        const db = client.db(config.db.course_name);

        // Get the courses collection: Provider
        const collection = db.collection<DBCourseType<typeof provider>>(provider);

        // Add additional fields to new course if needed
        const createdCourse: DBCourseType<"coursera"> = {
            _id: new ObjectId(),
            meta: {
                ...(newCourse as CourseMetaType<"coursera"> || {}),
                "is_published": true,
                slug: newCourse.data?.title?.toLowerCase().replace(/\s+/g, '-') ?? ''
            },
            data: {
                ...(newCourse as CoursesTypes["coursera"] || {}),
            },
        };

        // Insert the new course into the collection
        const result = await collection.insertOne(createdCourse);

        // Check if the insertion was successful
        if (result.acknowledged) {
            return Response("success", createdCourse, 201, "Course created successfully");
        } else {
            return Response("error", null, 500, "Failed to create course");
        }
    } catch (error) {
        console.error(error);
        return Response("error", null, 500, "Internal server error");
    }
}

export async function scrapeCourse(provider: keyof typeof COURSE_PROVIDER_NAMES, links: Array<{links: string}>) {
    // @ts-ignore
    function extractTexts($, selector: string, type?: string) {
        if (type === "href") {
            return $(selector).map((index: any, element: HTMLLinkElement) => $(element).attr('href')).get();
        } else {
            return $(selector).map((index: any, element: HTMLLinkElement) => $(element).text()).get();
        }
    }

    // @ts-ignore
    function extractTagTexts($, selectors: Array<string>) {
        const texts:Array<string> = [];
        selectors.forEach(selector => {
            $(selector).each((index: number, element: HTMLElement) => {
                const text = $(element).text();
                if (text) {
                    texts.push(text);
                }
            });
        });
        return texts;
    }

    if (provider === "coursera") {
        for (const link of links) {
            console.log(link)
            try {
                const response = await fetch(link.links);
                if (response.status !== 200) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const html = await response.text();
                const $ = cheerio.load(html);

                const visibleTagsSelector = '#about .css-yk0mzy .css-0';
                const hiddenTagsSelector = '#about .css-yk0mzy .css-k26awr';
                const tagTexts = extractTagTexts($, [visibleTagsSelector, hiddenTagsSelector]);
                const internalTags = extractTagTexts($, ['.cds-AccordionRoot-container.cds-AccordionRoot-silent .css-yk0mzy .css-18p0rob.cds-121'])
                const internalWhatYouWillLearn = extractTexts($, '.cds-AccordionRoot-container.cds-AccordionRoot-silent .css-1otrsh1 + ul li')

                const courseCatalogs = $('.cds-AccordionRoot-container.cds-AccordionRoot-silent .cds-119.cds-Typography-base.css-h1jogs.cds-121')
                    .map((index, element) => {
                        const prefix = ".cds-AccordionRoot-container.cds-AccordionRoot-silent";
                        return {
                            title: extractTexts($, `${prefix} .cds-119.cds-Typography-base.css-h1jogs.cds-121`)[index],
                            link: "https://www.coursera.org" + extractTexts($, `${prefix} .cds-119.cds-Typography-base.css-h1jogs.cds-121 a`, "href")[index],
                            duration: extractTexts($, `${prefix} .css-mc13jp span span`)[index],
                            rating: extractTexts($, `${prefix} .css-mc13jp .css-1tdi49m`)[index],
                            internalTags: JSON.stringify(internalTags),
                            whatYouWillLearn: JSON.stringify(internalWhatYouWillLearn),
                        };
                    }).get();

                const courseInfo = {
                    title: $('h1').first().text(),
                    description: $('.cds-119.css-80vnnb.cds-121').first().text(),
                    instructors: $('.cds-119.css-80vnnb .cds-121').text(),
                    total_enrolled_students: $('.cds-119.css-80vnnb.cds-121 span strong').text(),
                    rating: $('.css-guxf6x .cds-119.css-h1jogs.cds-121').first().text(),
                    duration: $('.cds-119.css-h1jogs.cds-121').eq(3).text(),
                    experience: $('.cds-119.css-h1jogs.cds-121').eq(2).text(),
                    reviews: $('.css-lt1dx1 .css-guxf6x .cds-119.css-dmxkm1.cds-121').first().text(),
                    what_you_will_learn: extractTexts($, '.cds-9.css-7avemv.cds-10 li'),
                    tags: tagTexts,
                    avg_salary: $('.cds-119.css-dmxkm1.cds-121 .cds-119.css-bbd009.cds-121').first().text(),
                    job_openings: $('.cds-119.css-dmxkm1.cds-121 .cds-119.css-bbd009.cds-121').eq(1).text(),
                    guarantee_percentage: $('.cds-119.css-dmxkm1.cds-121 .cds-119.css-bbd009.cds-121').eq(2).text(),
                    outcomes: $('.css-1g9t2fb').text(),
                    catalog: courseCatalogs,
                };

                const result = await createCourse("coursera", JSON.parse(JSON.stringify(courseInfo)));
                console.log(`Inserted document with _id: ${result}`);
            } catch (error) {
                console.error(`Error while processing URL: ${link.links}`, error);
                return Response("error", null, 500, "Failed to create course");
            }
        }
        return Response("success", {}, 201, "Course created successfully");
    }
}

export async function getCoursesByProvider(provider: keyof typeof COURSE_PROVIDER_NAMES): Promise<ServerFunctionResponse<DBCourseType<typeof provider>[] | null>> {
    try {
        // Match permissions to view user
        // If the user has the permission to view user, then return the user
        const t = await matchPermissions(["course_view_published", "course_view_draft"]);
        const { session, isMatched, matches } = t ?? {
            session: null,
            isMatched: false,
            matches: ["course_view_published"] as ["course_view_published" | "course_view_draft"],
        };

        const should_view_draft = matches.includes("course_view_draft");

        const client = await clientPromise;
        const db = client.db(config.db.course_name);

        // Get the courses collection: Provider
        const collection = db.collection<DBCourseType<typeof provider>>(provider);

        // Get the courses
        const courses = await collection
            .find({
                "meta.is_published": should_view_draft ? { $in: [true, false] } : true
            })
            .toArray();

        // Return the courses
        return Response("success", courses, 200, "Courses fetched successfully");
    } catch (error) {
        console.error(error);
        return Response("error", null, 500, "Internal server error");
    }
}

export async function getCourseBySlug(provider: keyof typeof COURSE_PROVIDER_NAMES, slug: string): Promise<ServerFunctionResponse<DBCourseType<typeof provider> | null>> {
    try {
        // Match permissions to view user
        // If the user has the permission to view user, then return the user
        const t = await matchPermissions(["course_view_published", "course_view_draft"]);
        const { session, isMatched, matches } = t ?? {
            session: null,
            isMatched: false,
            matches: ["course_view_published"] as ["course_view_published" | "course_view_draft"],
        };

        const should_view_draft = matches.includes("course_view_draft");

        const client = await clientPromise;
        const db = client.db(config.db.course_name);

        // Get the courses collection: Provider
        const collection = db.collection<DBCourseType<typeof provider>>(provider);

        // Get the course
        const course = await collection.findOne({
            "meta.slug": slug,
            "meta.is_published": should_view_draft ? { $in: [true, false] } : true
        });

        // Return the course
        return Response("success", course, 200, "Course fetched successfully");
    } catch (error) {
        console.error(error);
        return Response("error", null, 500, "Internal server error");
    }
}

export async function getCourseById(provider: keyof typeof COURSE_PROVIDER_NAMES, id: string): Promise<ServerFunctionResponse<DBCourseType<typeof provider> | null>> {
    try {
        // Match permissions to view user
        // If the user has the permission to view user, then return the user
        const t = await matchPermissions(["course_view_published", "course_view_draft"]);
        const { session, isMatched, matches } = t ?? {
            session: null,
            isMatched: false,
            matches: ["course_view_published"] as ["course_view_published" | "course_view_draft"],
        };

        const should_view_draft = matches.includes("course_view_draft");

        const client = await clientPromise;
        const db = client.db(config.db.course_name);

        // Get the courses collection: Provider
        const collection = db.collection<DBCourseType<typeof provider>>(provider);

        // Get the course
        const course = await collection.findOne({
            _id: new ObjectId(id),
            "meta.is_published": should_view_draft ? { $in: [true, false] } : true
        });

        // Return the course
        return Response("success", course, 200, "Course fetched successfully");
    } catch (error) {
        console.error(error);
        return Response("error", null, 500, "Internal server error");
    }
}

export async function filterCourse(
    provider: keyof typeof COURSE_PROVIDER_NAMES,
    filter: Filter<DBCourseType<keyof typeof COURSE_PROVIDER_NAMES>>,
    limit: number = 10,
    skip: number = 0,
): Promise<ServerFunctionResponse<DBCourseType<typeof provider>[] | null>> {
    try {
        // Match permissions to view user
        // If the user has the permission to view user, then return the user
        const t = await matchPermissions(["course_view_published", "course_view_draft"]);
        const { session, isMatched, matches } = t ?? {
            session: null,
            isMatched: false,
            matches: ["course_view_published"] as ["course_view_published" | "course_view_draft"],
        };

        const should_view_draft = matches.includes("course_view_draft");

        const client = await clientPromise;
        const db = client.db(config.db.course_name);

        // Get the courses collection: Provider
        const collection = db.collection<DBCourseType<typeof provider>>(provider);

        // Get the course
        const courses = await collection.find({
            ...filter,
            "meta.is_published": should_view_draft ? { $in: [true, false] } : true
        }).limit(limit).skip(skip).toArray();

        // Return the course
        return Response("success", courses, 200, "Course fetched successfully");
    } catch (error) {
        console.error(error);
        return Response("error", null, 500, "Internal server error");
    }
}