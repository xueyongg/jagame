import React, { Component } from "react";
import {
  Container,
  Menu,
  Input,
  Segment,
  Card,
  Icon,
  Image,
  Grid,
  List,
  Header
} from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";
import PageHeader from "./components/header";
import { Context } from "./components/context";
import { ProductsContext } from "./index";
import DraggableProduct from "./components/draggableProduct";

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
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                <Link href="/" passHref>
                  <Header as="h2" content="Products" />
                </Link>
                <Segment>
                  <Home_search />
                </Segment>
              </Grid.Column>
              <Grid.Column width={6}>
                <Link href="/patients" passHref>
                  <Header as="h2" content="Pending List" />
                </Link>
                <Segment>
                  <Home_pending_list />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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

class Home_search extends Component {
  eventLogger = (e, data) => {
    console.log("Event: ", e);
    console.log("Data: ", data);
  };

  render() {
    const products = this.props.products;
    console.log(products);
    return (
      <Grid>
        <ProductsContext.Consumer>
          {products => {
            console.log(products);
            return (
              <Grid>
                {products.map((product, i) => {
                  return <DraggableProduct key={i} product={product} />;
                })}
              </Grid>
            );
          }}
        </ProductsContext.Consumer>
      </Grid>
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