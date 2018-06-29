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
  Search
} from "semantic-ui-react";
import { ProductsContext } from "./context";

import DraggableProduct from "./draggableProduct";
import Product from "./draggableProduct/product";
const data = require("../../static/data.json");

export default class SearchComponent extends Component {
  static async getInitialProps({ patient }) {
    return { patient };
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], rawResults: [], value: "" });

  state = {
    results: [],
    rawResults: [],
    isLoading: false,
    value: ""
  };

  componentDidMount() {}

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.name);
      console.log("results", _.filter(data, isMatch));
      this.setState({
        isLoading: false,
        results: _.filter(data, isMatch).map(dataItem => {
          let { name, price, in_stock } = dataItem;
          return {
            title: name,
            price: `$${Number(price).toFixed(2)}`,
            description: in_stock ? "Available" : "Out-of-stock"
          };
        }),
        rawResults: _.filter(data, isMatch)
      });
    }, 300);
  };

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  render() {
    const { isLoading, value, results, rawResults } = this.state;

    let products = rawResults.length === 0 ? data : rawResults;

    return (
      <div>
        <Search
          as={"h3"}
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          results={results}
          value={value}
          {...this.props}
        />

        <Card.Group itemsPerRow={3}>
          {products.map((product, i) => {
            if (i < 3) return <Product key={i} product={product} />; // Only display a maximum of 10 products at any one time
          })}
        </Card.Group>
      </div>
    );
  }
}
