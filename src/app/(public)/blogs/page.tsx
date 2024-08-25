"use client";
import React, { useEffect, useState } from "react";
import style from "./page.module.scss";
import { filterBlogs } from "@/functions/blog";
import Navbar from "@/components/navbar";
import { SwiperSlide, Swiper } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { PiStudentFill } from "react-icons/pi";
import { MdWorkHistory } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { formatNumbers } from "@/utils/formatter";
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import Head from "next/head";
import { WithId } from "mongodb";
import { DBBlogPostType } from "@/types/blog";

export default function Page() {
  const [trendingBlogs, setTrendingBlogs] = useState<WithId<DBBlogPostType>[]>(
    Array(10).fill(undefined)
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await filterBlogs("likes", 20, 0);
        if (response.status === 200 && response.data) {
          setTrendingBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    }

    fetchData();
  }, []);

  return (
    <SkeletonTheme baseColor="#10141F" highlightColor="#161b27">
      <div className={style.aboutUs}>
        <Navbar />
        <Head>
          <title>Blogs</title>
        </Head>
        <div className={style.eBooks}>
          <div className={style.left}>
            <h1>GROWITRAPID BLOGS</h1>
          </div>
          <div className={style.right}>
            <div className={style.blob1}></div>
          </div>
        </div>

        <Swiper
  modules={[FreeMode]}
  slidesPerView={"auto"}
  spaceBetween={10}
  className={style.swiper}
  freeMode={true}
  loop={false}
>

          {trendingBlogs.map((blog, index) => {
            if (blog) {
              return (
                <SwiperSlide key={index} className={style.swiperSlider}>
                  <div
                    style={{
                      backgroundImage: `url('${blog.thumbnail}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className={`${style.thumbContainer}`}
                  ></div>

                  <div className={style.tags}>
                    {blog.tags.map((tag, index) => (
                      <div key={index} className={style.tag}>
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div>
                    <h2>
                      <Link href={`blogs/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h2>
                    <p className="line-clamp-3">{blog.excerpt}</p>
                  </div>

                  <div className={style.blogInfo}>
                    <div>
                      <PiStudentFill size={25} className={style.icon} />
                      <p>{formatNumbers(blog.likes)}</p>
                    </div>

                    <div>
                      <MdWorkHistory size={25} className={style.icon} />
                      <p>{formatNumbers(blog.saves)}</p>
                    </div>

                    <div>
                      <FaStar size={25} className={style.icon} />
                      <p>{formatNumbers(blog.viewed_by.length)}</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            } else {
              return (
                <SwiperSlide key={index} className={style.swiperSlider}>
                  <Skeleton className={`${style.thumbContainer}`}></Skeleton>

                  <div className={style.skeletonTags}>
                    {[1, 1, 1, 1, 1, 1, 1].map((item, index) => (
                      <Skeleton
                        key={index}
                        width={Math.floor(Math.random() * 100) + 10}
                        className={style.skeletonTag}
                      ></Skeleton>
                    ))}
                  </div>
                  <div>
                    <h2>
                      <a href={`blogs/`}>
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
      </div>
    </SkeletonTheme>
  );
}