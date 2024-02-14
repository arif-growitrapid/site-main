import React from 'react'
import config from "@/utils/config";
import type { NavItem } from "./structure";
import MegaMenu from './megamenu';
import MegaMenuSlider from './megamenuslider';
import Link from 'next/link';
import { FaUpRightFromSquare } from 'react-icons/fa6';

const menuItems = [
    {
        name: "About Us",
        link: config.links.about,
        icon: null
    },
    {
        name: "Blog",
        link: config.links.blogs,
        icon: null,
        items: [
            {
                name: "Coming Soon...",
                link: "#",
                icon: null
            },
        ]
    },
    {
        name: "Courses",
        link: "#",
        icon: null,
        items: [
            {
                name: "Coming Soon...",
                link: "#",
                icon: null
            },
        ],
    },
    {
        name: "Services",
        link: "#",
        icon: null,
        items: [
            {
                name: "Web Development",
                link: "#",
                icon: null
            },
            {
                name: "SEO Optimisation",
                link: "#",
                icon: null
            },
            {
                name: "Logo designing",
                link: "#",
                icon: null
            },
            {
                name: "Linkedin Profile Optimisation",
                link: "#",
                icon: null
            },
            {
                name: "Content Creation",
                link: "#",
                icon: null
            },
            {
                name: "Influencer Marketing",
                link: "#",
                icon: null
            },
            {
                name: "Product marketing",
                link: "#",
                icon: null
            },
            {
                name: "Social Media Management",
                link: "#",
                icon: null
            },
            {
                name: "Brand Promotion",
                link: "#",
                icon: null
            },
        ]
    },
    // {
    //     name: "Researches",
    //     link: "data.researchesUrl",
    //     icon: null,
    //     items: [
    //     ]
    // },
    // {
    //     name: "Products",
    //     link: "/products",
    //     icon: null,
    //     items: [
    //     ]
    // },
    // {
    //     name: "Terms & Policy",
    //     link: config.links.terms_policy,
    //     icon: null
    // }
] as ({
    name: string;
    link: string;
    icon: null;
    items?: undefined;
} | {
    name: string;
    link: string;
    icon: null;
    items?: {
        name: string;
        link: string;
        icon: null;
    }[];
})[];

export default function getNavItems({
    services
}: {
    services: {
        _id: string;
        _updatedAt: string;
        title: string;
        description: string;
        slug: string;
        image: string;
        items: {
            item_title: string;
            description: string;
            item_slug: string;
        }[];
    }[] | null;
}): NavItem[] {

    return [
        {
            title: "Home",
            icon: null,
            link: "/",
            isMegaMenu: false,
            items: null,
        },
        {
            title: "Blogs",
            icon: null,
            link: "/blogs",
            isMegaMenu: false,
            items: null,
        },
        {
            title: "Courses",
            icon: null,
            link: "/courses",
            isMegaMenu: false,
            items: null,
        },
        {
            title: "Resources",
            icon: null,
            link: "/",
            isMegaMenu: true,
            onlyMobile: true,
            items: <div>
                <Link className={``} href={`/about`}>
                    <p className={``}>E-Books</p>
                    <FaUpRightFromSquare className={`inline-block align-baseline`} />
                </Link>

                <Link className={``} href={`/blog`}>
                    <p className={``}>Cheat Sheets</p>
                    <FaUpRightFromSquare className={`inline-block align-baseline`} />
                </Link>

                <Link className={``} href={`/courses`}>
                    <p className={``}>Roadmaps</p>
                    <FaUpRightFromSquare className={`inline-block align-baseline`} />
                </Link>
            </div>
        },
        {
            title: "Resources",
            icon: null,
            link: "/",
            isMegaMenu: false,
            onlyDesktop: true,
            items: [
                {
                    title: "E-Books",
                    icon: null,
                    link: `/about`,
                    isMegaMenu: false,
                    items: null
                },
                {
                    title: "Roadmaps",
                    icon: null,
                    link: `/blogs`,
                    isMegaMenu: false,
                    items: null
                },
                {
                    title: "Cheatsheets",
                    icon: null,
                    link: `/courses`,
                    isMegaMenu: false,
                    items: null
                }
            ]
        },
        {
            title: "Services",
            icon: null,
            link: "/",
            isMegaMenu: true,
            isMultiMenu: true,
            items: services?.map((service) => ({
                title: service.title,
                icon: null,
                link: `/services/${service.slug}`,
                isMegaMenu: true,
                items: <div className='flex flex-wrap items-stretch justify-start gap-3 p-2'>
                    {service.items.map((item, index) => (
                        <Link className={`no-after flex-auto
                            w-full max-w-[32%]
                            bg-[#101520] hover:bg-[#02070b]
                            transition-colors duration-300 ease-in-out
                            rounded-md border-2 border-[var(--border-primary-color)]
                            py-2 px-3
                        `} href={`/services`} key={index}>
                            <div className='flex flex-col'>
                                <p className={`whitespace-pre-wrap`}>{item.item_title}</p>
                                <p className='text-xs opacity-50 whitespace-pre-wrap'>{item.description}</p>
                            </div>
            
                            <FaUpRightFromSquare className={`hidden flex-shrink-0 inline-block align-baseline`} />
                        </Link>
                    ))}
                </div>
            })),
        },       
    ];
}


// TODO: Remove service items
