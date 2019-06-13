import React from 'react'
import zero from '../../assets/images/stars/0.png'
import one from '../../assets/images/stars/1.png'
import two from '../../assets/images/stars/2.png'
import three from '../../assets/images/stars/3.png'
import four from '../../assets/images/stars/4.png'
import five from '../../assets/images/stars/5.png'
import oneHalf from '../../assets/images/stars/1.5.png'
import twoHalf from '../../assets/images/stars/2.5.png'
import threeHalf from '../../assets/images/stars/3.5.png'
import fourHalf from '../../assets/images/stars/4.5.png'
import styles from './Rating.module.css'

const rating = (props) => {
    
    let starNumber;

    if(props.rating == 0){
        starNumber = zero;
    }

    if(props.rating >=1 && props.rating < 1.3){
        starNumber = one;
    }

    if(props.rating >=1.3 && props.rating < 1.8){
        starNumber = oneHalf;
    }

    if(props.rating >=1.8 && props.rating < 2.3){
        starNumber = two;
    }

    if(props.rating >=2.3 && props.rating < 2.8){
        starNumber = twoHalf;
    }

    if(props.rating >=2.8 && props.rating < 3.3){
        starNumber = three;
    }

    if(props.rating >=3.3 && props.rating < 3.8){
        starNumber = threeHalf;
    }

    if(props.rating >=3.8 && props.rating < 4.3){
        starNumber = four;
    }

    if(props.rating >=4.3 && props.rating < 4.8){
        starNumber = fourHalf;
    }

    if(props.rating >=4.8 && props.rating < 5){
        starNumber = five;
    }

    
    return (
        <div>
            <img src = {starNumber} className = {styles['stars']}/>
        </div>
    );
}

export default rating;