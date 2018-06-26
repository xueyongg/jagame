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
  Header,
  Grid,
  Button
} from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";
import PageHeader from "./components/header";

export default class Patients extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>Patients</title>
        </Head>
        <PageHeader />
        <Container>
          <Patients_list />
        </Container>
      </div>
    );
  }
}

class Patients_list extends Component {
  state = { activeItem: "pending" };

  handleSubHeaderClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    // Will loop through all the list that were created
    const { activeItem } = this.state;
    return (
      <div>
        <Grid style={{ height: "600px" }} stackable>
          <Grid.Row stretched>
            <Grid.Column width={6}>
              <Segment>
                <Menu attached="top" tabular>
                  <Menu.Item
                    name="pending"
                    active={activeItem === "pending"}
                    onClick={this.handleSubHeaderClick}
                  />
                  <Menu.Item
                    name="completed"
                    active={activeItem === "completed"}
                    onClick={this.handleSubHeaderClick}
                  />
                </Menu>
                <Segment attached='bottom'>
                  <List celled>
                    <List.Item>
                      <List.Icon
                        name="github"
                        size="large"
                        verticalAlign="middle"
                      />
                      <List.Content>
                        <List.Header as="a">Alice</List.Header>
                        <List.Description as="a">
                          Updated 10 mins ago
                        </List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon
                        name="github"
                        size="large"
                        verticalAlign="middle"
                      />
                      <List.Content>
                        <List.Header as="a">Bob</List.Header>
                        <List.Description as="a">
                          Updated 22 mins ago
                        </List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon
                        name="github"
                        size="large"
                        verticalAlign="middle"
                      />
                      <List.Content>
                        <List.Header as="a">Charlie</List.Header>
                        <List.Description as="a">
                          Updated 34 mins ago
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                </Segment>
              </Segment>
            </Grid.Column>
            <Grid.Column width={10}>
              <Segment>
                <Patient patient={{ name: "Alice" }} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

class Patient extends Component {
  static async getInitialProps({ patient }) {
    return { patient };
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h2" content={this.props.patient.name} />
              <Button icon>
                <Icon name="github" />
                Download
              </Button>
              <Button icon>
                <Icon name="github" /> Check Out
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>Selected product and quantity</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              Search function, also looking for recommendation function as well
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

class patient_selected_items extends Component {
  render() {
    return <div />;
  }
}
