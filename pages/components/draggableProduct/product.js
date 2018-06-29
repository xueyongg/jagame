import React, { Component } from "react";
import { Image, Icon, Card, Popup, List } from "semantic-ui-react";
import { Context } from "../context";

export default class Product extends Component {
  static async getInitialProps({ product }) {
    return { product };
  }
  state = {};
  componentDidMount() {
    this.state = { ...this.props };
  }

  render() {
    let product = this.props.product;
    let image = product.images[0];
    return (
      <Context.Consumer>
        {mainContext => {
          if (mainContext) console.log("mainContext", mainContext);
          return (
            <Popup
              trigger={
                <List.Item>
                  {/* <Image avatar src={image} /> */}
                  <List.Content>
                    <List.Header>{product.name}</List.Header>
                    <a
                      onClick={() => {
                        mainContext.updateActiveUserData(product, "add");
                      }}
                    >
                      <Icon name="plus" />
                      Add to cart
                    </a>
                  </List.Content>
                </List.Item>
              }
              content={
                <Card>
                  <Image src={image.src} alt={image.alt} />
                  <Card.Content>
                    <Card.Header>{product.name}</Card.Header>
                    <Card.Meta>
                      <span className="date">
                        {product.in_stock ? "Available" : "Out of Stock"}
                      </span>
                    </Card.Meta>
                    <Card.Description>
                      ${Number(product.price).toFixed(2)}
                    </Card.Description>
                  </Card.Content>
                </Card>
              }
              on="hover"
            />
          );
        }}
      </Context.Consumer>
    );
  }
}
