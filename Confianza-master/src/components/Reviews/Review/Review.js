import React from 'react'
import thumbsDown from '../../../assets/images/thumbs-down.png'
import thumbsUp from '../../../assets/images/thumbs-up.png'
import ReactAux from '../../../hoc/ReactAux/ReactAux'
import one from '../../../assets/images/stars/1.png'
import two from '../../../assets/images/stars/2.png'
import three from '../../../assets/images/stars/3.png'
import four from '../../../assets/images/stars/4.png'
import five from '../../../assets/images/stars/5.png'
import styles from './Review.module.css'
import flag from '../../../assets/images/flag.png'

const review = (props) => {

    let starNumber;

    if(props.rating == 1){
        starNumber = one;
    }

    if(props.rating == 2){
        starNumber = two;
    }

    if(props.rating == 3){
        starNumber = three;
    }

    if(props.rating == 4){
        starNumber = four;
    }

    if(props.rating == 5){
        starNumber = five;
    }

    return (
        <div className={styles['review-card']}>
        <span className = {styles['background']}></span>
            <img src = {starNumber} className={styles["stars"]} />
            <span className={styles['headline']}>{props.headline}</span>

            <p className={styles['comment']}>
                {props.comment}
        </p>
            <span className={styles['comment-likes-number']}>{props.likes}</span>
            <img className={styles['comment-likes-button']} src={thumbsUp} onClick = {props.thumbsUpClick}/>
            <span className={styles['comment-dislikes-number']}>{props.dislikes}</span>
            <img className={styles['comment-dislikes-button']} src={thumbsDown} onClick = {props.thumbsDownClick} />
            <img className = {styles['flag']} src = {flag} onClick={props.flagComment} />
        </div>);
}

export default review;