import React, { useRef } from "react";
import style from "../page.module.scss";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { formatNumbers } from "@/utils/formatter";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { BiHeart, BiSave } from "react-icons/bi";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";

interface BlogCardProps {
  blogs: Array<{
    thumbnail: string;
    author: {
      image: string;
      name: string;
      email: string;
    };
    title: string;
    excerpt: string;
    slug: string;
    tags: [];
    views: number;
    saves: number;
    comments: [];
    likes: number;
  }>;
  type: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ blogs, type }) => {
  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);

  if (type === "cards") {
    return (
      <>
        <div className={style.title}>
          <div>
            <svg
              className={style.trending}
              width="50"
              viewBox="0 0 90 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M82.497 2.50001C83.1716 2.49863 83.8393 2.63515 84.4592 2.90116C85.6673 3.41514 86.6249 4.38376 87.125 5.59795L87.1361 5.62514L87.1467 5.65257L87.18 5.73924L87.1856 5.75378L87.191 5.76839C87.3952 6.31959 87.5 6.9105 87.5 7.50001V30C87.5 31.3261 86.9732 32.5978 86.0355 33.5355C85.0979 34.4732 83.8261 35 82.5 35C81.1739 35 79.9021 34.4732 78.9645 33.5355C78.0268 32.5978 77.5 31.3261 77.5 30V19.5722L52.506 40.4266C52.5042 40.4267 52.5025 40.4267 52.5007 40.4267C51.1867 40.4309 49.8848 40.1743 48.6706 39.6718C47.4559 39.1691 46.3531 38.4303 45.4261 37.4983C45.4252 37.4974 45.4243 37.4965 45.4235 37.4956L35.0011 27.0733L35 27.0734L34.9988 27.0734L11.0424 51.0264C11.0408 51.028 11.0392 51.0297 11.0375 51.0313C10.574 51.4977 10.0227 51.8677 9.41543 52.1197C8.80832 52.3718 8.15731 52.501 7.5 52.5C6.84269 52.501 6.19168 52.3718 5.58457 52.1197C4.97843 51.8681 4.42805 51.4991 3.96511 51.034C3.0194 50.0914 2.5 48.824 2.5 47.5C2.5 46.1744 3.02063 44.9056 3.96849 43.9626C3.9696 43.9615 3.97071 43.9604 3.97182 43.9593L27.9289 20.0022C29.8169 18.1142 32.3371 17.0767 35.0033 17.0767C37.6715 17.0767 40.1912 18.119 42.0744 20.0022L52.5011 30.4289L52.5033 30.4311L52.5055 30.4289L52.5056 30.4289L63.6039 19.3306L70.4345 12.5M82.497 2.50001H82.5V5.00001L82.4927 2.50002C82.4942 2.50002 82.4956 2.50001 82.497 2.50001ZM82.497 2.50001H60C58.6739 2.50001 57.4021 3.02679 56.4645 3.96448C55.5268 4.90215 55 6.17392 55 7.50001C55 8.8261 55.5268 10.0979 56.4645 11.0355C57.4021 11.9732 58.6739 12.5 60 12.5H70.4345M70.4345 12.5H73.97L72.9345 10L70.4345 12.5ZM34.9952 27.0674L34.9953 27.0675C34.9953 27.0675 34.9952 27.0674 34.9952 27.0674Z"
                fill="white"
                stroke="black"
                stroke-width="5"
              />
            </svg>
            <h1 className="flex items-end text-3xl text-center md:text-left leading-tight font-black text-[var(--dark-text-color)] md:text-current">
              Popular Blogs:-
            </h1>
          </div>

          <div className={style.navigation}>
            <div ref={navigationPrevRef}>
              <AiFillCaretLeft className={style.prevBtn} />
            </div>
            <div ref={navigationNextRef}>
              <AiFillCaretRight className={style.nextBtn} />
            </div>
          </div>
        </div>
        <div className={style.popularBlogs}>
          {blogs?.map((card, index) => (
            <SwiperSlide key={index} className={style.swiperSlider}>
              <div
                style={{
                  backgroundImage: `url(${card.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className={`${style.thumbContainer}`}
              ></div>
              <div>
                <h2>
                  <a href="#">{card.title}</a>
                </h2>
                <p>
                  New Blog Description in today&apos;s dynamic job market, where
                  first impressions matter more than ever, your professional
                  online presence can be just as vital as your traditional
                  resume. Enter LinkedIn, the social network for professionals.
                </p>
              </div>

              <div className={style.blogInfo}>
                <div>
                  <BiHeart size={25} className={style.icon} />
                  <p>{formatNumbers(4254950)}</p>
                </div>

                <div>
                  <BiSave size={25} className={style.icon} />
                  <p>{formatNumbers(96485214525)}</p>
                </div>

                <div>
                  <MdOutlineRemoveRedEye size={25} className={style.icon} />
                  <p>{formatNumbers(86248562)}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </>
    );
  } else if (type === "carousel") {
    return (
      <SkeletonTheme
        baseColor="var(--bg-color)"
        highlightColor="var(--tertiary-color)"
      >
        <div className={style.title}>
          <div>
            <svg
              className={style.trending}
              width="50"
              viewBox="0 0 90 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M82.497 2.50001C83.1716 2.49863 83.8393 2.63515 84.4592 2.90116C85.6673 3.41514 86.6249 4.38376 87.125 5.59795L87.1361 5.62514L87.1467 5.65257L87.18 5.73924L87.1856 5.75378L87.191 5.76839C87.3952 6.31959 87.5 6.9105 87.5 7.50001V30C87.5 31.3261 86.9732 32.5978 86.0355 33.5355C85.0979 34.4732 83.8261 35 82.5 35C81.1739 35 79.9021 34.4732 78.9645 33.5355C78.0268 32.5978 77.5 31.3261 77.5 30V19.5722L52.506 40.4266C52.5042 40.4267 52.5025 40.4267 52.5007 40.4267C51.1867 40.4309 49.8848 40.1743 48.6706 39.6718C47.4559 39.1691 46.3531 38.4303 45.4261 37.4983C45.4252 37.4974 45.4243 37.4965 45.4235 37.4956L35.0011 27.0733L35 27.0734L34.9988 27.0734L11.0424 51.0264C11.0408 51.028 11.0392 51.0297 11.0375 51.0313C10.574 51.4977 10.0227 51.8677 9.41543 52.1197C8.80832 52.3718 8.15731 52.501 7.5 52.5C6.84269 52.501 6.19168 52.3718 5.58457 52.1197C4.97843 51.8681 4.42805 51.4991 3.96511 51.034C3.0194 50.0914 2.5 48.824 2.5 47.5C2.5 46.1744 3.02063 44.9056 3.96849 43.9626C3.9696 43.9615 3.97071 43.9604 3.97182 43.9593L27.9289 20.0022C29.8169 18.1142 32.3371 17.0767 35.0033 17.0767C37.6715 17.0767 40.1912 18.119 42.0744 20.0022L52.5011 30.4289L52.5033 30.4311L52.5055 30.4289L52.5056 30.4289L63.6039 19.3306L70.4345 12.5M82.497 2.50001H82.5V5.00001L82.4927 2.50002C82.4942 2.50002 82.4956 2.50001 82.497 2.50001ZM82.497 2.50001H60C58.6739 2.50001 57.4021 3.02679 56.4645 3.96448C55.5268 4.90215 55 6.17392 55 7.50001C55 8.8261 55.5268 10.0979 56.4645 11.0355C57.4021 11.9732 58.6739 12.5 60 12.5H70.4345M70.4345 12.5H73.97L72.9345 10L70.4345 12.5ZM34.9952 27.0674L34.9953 27.0675C34.9953 27.0675 34.9952 27.0674 34.9952 27.0674Z"
                fill="white"
                stroke="black"
                stroke-width="5"
              />
            </svg>
            <h1 className="flex items-end text-3xl text-center md:text-left leading-tight font-black text-[var(--dark-text-color)] md:text-current">
              Trending Blogs:-
            </h1>
          </div>

          <div className={style.navigation}>
            <div ref={navigationPrevRef}>
              <AiFillCaretLeft className={style.prevBtn} />
            </div>
            <div ref={navigationNextRef}>
              <AiFillCaretRight className={style.nextBtn} />
            </div>
          </div>
        </div>
        <Swiper
          spaceBetween={10}
          className={style.sliderContainer}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (swiper.params.navigation !== undefined) {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
              }
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          breakpoints={{
            500: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Navigation]}
        >
          {blogs.map((element, index) => (
            <SwiperSlide key={index} className={style.card}>
              {element ? (
                <Image
                  width={1080}
                  height={720}
                  src={element.thumbnail}
                  className={style.thumbnailCard}
                />
              ) : (
                <Skeleton className={style.thumbnailCard} />
              )}
              <p className={style.tags}>
                {element ? (
                  element?.tags.map((tag: string, index: number) => (
                    <span key={index} className={style.tag}>
                      {tag}
                    </span>
                  ))
                ) : (
                  <div className={style.loader}>
                    {[...Array(5)].map((element, index) => (
                      <span key={index} className={style.tag}>
                        <Skeleton
                          width={`${
                            Math.floor(Math.random() * (100 - 20 + 1)) + 20
                          }px`}
                          containerClassName={style.tag}
                        ></Skeleton>
                      </span>
                    ))}
                  </div>
                )}
              </p>

              <h2>{element?.title || <Skeleton count={2} />}</h2>
              <p className={style.desc}>
                {element?.excerpt || <Skeleton count={3} />}
              </p>
              {element ? (
                <Link
                  href={`/blogs/${element?.slug}`}
                  className={style["learn_more_btn"]}
                >
                  <div>
                    <span>Read Now</span>
                  </div>

                  <div>
                    <FaArrowRight className={`inline-block ml-2`} />
                  </div>
                </Link>
              ) : (
                <Skeleton containerClassName={style["learn_more_btn"]} />
              )}

              <div className={style.blogInfo}>
                <div>
                  <BiHeart size={25} className={style.icon} />
                  <p>{element ? formatNumbers(element.likes) : ""}</p>
                </div>

                {/* <div>
                  <BiCommentDetail size={25} className={style.icon} />
                  <p>{element ? formatNumbers(element.comments.length) : ""}</p>
                </div> */}

                <div>
                  <BiSave size={25} className={style.icon} />
                  <p>{element ? formatNumbers(element.saves) : ""}</p>
                </div>

                <div>
                  <MdOutlineRemoveRedEye size={25} className={style.icon} />
                  <p>{element ? formatNumbers(element.views) : ""}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </SkeletonTheme>
    );
  }
};

export default BlogCard;
