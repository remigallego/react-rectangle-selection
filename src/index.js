import React from "react";
import "./index.css";

export default class ReactRectangleSelection extends React.Component {
  constructor(props) {
    super(props);
    this.animationInProgress = null;
    this.state = {
      hold: false,
      selectionBox: false,
      selectionBoxOrigin: [0, 0],
      selectionBoxTarget: [0, 0],
      animation: ""
    };
  }

  handleTransformBox() {
    const { selectionBoxOrigin, selectionBoxTarget } = this.state;
    if (
      selectionBoxOrigin[1] > selectionBoxTarget[1] &&
      selectionBoxOrigin[0] > selectionBoxTarget[0]
    )
      return "scaleY(-1) scaleX(-1)";

    if (selectionBoxOrigin[1] > selectionBoxTarget[1]) return "scaleY(-1)";
    if (selectionBoxOrigin[0] > selectionBoxTarget[0]) return "scaleX(-1)";
    return null;
  }

  closeSelectionBox() {
    if (this.props.onMouseUp) this.props.onMouseUp();
    this.setState({
      hold: false,
      animation: "react-rectangle-selection--fadeout"
    });
    this.animationInProgress = setTimeout(() => {
      this.setState({ animation: "" });
      this.setState({ selectionBox: false });
      this.animationInProgress = null;
    }, 300);
  }

  handleMouseDown(e) {
    if (this.props.disabled) return;
    let doubleClick = false;
    clearTimeout(this.animationInProgress);
    this.animationInProgress = null;
    this.setState({ selectionBox: false, animation: "" });

    if (
      this.state.animation.length > 0 &&
      e.target.id === "react-rectangle-selection"
    ) {
      this.setState({ selectionBox: false, animation: "" });
      doubleClick = true;
    }

    this.setState({
      hold: true,
      selectionBoxOrigin: [e.nativeEvent.pageX, e.nativeEvent.pageY],
      selectionBoxTarget: [e.nativeEvent.pageX, e.nativeEvent.pageY]
    });
  }

  render() {
    const baseStyle = {
      zIndex: 10,
      left: this.state.selectionBoxOrigin[0],
      top: this.state.selectionBoxOrigin[1],
      height: Math.abs(
        this.state.selectionBoxTarget[1] - this.state.selectionBoxOrigin[1] - 1
      ),
      width: Math.abs(
        this.state.selectionBoxTarget[0] - this.state.selectionBoxOrigin[0] - 1
      ),
      userSelect: "none",
      transformOrigin: "top left",
      transform: this.handleTransformBox()
    };
    return (
      <div
        style={{ height: "inherit", width: "inherit" }}
        onMouseLeave={() => {
          this.closeSelectionBox();
        }}
        onMouseDown={e => this.handleMouseDown(e)}
        onMouseUp={() => this.closeSelectionBox()}
        onMouseMove={evt => {
          if (this.state.hold && !this.state.selectionBox) {
            if (this.props.onMouseDown) this.props.onMouseDown();
            this.setState({ selectionBox: true });
          }
          if (this.state.selectionBox && !this.animationInProgress) {
            this.setState({
              selectionBoxTarget: [evt.nativeEvent.pageX, evt.nativeEvent.pageY]
            });

            this.props.onSelect(evt, {
              origin: this.state.selectionBoxOrigin,
              target: this.state.selectionBoxTarget
            });
          }
        }}
      >
        {this.state.selectionBox && (
          <div
            className={`react-rectangle-selection ${this.state.animation}`}
            id={"react-rectangle-selection"}
            style={Object.assign(baseStyle, this.props.style)}
          />
        )}
        {this.props.children}
      </div>
    );
  }
}
