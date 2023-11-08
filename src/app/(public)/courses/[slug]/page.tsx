'use client'
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import client from '@/utils/sanity-client';
import Stars from '@/components/stars';
import style from './style.module.scss'
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

export default function Page({
    params
}: {
    params: {
        slug: string;
    };
}) {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index: any) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };
    const data = [1, 2, 3, 5, 5]

    function scrollToSection(sectionName: String) {
        const section = document.getElementById(String(sectionName));

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
            });
        }
    }

    const items = [{ title: "Programming for Everybody (Getting Started with Python)", content: "Hjkkgfghkjhv" }, { title: "Python Data Structures", content: "Hjkkgfghkjhv" }, { title: "PyGame Tutorial With Python", content: "Hjkkgfghkjhv" }, { title: "Programming for Everybody (Getting Started with Python)", content: "Hjkkgfghkjhv" }, { title: "Python Data Structures", content: "Hjkkgfghkjhv" }, { title: "PyGame Tutorial With Python", content: "Hjkkgfghkjhv" }]
    return (
        <div className={``}>
            <header className={`relative w-full pb-[11%] bg-[var(--tertiary-color)] `}>
                <div className={`absolute h-full w-[90%] bottom-auto right-auto hidden md:block`}>
                    <div className={`absolute top-0 left-0 h-full w-full`}>
                        <Stars />
                    </div>
                </div>

                <div className={`relative z-20 px-6 py-10 pt-24 md:max-w-5xl mx-auto`}>
                    <h1 className={`md:max-w-[100%] text-4xl text-center md:text-left leading-tight font-semibold text-[var(--dark-text-color)] md:text-current`}>React Native Course</h1>

                    <p className={`md:max-w-[100%] mt-2 text-center md:text-left text-[var(--text-color)]`}>
                        Start a career as a Cloud Technology Consultant . In this program, you’ll learn in-demand skills to advise clients on the use of cloud technology to meet business objectives. No degree or experience required
                    </p>

                    <p className={`md:max-w-[50%] text-center md:text-left text-[var(--text-color)]`}>
                        <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--bg-color)] text-[var(--text-color)]`}>
                            Begginner Friendly
                        </span>
                        <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--bg-color)] text-[var(--text-color)]`}>
                            With Certificate
                        </span>
                        <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--bg-color)] text-[var(--text-color)]`}>
                            1,252,276+ Already Enrolled
                        </span>
                    </p>

                    <div className={`flex items-center justify-center md:justify-start mt-4`}>
                        <div className={`flex items-center`}>
                            <img
                                className={`w-10 h-10 rounded-full`}
                                src={"https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"}
                                alt={""}
                            />
                        </div>
                        <div className={`ml-2`}>
                            <b className={`text-xs text-[var(--text-color)]`}>
                                Akash Srinivasan
                            </b>
                            <p className={`text-xs leading-3 text-[var(--text-color)]`}>
                                & 5+ more Instructors
                            </p>
                        </div>
                        <Link href={`#`} className={style['load_more_btn']}>
                            <div>
                                <span>Enroll Now</span>
                            </div>

                            <div>
                                <FaArrowRight className={`inline-block ml-2`} />
                            </div>
                        </Link>
                    </div>

                </div>

                <div className={`absolute w-full -bottom-2 z-30`}>


                    <svg
                        preserveAspectRatio="xMinYMin meet"
                        className={`w-full block`}
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 375 50"
                    >
                        <defs></defs>
                        <path className={`fill-[var(--bg-color)]`} fillRule="evenodd" d="M376 .414V50H0V5.48C141.126 31.757 266.126 30.182 375 .756l1-.342z"></path>
                    </svg>
                </div>
            </header>

            <div className={style.courseInfo}>
                <ul className={style.filter}>
                    <li className={style.filterText} onClick={() => scrollToSection("about")}>About</li>
                    <li className={style.filterText} onClick={() => scrollToSection("outcomes")}>Outcomes</li>
                    <li className={style.filterText} onClick={() => scrollToSection("courses")}>Courses</li>
                    <li className={style.filterText} onClick={() => scrollToSection("testimonials")}>Testimonials</li>
                </ul>

                <div id={"about"} className={`${style.about}`}>
                    <div className={'my-4'}>
                        <h2 className={`text-lg font-semibold`}>What You Will Learn ??</h2>
                        <ul className={style.points}>
                            <li>Master the most up-to-date practical skills and knowledge that data scientists use in their daily roles</li>
                            <li>Learn the tools, languages, and libraries used by professional data scientists, including Python and SQL</li>
                            <li>Apply your new skills to real-world projects and build a portfolio of data projects that showcase your proficiency to employers</li>
                            <li>Import and clean data sets, analyze and visualize data, and build machine learning models and pipelines</li>
                        </ul>
                    </div>

                    <div className={style.details}>
                        <div className={`w-[50%]`}>
                            <h2 className={`text-lg font-semibold mt-2`}>Skills That You Will Gain ??</h2>
                            <p className={`w-[100%] text-left md:text-left text-[var(--text-color)]`}>
                                <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--tertiary-color)] text-[var(--text-color)]`}>
                                    Python
                                </span>
                                <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--tertiary-color)] text-[var(--text-color)]`}>
                                    Math Plot Lib
                                </span>
                                <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--tertiary-color)] text-[var(--text-color)]`}>
                                    NumPy
                                </span>
                                <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--tertiary-color)] text-[var(--text-color)]`}>
                                    Pandas
                                </span>
                                <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--tertiary-color)] text-[var(--text-color)]`}>
                                    PowerBi
                                </span>
                                <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--tertiary-color)] text-[var(--text-color)]`}>
                                    JavaScript
                                </span>
                                <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--tertiary-color)] text-[var(--text-color)]`}>
                                    Python
                                </span>
                                <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--tertiary-color)] text-[var(--text-color)]`}>
                                    Math Plot Lib
                                </span>
                                <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--tertiary-color)] text-[var(--text-color)]`}>
                                    NumPy
                                </span>
                                <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--tertiary-color)] text-[var(--text-color)]`}>
                                    Playwright
                                </span>
                                <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--tertiary-color)] text-[var(--text-color)]`}>
                                    PowerBi
                                </span>
                                <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--tertiary-color)] text-[var(--text-color)]`}>
                                    JavaScript
                                </span>
                            </p>
                        </div>
                        <div className={'w-[50%]'}>
                            <h2 className={`text-lg font-semibold mt-2`}>Details To Know</h2>
                            <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--tertiary-color)] text-[var(--text-color)]`}>
                                Begginner Friendly
                            </span>
                            <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--tertiary-color)] text-[var(--text-color)]`}>
                                4.8 Star Rating
                            </span>

                            <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--tertiary-color)] text-[var(--text-color)]`}>
                                6 Months Duration (10hrs/week)
                            </span>
                            <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--tertiary-color)] text-[var(--text-color)]`}>
                                with Certificate
                            </span>
                            <span key={0} className={`inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold rounded-md bg-[var(--tertiary-color)] text-[var(--text-color)]`}>
                                1.6l+ enrolled students
                            </span>
                        </div>
                    </div>
                </div>

                <div id={"outcomes"} className={`${style.outcomes}`}>
                    <div className={style.careerInfo}>
                        <div className={style.outcomesTextContent}>
                            <h2 className={`text-lg font-semibold`}>Prepare For a Career In Project Management</h2>
                            <ul className={style.benefits}>
                                <li>Receive professional-level training from Google</li>
                                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum harum sint, deleniti fugiat eos omnis unde tempore rem laudantium earum! Receive professional-level training from Google</li>
                                <li>Receive professional-level training from Google</li>
                                <li>Receive professional-level training from Google</li>
                            </ul>
                        </div>

                        <div className={`${style.outcomesImgContent}`}>
                            <Image className={style.Img} src={'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFuZHNjYXBlJTIwbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60'} width={500} height={100} alt='hello' />
                            <div className={style.outcomeInfo}>
                                <div>
                                    <h1 className='text-lg'>$77,000</h1>
                                    <p className='text-sm'>Average Salary In India</p>
                                </div>
                                <div>
                                    <h1 className='text-lg'>77,050+</h1>
                                    <p className='text-sm'>Job Openings In India</p>
                                </div>
                                <div>
                                    <h1 className='text-lg'>75%</h1>
                                    <p className='text-sm'>Course Graduates Got Job</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.certificate}>
                        <div className={style.textContent}>
                            <h2 className={`text-lg font-semibold`}>Earn A Certificate</h2>
                            <p className='text-sm leading-4 text-[var(--dark-primary-color)]'>Add this credential to your linkedin profile, resume or CV. Share it on social media and in your performance review.</p>
                        </div>
                        <div className={style.ImgContent}>
                            <Image className={style.certificateImg} src={'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFuZHNjYXBlJTIwbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60'} width={500} height={100} alt='hello' />

                        </div>

                    </div>

                    <div id='courses' className={style.courses}>
                        <h2 className={`text-lg font-semibold p-[.5em]`}>Specialization - 5 course series</h2>
                        <p className='text-sm text-[var(--dark-primary-color)]'>This Specialization builds on the success of the Python for Everybody course and will introduce fundamental programming concepts including data structures, networked application program interfaces, and databases, using the Python programming language. In the Capstone Project, you’ll use the technologies learned throughout the Specialization to design and create your own  applications for data retrieval, processing, and visualization.</p>
                        <div className={style.accordion}>
                            {items.map((item, index) => (
                                <div key={index} className={style['accordion-item']}>
                                    <div
                                        className={`${style['accordion-header']} ${activeIndex === index ? style.active : ''}`}
                                        onClick={() => toggleAccordion(index)}
                                    >
                                        <div>
                                            <Link href={"#"}>{item.title}</Link>

                                            <div className={style.tags}>
                                                <span key={0} className={`inline-block px-2 py-1 mr-2 text-[.65rem] font-semibold rounded-md bg-[var(--bg-color)] text-[var(--text-color)]`}>
                                                    Course 1
                                                </span>
                                                <span key={0} className={`inline-block px-2 py-1 mr-2 text-[.65rem] font-semibold rounded-md bg-[var(--bg-color)] text-[var(--text-color)]`}>
                                                    4.8 Star Rating (85224+ reviews)
                                                </span>
                                                <span key={0} className={`inline-block px-2 py-1 mr-2 text-[.65rem] font-semibold rounded-md bg-[var(--bg-color)] text-[var(--text-color)]`}>
                                                    19 hrs duration
                                                </span>
                                            </div>
                                        </div>
                                        {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                    <div
                                        className={`${style['accordion-content']} ${activeIndex === index ? style.open : ''}`}
                                    >
                                        {/* {item.content} */}
                                        <h2 className={`text-xs font-semibold`}>What You Will Learn ??</h2>
                                        <ul className={style.points}>
                                            <li className='text-xs'>Master the most up-to-date practical skills and knowledge that data scientists use in their daily roles</li>
                                            <li className='text-xs'>Learn the tools, languages, and libraries used by professional data scientists, including Python and SQL</li>
                                            <li className='text-xs'>Apply your new skills to real-world projects and build a portfolio of data projects that showcase your proficiency to employers</li>
                                            <li className='text-xs'>Import and clean data sets, analyze and visualize data, and build machine learning models and pipelines</li>
                                        </ul>

                                        <h2 className={`text-xs font-semibold mt-2`}>Skills You Will Gain</h2>
                                        <div className={style.tags}>
                                            <span key={0} className={`inline-block px-2 py-1 mr-2 text-[0.6rem] font-semibold rounded-md bg-[var(--bg-color)] text-[var(--text-color)]`}>
                                                Python
                                            </span>
                                            <span key={0} className={`inline-block px-2 py-1 mr-2 text-[0.6rem] font-semibold rounded-md bg-[var(--bg-color)] text-[var(--text-color)]`}>
                                                Java
                                            </span>
                                            <span key={0} className={`inline-block px-2 py-1 mr-2 text-[0.6rem] font-semibold rounded-md bg-[var(--bg-color)] text-[var(--text-color)]`}>
                                                C++
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`${style.certificate}`}>
                        <div className={style.textContent}>
                            <h2 className={`text-lg font-semibold`}>Prepare For A Degree</h2>
                            <p className='text-sm leading-4 text-[var(--dark-primary-color)]'>Enroll in the University of Michigan's Specialization for a preview of related degree program content, aiding your decision on the right fit.</p>
                        </div>
                        <div className={style.ImgContent}>
                            <Image className={style.certificateImg} src={'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFuZHNjYXBlJTIwbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60'} width={500} height={100} alt='hello' />

                        </div>

                    </div>
                </div>

                <div id={"testimonials"} className={`${style.testimonials}`}>
                    <h2 className={`text-xl font-semibold text-center py-4`}>Why people choose Coursera for their career</h2>
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        initialSlide={data.length / 2}
                        navigation={true}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2,
                            slideShadows: true,
                        }}
                        pagination={true}
                        modules={[EffectCoverflow, Pagination, Navigation]}
                        className={style.slideContainer}
                    >
                        {
                            data.map((item: any, index: number) => (
                                <SwiperSlide key={index} className={style.slide}>
                                    <div className={style.profileInfo}>
                                        <Image className={style.profilePic} width={60} height={60} src={"https://images.unsplash.com/photo-1696219695041-8dddb603cd33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60"} alt={"HELLPO"} />
                                        <div className={style.profileName}>
                                            <h2>Akash Srinivasan</h2>
                                            <p>Full Stack Web Developer</p>
                                        </div>
                                    </div>

                                    <div className={style.testimonial}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum consequuntur placeat veniam reiciendis illum veritatis accusantium similique numquam rem dicta. Nostrum, explicabo natus. Voluptate debitis accusantium praesentium aut mollitia sed.
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    )
}