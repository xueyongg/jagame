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
import PageHeader from "./components/header";
import PatientForm from "./patients/patientForm";
import { Context } from "./components/context";
import Patient from "./patients/patient";
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
      if (user !== this.state.activeUser) {
        this.setState({ activeUser: user });
      }
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
              this.state.updateUser(chosenCollections[0]);
              return (
                <div>
                  <ActiveUserContext.Provider value={this.state.activeUser}>
                    <Head>
                      <title>Patients</title>
                    </Head>
                    <PageHeader />
                    <Container>
                      <Grid style={{ height: "800px" }} stackable>
                        <Grid.Row stretched>
                          <Grid.Column width={6}>
                            <Patients_list
                              pending={
                                mainContext.userData.collections["pending"]
                              }
                              completed={
                                mainContext.userData.collections["completed"]
                              }
                            />
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
          const activeCollection =
            activeItem !== "new" ? activeItem : "pending";
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
                  <Label color="pink">{this.props.pending.length}</Label>
                </Menu.Item>
                <Menu.Item
                  name="completed"
                  active={activeItem === "completed"}
                  onClick={() => updateTab("completed")}
                >
                  Completed
                  <Label color="pink">{this.props.completed.length}</Label>
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
                          userData.collections[activeCollection] &&
                          userData.collections[activeCollection].length !== 0
                        )
                          return userData.collections[activeCollection].map(
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
                                <List.Item
                                  active
                                  key={i}
                                  onClick={() => contex}
                                >
                                  <List.Icon
                                    name={gender}
                                    size="large"
                                    verticalAlign="middle"
                                  />
                                  <List.Content>
                                    <List.Header as="a">
                                      {first_name} {last_name}
                                    </List.Header>
                                    <List.Description as="a">
                                      Updated{" "}
                                      {typeof time_stamp === "string"
                                        ? moment(time_stamp).from(moment())
                                        : time_stamp.from(moment())}
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
                              content={`No ${activeCollection} users`}
                              textAlign="center"
                            />
                          );
                      }
                    }}
                  </Context.Consumer>
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
                {activeUser =>
                  activeUser ? (
                    <Patient patient={activeUser} />
                  ) : (
                    <PatientForm />
                  )
                }
              </ActiveUserContext.Consumer>
            )}
          </Segment>
        );
      }}
    </ActivePageContext.Consumer>
  );
};
