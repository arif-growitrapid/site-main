import style from "./blogPostPreview.module.scss";
import Image from "next/legacy/image";
import Link from "next/link";

import { formatNumbers } from "@/utils/formatter";
import { MdWorkHistory } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { DBCourseType } from "@/types/courses.type";

function BlogPostPreview(props: { post: DBCourseType<"coursera"> }) {
  const { post } = props;
  console.log(post);

  if (post) {
    return (
      <div key={post._id.toString()} className={style.swiperSlider}>
        <div
          style={{
            backgroundImage: `url('${post.data.thumbnail}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={`${style.thumbContainer}`}
        ></div>

        <div className={style.tags}>
          {post.data?.tags
            ? post.data?.tags.map((item: any, index: number) => {
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
            <Link href={`courses/${post._id}`}>{post.data?.title}</Link>
          </h2>
          <p className="line-clamp-3">{post.data?.outcomes}</p>
        </div>

        <div className={style.blogInfo}>
          <div>
            <PiStudentFill size={25} className={style.icon} />
            <p>
              {formatNumbers(
                parseInt(
                  (post.data?.total_enrolled_students || "").replace(/,/g, "")
                )
              )}
            </p>
          </div>

          <div>
            <MdWorkHistory size={25} className={style.icon} />
            <p>{post.data?.guarantee_percentage || "82%"}</p>
          </div>

          <div>
            <FaStar size={25} className={style.icon} />
            <p>{post.data?.rating}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.swiperSlider}>
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
      </div>
    );
  }
}

export default BlogPostPreview;
