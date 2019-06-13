import React from 'react'
import searchIcon from '../../assets/images/search-icon.png'
import styles from './SearchBar.module.css'

const searchBar = (props) => {
    return (
        <div className={styles['search-bar']}>
            <input
                className={styles['search-txt']}
                type="text" name=""
                placeholder="Type a name"

                value = {props.nameSearchBarValue}
                onChange = {props.nameSearchBarChange}
                onKeyDown= {(event) => {if(event.keyCode==13){props.searchBarClicked()}}}
             />
            <a
                className={styles['search-btn']}
                onClick = {props.searchBarClicked}>
                <img className={styles['search-icon']} src={searchIcon} />
            </a>

        </div>
    );
}

export default searchBar