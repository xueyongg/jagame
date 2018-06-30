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
          let index = _.findIndex(activeUser.collection, { id: newProduct.id });
          activeUser.collection.splice(index, 1);
        }
        this.setState({ activeUser });

        // Retrieve the selected user
        let pendingCollection = this.state.userData.collections.pending;
        let userExist = _.find(pendingCollection, {
          id: activeUser.id
        });

        // Find index of user, update the user in state & persist in local storage
        if (userExist) {
          let index = _.findIndex(pendingCollection, {
            id: activeUser.id
          });
          userExist = {
            ...activeUser,
            collection: activeUser.collection,
            status: "pending",
            time_stamp: moment()
          };
          pendingCollection[index] = userExist;
          this.state.updateData(this.state.userData);
        }
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
