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
    return (
      <Segment basic>
        <Head>
          <title>Home</title>
        </Head>
        <Menu secondary stackable>
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
              return (
                <Menu.Item>I'm {context ? context.sessionId : ""}</Menu.Item>
              );
            }}
          </Context.Consumer>
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}
