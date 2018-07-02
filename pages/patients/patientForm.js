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
  Popup,
  Modal
} from "semantic-ui-react";
import { ActivePageContext } from "../patients";
import { Context } from "../components/context";

export default class PatientForm extends Component {
  static async getInitialProps({ patient }) {
    return { patient };
  }
  state = {
    first_name: "",
    last_name: "",
    gender: "",
    phone: "",
    description: "",
    loading: false
  };

  componentDidMount() {
    let currentUser = this.props.currentUser;
    if (currentUser) {
      const { first_name, last_name, gender, phone, description } = currentUser;
      this.setState({
        first_name,
        last_name,
        gender,
        phone,
        description
      });
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = (e, context, activePageContext) => {
    e.preventDefault();
    this.setState({ loading: true });
    let { first_name, last_name, gender, phone, description } = this.state;
    let pendingCollection = context.userData.collections.pending;

    // Finding user in the "Pending" collection
    let user = _.find(pendingCollection, { id: context.activeUser.id });

    if (user) {
      // Updating an existing user
      let index = _.findIndex(pendingCollection, { id: context.activeUser.id });
      user = {
        ...context.activeUser,
        first_name,
        last_name,
        gender,
        phone,
        description,
        status: "pending",
        time_stamp: context.moment()
      };
      pendingCollection[index] = user;

      // Update the activeUser state, so the changes will be updated
      context.updateUser(user);
    } else {
      // Adding in a new user into the pending collection
      user = {
        id: _.uniqueId("user_"),
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        gender,
        phone: phone.trim(),
        description,
        status: "pending",
        time_stamp: context.moment(),
        collection: []
      };
      pendingCollection.push(user);

      // Update the activeUser state, so the changes will be updated
      context.updateUser(user);
    }

    // Update local storage with newest data && change the page selection to "pending"
    context.updateData(context.userData);
    activePageContext.updateTab("pending");
  };

  handleDelete(context, activePageContext) {
    let currentUser = this.props.currentUser;

    let pendingCollection = context.userData.collections.pending;
    let user = _.find(pendingCollection, { id: currentUser.id });

    if (user) {
      // Remove the user from pending Collection
      let index = _.findIndex(pendingCollection, { id: currentUser.id });
      pendingCollection.splice(index, 1);

      // Update the activeUser state, so the changes will be updated
      context.updateUser({});
    }

    // Update local storage with newest data && change the page selection to "pending"
    context.updateData(context.userData);
    activePageContext.updateTab("pending");
  }

  render() {
    let { first_name, last_name, gender, phone, description } = this.state;
    const options = [
      { key: "m", text: "Male", value: "male" },
      { key: "f", text: "Female", value: "female" }
    ];
    return (
      <Segment basic>
        <Header
          as="h1"
          content={this.props.currentUser ? "Update Patient" : "New Patient"}
        />
        <Context.Consumer>
          {context => {
            return (
              <ActivePageContext.Consumer>
                {activePageContext => {
                  if (activePageContext) {
                    return (
                      <Form
                        loading={this.state.loading}
                        onSubmit={e =>
                          this.handleSubmit(e, context, activePageContext)
                        }
                      >
                        <Form.Group widths="equal">
                          <Form.Input
                            fluid
                            name="first_name"
                            label="First name"
                            value={first_name}
                            placeholder="First name"
                            required
                            onChange={this.handleChange}
                          />
                          <Form.Input
                            fluid
                            name="last_name"
                            label="Last name"
                            value={last_name}
                            placeholder="Last name"
                            onChange={this.handleChange}
                          />
                        </Form.Group>
                        <Form.Group widths={2}>
                          <Form.Select
                            options={options}
                            name="gender"
                            value={gender}
                            placeholder="Gender"
                            label="Gender"
                            required
                            onChange={this.handleChange}
                          />

                          <Form.Input
                            label="Phone"
                            value={phone}
                            name="phone"
                            placeholder="Phone"
                            onChange={this.handleChange}
                          />
                        </Form.Group>
                        <Form.TextArea
                          label="Description"
                          name="description"
                          value={description}
                          placeholder="More descriptions about the patient..."
                          onChange={this.handleChange}
                          style={{ height: "200px" }}
                        />
                        <Button
                          type="submit"
                          primary
                          loading={this.state.loading}
                        >
                          <Icon
                            name={
                              this.props.currentUser ? "write" : "user plus"
                            }
                          />
                          {this.props.currentUser ? "Update" : "Create"}
                        </Button>
                        {this.props.currentUser &&
                        this.props.currentUser.status === "pending" ? (
                          <Popup
                            trigger={
                              <Button
                                onClick={() => {
                                  this.handleDelete(context, activePageContext);
                                }}
                                negative
                              >
                                <Icon name="user delete" />Delete user
                              </Button>
                            }
                            content={
                              <div>
                                <Icon name="warning circle" /> Delete user
                              </div>
                            }
                          />
                        ) : (
                          ""
                        )}
                      </Form>
                    );
                  }
                }}
              </ActivePageContext.Consumer>
            );
          }}
        </Context.Consumer>
      </Segment>
    );
  }
}
