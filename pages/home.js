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
      <List horizontal>
        <List.Item>
          <Card color="pink">
            <Image src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg" />
            <Card.Content>
              <Card.Header>Daniel</Card.Header>
              <Card.Meta>Last updated 2 hours ago</Card.Meta>
              <Card.Description>Daniel's conditions</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Link href="/User/id" passHref>
                <a>
                  <Icon name="user" />
                  View more
                </a>
              </Link>
            </Card.Content>
          </Card>
        </List.Item>
        <List.Item>
          <Card color="pink">
            <Image src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg" />
            <Card.Content>
              <Card.Header>Daniel</Card.Header>
              <Card.Meta>Last updated 2 hours ago</Card.Meta>
              <Card.Description>Daniel's conditions</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Link href="/User/id" passHref>
                <a>
                  <Icon name="user" />
                  View more
                </a>
              </Link>
            </Card.Content>
          </Card>
        </List.Item>
        <List.Item>
          <Segment basic vertical>
            <Icon name="plus" link href="" size="massive" color="pink" alt="" />
          </Segment>
        </List.Item>
      </List>
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
