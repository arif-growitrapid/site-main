import React, { useState } from 'react';
import styles from './publication-posts.module.scss';
import { FaChevronDown } from 'react-icons/fa';
import BlogPostPreview from '../blog-post-preview/blog-post-preview';

const PublicationPosts = (props: {
  posts: any;
}) => {
  const { posts } = props;

  const [visiblePosts, setVisiblePosts] = useState(6); // Number of posts to display initially
  const postsPerPage = 6;

  const fetchMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + postsPerPage);
  };

  return (
    <>
      <div className={'flex flex-row flex-wrap items-start'}>
        <div className={styles.grid}>
          {posts.slice(0, visiblePosts).map((node: any, index: number) => (
            <BlogPostPreview key={index} post={node} />
          ))}
        </div>
        <div className={styles.loadMore}>
          <button onClick={fetchMore}>
            <span className={styles.text}>Load more</span>
            <FaChevronDown size={20} className={styles.icon} />
          </button>
        </div>
      </div>
    </>
  );
};

export default PublicationPosts;
