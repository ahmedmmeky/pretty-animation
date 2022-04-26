import React, { Component } from "react";
import { Runtime, Inspector } from "@observablehq/runtime";
import notebook from "@observablehq/how-to-embed-a-notebook-in-a-react-app";
import PlotToolTip from "./PlotToolTip";
class App extends Component {
  state = { speed: 0.1 };
  animationRef = React.createRef();

  componentDidMount() {
    const runtime = new Runtime();
    runtime.module(notebook, (name) => {
      if (name === "animation") {
        return new Inspector(this.animationRef.current);
      }
      if (name === "mutable speed") {
        return {
          fulfilled: (value) => {
            this.animationSpeed = value;
          },
        };
      }
    });
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextState.speed !== this.state.speed) {
      this.animationSpeed.value = nextState.speed;
    }
  }

  setSpeed = (event) => {
    this.setState({ speed: event.target.valueAsNumber });
  };

  render() {
    return (
      <div className="App">
        <div ref={this.animationRef}></div>
        <small>Speed: {this.state.speed}</small>
        <br />
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={this.state.speed}
          onChange={this.setSpeed}
        />
        <PlotToolTip />
      </div>
    );
  }
}

export default App;
