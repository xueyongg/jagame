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
import { ProductsContext } from "./components/context";
import DraggableProduct from "./components/draggableProduct";
const LineChart = require("react-chartjs").Line;
import axios from "axios";
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

  componentDidMount() {
    const url =
      "https://82v9umvzoj.execute-api.ap-southeast-1.amazonaws.com/dev/products";

    let response = axios({ method: "GET", url }).catch(e => {
      console.log("< Error in PRODUCT ENDPOINT", e);
    });
    this.setState({ products: response ? response.data : {} });
  }
  state = { activeItem: "home" };

  render() {
    return (
      <div>
        <Head>
          <title>Welcome Jaga Pro</title>
        </Head>
        <PageHeader />
        <Context.Consumer>
          {mainContext => {
            if (mainContext) {
              console.log("MainContext", mainContext);
              const userData = mainContext.userData;
              return (
                <Container>
                  <Link href="/patients" passHref>
                    <Header as="h2">
                      <Icon name="file outline" />
                      <Header.Content>Status Overview</Header.Content>
                    </Header>
                  </Link>

                  <Segment.Group horizontal>
                    <Segment>
                      <Home_status data={mainContext} />
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
                      <Header.Content style={{color: "black"}}>Pending Patients</Header.Content>
                    </Link>
                  </Header>
                  <Segment>
                    <Home_pending_list />
                  </Segment>
                </Container>
              );
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
    pendingCounter: [1, 2, 3, 4, 5, 6, 7],
    completedCounter: [2, 4, 3, 4, 5, 6, 7],
    totalCounter: [2, 4, 3, 4, 5, 6, 7],
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
          data: [1, 2, 3, 4, 5, 6, 7]
        },
        {
          label: "Completed",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [2, 4, 3, 4, 5, 6, 7]
        },
        {
          label: "Total",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [2, 4, 3, 4, 5, 6, 7]
        }
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
            if (mainContext)
              return (
                <Card.Group itemsPerRow={4}>
                  {pending.map((user, index) => {
                    // console.log("Pending", user);
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
          }}
        </Context.Consumer>
      </div>
    );
  }
}
