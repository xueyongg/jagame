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
  Button,
  Statistic,
  Label,
  Form
} from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";
import PageHeader from "./components/header";
import Patient from "./components/patient";
import PatientForm from "./components/patientForm";
import { Context } from "./components/context";
const moment = require("moment");

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
        <Context.Consumer>
          {context => {
            let collections =
              context && context.userData ? context.userData.collections : [];
            console.log(collections);
            let chosenCollection =
              collections[activeItem !== "new-tab" ? activeItem : "pending"];
            return (
              <Grid style={{ height: "600px" }} stackable>
                <Grid.Row stretched>
                  <Grid.Column width={6}>
                    <Segment>
                      <Menu attached="top" tabular>
                        <Menu.Item
                          name="pending"
                          active={activeItem === "pending"}
                          onClick={this.handleSubHeaderClick}
                        >
                          Pending
                          <Label color="pink">
                            {collections["pending"].length}
                          </Label>
                        </Menu.Item>
                        <Menu.Item
                          name="completed"
                          active={activeItem === "completed"}
                          onClick={this.handleSubHeaderClick}
                        >
                          Completed
                          <Label color="pink">
                            {collections["completed"].length}
                          </Label>
                        </Menu.Item>
                        <Menu.Menu position="right">
                          <Menu.Item
                            name="new-tab"
                            onClick={this.handleSubHeaderClick}
                          >
                            <Icon name="add" />
                            New
                          </Menu.Item>
                        </Menu.Menu>
                      </Menu>

                      <Segment attached="bottom">
                        <List celled>
                          {chosenCollection.length !== 0 ? (
                            chosenCollection.map((user, i) => {
                              console.log(user);
                              return (
                                <List.Item active key={i}>
                                  <List.Icon
                                    name="github"
                                    size="large"
                                    verticalAlign="middle"
                                  />
                                  <List.Content>
                                    <List.Header as="a">Alice</List.Header>
                                    <List.Description as="a">
                                      Updated {user.time_stamp.from(moment())}
                                    </List.Description>
                                  </List.Content>
                                </List.Item>
                              );
                            })
                          ) : (
                            <Header
                              as="h4"
                              content={`No ${
                                activeItem !== "new-tab"
                                  ? activeItem
                                  : "pending"
                              } users`}
                              textAlign="center"
                            />
                          )}
                        </List>
                      </Segment>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Segment>
                      {activeItem === "new-tab" ? (
                        <PatientForm />
                      ) : (
                        <Patient patient={{ name: "Alice" }} />
                      )}
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            );
          }}
        </Context.Consumer>
      </div>
    );
  }
}
