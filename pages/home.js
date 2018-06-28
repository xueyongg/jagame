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
  Statistic
} from "semantic-ui-react";
import Head from "next/head";
import Link from "next/link";
import PageHeader from "./components/header";
import { Context } from "./components/context";
import { ProductsContext } from "./components/context";
import DraggableProduct from "./components/draggableProduct";
const LineChart = require("react-chartjs").Line;

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
          <Link href="/patients" passHref>
            <Header as="h2" content="Status Overview" />
          </Link>

          <Segment.Group horizontal>
            <Segment>
              <Home_status />
            </Segment>
            <Segment>
              <Statistic.Group>
                <Statistic color="red">
                  <Statistic.Value>27</Statistic.Value>
                  <Statistic.Label>Pending</Statistic.Label>
                </Statistic>
                <Statistic color="green">
                  <Statistic.Value>8'</Statistic.Value>
                  <Statistic.Label>Closed</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Segment>
          </Segment.Group>
          <Link href="/patients" passHref>
            <Header as="h2" content="Pending List" />
          </Link>
          <Segment>
            <Home_pending_list />
          </Segment>
        </Container>
      </div>
    );
  }
}

class Home_status extends Component {
  state = {
    chartData: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [1, 2, 3, 4, 5, 6, 7]
        },
        {
          label: "My Second dataset",
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
