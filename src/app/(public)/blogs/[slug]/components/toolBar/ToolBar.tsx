import React, { useRef, useState, useEffect } from 'react';
import style from './style.module.scss';
import { BiHeart, BiCommentDetail, BiSave, BiShareAlt } from 'react-icons/bi';
import { MdBugReport } from 'react-icons/md';
import { FcLike } from "react-icons/fc";
import { likeBlog as likeBlogApi, removeLikeBlog as unLikeBlogApi } from '@/functions/blog'; // Assuming you have an API function for liking a blog post
import { useSession } from 'next-auth/react';
import Comments from '../comments/Comments';

interface ToolBarProps {
  blogId: string;
  likes: number;
  likedBy: { id: string }[];
}

export default function ToolBar({ blogId, likes, likedBy }: ToolBarProps) {
  const likeText = useRef<HTMLParagraphElement>(null);
  const likeBtn = useRef<HTMLDivElement>(null);
  const commentBox = useRef<HTMLDivElement>(null)

  const { data: session, status } = useSession();

  const [likedTheBlog, setLikedTheBlog] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && likedBy.find(user => user.id === session?.user?.id)) {
      setLikedTheBlog(true);
    }
  }, [status, likedBy, session]);

  async function likeBlog() {
    try {
      if (status === "authenticated") {
        if (!likedTheBlog) {
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
          if (likeText.current) {
            likeText.current.innerText = String(Number(likeText.current.innerText) - 1);
          }
          setLikedTheBlog(false);
          await unLikeBlogApi(blogId);
        }
      } else {
        alert("Please Sign In To Like The Blog");
      }
    } catch (error) {
      console.error('Error liking/unliking blog:', error);
    }
  }

  async function openCommentBox() {
    commentBox.current.style.scale = "1"
  }

  return (
    <>
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
          <BiCommentDetail onClick={openCommentBox} size={25} className={style.icon} />
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
      
      <div ref={commentBox} className={style.commentContainerOverlay}>
        <Comments userProfile={session?.user.image} userName={session?.user.name} />
      </div>
    </>
  );
}
