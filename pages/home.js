import React, { Component } from "react";
import {
  Container,
  Menu,
  Input,
  Segment,
  Card,
  Icon,
  Image,
  List,
  Header
} from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";
import PageHeader from "./components/header";
import { Context } from "./components/context";

export default class Home extends Component {
  static async getInitialProps() {
    // Will consume context for this particular session
  }
  state = { activeItem: "home" };

  render() {
    return (
      <div>
        <Head>
          <title>Welcome Jaga Pro</title>
        </Head>
        <PageHeader />
        <Container>
          <Segment>
            <Link href="/patients" passHref>
              <Header as="h2" content="Pending List" />
            </Link>
            <Home_pending_list />
          </Segment>
          <Home_bookmark />
          <Home_search />
        </Container>
      </div>
    );
  }
}

class Home_pending_list extends Component {
  render() {
    // Will loop through all the list that were created
    return (
      <div>
        <Context.Consumer>
          {value => {
            console.log(value);
            let pending = value ? value.userData.collections.pending : [];
            <List horizontal>
              {/* {[1].map((pending, index) => {
                return ( */}
              <List.Item key={1}>
                <Card color="pink">
                  <Image src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg" />
                  <Card.Content>
                    <Card.Header>Daniel</Card.Header>
                    <Card.Meta>Last updated 2 hours ago</Card.Meta>
                    <Card.Description>Daniel's conditions</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Link
                      href={{
                        pathname: "/patients",
                        query: { name: "daniel" }
                      }}
                      passHref
                    >
                      <a>
                        <Icon name="user" />
                        View more
                      </a>
                    </Link>
                  </Card.Content>
                </Card>
              </List.Item>
              {/* ); */}
              {/* })} */}
            </List>;
          }}
        </Context.Consumer>
        <Segment basic vertical>
          <Icon name="plus" link href="" size="massive" color="pink" alt="" />
        </Segment>
      </div>
    );
  }
}

class Home_bookmark extends Component {
  render() {
    return (
      <Segment>
        <Header as="h2" content="Bookmarked Products" />
      </Segment>
    );
  }
}

class Home_search extends Component {
  render() {
    return (
      <Segment>This will be the search and also bookmarked products</Segment>
    );
  }
}

{
  /* <List.Item>
<Card color="pink">
  <Image src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg" />
  <Card.Content>
    <Card.Header>Daniel</Card.Header>
    <Card.Meta>Last updated 2 hours ago</Card.Meta>
    <Card.Description>Daniel's conditions</Card.Description>
  </Card.Content>
  <Card.Content extra>
    <Link
      href={{ pathname: "/patients", query: { name: "daniel" } }}
      passHref
    >
      <a>
        <Icon name="user" />
        View more
      </a>
    </Link>
  </Card.Content>
</Card>
</List.Item> */
}
