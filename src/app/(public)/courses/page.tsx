"use client"
import client from '@/utils/sanity-client';
import React, { cache } from 'react'
import { groq } from 'next-sanity';
import Link from 'next/link';
import Stars from '@/components/stars';
import style from './page.module.scss'
import TeamWorkBG2 from '../../../assets/image/teamwork2.jpg'
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa'
import { useState } from 'react';

type Props = {}
const clientFetch = cache(client.fetch.bind(client));

const page: React.FC<any> = () => {


    const options = { levels: ["Easy", "Medium", "Hard"], price: ["Free", "Paid"], Type: ["Career Path", "Skill Path", "Course"], lessons: ["0-5", "5-15", "15+"], projects: ["Practise Projects", "Portfolio Project"] }

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleCheckboxChange = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <>
            <div>
                <header className={`relative w-full pb-[11%] bg-[var(--tertiary-color)] `}>

                    <div className={`${style.bg__image} absolute right-0 top-0 h-full w-full md:w-[50%] bg-cover bg-bottom`}
                        style={{
                            // backgroundImage: `url(${BG.src})`,
                            backgroundImage: `url(${TeamWorkBG2.src})`,
                        }}
                    />


                    <div className={`absolute h-full w-[52%] bottom-auto right-auto hidden md:block`}>
                        <svg
                            className={`absolute w-auto h-full right-0 translate-x-[25%]`}
                            viewBox="0 0 984 686"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path className={`fill-[var(--tertiary-color)]`} d="M829.645582,-3.55271368e-14 C818.959194,11.9356039 808.954818,24.8206121 799.721248,38.7211139 C723.226254,157.53566 739.861725,301.270975 797.809751,426.687474 C804.958442,442.184984 814.61534,462.120894 818.944183,473.423703 C844.673456,540.503061 856.345675,600.855141 881.916718,667.40505 C761.006678,679.138421 646.665221,685.004119 538.890625,685.004119 L0,685.004119 L0,685.004119 L0,0.00411925189 Z"></path>
                        </svg>

                        <div className={`absolute top-0 left-0 h-full w-full`}>
                            <Stars />
                        </div>
                    </div>


                    <div className={`relative z-20 px-6 py-24 md:max-w-5xl mx-auto`}>
                        <h1 className={`md:max-w-[50%] text-5xl text-center md:text-left leading-tight font-semibold text-[var(--dark-text-color)] md:text-current`}>Our Courses</h1>

                        <p className={`mt-4 text-center md:text-left text-[var(--dark-text-color)] md:text-current max-w-[500px]`}>Explore an abundance of knowledge and stay captivated with our courses. Within our educational offerings, you'll uncover a vast array of insights, expert guidance, and thought-provoking content covering a wide range of subjects.</p>
                    </div>

                    <div className={`absolute w-full -bottom-2 z-30`}>
                        <svg
                            preserveAspectRatio="xMinYMin meet"
                            className={`w-full hidden md:block`}
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 1440 158"
                        >
                            <defs></defs>
                            <path className={`fill-[var(--bg-color)]`} fill-rule="evenodd" d="M1440-27h2v185H0V8c88-20.667 267.333 3 538 71s571.333 45.333 902-68v-38z"></path>
                        </svg>

                        <svg
                            preserveAspectRatio="xMinYMin meet"
                            className={`w-full block md:hidden`}
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 375 50"
                        >
                            <defs></defs>
                            <path className={`fill-[var(--bg-color)]`} fill-rule="evenodd" d="M376 .414V50H0V5.48C141.126 31.757 266.126 30.182 375 .756l1-.342z"></path>
                        </svg>
                    </div>
                </header>
            </div>

            <main className={style.courses}>
                <div className={style.gridContainer}>
                    <div className={style.boxA}>
                        <div className={style.content}>
                            <h2 className={`text-xl font-bold z-10`}>Full Stack Web Development</h2>
                            <p className={`text-sm z-10 my-2`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit nemo quae commodi earum vitae quod cum. Distinctio cum officiis iusto omnis dolorum doloremque maxime, deleniti libero earum, sed natus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt nisi veniam unde fuga mollitia repellat, qui officia asperiores beatae minima quisquam inventore eveniet voluptas quos? Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quasi obcaecati optio consectetur temporibus magni.</p>
                            <div className={style.btns}>
                                <Link href={`#`} className={style['load_more_btn']}>
                                    <div>
                                        <span>Enroll Now !!</span>
                                    </div>

                                    <div>
                                        <FaArrowRight className={`inline-block ml-2`} />
                                    </div>
                                </Link>
                                <Link href={`#`} className={style['load_more_btn']}>
                                    <div>
                                        <span>Enroll Now !!</span>
                                    </div>

                                    <div>
                                        <FaArrowRight className={`inline-block ml-2`} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <Image
                            src={"https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF0YSUyMHNjaWVuY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"}
                            width={500}
                            height={500}
                            className={`absolute inset-0 w-full h-full object-cover object-center z-0`}
                        />
                        <div className={`${style.card__overlay}`}>

                        </div>
                    </div>
                    <div className={style.boxB}>
                        <div className={style.content}>
                            <h2 className={`text-lg font-bold z-10`}>Full Stack Web Development</h2>
                            <p className={`text-sm z-10`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit nemo quae commodi earum vitae quod cum. Distinctio cum officiis iusto omnis dolorum doloremque maxime, deleniti libero earum, sed natus.</p>
                        </div>
                        <Image
                            src={"https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF0YSUyMHNjaWVuY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"}
                            width={500}
                            height={500}
                            className={`absolute inset-0 w-full h-full object-cover object-center z-0`}
                        />
                        <div className={`${style.card__overlay}`}></div>
                    </div>
                    <div className={style.boxC}>
                        <div className={style.content}>
                            <h2 className={`text-lg font-bold z-10`}>Full Stack Web Development</h2>
                            <p className={`text-sm z-10`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit nemo quae commodi earum vitae quod cum. Distinctio cum officiis iusto omnis dolorum doloremque maxime, deleniti libero earum, sed natus.</p>
                        </div>
                        <Image
                            src={"https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF0YSUyMHNjaWVuY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"}
                            width={500}
                            height={500}
                            className={`absolute inset-0 w-full h-full object-cover object-center z-0`}
                        />
                        <div className={`${style.card__overlay}`}></div>
                    </div>
                    <div className={style.boxD}>
                        <div className={style.content}>
                            <h2 className={`text-lg font-bold z-10`}>Full Stack Web Development</h2>
                            <p className={`text-sm z-10`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit nemo quae commodi earum vitae quod cum. Distinctio cum officiis iusto omnis dolorum doloremque maxime, deleniti libero earum, sed natus.</p>
                        </div>
                        <Image
                            src={"https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF0YSUyMHNjaWVuY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"}
                            width={500}
                            height={500}
                            className={`absolute inset-0 w-full h-full object-cover object-center z-0`}
                        />
                        <div className={`${style.card__overlay}`}></div>
                    </div>
                    <div className={style.boxE}>
                        <div className={style.content}>
                            <h2 className={`text-lg font-bold z-10`}>Full Stack Web Development</h2>
                            <p className={`text-sm z-10`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum suscipit nemo quae commodi earum vitae quod cum. Distinctio cum officiis iusto omnis dolorum doloremque maxime, deleniti libero earum, sed natus.</p>
                        </div>
                        <Image
                            src={"https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF0YSUyMHNjaWVuY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"}
                            width={500}
                            height={500}
                            className={`absolute inset-0 w-full h-full object-cover object-center z-0`}
                        />
                        <div className={`${style.card__overlay}`}></div>
                    </div>
                </div>
            </main>

            <div className={`${style.certificate}`}>
                <Image className={style.ImgContent} src={'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFuZHNjYXBlJTIwbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60'} width={500} height={100} alt='hello' />

                <div className={style.textContent}>
                    <h2 className={`text-lg font-semibold`}>Explore Trending PPT Courses</h2>
                    <p className='text-sm leading-4 text-[var(--dark-primary-color)]'>Enroll in the University of Michigan's Specialization for a preview of related degree program content, aiding your decision on the right fit.</p>
                    <div className={style.btns}>
                        <Link href={`/courses/PPT-COurses`} className={`${style['load_more_btn']} ${style['load_more_btn_half']}`}>
                            <div>
                                <span>Enroll Now !!</span>
                            </div>

                            <div>
                                <FaArrowRight className={`inline-block ml-2`} />
                            </div>
                        </Link>

                    </div>
                </div>
            </div>

            <div className={style.allCourses}>
                <div className={style.navbar}>
                    <div>
                        <h2>All Courses</h2>
                        <p>41 results</p>
                    </div>
                    <div className={style.form}>
                        <input type={'text'} placeholder={"Search What You Wanna Learn Today !!"} />
                    </div>
                </div>

                <div className={style.container}>
                    <div className={style.filter}>
                        <div className={style.row}>
                            <h3>Filters</h3>
                            <p>Clear Filters</p>
                        </div>
                        <div className={style.filterOptions}>
                        {Object.keys(options).map((category) => (
                            <div key={category} className={style.category}>
                                <h4>{category}</h4>
                                {options[category].map((option:any) => (
                                    <div className={style.options} key={option}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value={option}
                                                checked={selectedOptions.includes(option)}
                                                onChange={() => handleCheckboxChange(option)}
                                            />
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className={style.coursesDisplay}></div>
                </div>
            </div>
        </>
    )
}

export default page;
