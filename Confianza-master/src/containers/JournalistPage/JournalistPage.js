import React, { Component } from 'react'
import Logo from '../../components/Logo/Logo'
import JournalistProfile from '../../components/JournalistProfile/JournalistProfile'
import Rating from '../../components/Rating/Rating'
import Reviews from '../../components/Reviews/Reviews'
import SearchBar from '../../components/SearchBar/SearchBar'
import Navbar from '../../components/Navbar/Navbar'
import styles from './JournalistPage.module.css'
import Modal from '../../components/Modal/Modal'
import NewReview from '../../components/NewReview/NewReview'
import LoginModal from '../../components/LoginModal/LoginModal'
import Login from '../../components/Login/Login'
import Signup from '../../components/Signup/Signup'
import StarRatingComponent from 'react-star-rating-component';
import axios from '../../axios-orders'
import * as firebase from 'firebase'

class JournalistPage extends Component {
    constructor(props) {
        super(props)
        this.state = {

            // arraylist of existing reviews
            reviews: [],

            // object for posting a new review
            newReview: {
                comment: "",
                headline: "",
                rating: 0,
                likes: 0,
                dislikes: 0,
                liked: false,
                disliked: false,
                flags: 0
            },

            starHover: true,

            //indicates whether a new review is in the process of being written
            writingReview: false,

            averageRating: 0,

            // name searched in input field
            journalistName: this.props.journalistName,

            // name actually displayed on the page
            nameDisplay: this.props.journalistName,

            link: "",

            failedNameSearch: "",

            showError: false,

            loggingin: false,
            signingin: false

        }

        var config = {
            apiKey: "AIzaSyAGW8NaKRt9ErLX7Lbz-kRokhF1MYbsqIo",
            authDomain: "confianza-f74d4.firebaseapp.com",
            databaseURL: "https://confianza-f74d4.firebaseio.com",
            projectId: "confianza-f74d4",
            storageBucket: "confianza-f74d4.appspot.com",
            messagingSenderId: "248203315515"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }


    }

    closeModalHandler = () => {
        this.setState({ loggingin: false })
        this.setState({ signingin: false })
    }

    loggingInHandler = () => {
        this.setState({ loggingin: true })
    }

    signingInHandler = () => {
        this.setState({ signingin: true })
    }

    onStarClick(nextValue, prevValue, name) {
        //this.setState({ rating: nextValue, starHover: false });

        this.setState({
            newReview: {
                ...this.state.newReview,
                rating: nextValue
            },
            starHover: false
        })
    }

    onStarHover(nextValue, prevValue, name) {
        if (this.state.starHover == true) {
            //this.setState({ rating: nextValue });
            this.setState({
                newReview: {
                    ...this.state.newReview,
                    rating: nextValue
                },
            })
        }
    }

    onStarHoverOut(nextValue, prevValue, name) {
        if (this.state.starHover == true) {
            //this.setState({ rating: 0 });
            this.setState({
                newReview: {
                    ...this.state.newReview,
                    rating: 0
                },
            })
        }
    }

    // new review is being written
    writeReviewHandler = () => {
        this.setState({ writingReview: true })
    }

    // close the new review popup
    closeReviewHandler = () => {
        this.setState({ writingReview: false })

        //clear the headline and comment fields for the new review
        this.setState({
            newReview: {
                ...this.state.newReview,
                comment: "",
                headline: "",
                rating: 0
            },
            starHover: true
        })

        /*let r = Object.assign({}, this.state.newReview);    //creating copy of object
        r.comment = "";
        r.headline = "";
        this.setState({ newReview: r })*/
    }

    // set the value of the new comment to comment input field
    setCommentHandler = (event) => {
        this.setState({
            newReview: {
                ...this.state.newReview,
                comment: event.target.value,
            }
        })

        /*let r = Object.assign({}, this.state.newReview);    //creating copy of object
        r.comment = event.target.value;                        //updating value
        this.setState({ newReview: r });*/
    }

    // set the value of the new headline to headline input field
    setHeadlineHandler = (event) => {
        this.setState({
            newReview: {
                ...this.state.newReview,
                headline: event.target.value,
            }
        })

        /*let r = Object.assign({}, this.state.newReview);    //creating copy of object
        r.headline = event.target.value;                        //updating value
        this.setState({ newReview: r });*/
    }

    // set the value of the journalist searched to value in the searchbar input field
    setNameHandler = (event) => {
        this.setState({
            journalistName: event.target.value
        })
    }


    // increments number of flags for a review in the database
    flagComment = (reviewIndex) => {
        let reviews = [...this.state.reviews];
        reviews[reviewIndex].flags++;
        firebase.database().ref(this.state.nameDisplay.toLowerCase()).update({ reviews: this.state.reviews })
        alert("Comment Flagged!");
    }

    // increment the number of likes for a review in the database
    updateLikes = (reviewIndex) => {

        let reviews = [...this.state.reviews];

        // if post was already disliked, decrement dislike and increment like
        if (reviews[reviewIndex].disliked == true) {
            reviews[reviewIndex].disliked = false;
            reviews[reviewIndex].dislikes = 0;

            reviews[reviewIndex].likes = 1;
            reviews[reviewIndex].liked = true;
        }

        // if post was already liked, decrement like
        else if (reviews[reviewIndex].liked == true) {
            reviews[reviewIndex].liked = false;
            reviews[reviewIndex].likes = 0;
        }

        // otherwise increment number of likes
        else {
            reviews[reviewIndex].likes = 1;
            reviews[reviewIndex].liked = true;
        }

        // Set the state instead of waiting for it to do it in "updateJournalist()" in searchbar clicked
        this.setState({ reviews: reviews });

        // update the reviews in the database
        firebase.database().ref(this.state.nameDisplay.toLowerCase()).update({ reviews: this.state.reviews })

    }

    // increment the number of likes for a review in the database
    updateDislikes = async (reviewIndex) => {

        let reviews = [...this.state.reviews];

        // if post was already liked, decrement like and increment dislike
        if (reviews[reviewIndex].liked == true) {
            reviews[reviewIndex].liked = false;
            reviews[reviewIndex].likes = 0;

            reviews[reviewIndex].dislikes = 1;
            reviews[reviewIndex].disliked = true;
        }

        // if post was already disliked, decrement dislike
        else if (reviews[reviewIndex].disliked == true) {
            reviews[reviewIndex].disliked = false;
            reviews[reviewIndex].dislikes = 0;
        }


        // otherwise increment the number of dislikes
        else {
            reviews[reviewIndex].dislikes = 1;
            reviews[reviewIndex].disliked = true;
        }

        // Set the state instead of waiting for it to do it in "updateJournalist()" in searchbar clicked
        this.setState({ reviews: reviews });

        // update the reviews in the database
        firebase.database().ref(this.state.nameDisplay.toLowerCase()).update({ reviews: this.state.reviews })


    }

    // posts new review to database and updates view
    submitReviewHandler = async () => {

        // create a new review object
        const review = {
            rating: this.state.newReview.rating,
            headline: this.state.newReview.headline,
            comment: this.state.newReview.comment,
            likes: this.state.newReview.likes,
            dislikes: this.state.newReview.dislikes,
            liked: this.state.newReview.liked,
            disliked: this.state.newReview.disliked,
            flags: this.state.newReview.flags
        }

        // fields cannot be empty
        if (review.rating != 0 && review.headline != "" && review.comment != "") {

            // post new review to database
            await axios.post(this.state.nameDisplay.toLowerCase() + '/reviews.json', review)
                .then(response => console.log(response))
                .catch(error => console.log(error));

            // get data from database to update view
            await axios.get('https://confianza-f74d4.firebaseio.com/' + this.state.nameDisplay.toLowerCase() + '/reviews.json')
                .then(response => {
                    this.setState({ reviews: Object.values(response.data) });
                    this.calculateAverageRating();
                })

            // update the reviews to the one in state, so the keys are just the indices
            firebase.database().ref(this.state.nameDisplay.toLowerCase()).update({ reviews: this.state.reviews })

            // close the modal
            this.closeReviewHandler();
        }


    }

    // get all ratings and find the average
    calculateAverageRating = () => {
        let sum = 0;
        let counter = 0;

        let ratings = this.state.reviews.map(review => review.rating);
        for (var i = 0; i < ratings.length; i++) {
            sum += ratings[i];
            counter++
        }

        let average = sum / counter;

        this.setState({ averageRating: average });
    }

    // retrieves arraylist of reviews from database as soon as component mounts
    componentDidMount = async () => {

        let profilePicLink;
        let exists;

        // only get data if journalist exists in database
        await axios.get('https://confianza-f74d4.firebaseio.com/' + this.state.journalistName.toLowerCase() + '/exists.json')
            .then(response => {
                exists = response.data;
            })

        await axios.get('https://confianza-f74d4.firebaseio.com/' + this.props.journalistName.toLowerCase() + '/link.json')
            .then(response => {
                if (exists == true) {
                    profilePicLink = response.data;
                }
            })

        // journalist name is initially input in homepage searchbar
        axios.get('https://confianza-f74d4.firebaseio.com/' + this.props.journalistName.toLowerCase() + '/reviews.json')
            .then(response => {
                // journalist exists and data is not null
                if (response.data != null) {
                    this.setState({ reviews: Object.values(response.data), showError: false, link: profilePicLink })
                    this.calculateAverageRating();
                }
                else {
                    // journalist exists and data is null
                    if (exists == true) {
                        this.setState({ link: profilePicLink, showError: false, averageRating: 0 })
                    }

                    // journalist does not exist, show an error
                    else {
                        this.setState({ showError: true })
                    }

                }
            })

    }


    // change the journalist displayed
    updateJournalist = async () => {
        let exists;
        let profilePicLink;

        // only get data if journalist exists in database
        await axios.get('https://confianza-f74d4.firebaseio.com/' + this.state.journalistName.toLowerCase() + '/exists.json')
            .then(response => {
                exists = response.data;
            })

        await axios.get('https://confianza-f74d4.firebaseio.com/' + this.state.journalistName.toLowerCase() + '/link.json')
            .then(response => {
                if (exists == true) {
                    profilePicLink = response.data;
                }
            })

        // journalist name is whatever the input of journalist searchbar is
        axios.get('https://confianza-f74d4.firebaseio.com/' + this.state.journalistName.toLowerCase() + '/reviews.json')
            .then(response => {
                if (response.data != null && exists == true) {
                    this.setState({ reviews: Object.values(response.data), nameDisplay: this.state.journalistName, link: profilePicLink, showError: false })
                    this.calculateAverageRating();
                }
                else {

                    if (exists == true) {
                        this.setState({ reviews: null, nameDisplay: this.state.journalistName, link: profilePicLink, showError: false, averageRating: 0 })
                    }



                    else {
                        //check if input is null, in that case do nothing
                        if (this.state.journalistName == "") {
                            this.setState({ showError: false })

                        }
                        //otherwise, show the attempted search failed error
                        else {
                            this.setState({ showError: true, failedNameSearch: this.state.journalistName })
                        }

                    }
                }
            })
    }
    //}

    render() {

        /*const { reviews } = this.state
    console.log(reviews)*/

        let loginOrSignup = null
        if (this.state.loggingin == true) {
            loginOrSignup = <Login />
        }
        if (this.state.signingin == true) {
            loginOrSignup = <Signup />
        }

        return (
            <div className={styles['container']}>
                <div className={styles['content']}>
                <LoginModal
                    show={this.state.loggingin || this.state.signingin}
                    modalClosed={this.closeModalHandler}>
                    {loginOrSignup}
                </LoginModal>
                    <Modal
                        show={this.state.writingReview}
                        modalClosed={this.closeReviewHandler}>
                        <NewReview
                            closeReview={this.closeReviewHandler}
                            reviewSubmitted={this.submitReviewHandler}
                            headlineChange={(event) => this.setHeadlineHandler(event)}
                            headlineValue={this.state.newReview.headline}
                            commentChange={(event) => this.setCommentHandler(event)}
                            commentValue={this.state.newReview.comment}>
                            <StarRatingComponent
                                className={styles['star']}
                                name="rate"
                                starCount={5}
                                value={this.state.newReview.rating}
                                onStarClick={this.onStarClick.bind(this)}
                                onStarHover={this.onStarHover.bind(this)}
                                onStarHoverOut={this.onStarHoverOut.bind(this)}
                                emptyStarColor={"#808080"}
                                renderStarIcon={() => <span>⭑</span>}
                            />

                        </NewReview>
                    </Modal>
                    <SearchBar
            nameSearchBarValue={this.nameSearchBarValue}
            nameSearchBarChange={this.nameSearchBarChange}
            searchBarClicked={this.searchBarClicked}
        />
                    <Navbar
                        home={this.props.home}
                        nameSearchBarValue={this.state.journalistName}
                        nameSearchBarChange={(event) => this.setNameHandler(event)}
                        searchBarClicked={this.updateJournalist}
                        login = {this.loggingInHandler}
                        signup = {this.signingInHandler}
                    >
                    </Navbar>
        
                    <div className={styles['results-not-found']}>
                        {this.state.showError ? "No results found for: " + this.state.failedNameSearch : null}
                    </div>

                    <JournalistProfile
                        name={this.state.nameDisplay}
                        link={this.state.link} />

                    <Rating rating={this.state.averageRating} />

                    <Reviews
                        reviews={this.state.reviews}
                        thumbsUpClick={this.updateLikes}
                        thumbsDownClick={this.updateDislikes}
                        flagComment={this.flagComment} />

                    <button
                        className={styles['write-new-review-button']}
                        onClick={this.writeReviewHandler}>
                        WRITE REVIEW
                </button>

                    {/*
                    reviews.map(review => <div>{review.comment}</div>)
                }*/}
                </div>

                <span className={styles['footer']}>
                    <span className={styles['footer-links']}>
                        <button className={styles['about-link']} onClick={this.props.about}>About</button>
                        <button className={styles['contact-us-link']} onClick = {this.props.contact}>Contact Us</button>
                    </span>


                </span>


            </div>
        );
    }
}

export default JournalistPage;