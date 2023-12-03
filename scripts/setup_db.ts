/**
 * This script is used to setup the database with some mock data
 * It is used for development purposes only; Strictly prohibited to use in production
 * 
 * This script is called by the npm script "setup-db" with environment variable "MONGODB_URI"
 * Command: $env:MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.bpoiuyt.mongodb.net/?retryWrites=true&w=majority"
 *          npm run setup-db
 * 
 * Developed bt @NeuroNexul / Arif Sardar
 * @license MIT
 */

import clientPromise from "../src/db/db";
import { MongoClient, ObjectId } from "mongodb";
import { faker } from '@faker-js/faker';
import { AuthType } from "../src/types/auth";
import { DBBlogPostType } from "@/types/blog";
import { MinifyAuth } from "../src/functions/minify_auth";

const db = {
    auth_name: "auth",
    root_name: "root",
    blog_name: "blog",
    static_db_name: "static_db",
    courses_name: "courses",
    default_document_collection_name: "default_document_collection",
}

export default async function setup_db() {
    try {
        console.log(">>===> Setting up database");
        console.log(`>>===> Connecting to MongoDB; URI: ${process.env.MONGODB_URI}`);

        // Connect to MongoDB & Get the client
        const client = (await clientPromise);

        // Create the collections if they don't exist
        // auth db is usually managed by next-auth
        // Only have to create some users
        const mock_users: AuthType[] = Array.from({ length: 10 }, () => {
            const id = new ObjectId();

            return {
                _id: id,
                id: id.toHexString(),
                roles: ["user"],
                is_employee: false,
                status: ["active", "inactive", "blocked", "pending"][Math.floor(Math.random() * 4)],
                createdAt: faker.date.past(),

                name: faker.person.fullName(),
                email: faker.internet.email(),
                image: faker.image.avatar(),
                bio: faker.lorem.paragraph(),
                emailVerified: faker.date.past(),

                dob: faker.date.birthdate(),
                gender: ['male', 'female', 'other', 'not-specified'][Math.floor(Math.random() * 4)],
                phone: {
                    countryCode: faker.location.countryCode(),
                    number: faker.phone.number(),
                    verified: true,
                },
                extraEmails: [faker.internet.email()],
                extraPhones: [{
                    countryCode: faker.location.countryCode(),
                    number: faker.phone.number(),
                    verified: true,
                }],
                addresses: [{
                    addressLine1: faker.location.streetAddress(),
                    addressLine2: faker.location.secondaryAddress(),
                    city: faker.location.city(),
                    country: faker.location.country(),
                    state: faker.location.state(),
                    zipCode: faker.location.zipCode(),
                }],
                socialProfiles: [{
                    name: "facebook",
                    url: faker.internet.url(),
                }],
                savedContent: [],

                permissions: {},

                isFake: true,
            } as AuthType;
        });
        await create_collection(client, db.auth_name, "users", mock_users);

        // Create Root Collections if they don't exist
        // (roles)
        await create_collection(client, db.root_name, "roles", []);

        // Create Blog Collections if they don't exist
        // (posts, categories, tags)
        const mock_posts = Array.from(mock_users, (user) => {

            return Array.from({ length: Math.floor(Math.random() * 10) }, () => {
                const id = new ObjectId();

                return {
                    _id: id,
                    title: faker.lorem.sentence(),
                    slug: faker.lorem.slug(),
                    is_published: true,
                    content: faker.lorem.paragraphs(),
                    excerpt: faker.lorem.paragraph(),
                    thumbnail: faker.image.url(),
                    time_to_read: Math.floor(Math.random() * 10),
                    createdAt: faker.date.past(),
                    updatedAt: faker.date.past(),

                    author: MinifyAuth(user),
                    tags: Array.from({ length: Math.floor(Math.random() * 10) }, () => faker.lorem.slug()),
                    categories: Array.from({ length: Math.floor(Math.random() * 10) }, () => faker.lorem.slug()),
                    comments: [],

                    // For internal use
                    views: faker.number.int(),
                    likes: faker.number.int(),
                    saves: faker.number.int(),
                    viewed_by: [],
                    viewed_by_ip: [],
                    liked_by: [],
                    saved_by: [],

                    is_seo_compatabile: true,

                    isFake: true,
                } as DBBlogPostType;
            });
        });

        await create_collection(client, db.blog_name, "posts", mock_posts.flat(1));
        await create_collection(client, db.blog_name, "tags", []);
        await create_collection(client, db.blog_name, "categories", []);


        // Create Courses COllection
        const mock_courses = Array.from({ length: 10 }, () => {
            const id = new ObjectId();
            return {
                _id: id,
                meta: {
                    provider: "coursera",
                    slug: faker.lorem.slug(),
                    is_published: true
                },
                "title": "Google Project Management: Professional Certificate",
                "description": "Start your path to a career in project management. In this program, you’ll learn in-demand skills that will have you job-ready in less than six months. No degree or experience is required.",
                "instructors": "Google Career Certificates",
                "total_enrolled_students": "1,326,192",
                "rating": "4.8",
                "duration": "6 months at 10 hours a week",
                "experience": "Beginner level",
                "reviews": "(91,642 reviews)",
                "what_you_will_learn": [
                    "Gain an immersive understanding of the practices and skills needed to succeed in an entry-level project management role",
                    "Learn how to create effective project documentation and artifacts throughout the various phases of a project",
                    "Learn the foundations of Agile project management, with a focus on implementing Scrum events, building Scrum artifacts, and understanding Scrum roles",
                    "Practice strategic communication, problem-solving, and stakeholder management through real-world scenarios"
                ],
                "tags": [
                    "Project Management",
                    "Change Management",
                    "Strategic Thinking",
                    "Career Development",
                    "Organizational Culture",
                    "Risk Management",
                    "Quality Management",
                    "Project Execution",
                    "Agile Management",
                    "Problem Solving",
                    "Coaching",
                    "Scrum",
                    "Influencing",
                    "Effective Communication",
                    "Stakeholder Management",
                    "Business Writing",
                    "Project Charter",
                    "Procurement",
                    "Task Estimation",
                    "Project Planning"
                ],
                "avg_salary": "$77,000+",
                "job_openings": "715,000+",
                "guarantee_percentage": "75%",
                "outcomes": "Receive professional-level training from GoogleDemonstrate your proficiency in portfolio-ready projectsEarn an employer-recognized certificate from GoogleQualify for in-demand job titles: Project Manager, Project Coordinator, Project Assistant",
                "catalogs": [
                    {
                        "title": "Foundations of Project Management",
                        "link": "https://www.coursera.org/learn/project-management-foundations?specialization=google-project-management",
                        "duration": "18 hours",
                        "rating": "4.9 ",
                        "internalTags": "[\"Project Management\",\"Risk Management\",\"Strategic Thinking\",\"Quality Management\",\"Project Execution\",\"Procurement\",\"Risk Management\",\"Strategic Thinking\",\"Task Estimation\",\"Project Planning\",\"Project Management\",\"Strategic Thinking\",\"Business Writing\",\"Stakeholder Management\",\"Project Charter\",\"Agile Management\",\"Problem Solving\",\"Coaching\",\"Scrum\",\"Influencing\",\"Project Management\",\"Problem Solving\",\"Quality Management\",\"Effective Communication\",\"Stakeholder Management\",\"Project Management\",\"Change Management\",\"Strategic Thinking\",\"Career Development\",\"Organizational Culture\"]",
                        "whatYouWillLearn": "[\"Describe project management skills, roles, and responsibilities across a variety of industries\",\"Explain the project management life cycle and compare different program management methodologies \",\"Define organizational structure and organizational culture and explain how it impacts project management.\",\"Understand the significance of the initiation phase of the project life cycle.\",\"Understand the key components of project charters and develop a project charter for project initiation.\",\"Complete a stakeholder analysis and utilize RACI charts to define and communicate project team member responsibilities.\",\"Evaluate various project management tools to meet project needs. \",\"Describe the components of the project planning phase and their significance.\",\"Identify tools and best practices to build a project plan and risk management plan. \",\"Describe how to estimate, track, and maintain a budget.\",\"Draft a communication plan and explain how to manage it.\",\"Implement the key quality management concepts of quality standards, quality planning, quality assurance, and quality control.\",\"Demonstrate how to prioritize and analyze data and how to communicate a project’s data-informed story. \",\"Discuss the stages of team development and how to manage team dynamics.\",\"Describe the steps of the closing process and create project closing documentation.\",\"Explain the Agile project management approach and philosophy, including values and principles.\",\"Discuss the pillars of Scrum and how they support Scrum values.\",\"Describe the five important Scrum events and how to set up each event for a Scrum team.\",\"Explain how to coach an Agile team and help them overcome challenges.\",\"Complete a project charter, filling out key information including a project summary, SMART goals, scope, benefits, and costs.\",\"Examine project documentation and conduct research to identify tasks for a project and organize those project tasks and milestones in a project plan.\",\"Determine quality standards and evaluate against those standards to ensure that the project is achieving the required level of quality.\",\"Develop effective stakeholder reports by applying storytelling strategies to describe data.\"]"
                    },
                    {
                        "title": "Project Initiation: Starting a Successful Project",
                        "link": "https://www.coursera.org/learn/project-initiation-google?specialization=google-project-management",
                        "duration": "4.9 ",
                        "rating": "4.8 ",
                        "internalTags": "[\"Project Management\",\"Risk Management\",\"Strategic Thinking\",\"Quality Management\",\"Project Execution\",\"Procurement\",\"Risk Management\",\"Strategic Thinking\",\"Task Estimation\",\"Project Planning\",\"Project Management\",\"Strategic Thinking\",\"Business Writing\",\"Stakeholder Management\",\"Project Charter\",\"Agile Management\",\"Problem Solving\",\"Coaching\",\"Scrum\",\"Influencing\",\"Project Management\",\"Problem Solving\",\"Quality Management\",\"Effective Communication\",\"Stakeholder Management\",\"Project Management\",\"Change Management\",\"Strategic Thinking\",\"Career Development\",\"Organizational Culture\"]",
                        "whatYouWillLearn": "[\"Describe project management skills, roles, and responsibilities across a variety of industries\",\"Explain the project management life cycle and compare different program management methodologies \",\"Define organizational structure and organizational culture and explain how it impacts project management.\",\"Understand the significance of the initiation phase of the project life cycle.\",\"Understand the key components of project charters and develop a project charter for project initiation.\",\"Complete a stakeholder analysis and utilize RACI charts to define and communicate project team member responsibilities.\",\"Evaluate various project management tools to meet project needs. \",\"Describe the components of the project planning phase and their significance.\",\"Identify tools and best practices to build a project plan and risk management plan. \",\"Describe how to estimate, track, and maintain a budget.\",\"Draft a communication plan and explain how to manage it.\",\"Implement the key quality management concepts of quality standards, quality planning, quality assurance, and quality control.\",\"Demonstrate how to prioritize and analyze data and how to communicate a project’s data-informed story. \",\"Discuss the stages of team development and how to manage team dynamics.\",\"Describe the steps of the closing process and create project closing documentation.\",\"Explain the Agile project management approach and philosophy, including values and principles.\",\"Discuss the pillars of Scrum and how they support Scrum values.\",\"Describe the five important Scrum events and how to set up each event for a Scrum team.\",\"Explain how to coach an Agile team and help them overcome challenges.\",\"Complete a project charter, filling out key information including a project summary, SMART goals, scope, benefits, and costs.\",\"Examine project documentation and conduct research to identify tasks for a project and organize those project tasks and milestones in a project plan.\",\"Determine quality standards and evaluate against those standards to ensure that the project is achieving the required level of quality.\",\"Develop effective stakeholder reports by applying storytelling strategies to describe data.\"]"
                    },
                    {
                        "title": "Project Planning: Putting It All Together",
                        "link": "https://www.coursera.org/learn/project-planning-google?specialization=google-project-management",
                        "duration": "(73,995 ratings)",
                        "rating": "4.8 ",
                        "internalTags": "[\"Project Management\",\"Risk Management\",\"Strategic Thinking\",\"Quality Management\",\"Project Execution\",\"Procurement\",\"Risk Management\",\"Strategic Thinking\",\"Task Estimation\",\"Project Planning\",\"Project Management\",\"Strategic Thinking\",\"Business Writing\",\"Stakeholder Management\",\"Project Charter\",\"Agile Management\",\"Problem Solving\",\"Coaching\",\"Scrum\",\"Influencing\",\"Project Management\",\"Problem Solving\",\"Quality Management\",\"Effective Communication\",\"Stakeholder Management\",\"Project Management\",\"Change Management\",\"Strategic Thinking\",\"Career Development\",\"Organizational Culture\"]",
                        "whatYouWillLearn": "[\"Describe project management skills, roles, and responsibilities across a variety of industries\",\"Explain the project management life cycle and compare different program management methodologies \",\"Define organizational structure and organizational culture and explain how it impacts project management.\",\"Understand the significance of the initiation phase of the project life cycle.\",\"Understand the key components of project charters and develop a project charter for project initiation.\",\"Complete a stakeholder analysis and utilize RACI charts to define and communicate project team member responsibilities.\",\"Evaluate various project management tools to meet project needs. \",\"Describe the components of the project planning phase and their significance.\",\"Identify tools and best practices to build a project plan and risk management plan. \",\"Describe how to estimate, track, and maintain a budget.\",\"Draft a communication plan and explain how to manage it.\",\"Implement the key quality management concepts of quality standards, quality planning, quality assurance, and quality control.\",\"Demonstrate how to prioritize and analyze data and how to communicate a project’s data-informed story. \",\"Discuss the stages of team development and how to manage team dynamics.\",\"Describe the steps of the closing process and create project closing documentation.\",\"Explain the Agile project management approach and philosophy, including values and principles.\",\"Discuss the pillars of Scrum and how they support Scrum values.\",\"Describe the five important Scrum events and how to set up each event for a Scrum team.\",\"Explain how to coach an Agile team and help them overcome challenges.\",\"Complete a project charter, filling out key information including a project summary, SMART goals, scope, benefits, and costs.\",\"Examine project documentation and conduct research to identify tasks for a project and organize those project tasks and milestones in a project plan.\",\"Determine quality standards and evaluate against those standards to ensure that the project is achieving the required level of quality.\",\"Develop effective stakeholder reports by applying storytelling strategies to describe data.\"]"
                    },
                    {
                        "title": "Project Execution: Running the Project",
                        "link": "https://www.coursera.org/learn/project-execution-google?specialization=google-project-management",
                        "duration": "73,995 ratings",
                        "rating": "4.8 ",
                        "internalTags": "[\"Project Management\",\"Risk Management\",\"Strategic Thinking\",\"Quality Management\",\"Project Execution\",\"Procurement\",\"Risk Management\",\"Strategic Thinking\",\"Task Estimation\",\"Project Planning\",\"Project Management\",\"Strategic Thinking\",\"Business Writing\",\"Stakeholder Management\",\"Project Charter\",\"Agile Management\",\"Problem Solving\",\"Coaching\",\"Scrum\",\"Influencing\",\"Project Management\",\"Problem Solving\",\"Quality Management\",\"Effective Communication\",\"Stakeholder Management\",\"Project Management\",\"Change Management\",\"Strategic Thinking\",\"Career Development\",\"Organizational Culture\"]",
                        "whatYouWillLearn": "[\"Describe project management skills, roles, and responsibilities across a variety of industries\",\"Explain the project management life cycle and compare different program management methodologies \",\"Define organizational structure and organizational culture and explain how it impacts project management.\",\"Understand the significance of the initiation phase of the project life cycle.\",\"Understand the key components of project charters and develop a project charter for project initiation.\",\"Complete a stakeholder analysis and utilize RACI charts to define and communicate project team member responsibilities.\",\"Evaluate various project management tools to meet project needs. \",\"Describe the components of the project planning phase and their significance.\",\"Identify tools and best practices to build a project plan and risk management plan. \",\"Describe how to estimate, track, and maintain a budget.\",\"Draft a communication plan and explain how to manage it.\",\"Implement the key quality management concepts of quality standards, quality planning, quality assurance, and quality control.\",\"Demonstrate how to prioritize and analyze data and how to communicate a project’s data-informed story. \",\"Discuss the stages of team development and how to manage team dynamics.\",\"Describe the steps of the closing process and create project closing documentation.\",\"Explain the Agile project management approach and philosophy, including values and principles.\",\"Discuss the pillars of Scrum and how they support Scrum values.\",\"Describe the five important Scrum events and how to set up each event for a Scrum team.\",\"Explain how to coach an Agile team and help them overcome challenges.\",\"Complete a project charter, filling out key information including a project summary, SMART goals, scope, benefits, and costs.\",\"Examine project documentation and conduct research to identify tasks for a project and organize those project tasks and milestones in a project plan.\",\"Determine quality standards and evaluate against those standards to ensure that the project is achieving the required level of quality.\",\"Develop effective stakeholder reports by applying storytelling strategies to describe data.\"]"
                    },
                    {
                        "title": "Agile Project Management",
                        "link": "https://www.coursera.org/learn/agile-project-management?specialization=google-project-management",
                        "duration": "21 hours",
                        "rating": "4.8 ",
                        "internalTags": "[\"Project Management\",\"Risk Management\",\"Strategic Thinking\",\"Quality Management\",\"Project Execution\",\"Procurement\",\"Risk Management\",\"Strategic Thinking\",\"Task Estimation\",\"Project Planning\",\"Project Management\",\"Strategic Thinking\",\"Business Writing\",\"Stakeholder Management\",\"Project Charter\",\"Agile Management\",\"Problem Solving\",\"Coaching\",\"Scrum\",\"Influencing\",\"Project Management\",\"Problem Solving\",\"Quality Management\",\"Effective Communication\",\"Stakeholder Management\",\"Project Management\",\"Change Management\",\"Strategic Thinking\",\"Career Development\",\"Organizational Culture\"]",
                        "whatYouWillLearn": "[\"Describe project management skills, roles, and responsibilities across a variety of industries\",\"Explain the project management life cycle and compare different program management methodologies \",\"Define organizational structure and organizational culture and explain how it impacts project management.\",\"Understand the significance of the initiation phase of the project life cycle.\",\"Understand the key components of project charters and develop a project charter for project initiation.\",\"Complete a stakeholder analysis and utilize RACI charts to define and communicate project team member responsibilities.\",\"Evaluate various project management tools to meet project needs. \",\"Describe the components of the project planning phase and their significance.\",\"Identify tools and best practices to build a project plan and risk management plan. \",\"Describe how to estimate, track, and maintain a budget.\",\"Draft a communication plan and explain how to manage it.\",\"Implement the key quality management concepts of quality standards, quality planning, quality assurance, and quality control.\",\"Demonstrate how to prioritize and analyze data and how to communicate a project’s data-informed story. \",\"Discuss the stages of team development and how to manage team dynamics.\",\"Describe the steps of the closing process and create project closing documentation.\",\"Explain the Agile project management approach and philosophy, including values and principles.\",\"Discuss the pillars of Scrum and how they support Scrum values.\",\"Describe the five important Scrum events and how to set up each event for a Scrum team.\",\"Explain how to coach an Agile team and help them overcome challenges.\",\"Complete a project charter, filling out key information including a project summary, SMART goals, scope, benefits, and costs.\",\"Examine project documentation and conduct research to identify tasks for a project and organize those project tasks and milestones in a project plan.\",\"Determine quality standards and evaluate against those standards to ensure that the project is achieving the required level of quality.\",\"Develop effective stakeholder reports by applying storytelling strategies to describe data.\"]"
                    },
                    {
                        "title": "Capstone: Applying Project Management in the Real World",
                        "link": "https://www.coursera.org/learn/applying-project-management?specialization=google-project-management",
                        "duration": "4.8 ",
                        "rating": "4.8 ",
                        "internalTags": "[\"Project Management\",\"Risk Management\",\"Strategic Thinking\",\"Quality Management\",\"Project Execution\",\"Procurement\",\"Risk Management\",\"Strategic Thinking\",\"Task Estimation\",\"Project Planning\",\"Project Management\",\"Strategic Thinking\",\"Business Writing\",\"Stakeholder Management\",\"Project Charter\",\"Agile Management\",\"Problem Solving\",\"Coaching\",\"Scrum\",\"Influencing\",\"Project Management\",\"Problem Solving\",\"Quality Management\",\"Effective Communication\",\"Stakeholder Management\",\"Project Management\",\"Change Management\",\"Strategic Thinking\",\"Career Development\",\"Organizational Culture\"]",
                        "whatYouWillLearn": "[\"Describe project management skills, roles, and responsibilities across a variety of industries\",\"Explain the project management life cycle and compare different program management methodologies \",\"Define organizational structure and organizational culture and explain how it impacts project management.\",\"Understand the significance of the initiation phase of the project life cycle.\",\"Understand the key components of project charters and develop a project charter for project initiation.\",\"Complete a stakeholder analysis and utilize RACI charts to define and communicate project team member responsibilities.\",\"Evaluate various project management tools to meet project needs. \",\"Describe the components of the project planning phase and their significance.\",\"Identify tools and best practices to build a project plan and risk management plan. \",\"Describe how to estimate, track, and maintain a budget.\",\"Draft a communication plan and explain how to manage it.\",\"Implement the key quality management concepts of quality standards, quality planning, quality assurance, and quality control.\",\"Demonstrate how to prioritize and analyze data and how to communicate a project’s data-informed story. \",\"Discuss the stages of team development and how to manage team dynamics.\",\"Describe the steps of the closing process and create project closing documentation.\",\"Explain the Agile project management approach and philosophy, including values and principles.\",\"Discuss the pillars of Scrum and how they support Scrum values.\",\"Describe the five important Scrum events and how to set up each event for a Scrum team.\",\"Explain how to coach an Agile team and help them overcome challenges.\",\"Complete a project charter, filling out key information including a project summary, SMART goals, scope, benefits, and costs.\",\"Examine project documentation and conduct research to identify tasks for a project and organize those project tasks and milestones in a project plan.\",\"Determine quality standards and evaluate against those standards to ensure that the project is achieving the required level of quality.\",\"Develop effective stakeholder reports by applying storytelling strategies to describe data.\"]"
                    }
                ]
            };
        });

        await create_collection(client, db.courses_name, "coursera", mock_courses);

        client.close();
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function create_collection(client: MongoClient, db_name: string, collection_name: string, data: Array<any>) {
    try {
        const db = client.db(db_name);
        const collection_exists = await db.listCollections({ name: collection_name }).hasNext();
        if (!collection_exists) {
            await db.createCollection(collection_name);
        }
        const collection = db.collection(collection_name);

        // Remove previous fake data
        await collection.deleteMany({ isFake: true });

        if (data && data.length > 0) {
            await collection.insertMany(data);
        }

        if (!collection_exists)
            console.log(`>>===> Created collection ${collection_name} in database ${db_name}`);
        else
            console.log(`>>===> Collection ${collection_name} already exists in database ${db_name}`);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

// Run the script if called directly
if (require.main === module) {
    setup_db();
}
