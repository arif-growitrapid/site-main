import React from 'react';
import Image from 'next/image';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import style from '../page.module.scss';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

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
  }>;
  type: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ blogs, type }) => {
  if (type === 'popular') {
    return (
      <SkeletonTheme baseColor='var(--bg-color)' highlightColor='var(--tertiary-color)'>
        {blogs?.map((element, index) => (
          <div key={index} className={`${style.horizontalCards}`}>
            {element ? (
              <Image width={1080} height={720} src={element.thumbnail} className={style.thumbnail} />
            ) : (
              <Skeleton height={'100%'} containerClassName={style.thumbnail} />
            )}

            <div className={style.content}>
              <div className={style.profileContainer}>
                {element ? (
                  <Image className={style.profilePic} width={100} height={100} src={element.author.image} alt='profile pic' />
                ) : (
                  <Skeleton width={50} height={50} circle={true} style={{ marginRight: '1em' }} containerClassName={style.profilePic} />
                )}

                <div className={style.profileInfo}>
                  <div className={style.authorName}>{element?.author.name || <Skeleton width={`${Math.floor(Math.random() * (100 - 20 + 1)) + 20}px`} />}</div>
                  <div className={style.subtext}>{element?.author.email || <Skeleton width={`${Math.floor(Math.random() * (100 - 20 + 1)) + 20}px`} />}</div>
                </div>
              </div>

              {element ? (
                <>
                  <h2>{element?.title}</h2>
                  <p className={style.desc}>{element?.excerpt}</p>
                </>
              ) : (
                <>
                  <Skeleton width={'100%'} height={'2em'} containerClassName={style.text} />
                  <Skeleton width={`${Math.floor(Math.random() * (100 - 20 + 1)) + 20}%`} height={'2em'} containerClassName={style.text} />
                  <Skeleton width={'100%'} height={'1em'} containerClassName={style.text} />
                  <Skeleton width={`${Math.floor(Math.random() * (100 - 20 + 1)) + 20}%`} height={'1em'} containerClassName={style.text} />
                </>
              )}

              {element ? (
                <Link href={`/blogs/${element?.slug}`} className={style['learn_more_btn']}>
                  <div>
                    <span>Read Now</span>
                  </div>
                  <div>
                    <FaArrowRight className={`inline-block ml-2`} />
                  </div>
                </Link>
              ) : (
                <Skeleton containerClassName={style['learn_more_btn']} />
              )}
            </div>
          </div>
        ))}
      </SkeletonTheme>
    );
  } else {
    return <h1>HELLO</h1>;
  }
};

export default BlogCard;