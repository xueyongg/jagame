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
  Message,
  Divider,
  Popup
} from "semantic-ui-react";
import SearchComponent from "../components/search";
import { productSum } from "../../utility/sum";

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
      description,
      collection,
      status
    } = this.props.patient;
    // console.log("< Active User: ", this.props.patient);
    let total = productSum(collection);
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Segment basic>
                <Header as="h2">
                  {_.capitalize(first_name)} {_.capitalize(last_name)}
                  <Label color={status === "pending" ? "yellow" : "teal"}>
                    <Icon name={status === "pending" ? "time" : "check"} />{" "}
                    {_.capitalize(status)}
                  </Label>
                </Header>
                <Message>
                  {/* <Message.Header>Changes in Service</Message.Header> */}
                  <p>{description ? description : "No description"}</p>
                </Message>
                <Popup
                  trigger={
                    <Button
                      as="div"
                      labelPosition="right"
                      floated="right"
                      disabled={total === "0.00"}
                    >
                      <Button color="green">
                        <Icon name="shop" />
                        Check Out
                      </Button>
                      <Label as="a" basic color="green" pointing="left">
                        ${total}
                      </Label>
                    </Button>
                  }
                  content="Check out collection"
                />
                <Popup
                  trigger={
                    <Button color="blue" floated="right">
                      <Icon name="download" />
                      Download
                    </Button>
                  }
                  content="Download list as CSV file"
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <Segment basic compact>
                <Patient_selected_items selectedProducts={collection} />
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Segment basic compact>
                <Header as="h3" icon>
                  Product Search
                </Header>
                <SearchComponent />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const Patient_selected_items = ({ selectedProducts }) => {
  if (selectedProducts) {
    console.log("selectedProducts: ", selectedProducts);
    return (
      <div>
        <Header as="h3" icon>
          Selected {selectedProducts.length} product{selectedProducts.length !==
          0
            ? "s"
            : ""}
        </Header>

        <List>
          {selectedProducts.length !== 0 ? (
            selectedProducts.map((product, i) => {
              return <List.Item key={i}>{product.name}</List.Item>;
            })
          ) : (
            <p>No items selected</p>
          )}
        </List>
      </div>
    );
  } else {
    return <Segment loading />;
  }
};
