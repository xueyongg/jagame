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
export const ActivePageContext = React.createContext();
export const ActiveUserContext = React.createContext();

export default class Patients extends Component {
  state = {
    activeItem: "pending",
    updateTab: tab => {
      this.setState({ activeItem: tab });
    },
    activeUser: {},
    updateUser: user => {
      this.setState({ activeUser: user });
    }
  };

  render() {
    return (
      <ActivePageContext.Provider value={this.state}>
        <Context.Consumer>
          {mainContext => {
            if (mainContext) {
              let chosenCollections =
                mainContext.userData.collections[
                  this.state.activeItem !== "new"
                    ? this.state.activeItem
                    : "pending"
                ];
              return (
                <div>
                  <ActiveUserContext.Provider value={chosenCollections[0]}>
                    <Head>
                      <title>Patients</title>
                    </Head>
                    <PageHeader />
                    <Container>
                      <Grid style={{ height: "600px" }} stackable>
                        <Grid.Row stretched>
                          <Grid.Column width={6}>
                            <Patients_list />
                          </Grid.Column>
                          <Grid.Column width={10}>
                            <Patient_display />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Container>
                  </ActiveUserContext.Provider>
                </div>
              );
            }
          }}
        </Context.Consumer>
      </ActivePageContext.Provider>
    );
  }
}

class Patients_list extends Component {
  componentDidMount() {
    this.state = { ...this.props };
  }
  render() {
    // Will loop through all the list that were created
    return (
      <ActivePageContext.Consumer>
        {activePageContext => {
          const { activeItem, updateTab } = activePageContext;
          return (
            <Segment>
              <Menu attached="top" tabular>
                <Menu.Item
                  name="pending"
                  active={activeItem === "pending"}
                  onClick={() => {
                    updateTab("pending");
                  }}
                >
                  Pending
                  <Label color="pink">{0}</Label>
                </Menu.Item>
                <Menu.Item
                  name="completed"
                  active={activeItem === "completed"}
                  onClick={() => updateTab("completed")}
                >
                  Completed
                  <Label color="pink">{0}</Label>
                </Menu.Item>
                <Menu.Menu position="right">
                  <Menu.Item>
                    <Button
                      icon
                      fluid
                      onClick={() => {
                        updateTab("new");
                      }}
                    >
                      New
                      <Icon name="plus" />
                    </Button>
                  </Menu.Item>
                </Menu.Menu>
              </Menu>

              <Segment attached="bottom">
                <List celled>
                  <Context.Consumer>
                    {context => {
                      if (context) {
                        let userData = context.userData;
                        if (
                          userData.collections[activeItem] &&
                          userData.collections[activeItem].length !== 0
                        )
                          return userData.collections[activeItem].map(
                            (collection, i) => {
                              console.log("collection", collection);
                              const {
                                first_name,
                                last_name,
                                gender,
                                phone,
                                description,
                                time_stamp
                              } = collection;
                              return (
                                <List.Item active key={i}>
                                  <List.Icon
                                    name="github"
                                    size="large"
                                    verticalAlign="middle"
                                  />
                                  <List.Content>
                                    <List.Header as="a">
                                      {first_name} {last_name}
                                    </List.Header>
                                    <List.Description as="a">
                                      Updated {time_stamp.from(moment())}
                                    </List.Description>
                                  </List.Content>
                                </List.Item>
                              );
                            }
                          );
                        else
                          return (
                            <Header
                              as="h4"
                              content={`No ${
                                activeItem !== "new" ? activeItem : "pending"
                              } users`}
                              textAlign="center"
                            />
                          );
                      }
                    }}
                  </Context.Consumer>

                  {/* <Button
                    icon
                    fluid
                    onClick={() => {
                      updateTab("new");
                    }}
                  >
                    <Icon name="plus" />
                    New patient
                  </Button> */}
                </List>
              </Segment>
            </Segment>
          );
        }}
      </ActivePageContext.Consumer>
    );
  }
}

const Patient_display = activeItem => {
  return (
    <ActivePageContext.Consumer>
      {activePageContext => {
        const { activeItem } = activePageContext;
        return (
          <Segment>
            {activeItem === "new" ? (
              <PatientForm />
            ) : (
              <ActiveUserContext.Consumer>
                {activeUser => (
                  <Patient
                    patient={activeUser ? activeUser : { name: "alice" }}
                  />
                )}
              </ActiveUserContext.Consumer>
            )}
          </Segment>
        );
      }}
    </ActivePageContext.Consumer>
  );
};
