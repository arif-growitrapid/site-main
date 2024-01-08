/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import style from './style.module.scss';
import { BiHeart, BiSave, BiCommentDetail, BiShareAlt } from 'react-icons/bi';
import { MdBugReport } from 'react-icons/md';
import { FcLike } from 'react-icons/fc';
import { IoIosSave } from 'react-icons/io';
import { likeBlog as likeBlogApi, removeLikeBlog as unLikeBlogApi, saveBlog, unsaveBlog } from '@/functions/blog';
import { useSession } from 'next-auth/react';
import Comments from '../comments/Comments';
import { formatNumbers, parseNumbers } from '@/utils/formatter';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaBook } from "react-icons/fa6";
import { ObjectId } from 'mongodb';

interface ToolBarProps {
  blogId: ObjectId;
  likes: number;
  likedBy: { id: string }[];
  saves: number;
  savedBy: {id: string}[];
  views: number;
  readingTime: number
}

export default function ToolBar({ blogId, likes, likedBy, saves, savedBy, views, readingTime }: ToolBarProps) {
  const likeText = useRef<HTMLParagraphElement>(null);
  const likeBtn = useRef<HTMLDivElement>(null);
  const commentBox = useRef<HTMLDivElement>(null);

  const { data: session, status } = useSession();
  const [likedTheBlog, setLikedTheBlog] = useState(false);
  const [savedTheBlog, setSavedTheBlog] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      setLikedTheBlog(likedBy.some((user) => user.id === session?.user?.id));
      setSavedTheBlog(savedBy.some((user) => user.id === session?.user?.id))
    }
  }, [status, likedBy, session]);

  async function toggleLikeBlog() {
    try {
      if (status !== 'authenticated') {
        alert('Please Sign In To Like The Blog');
        return;
      }
  
      if (likedTheBlog) {
        // Unlike the blog
        if (likeText.current) {
          likeText.current.innerText = formatNumbers(Number(parseNumbers(likeText.current.innerText)) - 1);
          console.log(likeText.current.innerText, parseNumbers(likeText.current.innerText), Number(parseNumbers(likeText.current.innerText)) - 1, formatNumbers(Number(parseNumbers(likeText.current.innerText)) + 1))

        }
        setLikedTheBlog(false);
        await unLikeBlogApi(String(blogId));
      } else {
        // Like the blog
        if (likeText.current) {
          likeText.current.innerText = formatNumbers(Number(parseNumbers(likeText.current.innerText)) + 1);
          console.log(likeText.current.innerText, parseNumbers(likeText.current.innerText), Number(parseNumbers(likeText.current.innerText)) + 1, formatNumbers(Number(parseNumbers(likeText.current.innerText)) + 1))
        }
        setLikedTheBlog(true);
  
        const res = await likeBlogApi(String(blogId));
        console.log(res);
  
        if (res.type === 'error') {
          if (likeText.current) {
            likeText.current.innerText = String(Number(parseNumbers(likeText.current.innerText)) - 1);
          }
          setLikedTheBlog(false);
          alert('You Already Liked The Blog');
        }
      }
    } catch (error) {
      console.error('Error liking/unliking blog:', error);
    }
  }
  

  async function openCommentBox() {
    if (commentBox.current && commentBox.current.firstChild) {
      commentBox.current.style.opacity = '1';
      commentBox.current.style.pointerEvents = 'all';
  
      const firstChild = commentBox.current.firstChild as HTMLElement;
      firstChild.style.transform = 'scale(1)';
    }
  }

  async function toggleSaveBlog() {
    try {
      if (status === 'authenticated') {
        if (!savedTheBlog) {
          setSavedTheBlog(true); // Update UI immediately

          const res = await saveBlog(String(blogId));
          console.log(res);

          if (res.type !== 'success') {
            setSavedTheBlog(false); // Revert UI if API request fails
            alert(res.message);
          } 
        } else {
          setSavedTheBlog(false); // Update UI immediately for unsaving
          const res = await unsaveBlog(String(blogId));
          console.log(res);

          if (res.type !== 'success') {
            setSavedTheBlog(true);
            alert(res.message);
          }
        }
      } else {
        alert('Please Sign In To Save/Unsave The Blog');
      }
    } catch (error) {
      console.error('Error saving/unsaving blog:', error);
      setSavedTheBlog(!savedTheBlog); // Revert UI if there's an error
    }
  }


  return (
    <>
      <div className={style.toolBar}>
        <div>
          {likedTheBlog ? (
            <FcLike ref={likeBtn} onClick={toggleLikeBlog} size={25} className={style.icon} />
          ) : (
            <BiHeart onClick={toggleLikeBlog} size={25} className={style.icon} />
          )}

          <p ref={likeText}>{formatNumbers(likes)}</p>
        </div>

        {/* <div>
          <BiCommentDetail onClick={openCommentBox} size={25} className={style.icon} />
        </div> */}

        <div>
          {savedTheBlog ? (
            <IoIosSave onClick={toggleSaveBlog} size={25} className={style.icon} />
          ) : (
            <BiSave onClick={toggleSaveBlog} size={25} className={style.icon} />
          )}
          <p ref={likeText}>{formatNumbers(saves)}</p>
        </div>

        <div>
          <MdOutlineRemoveRedEye size={25} className={style.icon} />
          <p ref={likeText}>{formatNumbers(views)}</p>
        </div>

        <div>
          <FaBook size={20} className={style.icon} />
          <p ref={likeText}>{readingTime} min</p>
        </div>
      </div>

      <div ref={commentBox} className={style.commentContainerOverlay}>
        <Comments userProfile={session?.user.image || ""} userName={session?.user.name || ""} />
      </div>
    </>
  );
}
