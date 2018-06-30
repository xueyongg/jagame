import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Home from "./home";
import axios from "axios";
import { Context } from "./components/context";

export default class Index extends Component {
  static async getInitialProps() {
    const url =
      "https://82v9umvzoj.execute-api.ap-southeast-1.amazonaws.com/dev/products";

    let res = await axios({ method: "GET", url }).catch(e => {
      console.log("< Error in PRODUCT ENDPOINT", e);
    });

    return { products: res ? res.data : {} };
  }

  state = { loading: true };

  componentDidMount() {}

  render() {
    return (
      <Context.Consumer>
        {mainContext => {
          if (mainContext) {
            if (!mainContext.initiated) {
              mainContext.initiateProducts(this.props.products);
            }

            return (
              <div>
                <Head>
                  <title>Jaga Me pls</title>
                </Head>
                <Container>
                  <Home />
                </Container>
              </div>
            );
          }
        }}
      </Context.Consumer>
    );
  }
}
