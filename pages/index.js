import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Home from "./home";

import axios from "axios";
export const ProductsContext = React.createContext();

export default class Index extends Component {
  static async getInitialProps() {
    const url =
      "https://82v9umvzoj.execute-api.ap-southeast-1.amazonaws.com/dev/products";
    let response = await axios({ method: "GET", url }).catch(e => {
      throw e;
    });
    return { products: response ? response.data : null };
  }

  state = { loading: true };

  componentDidMount() {
    if (
      window.localStorage &&
      window.localStorage.getItem("products") === null
    ) {
      window.localStorage.setItem("products", this.props.products);
      this.setState({ loading: false, products: this.props.products });
    }
  }

  render() {
    return (
      <div>
        <Head>
          <title>Jaga Me pls</title>
        </Head>
        <Container>
          <ProductsContext.Provider value={this.props.products}>
            <Home />
          </ProductsContext.Provider>
        </Container>
      </div>
    );
  }
}
