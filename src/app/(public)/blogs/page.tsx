'use client'
import React, {useEffect, useState } from 'react'
import Stars from '@/components/stars';
import style from './page.module.scss'
import TeamWorkBG2 from '../../../assets/image/teamwork2.jpg'
import { filterBlogs } from '@/functions/blog';
import BlogCard from './components/BlogCard';

type Props = {}
export default function Page({ }: Props) {
    
    const [trendingBlogs, setTrendingBlogs] = useState([undefined, undefined, undefined])
    const [popularBlogs, setPopularBlogs] = useState([undefined, undefined, undefined])

    useEffect(() => {
        async function fetchData() {
            try {
                const trendingResponse = await filterBlogs("likes", 20, 0);
                const popularResponse = await filterBlogs("views", 20, 0);

                if (trendingResponse.status === 200 && popularResponse.status === 200) {
                    setTrendingBlogs(trendingResponse.data.blogs);
                    setPopularBlogs(popularResponse.data?.blogs);
                }
            } catch (error) {
                console.error('Error fetching blogs', error);
            }
        }

        fetchData();
    }, []);


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
                        <h1 className={`md:max-w-[50%] text-5xl text-center md:text-left leading-tight font-semibold text-[var(--dark-text-color)] md:text-current`}>Our Blogs</h1>

                        <p className={`mt-4 text-center md:text-left text-[var(--dark-text-color)] md:text-current max-w-[500px]`}>Discover a wealth of knowledge and stay engaged with our blog, where you&apos;ll find a treasure trove of insights, expert tips, and thought-provoking articles across diverse subjects</p>
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

            <main className={style.blogs}>
                
                <BlogCard blogs={trendingBlogs} type={"carousel"} />

                <div className={style.title}>
                    <div>
                        <svg className={style.trending} width="50" viewBox="0 0 90 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M82.497 2.50001C83.1716 2.49863 83.8393 2.63515 84.4592 2.90116C85.6673 3.41514 86.6249 4.38376 87.125 5.59795L87.1361 5.62514L87.1467 5.65257L87.18 5.73924L87.1856 5.75378L87.191 5.76839C87.3952 6.31959 87.5 6.9105 87.5 7.50001V30C87.5 31.3261 86.9732 32.5978 86.0355 33.5355C85.0979 34.4732 83.8261 35 82.5 35C81.1739 35 79.9021 34.4732 78.9645 33.5355C78.0268 32.5978 77.5 31.3261 77.5 30V19.5722L52.506 40.4266C52.5042 40.4267 52.5025 40.4267 52.5007 40.4267C51.1867 40.4309 49.8848 40.1743 48.6706 39.6718C47.4559 39.1691 46.3531 38.4303 45.4261 37.4983C45.4252 37.4974 45.4243 37.4965 45.4235 37.4956L35.0011 27.0733L35 27.0734L34.9988 27.0734L11.0424 51.0264C11.0408 51.028 11.0392 51.0297 11.0375 51.0313C10.574 51.4977 10.0227 51.8677 9.41543 52.1197C8.80832 52.3718 8.15731 52.501 7.5 52.5C6.84269 52.501 6.19168 52.3718 5.58457 52.1197C4.97843 51.8681 4.42805 51.4991 3.96511 51.034C3.0194 50.0914 2.5 48.824 2.5 47.5C2.5 46.1744 3.02063 44.9056 3.96849 43.9626C3.9696 43.9615 3.97071 43.9604 3.97182 43.9593L27.9289 20.0022C29.8169 18.1142 32.3371 17.0767 35.0033 17.0767C37.6715 17.0767 40.1912 18.119 42.0744 20.0022L52.5011 30.4289L52.5033 30.4311L52.5055 30.4289L52.5056 30.4289L63.6039 19.3306L70.4345 12.5M82.497 2.50001H82.5V5.00001L82.4927 2.50002C82.4942 2.50002 82.4956 2.50001 82.497 2.50001ZM82.497 2.50001H60C58.6739 2.50001 57.4021 3.02679 56.4645 3.96448C55.5268 4.90215 55 6.17392 55 7.50001C55 8.8261 55.5268 10.0979 56.4645 11.0355C57.4021 11.9732 58.6739 12.5 60 12.5H70.4345M70.4345 12.5H73.97L72.9345 10L70.4345 12.5ZM34.9952 27.0674L34.9953 27.0675C34.9953 27.0675 34.9952 27.0674 34.9952 27.0674Z" fill="white" stroke="black" stroke-width="5" />
                        </svg>
                        <h1 className='flex items-end text-3xl text-center md:text-left leading-tight font-bold text-[var(--dark-text-color)] md:text-current'>
                            Featured Blogs:-
                        </h1>
                    </div>

                    <div className={style.navigation}>

                    </div>
                </div>

                <BlogCard blogs={popularBlogs} type={"cards"} />

                

            </main>
        </>
    )
}