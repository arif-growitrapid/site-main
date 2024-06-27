/* eslint-disable */
"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "./page.module.scss";
import { filterBlogs, searchForBlog } from "@/functions/blog";

import Navbar from "@/components/navbar";
import { SwiperSlide, Swiper } from "swiper/react";
import { BiSave, BiHeart } from "react-icons/bi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { formatNumbers } from "@/utils/formatter";
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { WithId } from "mongodb";
import { DBBlogPostType } from "@/types/blog";

type Props = {};
export default function Page({}: Props) {
  const [trendingBlogs, setTrendingBlogs] = useState<WithId<DBBlogPostType>[]>(
    Array(10).fill(undefined)
  );
  const [searchedBlogs, setsearchedBlogs] = useState<WithId<DBBlogPostType>[]>(
    Array(20).fill(undefined)
  );
  const searchBox = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const trendingResponse = await filterBlogs("likes", 20, 0);
        const popularResponse = await filterBlogs("views", 20, 0);

        if (trendingResponse.status === 200 && popularResponse.status === 200) {
          if (trendingResponse.data)
            setTrendingBlogs(trendingResponse.data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    }

    fetchData();
  }, []);

  async function search() {
    if (searchBox.current && searchBox.current) {
      let query = searchBox.current.value;
      const response = await searchForBlog(query, 100, 0);
      if (response.data) setsearchedBlogs(response.data.blogs);
    }
  }

  return (
    <SkeletonTheme baseColor="#10141F" highlightColor="#161b27">
      <div className={style.aboutUs}>
        <Navbar></Navbar>
        <div className={style.eBooks}>
          <div className={style.left}>
            <h1>GROWITRAPID RESOURCES</h1>
            <div className={style.searchbar}>
              <input
                ref={searchBox}
                type="text"
                placeholder="Search For Blogs"
              />
              <button onClick={search}>
                <img src="https://www.jsmastery.pro/assets/resources/icons/magnifying-glass.svg"></img>
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
          {trendingBlogs.map((card, index) => {
            console.log(card);
            if (card) {
              return (
                <SwiperSlide key={index} className={style.swiperSlider}>
                  <div
                    style={{
                      backgroundImage: `url(${card.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className={`${style.thumbContainer}`}
                  ></div>

                  <div className={style.tags}>
                    {card?.tags.map((item: string, index: number) => {
                      return (
                        <div key={index} className={style.tag}>
                          {item}
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <h2>
                      <a href={`blogs/${card?.slug}`}>{card?.title}</a>
                    </h2>
                    <p className="line-clamp-4">{card?.excerpt}</p>
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
                      <a href={`#`}>
                        <Skeleton></Skeleton>
                      </a>
                    </h2>
                    <p>
                      <Skeleton count={3}></Skeleton>
                    </p>
                  </div>

                  <div className={style.blogInfo}>
                    <div>
                      <BiHeart size={25} className={style.icon} />
                      <p>
                        <Skeleton width={30}></Skeleton>
                      </p>
                    </div>

                    <div>
                      <BiSave size={25} className={style.icon} />
                      <p>
                        <Skeleton width={30}></Skeleton>
                      </p>
                    </div>

                    <div>
                      <MdOutlineRemoveRedEye size={25} className={style.icon} />
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
