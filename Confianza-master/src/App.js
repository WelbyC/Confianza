import React, { Component } from 'react';
import axios from './axios-orders'
import ReactAux from './hoc/ReactAux/ReactAux'
import JournalistPage from './containers/JournalistPage/JournalistPage'
import HomePage from './containers/HomePage/HomePage'
import AboutPage from './containers/AboutPage/AboutPage'
import ContactUsPage from './containers/ContactUsPage/ContactUsPage'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      homePage: true,
      journalistPage: false,
      aboutPage: false,
      contactUsPage: false,
      homePageNameSearched: "",
      journalistPageNameSearched: "",
      homePageFailedNameSearch: "",
      showHomePageSearchError: false
    }
  }

  // handler for switching from homepage to journalist page
  switchHometoJournalistHandler = async () => {

    let exists;

    // check if the name exists in the database
    await axios.get('https://confianza-f74d4.firebaseio.com/' + this.state.homePageNameSearched.toLowerCase() + '/exists.json')
      .then(response => {
        exists = response.data;
      })

    // if the journalist exists, set the homepage to false and journalist page to true
    if (exists == true) {
      this.setState({ homePage: false, journalistPage: true, contactUsPage: false, aboutPage: false })
    }

    // journalist does not exist
    else {
      //check if input is null, in that case do nothing
      if (this.state.homePageNameSearched == "") {
        this.setState({ showHomePageSearchError: false})
      }

      //otherwise, show the attempted search failed error
      else {
        this.setState({ showHomePageSearchError: true, homePageFailedNameSearch: this.state.homePageNameSearched })
      }
    }
  }

  // set the journalist name to whatever the input in the homepage search bar is
  setJournalistNameHandler = (event) => {
    this.setState({
      homePageNameSearched: event.target.value
    })
  }

  // goes back to the homepage, resets all of the states
  backToHomeHandler = () => {
    this.setState({
      homePage: true,
      journalistPage: false,
      aboutPage: false,
      contactUsPage: false,
      homePageNameSearched: "",
      journalistPageNameSearched: "",
      homePageFailedNameSearch: "",
      showHomePageSearchError: false
    })
  }

  switchToAboutPageHandler = () =>{
    this.setState({
      homePage: false,
      journalistPage: false,
      aboutPage: true,
      contactUsPage: false,
      homePageNameSearched: "",
      journalistPageNameSearched: "",
      homePageFailedNameSearch: "",
      showHomePageSearchError: false
    })
  }

  switchToContactUsPageHandler = () =>{
    this.setState({
      homePage: false,
      journalistPage: false,
      aboutPage: false,
      contactUsPage: true,
      homePageNameSearched: "",
      journalistPageNameSearched: "",
      homePageFailedNameSearch: "",
      showHomePageSearchError: false
    })
  }

  render() {

    let page

    // set the page to home page
    if (this.state.homePage) {
      page = <HomePage
        clicked={this.switchHometoJournalistHandler}
        nameChange={(event) => this.setJournalistNameHandler(event)}
        nameValue={this.state.homePageNameSearched}
        failedNameSearch={this.state.homePageFailedNameSearch}
        showError={this.state.showHomePageSearchError}
        about = {this.switchToAboutPageHandler}
        contact ={this.switchToContactUsPageHandler}
      />
    }

    // set the page to journalist page
    else if (this.state.journalistPage) {
      page = <JournalistPage
        journalistName={this.state.homePageNameSearched}
        home={this.backToHomeHandler}
        about={this.switchToAboutPageHandler}
        contact ={this.switchToContactUsPageHandler} />
    }

    else if(this.state.aboutPage){
      page = <AboutPage
      home = {this.backToHomeHandler}
      contact ={this.switchToContactUsPageHandler}/>
    }

    else if(this.state.contactUsPage){
      page = <ContactUsPage
      home = {this.backToHomeHandler}
      about ={this.switchToAboutPageHandler}/>
    }



    // display the proper page
    return (
      <ReactAux>
        {page}
      </ReactAux>
    );
  }
}

export default App;
