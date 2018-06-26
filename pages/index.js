import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Home from "./home";
import ContextProvider from "./components/context";
import axios from "axios";

export default class Index extends Component {
  static async getInitialProps() {
    const url = "https://swapi.co/api/people";
    let response = await axios({ method: "GET", url }).catch(e => {
      throw e;
    });
    return { res: response ? response.data : null };
  }
  state = {};

  render() {
    return (
      <div>
        <Head>
          <title>Jaga Me</title>
        </Head>
        <ContextProvider>
          <Container>
            <Home />
          </Container>
        </ContextProvider>
      </div>
    );
  }
}
