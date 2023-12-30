'use client'
import React, { useEffect, useRef, useState } from 'react'
import Stars from '@/components/stars';
import style from './page.module.scss'
import { MdWorkHistory } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { filterCourse } from '@/functions/courses';
import CoursesDisplayCard from './components/CourseDisplayCards';
import BlogCard from './components/BlogCard';
import Navbar from '@/components/navbar';
import { SwiperSlide, Swiper } from 'swiper/react';
import { FaStar } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Navigation } from 'swiper/modules';
import { formatNumbers } from '@/utils/formatter';
import Skeleton from 'react-loading-skeleton';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {}
export default function Page({ }: Props) {

    const [trendingCourses, setTrendingCourses] = useState(Array(10).fill(undefined))
    const [searchedCourses, setsearchedCourses] = useState(Array(20).fill(undefined))
    const searchBox = useRef(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await filterCourse('coursera', {}, 20);
                if (result.status === 200) {
                    const { type, data } = result
                    console.log(data, "BULLI")

                    setTrendingCourses(data)
                }
            } catch (error) {
                console.error('Error fetching courses BULL:', error);
            }
        };

        fetchData();
    }, []);

    async function search() {
        let query = searchBox.current.value
        console.log(query)
        const response = await searchForBlog(query, 100, 0)
        console.log(response)
        setsearchedCourses(response.data.blogs)
    }


    return (
        <SkeletonTheme baseColor="#10141F" highlightColor="#161b27">
            <div className={style.aboutUs}>
                <Navbar></Navbar>
                <div className={style.eBooks}>
                    <div className={style.left}>
                        <h1>GROWITRAPID FREE COURSES</h1>
                        <div className={style.searchbar}>
                            <input ref={searchBox} type='text' placeholder='Search For Courses' />
                            <button onClick={search}>
                                <img src='https://www.jsmastery.pro/assets/resources/icons/magnifying-glass.svg'></img>
                            </button>
                        </div>
                    </div>
                    <div className={style.right}>
                        <div className={style.blob1}></div>
                    </div>
                </div>

                <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={10}
                    className={style.swiper}
                    freeMode={true}
                    loop={true}
                    centeredSlides={true}
                    mousewheel={{ releaseOnEdges: true }}
                >

                    {trendingCourses.map((card, index) => {
                        console.log(card)
                        if (card) {
                            return (
                                <SwiperSlide key={index} className={style.swiperSlider}>
                                    <div
                                        style={{
                                            backgroundImage: `url(https://random.imagecdn.app/1600/900)`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                        className={`${style.thumbContainer}`}
                                    ></div>

                                    <div className={style.tags}>
                                        {
                                            card?.tags.map((item, index) => {
                                                return (<div key={index} className={style.tag}>{item}</div>)
                                            })
                                        }
                                    </div>
                                    <div>
                                        <h2><a href={`courses/${card?.meta.slug}`}>{card?.title}</a></h2>
                                        <p>{card?.description}</p>
                                    </div>

                                    <div className={style.blogInfo}>
                                        <div>
                                            <PiStudentFill size={25} className={style.icon} />
                                            <p>{formatNumbers(parseInt((card?.total_enrolled_students || '').replace(/,/g, '')))}</p>
                                        </div>


                                        <div>
                                            <MdWorkHistory size={25} className={style.icon} />
                                            <p>{card?.guarantee_percentage}</p>
                                        </div>

                                        <div>
                                            <FaStar size={25} className={style.icon} />
                                            <p>{formatNumbers(card?.rating)}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        } else {
                            return (
                                <SwiperSlide key={index} className={style.swiperSlider}>
                                    <Skeleton className={`${style.thumbContainer}`}></Skeleton>

                                    <div className={style.skeletonTags}>
                                        {
                                            [1, 1, 1, 1, 1, 1, 1].map((item, index) => {
                                                return (<Skeleton key={index} width={Math.floor(Math.random() * 100) + 10} className={style.skeletonTag}></Skeleton>)
                                            })
                                        }
                                    </div>
                                    <div>
                                        <h2><a href={`courses/${card?.meta.slug}`}><Skeleton></Skeleton></a></h2>
                                        <p><Skeleton count={3}></Skeleton></p>
                                    </div>

                                    <div className={style.blogInfo}>
                                        <div>
                                            <PiStudentFill size={25} className={style.icon} />
                                            <p><Skeleton width={30}></Skeleton></p>
                                        </div>


                                        <div>
                                            <MdWorkHistory size={25} className={style.icon} />
                                            <p><Skeleton width={30}></Skeleton></p>
                                        </div>

                                        <div>
                                            <FaStar size={25} className={style.icon} />
                                            <p><Skeleton width={30}></Skeleton></p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }

                    })}
                </Swiper>

                {/* <CoursesDisplayCard courses={trendingCourses} type='cards' titleNeeded={false} bgColor={"var(--bg-color)"} swapTheme={true}/> */}

            </div>
        </SkeletonTheme>
    )
}