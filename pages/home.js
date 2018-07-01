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
  Header,
  Statistic,
  Button
} from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";
import PageHeader from "./components/header";
import { Context } from "./components/context";
const LineChart = require("react-chartjs").Line;
const moment = require("moment");

/**
 * List of components:
 *
 * Home: the main home component
 * Home_status: the component handling the statistics of the user at this moment
 * Home_pending_list: the component displaying the existing pending list of collections
 */
export default class Home extends Component {
  static async getInitialProps() {
    // Will consume context for this particular session
  }

  componentDidMount() {}
  state = { activeItem: "home" };

  render() {
    return (
      <div>
        <Head>
          <title>Welcome Jaga Pro</title>
        </Head>

        <Context.Consumer>
          {mainContext => {
            if (mainContext) {
              if (mainContext.sessionId) {
                const userData = mainContext.userData;
                return (
                  <div>
                    <PageHeader />
                    <Container>
                      <Link href="/patients" passHref>
                        <Header as="h2">
                          <Icon name="file outline" />
                          <Header.Content>Status Overview</Header.Content>
                        </Header>
                      </Link>

                      <Segment.Group horizontal>
                        <Segment>
                          <Home_status data={mainContext.userData} />
                        </Segment>
                        <Segment textAlign="center">
                          <Header as="h2" content="Collection Status" />
                          <Statistic.Group widths="two">
                            <Statistic color="red">
                              <Statistic.Value>
                                {userData.collections["pending"].length}
                              </Statistic.Value>
                              <Statistic.Label>Pending</Statistic.Label>
                            </Statistic>
                            <Statistic color="green">
                              <Statistic.Value>
                                {userData.collections["completed"].length}
                              </Statistic.Value>
                              <Statistic.Label>Completed</Statistic.Label>
                            </Statistic>
                          </Statistic.Group>
                        </Segment>
                      </Segment.Group>

                      <Header as="h2">
                        <Icon name="plus" color="red" />
                        <Link href="/patients" passHref>
                          <Header.Content style={{ color: "black" }}>
                            Pending Patients
                          </Header.Content>
                        </Link>
                      </Header>
                      <Segment>
                        <Home_pending_list />
                      </Segment>
                    </Container>
                  </div>
                );
              } else {
                // Local Storage exist but session does not; Implying Cognito
                return (
                  <Segment
                    basic
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translateX(-50%) translateY(-50%)"
                    }}
                  >
                    <Header
                      as="h1"
                      content="Please exit from cognito mode to use this application! (:"
                      textAlign="center"
                    />
                  </Segment>
                );
              }
            } else {
              return <Segment loading basic style={{ height: "600px" }} />;
            }
          }}
        </Context.Consumer>
      </div>
    );
  }
}

/**
 * Home_status: Displays out the overall statistics of the application for this particular cookie
 */
class Home_status extends Component {
  state = {
    totalCounter: [],
    chartData: {
      labels: this.getLastSevenDates(7),
      datasets: [
        {
          label: "Pending",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: this.getLastSevenDaysData("pending")
        },
        {
          label: "Completed",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: this.getLastSevenDaysData("completed")
        }
        // {
        //   label: "Total",
        //   fillColor: "rgba(151,187,205,0.2)",
        //   strokeColor: "rgba(151,187,205,1)",
        //   pointColor: "rgba(151,187,205,1)",
        //   pointStrokeColor: "#fff",
        //   pointHighlightFill: "#fff",
        //   pointHighlightStroke: "rgba(151,187,205,1)",
        //   data: [2, 4, 3, 4, 5, 6, 7]
        // }
      ]
    },
    chartOptions: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          },
          { stacked: true }
        ]
      }
    }
  };

  getLastSevenDaysData(collectionType) {
    const selectedCollection = this.props.data.collections[collectionType];
    let userCounter = {};
    // console.log("selectedCollection " + collectionType, selectedCollection);
    if (selectedCollection) {
      selectedCollection.map(user => {
        let { time_stamp } = user;
        let daysBefore = moment(time_stamp).diff(moment(), "d");
        if (userCounter[daysBefore]) {
          userCounter[daysBefore] += 1;
        } else {
          userCounter[daysBefore] = 1;
        }
      });
      let results = [7, 6, 5, 4, 3, 2, 1, 0].map(num => {
        return userCounter[num] || 0;
      });
      return results;
    }
  }

  /**
   * params:
   */
  getLastSevenDates(daysBefore) {
    return Array(daysBefore + 1)
      .fill()
      .map((item, index) => index)
      .reverse()
      .map(
        num =>
          num !== 0
            ? moment()
                .subtract(num, "d")
                .format("DD MMM")
            : "Today"
      );
  }

  fillRange(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((item, index) => start + index).reverse;
  }

  componentDidMount() {
    this.setState({ ...this.state, userData: this.props.data });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.data !== prevProps.data) {
      this.setState({ userData: this.props.data });
    }
  }

  render() {
    const { chartData, chartOptions } = this.state;
    return (
      <LineChart
        data={chartData}
        options={chartOptions}
        width="700"
        height="250"
      />
    );
  }
}

class Home_pending_list extends Component {
  render() {
    // Will loop through all the list that were created
    return (
      <div>
        <Context.Consumer>
          {mainContext => {
            let pending = mainContext
              ? mainContext.userData.collections.pending
              : [];
            if (mainContext) {
              if (pending.length !== 0) {
                return (
                  <Card.Group itemsPerRow={4}>
                    {pending.map((user, index) => {
                      const {
                        first_name,
                        last_name,
                        gender,
                        description,
                        phone,
                        status,
                        time_stamp,
                        collection
                      } = user;
                      return (
                        <Card key={index}>
                          <Card.Content>
                            <Card.Header>
                              {_.capitalize(first_name) +
                                " " +
                                _.capitalize(last_name)}
                            </Card.Header>
                            <Card.Meta>{_.capitalize(gender)}</Card.Meta>
                            <Card.Description
                              style={{
                                height: "100%",
                                maxHeight: 200,
                                overflowY: "auto"
                              }}
                            >
                              {description}
                            </Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                            <Link href="/patients" passHref>
                              <div className="ui two buttons">
                                <Button
                                  basic
                                  color="blue"
                                  onClick={() => {
                                    mainContext.updateUser(user);
                                  }}
                                >
                                  View More
                                </Button>
                              </div>
                            </Link>
                          </Card.Content>
                        </Card>
                      );
                    })}
                  </Card.Group>
                );
              } else {
                return (
                  <Header as="h2" textAlign="center">
                    <Header.Content>No pending patients</Header.Content>
                  </Header>
                );
              }
            }
          }}
        </Context.Consumer>
      </div>
    );
  }
}
