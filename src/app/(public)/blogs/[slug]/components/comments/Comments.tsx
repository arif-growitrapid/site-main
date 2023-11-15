import React, { useRef } from 'react'
import styles from "./style.module.scss"
import { FaWindowClose } from "react-icons/fa";
import Image from 'next/image';

export default function Comments({userProfile, userName}) {
  const commentsContainer = useRef(null)
  function closeCommentsSection() {
    commentsContainer.current.parentNode.style.opacity = "0"
    commentsContainer.current.parentNode.style.pointerEvents = "none"
    commentsContainer.current.style.scale = "0"
  }
  return (
    <div ref={commentsContainer} className={styles.commentsContainer}>
      <nav>
        <h2>Comments Section</h2>
        <FaWindowClose className={styles.icon} size={30} onClick={() => closeCommentsSection()} />
      </nav>

      <div className={styles.comments}>
        <div className={styles.commentBox}>
          <Image src={userProfile} width={100} height={100} alt='user'/>
          <textarea type='text' placeholder={`Write A Thoughtfull Comment ${userName}`}>
            
          </textarea>
          <button>Comment</button>
        </div>
      </div>
    </div>
  )
}
