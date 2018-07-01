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
  Popup,
  Table
} from "semantic-ui-react";
import { Patient_selected_items } from "../patient";
import { axios } from "axios";
import { createAndDownloadPDF } from "../../../utility/pdf";

export default class CheckoutConfirmation extends Component {
  static async getInitialProps({}) {
    return {};
  }
  state = { open: false };

  render() {
    let patient = this.props.patient;

    const { first_name } = patient;
    return (
      <Modal trigger={this.props.children} closeIcon>
        <Header icon="warning" content={"Delete Confirmation"} />
        <Modal.Content>
          <p>Are you sure you want to delete user {_.capitalize(first_name)}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" inverted>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
