import React, { Component } from "react";
import { Image, Icon, Card } from "semantic-ui-react";

export default class Product extends Component {
  static async getInitialProps({ product }) {
    return { product };
  }
  state = {};
  componentDidMount() {
    this.state = { ...this.props };
  }

  render() {
    // console.log(this.props.product);
    let product = this.props.product;
    let image = product.images[0];
    return (
      <Card>
        <Image src={image.src} alt={image.alt} />
        <Card.Content>
          <Card.Header>{product.name}</Card.Header>
          <Card.Meta>
            <span className="date">{product.in_stock? "Available": "Out of Stock"}</span>
          </Card.Meta>
          <Card.Description>
            ${Number(product.price).toFixed(2)}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="plus" />
            Add to cart
          </a>
        </Card.Content>
      </Card>
    );
  }
}
