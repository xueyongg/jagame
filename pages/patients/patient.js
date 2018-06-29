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
  Divider
} from "semantic-ui-react";
import Search from "../components/search";
import { productSum } from "../../utility/sum";

export default class Patient extends Component {
  static async getInitialProps({ patient }) {
    return { patient };
  }

  render() {
    const {
      first_name,
      last_name,
      gender,
      phone,
      description,
      collection
    } = this.props.patient;
    // console.log("< Active User: ", this.props.patient);
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Segment basic>
                <Header as="h2">
                  {_.capitalize(first_name)} {_.capitalize(last_name)}
                </Header>
                <Message>
                  {/* <Message.Header>Changes in Service</Message.Header> */}
                  <p>{description ? description : "No description"}</p>
                </Message>
                <Button icon>
                  <Icon name="github" />
                  Download
                </Button>
                <Button icon>
                  <Icon name="github" /> Check Out
                </Button>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <Patient_selected_items selectedProducts={collection} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as="h3" icon>
                Product Search
              </Header>
              <Search />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const Patient_selected_items = ({ selectedProducts }) => {
  if (selectedProducts)
    return (
      <div>
        <Grid.Row>
          <Header as="h3" icon>
            Selected {selectedProducts.length} product{selectedProducts.length !==
            0
              ? "s"
              : ""}
            <Label as="a">${productSum(selectedProducts)}</Label>
          </Header>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Image
              src="https://react.semantic-ui.com/images/wireframe/image.png"
              size="small"
            />
          </Grid.Column>
        </Grid.Row>
      </div>
    );
  else {
    return <Segment loading />;
  }
};
