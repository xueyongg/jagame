import React, { Component } from "react";
const moment = require("moment");

export const Context = React.createContext();
export default class ContextProvider extends Component {
  static async getInitialProps() {}
  state = {
    sessionId: "",
    userData: {
      collections: {
        pending: [],
        completed: []
      },
      bookmarkedProducts: []
    },
    updateData: data => {
      if (this.sessionId) {
        window.localStorage.setItem(sessionId, data);
        console.log("Window localStorage", window.localStorage);
        this.setState({ userData: data });
      }
    },
    moment: () => {
      return moment();
    }
  };
  // This will create a new session for the user that access, and a new collection set up will be done
  // This will save all the context related changes, such as product selection

  componentDidMount() {
    let sessionId = window.document.cookie;
    let userData = window.localStorage.getItem(sessionId);
    console.log("< localStorage: ", window.localStorage);
    this.setState({
      sessionId,
      userData: userData
        ? userData
        : {
            collections: {
              pending: [],
              completed: []
            },
            bookmarkedProducts: []
          }
    });
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
