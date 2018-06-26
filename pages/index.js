import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Home from "./home";
import axios from "axios";
export default class Index extends Component {
  static async getInitialProps() {
    const url =
      "https://82v9umvzoj.execute-api.ap-southeast-1.amazonaws.com/dev/products";
    let response = await axios({ method: "GET", url }).catch(e => {
      throw e;
    });
    return { res: response ? response.data : null };
  }

  state = { loading: true };

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
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
}
