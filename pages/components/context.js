import React, { Component } from "react";
const moment = require("moment");
import axios from "axios";
const _ = require("lodash");

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
    initiated: false,
    updateData: data => {
      if (this.state.sessionId) {
        console.log(
          "Updating localStorage with Session Id: " + this.sessionId,
          data
        );
        window.localStorage.setItem(this.state.sessionId, JSON.stringify(data));
        console.log("Window localStorage", window.localStorage);
        this.setState({ userData: data });
      }
    },
    moment: () => {
      return moment();
    },
    activeUser: {},
    updateUser: user => {
      if (user !== this.state.activeUser) {
        this.setState({ activeUser: user });
      }
    },
    updateActiveUserData: (newProduct, action) => {
      let activeUser = this.state.activeUser;
      if (activeUser && activeUser.status === "pending" && newProduct) {
        if (action === "add") activeUser.collection.push(newProduct);
        else if (action === "delete") {
          // activeUser.userData.collection.push(newProduct);
        }
        this.setState({ activeUser });
      }
    }
  };
  // This will create a new session for the user that access, and a new collection set up will be done
  // This will save all the context related changes, such as product selection

  componentDidMount() {
    let sessionId = window.document.cookie;
    let userData = window.localStorage.getItem(sessionId);
    userData = JSON.parse(userData);
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

    // Products Setup
    if (window.localStorage.getItem("products")) {
      // Avoid calling the URL unnecessarily
      this.setState({
        products: JSON.parse(window.localStorage.getItem("products")),
        initiated: true
      });
    } else {
      // API call
      const url =
        "https://82v9umvzoj.execute-api.ap-southeast-1.amazonaws.com/dev/products";
      axios({ method: "GET", url })
        .then(res => {
          let products = res.data;
          if (products) {
            window.localStorage.setItem("products", JSON.stringify(products));
            this.setState({ products, initiated: true });
          }
        })
        .catch(e => {
          console.log("< Error in PRODUCT ENDPOINT", e);
        });
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
