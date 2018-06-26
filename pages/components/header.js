import React, { Component } from "react";
import { Container, Menu, Input, Segment, Image } from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";

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
        <Menu secondary>
          <Link href={{ pathname: "/" }} passHref>
            <Menu.Item>
              <Image src="https://cdn.jaga­me.com/logos/v2/logo.pink.large.png" />
            </Menu.Item>
          </Link>
          <Link href={{ pathname: "/" }} passHref>
            <Menu.Item>Home</Menu.Item>
          </Link>
          <Link href={{ pathname: "/patients" }} passHref>
            <Menu.Item>Patients</Menu.Item>
          </Link>
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
