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
  close = () => this.setState({ open: false });

  handleConfirmation(collection) {
    this.setState({ loading: true });
    const url = "https://github.com/fredsted/webhook.site";

    let response = axios({
      method: "POST",
      url,
      params: {
        collection
      }
    })
      .then(res => {
        this.setState({ loading: false, open: false });
      })
      .catch(e => {
        console.log(e);
      });
    // change the activeUser to status: completed
  }

  render() {
    let patient = this.props.patient;
    let productCounter = this.props.productCounter;
    const {
      first_name,
      last_name,
      gender,
      phone,
      description,
      collection,
      status
    } = patient;
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
                {collection.map((product, i) => {
                  console.log("product", product);
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
                  <Table.HeaderCell>Total Qty</Table.HeaderCell>
                  <Table.HeaderCell>{totalQty}</Table.HeaderCell>
                  <Table.HeaderCell>${this.props.totalAmount}</Table.HeaderCell>
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
                  createAndDownloadPDF({});
                }}
              >
                <Icon name="download" />
                Download
              </Button>
            }
            content="Download bill as PDF file"
          />
          {/* <Popup
            trigger={
              <Button
                color="red"
                inverted
                onClick={() => {
                  this.close();
                }}
              >
                <Icon name="remove" /> Back
              </Button>
            }
            content="Close confirmation"
          /> */}
          <Popup
            trigger={
              <Button
                color="green"
                inverted
                onClick={() => {
                  this.handleConfirmation(collection);
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
