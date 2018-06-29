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
  Modal,
  Grid,
  Button,
  Statistic,
  Label,
  Form,
  Message,
  Divider,
  Popup
} from "semantic-ui-react";
import { Patient_selected_items } from "../patient";

export default class CheckoutConfirmation extends Component {
  static async getInitialProps({}) {
    return {};
  }
  state = { open: true };
  close = () => this.setState({ open: false });

  render() {
    let patient = this.props.patient;
    const {
      first_name,
      last_name,
      gender,
      phone,
      description,
      collection,
      status
    } = patient;
    return (
      <Modal trigger={this.props.children} closeIcon>
        <Modal.Header>
          {first_name} {last_name}
        </Modal.Header>
        <Modal.Content scrolling>
          {/* <Image size="medium" src="/images/wireframe/image.png" wrapped /> */}

          <Modal.Description>
            <Header>Total: ${this.props.totalAmount}</Header>
            <Patient_selected_items selectedProducts={collection} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="red"
            inverted
            onClick={() => {
              this.close();
            }}
          >
            <Icon name="remove" /> Back
          </Button>
          <Button color="green" inverted>
            <Icon name="checkmark" /> Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
