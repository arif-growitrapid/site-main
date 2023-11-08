'use client';

import React, { useState } from 'react'
import style from './style.module.scss'
import Link from 'next/link';
import data from './data';
import { FaArrowRight, FaAngleDown } from 'react-icons/fa';
import Image from 'next/image';

export default function ExpandExplorer({ data }: {
    data: {
        _id: string;
        _updatedAt: string;
        title: string;
        description: string;
        image?: string;
        slug: string;
        items?: {
            item_title: string;
            description: string;
            item_slug: string;
        }[];
    }[];
}) {
    const [openedIndex, setOpenedIndex] = useState(-1);

    return (
        <div className={`relative w-full`}>
            <div className={`relative flex flex-col sm:flex-row items-stretch justify-normal py-10 md:py-24 px-5 gap-8`}>

                <div className={`relative flex-grow flex-shrink flex flex-row flex-wrap items-stretch gap-8`}>

                    <div className={`${style.card}`}>
                        <div className={`
                            relative
                            py-4 sm:py-0 text-center sm:text-left
                            text-xl sm:text-base
                            flex flex-col items-center sm:items-start gap-4
                        `}>
                            <h2 className={`text-3xl font-bold`}>Our Services</h2>
                            <p className={`text-sm`}>
                                Tap on the cards to expand and learn more about our services.
                            </p>
                            <Link href={`#`} className={`flex justify-between items-center w-full outline-none rounded-md px-4 py-2 bg-[var(--tertiary-color)] border-[1px] border-[var(--border-primary-color)] text-[var(--text-color)] font-[var(--font-barlow)]`}>
                                <span>Learn More</span>
                                <FaArrowRight
                                    className={`inline-block ml-2`}
                                />
                            </Link>
                        </div>
                    </div>

                    {data.map((item, index) => (
                        <div key={index} className={`${style.card} relative ${openedIndex === index ? style.opened : ""}`}>
                            <div className={`${style.card__inner__holder}`}>
                                <div className={`${style.card__inner}`}
                                    // style={{
                                    //     backgroundImage: `url(${item.image})`,
                                    // }}
                                    onClick={() => {
                                        if (openedIndex === index) {
                                            setOpenedIndex(-1);
                                        } else if (item.items?.length && item.items?.length > 0) {
                                            setOpenedIndex(index);
                                        }
                                    }}
                                >
                                    <Image
                                        src={item.image || ""}
                                        alt={item.title}
                                        width={500}
                                        height={500}
                                        className={`absolute inset-0 w-full h-full object-cover object-center z-0`}
                                    />

                                    {item.image && (
                                        <div className={`${style.card__overlay}`}></div>
                                    )}

                                    <div className={`
                                        relative min-h-[170px] max-h-[250px] 
                                        flex flex-col justify-between items-stretch gap-2 px-4 py-7
                                        z-10
                                    `}>

                                        <div className={`flex flex-row justify-between gap-2`}>
                                            <h2 className={`text-lg font-bold`}>{item.title}</h2>
                                            {item.items?.length && item.items?.length > 0 && (
                                                <span className={`text-xl`}>
                                                    <FaAngleDown
                                                        className={`inline-block`}
                                                    />
                                                </span>
                                            )}
                                        </div>

                                        <p
                                            className={`text-sm`}
                                        >{item.description}</p>

                                    </div>
                                </div>
                            </div>

                            {(item.items?.length && item.items?.length > 0) && (
                                <div className={`${style.card__expand}`}>
                                    <div className={`${style.card__expand__inner} px-4 py-7`}>

                                        {item.items?.map((item2, index) => {
                                            // if (index > 2) return (null);

                                            return (
                                                <div key={index} className={`${style.card__expand__inner__card}`}>
                                                    <div className={`
                                                    flex-grow flex-shrink
                                                    relative
                                                    flex flex-col justify-between items-start gap-2 p-3
                                                    z-10
                                                `}>
                                                        <h3 className={`text-base text-[var(--link-primary-color)]`}><Link href={`/services/${item.slug}/${item2.item_slug}`}>{item2.item_title}</Link></h3>
                                                        <p className={`text-sm`}>{item2.description}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                </div>

            </div>
        </div>
    )
}