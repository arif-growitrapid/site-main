'use client'
import React, { useEffect, useState } from 'react'
import Stars from '@/components/stars';
import style from './page.module.scss'
import TeamWorkBG2 from '../../../assets/image/teamwork2.jpg'
import { filterBlogs } from '@/functions/blog';
import BlogCard from './components/BlogCard';
import Navbar from '@/components/navbar';
import { SwiperSlide, Swiper } from 'swiper/react';
import { BiSave, BiHeart } from 'react-icons/bi';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Navigation } from 'swiper/modules';
import { formatNumbers } from '@/utils/formatter';
import Skeleton from 'react-loading-skeleton';

type Props = {}
export default function Page({ }: Props) {

    const [trendingBlogs, setTrendingBlogs] = useState(Array(3).fill(undefined))
    const [popularBlogs, setPopularBlogs] = useState(Array(20).fill(undefined))

    useEffect(() => {
        async function fetchData() {
            try {
                const trendingResponse = await filterBlogs("likes", 20, 0);
                const popularResponse = await filterBlogs("views", 20, 0);

                if (trendingResponse.status === 200 && popularResponse.status === 200) {
                    setTrendingBlogs(trendingResponse.data.blogs);
                    setPopularBlogs(popularResponse.data?.blogs);
                    console.log(trendingResponse.data.blogs)
                }
            } catch (error) {
                console.error('Error fetching blogs', error);
            }
        }

        fetchData();
    }, []);


    return (
        <>
            <div className={style.aboutUs}>
                <Navbar></Navbar>
                <div className={style.eBooks}>
                    <div className={style.left}>
                        <h1>GROWITRAPID RESOURCES !!</h1>
                        <input type='text' placeholder='Search For Blogs' />
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

                    {trendingBlogs.map((card, index) => {

                        if (card) {
                            return (
                                <SwiperSlide key={index} className={style.swiperSlider}>
                                    <div
                                        style={{
                                            backgroundImage: `url(${card?.thumbnail})`,
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
                                        <h2><a href={`blogs/${card?.slug}`}>{card?.title}</a></h2>
                                        <p>{card?.excerpt}</p>
                                    </div>
    
                                    <div className={style.blogInfo}>
                                        <div>
                                            <BiHeart size={25} className={style.icon} />
                                            <p>{formatNumbers(card?.likes)}</p>
                                        </div>
    
    
                                        <div>
                                            <BiSave size={25} className={style.icon} />
                                            <p>{formatNumbers(card?.saves)}</p>
                                        </div>
    
                                        <div>
                                            <MdOutlineRemoveRedEye size={25} className={style.icon} />
                                            <p>{formatNumbers(card?.viewed_by.length)}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }

                    })}
                </Swiper>
            </div>
        </>
    )
}