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
import Product from "../components/draggableProduct/product";
import { countProductsByUnique } from "../../utility/sort";

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
            <Grid.Column
              style={{ height: "180px", maxHeight: "180px", overflowY: "auto" }}
            >
              <Segment basic>
                <Patient_selected_items selectedProducts={collection} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column style={{ maxHeight: "350px", overflowY: "auto" }}>
              <Segment basic>
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
    let productCounter = countProductsByUnique(selectedProducts);
    return (
      <div>
        <Header as="h3">
          Selected {selectedProducts.length} product{selectedProducts.length !==
          0
            ? "s"
            : ""}
        </Header>

        <Card.Group itemsPerRow={3}>
          {selectedProducts.length !== 0 ? (
            _.sortedUniq(selectedProducts).map((product, i) => {
              return (
                <Product
                  key={i}
                  product={product}
                  selected={true}
                  productCounter={productCounter[product.id]}
                />
              );
            })
          ) : (
            <p>No items selected</p>
          )}
        </Card.Group>
      </div>
    );
  } else {
    return <Segment loading />;
  }
};
