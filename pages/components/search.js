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
import { ProductsContext } from "./context";

export default class Search extends Component {
  static async getInitialProps({ patient }) {
    return { patient };
  }

  render() {
    return (
      <div>
        <Input icon="search" placeholder="Search..." />
        <ProductsContext.Consumer>
          {products => {
            console.log(products);
            if (products) {
              return (
                <Segment basic>
                  <Grid>
                    {products.map((product, i) => {
                      return <DraggableProduct key={i} product={product} />;
                    })}
                  </Grid>
                </Segment>
              );
            }
          }}
        </ProductsContext.Consumer>
      </div>
    );
  }
}
