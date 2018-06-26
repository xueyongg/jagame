import React, { Component } from "react";

const Context = React.createContext();

export default class ContextProvider extends Component {
  static async getInitialProps() {}
  state = { test: "tests" };
  // This will create a new session for the user that access, and a new collection set up will be done
  // This will save all the context related changes, such as product selection
  render() {
    return (
      <Context.Provider value={this.state.test}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
