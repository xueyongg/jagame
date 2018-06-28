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
  Form,
  Message
} from "semantic-ui-react";
import Search from "../components/search";

export default class Patient extends Component {
  static async getInitialProps({ patient }) {
    return { patient };
  }

  render() {
    const {
      first_name,
      last_name,
      gender,
      phone,
      description
    } = this.props.patient;
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h2" content={first_name} />
              <Segment clearing>
                <Message>
                  {/* <Message.Header>Changes in Service</Message.Header> */}
                  <p>{description ? description : "No description"}</p>
                </Message>

                <Button floated="right" icon>
                  <Icon name="github" />
                  Download
                </Button>
                <Button floated="right" icon>
                  <Icon name="github" /> Check Out
                </Button>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Patient_selected_items />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as="h3" icon>
                Product Search
              </Header>
              <Search />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

class Patient_selected_items extends Component {
  render() {
    return (
      <div>
        <Grid.Row>
          <Header as="h3" icon>
            Selected
            <Label as="a">$10.00</Label>
          </Header>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Image
              src="https://react.semantic-ui.com/images/wireframe/image.png"
              size="small"
            />
          </Grid.Column>
        </Grid.Row>
      </div>
    );
  }
}
