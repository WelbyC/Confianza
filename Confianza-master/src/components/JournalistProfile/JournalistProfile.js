import React from 'react'
import profilePicture from '../../assets/images/profile-picture.png'
import styles from './JournalistProfile.module.css'

const JournalistProfile = (props) => {

    var names;
    var firstName;
    var lastName;
    names = props.name.split(" ");

    // for one word profiles such as 'CNN'
    if (names.length === 1) {
        firstName = names[0].toUpperCase();
        lastName = null;
    }

    // for two word journalists such as 'Anderson Cooper'
    else {
        firstName = names[0];

        firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

        lastName = names[1];

        lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    }

    return (
        <div>
            <img className={styles['picture']} src={props.link} />
            <h3 className={styles['name']}>{firstName} {lastName}</h3>
        </div>
    );
}

export default JournalistProfile;