import React, { Component } from "react";
const moment = require("moment");
import axios from "axios";

export const Context = React.createContext();
export const ProductsContext = React.createContext();
export default class ContextProvider extends Component {
  static async getInitialProps() {
    const url =
      "https://82v9umvzoj.execute-api.ap-southeast-1.amazonaws.com/dev/products";
    let response = await axios({ method: "GET", url }).catch(e => {
      throw e;
    });
    return { products: response ? response.data : null };
  }
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

    // Products set up
    if (
      window.localStorage &&
      window.localStorage.getItem("products") === null &&
      this.props.products !== null
    ) {
      console.log("< Context products was updated with: ", this.props.products);
      window.localStorage.setItem("products", this.props.products);
      this.setState({ loading: false, products: this.props.products });
    }
  }

  componentDidUpdate() {}
  render() {
    return (
      <Context.Provider value={this.state}>
        <ProductsContext.Provider value={this.props.products}>
          {this.props.children}
        </ProductsContext.Provider>
      </Context.Provider>
    );
  }
}
