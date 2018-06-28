import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Home from "./home";

export default class Index extends Component {
  static async getInitialProps() {}

  state = { loading: true };

  componentDidMount() {}

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
