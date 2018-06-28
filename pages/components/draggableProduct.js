import React, { Component } from "react";

import Draggable from "react-draggable";
import Product from "./draggableProduct/product";

export default class DraggableProduct extends Component {
  static async getInitialProps() {}

  render() {
    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[25, 25]}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
      >
        <div className="handle">
          <Product product={this.props.product} />
        </div>
      </Draggable>
    );
  }
}
