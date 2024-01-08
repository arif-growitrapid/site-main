import React, { useRef } from 'react'
import styles from "./style.module.scss"
import { FaWindowClose } from "react-icons/fa";
import Image from 'next/image';
import Me from '../../../../../../assets/me.png';

export default function Comments({userProfile, userName}: {userProfile: string, userName:string}) {
  const commentsContainer = useRef<HTMLDivElement>(null);
  const commentInput = useRef<HTMLTextAreaElement>(null);

  function closeCommentsSection() {
    if (commentsContainer.current) {
      const parentNode = commentsContainer.current.parentNode as HTMLElement; // Explicit cast to HTMLElement
      if (parentNode) {
        parentNode.style.opacity = '0';
        parentNode.style.pointerEvents = 'none';
      }
      if (commentsContainer.current.style) {
        commentsContainer.current.style.transform = 'scale(0)';
      }
    }
  }
  

  // async function comment() {
  //   const content = commentInput.current.value

  //   if(content) {
  //     alert(content)
  //   }
  // }

  return (
    <div ref={commentsContainer} className={styles.commentsContainer}>
      <nav>
        <h2>Comments Section</h2>
        <FaWindowClose className={styles.icon} size={30} onClick={() => closeCommentsSection()} />
      </nav>

      <div className={styles.comments}>
        <div className={styles.commentBox}>
          {userProfile? <Image src={userProfile} width={100} height={100} alt='user'/>: <Image width={100} height={100} alt={"PROFILE PIC"} src={Me.src}/>}
          <textarea ref={commentInput} placeholder={`Write A Thoughtfull Comment ${userName?userName:"User"}`}>
            
          </textarea>
          <button>Comment</button>
          {/* <button onClick={comment}>Comment</button> */}
        </div>
      </div>
    </div>
  )
}
