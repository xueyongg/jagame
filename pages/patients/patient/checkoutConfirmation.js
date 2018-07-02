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
const axios = require("axios");
import { createAndDownloadPDF } from "../../../utility/pdf";
const _ = require("lodash");

export default class CheckoutConfirmation extends Component {
  static async getInitialProps({}) {
    return {};
  }
  state = { open: false };
  close = () => this.setState({ open: false });

  handleConfirmation(collection, mainContext, activePageContext) {
    this.setState({ loading: true });
    const url = "https://webhook.site/b67889fe-0e1d-44f0-96bd-120eca6a1d8f";
    let response = axios({
      method: "post",
      url,
      data: {
        collection: collection
      }
    })
      .then(res => {
        console.log("res", res);
        this.setState({ loading: false, open: false });
      })
      .catch(e => {
        console.log(e);
      });

    // change the activeUser to status: completed
    let pendingCollection = mainContext.userData.collections.pending;
    let completedCollection = mainContext.userData.collections.completed;
    // Finding user in the "Pending" collection
    let user = _.find(pendingCollection, { id: mainContext.activeUser.id });
    if (user) {
      if (user.status === "pending") {
        user.status = "completed";
        completedCollection.push(user);
        pendingCollection.splice(
          _.findIndex(pendingCollection, { id: user.id })
        );
      }
    }

    // Update the activeUser state, so the changes will be updated
    mainContext.updateUser(user);
    // Update local storage with newest data && change the page selection to "pending"
    mainContext.updateData(mainContext.userData);
    activePageContext.updateTab("completed");
  }

  render() {
    let patient = this.props.patient;
    let productCounter = this.props.productCounter;
    let mainContext = this.props.mainContext;
    let activePageContext = this.props.activePageContext;
    const {
      first_name,
      last_name,
      gender,
      phone,
      description,
      collection,
      status
    } =
      patient || {};
    let totalQty = 0;
    return (
      <Modal trigger={this.props.children} closeIcon>
        <Modal.Header>
          {first_name} {last_name}{" "}
          {gender === "male" ? <Icon name="mars" /> : <Icon name="venus" />}
        </Modal.Header>
        <Modal.Content scrolling>
          {/* <Image size="medium" src="/images/wireframe/image.png" wrapped /> */}

          <Modal.Description>
            <Table columns={5}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Items checked out</Table.HeaderCell>
                  <Table.HeaderCell>Qty</Table.HeaderCell>
                  <Table.HeaderCell>Amount ($)</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {_.sortedUniqBy(collection, "id").map((product, i) => {
                  const { id, name, price, description } = product;
                  const qty = productCounter[id];
                  totalQty += qty;
                  return (
                    <Table.Row key={i}>
                      <Table.Cell>{name}</Table.Cell>
                      <Table.Cell>{qty}</Table.Cell>
                      <Table.Cell>
                        {(Number(qty) * Number(price)).toFixed(2)}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell>
                    <strong>Total Qty</strong>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <strong>{totalQty}</strong>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <strong>${this.props.totalAmount}</strong>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Popup
            trigger={
              <Button
                inverted
                color="blue"
                onClick={() => {
                  createAndDownloadPDF({
                    patient,
                    productCounter,
                    totalAmount: this.props.totalAmount,
                    totalQty
                  });
                }}
              >
                <Icon name="download" />
                Download
              </Button>
            }
            content="Download bill as PDF file"
          />

          <Popup
            trigger={
              <Button
                color="green"
                inverted
                onClick={() => {
                  this.handleConfirmation(
                    collection,
                    mainContext,
                    activePageContext
                  );
                }}
                loading={this.state.loading}
              >
                <Icon name="checkmark" /> Confirm
              </Button>
            }
            content="Confirm billing"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}
