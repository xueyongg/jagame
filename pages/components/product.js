import React, { Component } from "react";
import { Image, Icon, Card, Popup, List, Button } from "semantic-ui-react";
import { Context } from "./context";

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
          if (mainContext) {
            let bookmarkedProducts = mainContext.userData.bookmarkedProducts;
            let isBookmarked = _.find(bookmarkedProducts, { id: product.id })
              ? true
              : false;
            return (
              <Card>
                <Card.Content>
                  <Image floated="right" size="mini" src={image} />
                  <Card.Header>{product.name}</Card.Header>
                  <Card.Meta>
                    <span className="date">
                      {product.in_stock ? "Available" : "Out of Stock"}
                      {this.props.productCounter
                        ? ` x${this.props.productCounter}`
                        : ""}
                    </span>
                  </Card.Meta>
                  <Card.Description>
                    ${Number(product.price).toFixed(2)}
                  </Card.Description>
                </Card.Content>
                {!this.props.selected ? (
                  <Card.Content extra>
                    <a
                      onClick={() => {
                        mainContext.updateActiveUserData(product, "add");
                      }}
                    >
                      <Icon name="plus" />
                      Add to cart
                    </a>

                    <Popup
                      trigger={
                        <a
                          onClick={() => {
                            mainContext.updateBookmark(product);
                          }}
                        >
                          <Icon
                            name={
                              isBookmarked ? "bookmark" : "bookmark outline"
                            }
                            color="blue"
                            style={{ marginLeft: "4em", marginRight: 0 }}
                          />
                        </a>
                      }
                      basic
                      content={
                        isBookmarked ? "Unbookmark this!" : "Bookmark this!"
                      }
                    />
                  </Card.Content>
                ) : (
                  <Button.Group size="small">
                    <Button
                      onClick={() => {
                        mainContext.updateActiveUserData(product, "delete");
                      }}
                    >
                      <Icon name="minus" />
                    </Button>
                    <Button.Or />
                    <Button
                      onClick={() => {
                        mainContext.updateActiveUserData(product, "add");
                      }}
                    >
                      <Icon name="plus" />
                    </Button>
                  </Button.Group>
                )}
              </Card>
            );
          }
        }}
      </Context.Consumer>
    );
  }
}
