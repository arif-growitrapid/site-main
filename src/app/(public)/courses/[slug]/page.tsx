/* eslint-disable */
'use client'
import React, { useState, useEffect } from 'react';
import Stars from '@/components/stars';
import style from './style.module.scss'
import Link from 'next/link';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { getCourseBySlug } from '@/functions/courses';
import notFound from '../../not-found';
import { formatNumbers } from '@/utils/formatter';
import Navbar from '@/components/navbar';
import Preloader from '@/components/preloader/Preloader';

export default function Page({
    params
}: {
    params: {
        slug: string;
    };
}) {

    const [activeIndex, setActiveIndex] = useState(null);
    const [courseData, setCourseData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const toggleAccordion = (index: any) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };
    const testimonials = [1, 2, 3, 5, 5]

    const { slug } = params;
    useEffect(() => {
        async function getCourseDetails() {
            try {
                const { type, data: courseData } = await getCourseBySlug("coursera", slug);

                if (type === "success") {
                    setCourseData(courseData);
                    console.log(courseData, "MAIN");
                } else {
                    return notFound({});
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        getCourseDetails()
    }, [])

    const items = [{ title: "Programming for Everybody (Getting Started with Python)", content: "Hjkkgfghkjhv" }, { title: "Python Data Structures", content: "Hjkkgfghkjhv" }, { title: "PyGame Tutorial With Python", content: "Hjkkgfghkjhv" }, { title: "Programming for Everybody (Getting Started with Python)", content: "Hjkkgfghkjhv" }, { title: "Python Data Structures", content: "Hjkkgfghkjhv" }, { title: "PyGame Tutorial With Python", content: "Hjkkgfghkjhv" }]

    if (loading) {
        return <Preloader/>;
    }

    if (courseData !== null) {
        return (
            <div>
                <header>
                    <main className={style.hero}>
                        <div className={style.blob1}></div>
                        <div className={style.blob2}></div>

                        <div className={style.parent}>
                            <Navbar />

                            <h1>{courseData?.title}</h1>
                            <p>{courseData?.description}</p>
                            <div className={style.btns}>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-200h80v-40h40q17 0 28.5-11.5T600-280v-120q0-17-11.5-28.5T560-440H440v-40h160v-80h-80v-40h-80v40h-40q-17 0-28.5 11.5T360-520v120q0 17 11.5 28.5T400-360h120v40H360v80h80v40ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-560v-160H240v640h480v-480H520ZM240-800v160-160 640-640Z" /></svg>
                                    About The Course
                                </button>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M517-518 347-688l57-56 113 113 227-226 56 56-283 283ZM280-220l278 76 238-74q-5-9-14.5-15.5T760-240H558q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T578-354l-234-86h-64v220ZM40-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L560-60l-280-78v58H40Zm80-80h80v-280h-80v280Z" /></svg>
                                    Enroll Free Of Cost
                                </button>
                            </div>


                            <div className={style.stars}>
                                <Stars></Stars>
                            </div>
                            <div className={style.numbers}>
                                <div>
                                    <h2 className={style.numeric}>{courseData.guarantee_percentage || "68%"}</h2>
                                    <p className={`line-clamp-2 ${style.text}`}>Graduates Recieved Jobs</p>
                                </div>

                                <div>
                                    <h2 className={style.numeric}>{formatNumbers((courseData.avg_salary.match(/[0-9,]+/) || [])[0].replace(/,/g, '') || 0) || "80k"}</h2>
                                    <p className={`line-clamp-2 ${style.text}`}>Avg $ Salary In India</p>
                                </div>

                                <div>
                                    <h2 className={style.numeric}>{formatNumbers((courseData.total_enrolled_students.match(/[0-9,]+/) || [])[0].replace(/,/g, '') || 0) || "1.2k"}</h2>
                                    <p className={`line-clamp-2 ${style.text}`}>Total Enrolled Studnets</p>
                                </div>

                                <div>
                                    <h2 className={style.numeric}>{courseData.rating || "4.8"}</h2>
                                    <p className={`line-clamp-2 ${style.text}`}>Rating by {courseData.reviews || "42k"}</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </header>

                <div className={style.courseInfo}>
                    <div className={style.eBooks}>
                        <h1>What Will You Learn ??</h1>
                        <ul className={style.points}>
                            {
                                courseData?.what_you_will_learn.map((element: string, index: number) => {
                                    return (
                                        <li key={index}>

                                            {element}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <div className={style.container}>
                        <div className={style.eBooks}>
                            <h1>Skills You Will Gain ??</h1>
                            <ul className={style.tags}>
                                {
                                    courseData?.tags.map((element: string, index: number) => {
                                        return (
                                            <li key={index}>

                                                {element}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        <div className={style.perks}>
                            <div className={style.eBooks}>
                                <div>
                                    <svg width="43" height="44" viewBox="0 0 43 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 24.4966C2 22.8397 3.34315 21.4966 5 21.4966H14.7114V41.6352H5C3.34315 41.6352 2 40.2921 2 38.6352V24.4966Z" stroke="white" stroke-width="4" />
                                        <path d="M28.2891 5C28.2891 3.34314 29.6322 2 31.2891 2H38.0004C39.6573 2 41.0004 3.34315 41.0004 5V38.6352C41.0004 40.2921 39.6573 41.6352 38.0004 41.6352H28.2891V5Z" stroke="white" stroke-width="4" />
                                        <path d="M15.1445 15.2124C15.1445 13.5555 16.4877 12.2124 18.1445 12.2124H24.8559C26.5127 12.2124 27.8559 13.5555 27.8559 15.2124V41.6351H15.1445V15.2124Z" stroke="white" stroke-width="4" />
                                    </svg>

                                </div>
                                <h1>Free Certificate Included</h1>
                            </div>
                            <div className={style.eBooks}>
                                <div>
                                    <svg width="43" height="44" viewBox="0 0 43 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 24.4966C2 22.8397 3.34315 21.4966 5 21.4966H14.7114V41.6352H5C3.34315 41.6352 2 40.2921 2 38.6352V24.4966Z" stroke="white" stroke-width="4" />
                                        <path d="M28.2891 5C28.2891 3.34314 29.6322 2 31.2891 2H38.0004C39.6573 2 41.0004 3.34315 41.0004 5V38.6352C41.0004 40.2921 39.6573 41.6352 38.0004 41.6352H28.2891V5Z" stroke="white" stroke-width="4" />
                                        <path d="M15.1445 15.2124C15.1445 13.5555 16.4877 12.2124 18.1445 12.2124H24.8559C26.5127 12.2124 27.8559 13.5555 27.8559 15.2124V41.6351H15.1445V15.2124Z" stroke="white" stroke-width="4" />
                                    </svg>

                                </div>
                                <h1>{courseData.duration}</h1>
                            </div>
                            <div className={style.eBooks}>
                                <div>
                                    <svg width="43" height="44" viewBox="0 0 43 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 24.4966C2 22.8397 3.34315 21.4966 5 21.4966H14.7114V41.6352H5C3.34315 41.6352 2 40.2921 2 38.6352V24.4966Z" stroke="white" stroke-width="4" />
                                        <path d="M28.2891 5C28.2891 3.34314 29.6322 2 31.2891 2H38.0004C39.6573 2 41.0004 3.34315 41.0004 5V38.6352C41.0004 40.2921 39.6573 41.6352 38.0004 41.6352H28.2891V5Z" stroke="white" stroke-width="4" />
                                        <path d="M15.1445 15.2124C15.1445 13.5555 16.4877 12.2124 18.1445 12.2124H24.8559C26.5127 12.2124 27.8559 13.5555 27.8559 15.2124V41.6351H15.1445V15.2124Z" stroke="white" stroke-width="4" />
                                    </svg>

                                </div>
                                <h1>{courseData.experience} Course</h1>
                            </div>

                        </div>
                    </div>

                    <div className={`${style.eBooks} ${style.catalog}`}>
                        <h1>Specialization - {courseData.catalogs.length} Course Series ??</h1>
                        <div className={style.accordion}>
                            {courseData.catalogs.map((item: { internalTags: string, whatYouWillLearn: string, link: string, title: string, rating: string, duration: string }, index: number) => (
                                <div key={index} className={style['accordion-item']}>
                                    <div
                                        className={`${style['accordion-header']} ${activeIndex === index ? style.active : ''}`}
                                        onClick={() => toggleAccordion(index)}
                                    >
                                        <div>
                                            <Link href={item.link} className={'underline underline-offset-4'}>{item.title}</Link>

                                            <div className={style.tags}>
                                                <span key={0} className={`inline-block px-2 py-1 mr-2 text-[.65rem] font-semibold rounded-md bg-[var(--bg-color)] text-[var(--text-color)]`}>
                                                    Course {index}
                                                </span>
                                                <span key={0} className={`inline-block px-2 py-1 mr-2 text-[.65rem] font-semibold rounded-md bg-[var(--bg-color)] text-[var(--text-color)]`}>
                                                    {item.rating} Star Rating
                                                </span>
                                                <span key={0} className={`inline-block px-2 py-1 mr-2 text-[.65rem] font-semibold rounded-md bg-[var(--bg-color)] text-[var(--text-color)]`}>
                                                    {item.duration.includes('hours') ? item.duration : 'Begginner Friendly'}
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
                                            {JSON.parse(item.whatYouWillLearn).map((text: String, index: number) => {
                                                return (
                                                    <li key={index} className='text-xs'>{text}</li>
                                                )
                                            })}
                                        </ul>

                                        <h2 className={`text-xs font-semibold mt-2`}>Skills You Will Gain</h2>
                                        <div className={style.tags}>
                                            {
                                                JSON.parse(item.internalTags).map((text: String, index: number) => {
                                                    return (
                                                        <span key={0} className={`inline-block px-2 py-1 mr-2 text-[0.6rem] font-semibold rounded-md bg-[var(--bg-color)] text-[var(--text-color)]`}>
                                                            {text}
                                                        </span>
                                                    )
                                                })
                                            }
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
                </div>
            </div>
        )
    } else {
        return <h1>Not Found</h1>
    }
}