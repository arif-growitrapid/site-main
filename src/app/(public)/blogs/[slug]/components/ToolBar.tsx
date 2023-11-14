import React, { useRef, useState, useEffect } from 'react';
import style from './style.module.scss';
import { BiHeart, BiCommentDetail, BiSave, BiShareAlt } from 'react-icons/bi';
import { MdBugReport } from 'react-icons/md';
import { FcLike } from "react-icons/fc";
import { likeBlog as likeBlogApi } from '@/functions/blog'; // Assuming you have an API function for liking a blog post
import { useSession } from 'next-auth/react';

interface ToolBarProps {
  blogId: string;
  likes: number;
  likedBy: { id: string }[];
}

export default function ToolBar({ blogId, likes, likedBy }: ToolBarProps) {
  const likeText = useRef<HTMLParagraphElement>(null);
  const likeBtn = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const [likedTheBlog, setLikedTheBlog] = useState(false);

  useEffect(() => {
    // Check if the current user is in the likedBy array
    if (status === "authenticated" && likedBy.find(user => user.id === session?.user?.id)) {
      setLikedTheBlog(true);
    }
  }, [status, likedBy, session]);

  async function likeBlog() {
    try {
      if (status === "authenticated") {
        if (!likedTheBlog) {
          // Make an API call to like the blog post
          if (likeText.current) {
            likeText.current.innerText = String(Number(likeText.current.innerText) + 1);
          }
          setLikedTheBlog(true);

          const res = await likeBlogApi(blogId);
          console.log(res);

          if (res.type === "error") {
            if (likeText.current) {
              likeText.current.innerText = String(Number(likeText.current.innerText) - 1);
            }
            setLikedTheBlog(false);
            alert("You Already Liked The Blog");
          }
        } else {
          // Make an API call to unlike the blog post
          // await unlikeBlogApi(blogId); // Uncomment this line if you have an API function for unliking
          if (likeText.current) {
            likeText.current.innerText = String(Number(likeText.current.innerText) - 1);
          }
          setLikedTheBlog(false);
        }
      } else {
        alert("Please Sign In To Like The Blog");
      }
    } catch (error) {
      console.error('Error liking/unliking blog:', error);
    }
  }

  return (
    <div className={style.toolBar}>
      <div>
        {likedTheBlog ? (
          <FcLike
            ref={likeBtn}
            onClick={likeBlog}
            size={25}
            className={style.icon}
          />
        ) : (
          <BiHeart
            onClick={likeBlog}
            size={25}
            className={style.icon}
          />
        )}

        <p ref={likeText}>{likes}</p>
      </div>

      <div>
        <BiCommentDetail size={25} className={style.icon} />
      </div>

      <div>
        <BiSave size={25} className={style.icon} />
      </div>

      <div>
        <BiShareAlt size={25} className={style.icon} />
      </div>

      <div>
        <MdBugReport size={25} className={style.icon} />
      </div>
    </div>
  );
}
