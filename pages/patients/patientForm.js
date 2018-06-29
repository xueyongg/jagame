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
  Form
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
    let userExist = _.find(pendingCollection, { id: context.activeUser.id });

    if (userExist) {
      let index = _.findIndex(pendingCollection, { id: context.activeUser.id });
      userExist = {
        ...context.activeUser,
        first_name,
        last_name,
        gender,
        phone,
        description,
        status: "pending",
        time_stamp: context.moment()
      };
      pendingCollection[index] = userExist;
    } else {
      pendingCollection.push({
        id: _.uniqueId("user_"),
        first_name,
        last_name,
        gender,
        phone,
        description,
        status: "pending",
        time_stamp: context.moment(),
        collection: []
      });
    }

    context.updateData(context.userData);
    activePageContext.updateTab("pending");
  };

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
                      />
                      <Button
                        type="submit"
                        primary
                        fluid
                        loading={this.state.loading}
                      >
                        {this.props.currentUser ? "Update" : "Create"}
                      </Button>
                    </Form>
                  );
                }}
              </ActivePageContext.Consumer>
            );
          }}
        </Context.Consumer>
      </Segment>
    );
  }
}
