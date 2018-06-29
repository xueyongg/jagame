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

export default class CheckoutConfirmation extends Component {
  static async getInitialProps({}) {
    return {};
  }

  render() {
    return (
      <Modal trigger={<Button>Scrolling Content Modal</Button>}>
        <Modal.Header>Profile Picture</Modal.Header>
        <Modal.Content image scrolling>
          <Image size="medium" src="/images/wireframe/image.png" wrapped />

          <Modal.Description>
            <Header>Modal Header</Header>
            <p>
              This is an example of expanded content that will cause the modal's
              dimmer to scroll
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted>
            <Icon name="remove" /> Back
          </Button>
          <Button color="green" inverted>
            <Icon name="checkmark" /> Proceed
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
