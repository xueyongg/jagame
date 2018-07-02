import React, { Component } from "react";
import { Container, Menu, Input, Segment, Image } from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";
import { Context } from "./context";

export default class PageHeader extends Component {
  static async getInitialProps() {}
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    let menuStyle = {
      border: "none",
      borderRadius: 0,
      boxShadow: "none",
      marginBottom: "1em",
      marginTop: "1em",
      transition: "box-shadow 0.5s ease, padding 0.5s ease",
      position: "relative",
      backgroundColor: "transparent",
      left: "0",
      right: "0",
      paddingLeft: "5%",
      paddingRight: "5%",
      zIndex: 1,

      fontWeight: 400,
      fontSize: 16,
      letterSpacing: ".15em"
    };

    return (
      <div>
        <Menu secondary stackable style={menuStyle}>
          <Link href={{ pathname: "/index" }} passHref>
            <Menu.Item>
              <Image
                src="https://cdn.jaga-me.com/logos/v2/logo.square.pink.png"
                size="mini"
              />
            </Menu.Item>
          </Link>
          <Link href={{ pathname: "/home" }} passHref>
            <Menu.Item>Home</Menu.Item>
          </Link>
          <Link href={{ pathname: "/patients" }} passHref>
            <Menu.Item>Manage patients</Menu.Item>
          </Link>
          <Context.Consumer>
            {context => {
              <Menu.Item>I'm {context ? context.sessionId : ""}</Menu.Item>;
            }}
          </Context.Consumer>
        </Menu>
      </div>
    );
  }
}
