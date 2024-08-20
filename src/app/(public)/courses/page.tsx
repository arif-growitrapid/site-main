/* eslint-disable */
"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "./page.module.scss";
import { MdWorkHistory } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { filterCourse } from "@/functions/courses";
import Navbar from "@/components/navbar";
import { SwiperSlide, Swiper } from "swiper/react";
import { FaStar } from "react-icons/fa";
import { formatNumbers } from "@/utils/formatter";
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { searchForBlog } from "@/functions/blog";
import Link from "next/link";
import PublicationPosts from "@/components/publication-post/publication-post";
import { CoursesTypes, DBCourseType } from "@/types/courses.type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description: 'Find the best courses to learn from',
};

type Props = {};
export default function Page({}: Props) {
  const [trendingCourses, setTrendingCourses] = useState<
    DBCourseType<"coursera">[] | null
  >(Array(10).fill(undefined));
  const [searchedCourses, setsearchedCourses] = useState<any>(
    Array(20).fill(undefined)
  );
  const searchBox = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await filterCourse("coursera", {}, 20);
        if (result.status === 200) {
          const { type, data } = result;

          setTrendingCourses(data as DBCourseType<"coursera">[]);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching courses BULL:", error);
      }
    };

    fetchData();
  }, []);

  async function search() {
    if (searchBox.current) {
      let query = searchBox.current.value;
      const response = await searchForBlog(query, 100, 0);
      if (response.data) setsearchedCourses(response.data.blogs);
    }
  }

  return (
    <SkeletonTheme baseColor="#10141F" highlightColor="#161b27">
      <div className={style.aboutUs}>
        <Navbar></Navbar>
        <div className={style.eBooks}>
          <div className={style.left}>
            <h1>GROWITRAPID FREE COURSES</h1>
            {/* <div className={style.searchbar}>
                            <input ref={searchBox} type='text' placeholder='Search For Courses' />
                            <button onClick={search}>
                                <img src='https://www.jsmastery.pro/assets/resources/icons/magnifying-glass.svg'></img>
                            </button>
                        </div> */}
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
          {trendingCourses?.map((card, index) => {
            if (card) {
              return (
                <SwiperSlide key={index} className={style.swiperSlider}>
                  <div
                    style={{
                      backgroundImage: `url('${card.data.thumbnail}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className={`${style.thumbContainer}`}
                  ></div>

                  <div className={style.tags}>
                    {card.data?.tags
                      ? card.data?.tags.map((item, index) => {
                          return (
                            <div key={index} className={style.tag}>
                              {item}
                            </div>
                          );
                        })
                      : ""}
                  </div>
                  <div>
                    <h2>
                      <Link href={`courses/${card._id}`}>
                        {card.data?.title}
                      </Link>
                    </h2>
                    <p className="line-clamp-3">{card.data?.outcomes}</p>
                  </div>

                  <div className={style.blogInfo}>
                    <div>
                      <PiStudentFill size={25} className={style.icon} />
                      <p>
                        {formatNumbers(
                          parseInt(
                            (card.data?.total_enrolled_students || "").replace(
                              /,/g,
                              ""
                            )
                          )
                        )}
                      </p>
                    </div>

                    <div>
                      <MdWorkHistory size={25} className={style.icon} />
                      <p>{card.data?.guarantee_percentage || "82%"}</p>
                    </div>

                    <div>
                      <FaStar size={25} className={style.icon} />
                      <p>{card.data?.rating}</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            } else {
              return (
                <SwiperSlide key={index} className={style.swiperSlider}>
                  <Skeleton className={`${style.thumbContainer}`}></Skeleton>

                  <div className={style.skeletonTags}>
                    {[1, 1, 1, 1, 1, 1, 1].map((item, index) => {
                      return (
                        <Skeleton
                          key={index}
                          width={Math.floor(Math.random() * 100) + 10}
                          className={style.skeletonTag}
                        ></Skeleton>
                      );
                    })}
                  </div>
                  <div>
                    <h2>
                      <a href={`courses/`}>
                        <Skeleton></Skeleton>
                      </a>
                    </h2>
                    <p>
                      <Skeleton count={3}></Skeleton>
                    </p>
                  </div>

                  <div className={style.blogInfo}>
                    <div>
                      <PiStudentFill size={25} className={style.icon} />
                      <p>
                        <Skeleton width={30}></Skeleton>
                      </p>
                    </div>

                    <div>
                      <MdWorkHistory size={25} className={style.icon} />
                      <p>
                        <Skeleton width={30}></Skeleton>
                      </p>
                    </div>

                    <div>
                      <FaStar size={25} className={style.icon} />
                      <p>
                        <Skeleton width={30}></Skeleton>
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            }
          })}
        </Swiper>

        {trendingCourses?.length !== 0 ? (
          <PublicationPosts posts={trendingCourses} />
        ) : (
          <h1>Couldn&apos;t found any courses</h1>
        )}
      </div>
    </SkeletonTheme>
  );
}
