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
    const { product } = this.state;
    return (
      <Card>
        <Image src="/images/avatar/large/matthew.png" />
        <Card.Content>
          <Card.Header>Matthew</Card.Header>
          <Card.Meta>
            <span className="date">Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            22 Friends
          </a>
        </Card.Content>
      </Card>
    );
  }
}
