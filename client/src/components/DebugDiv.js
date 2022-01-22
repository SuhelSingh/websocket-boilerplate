import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchDebug } from "../store/actions/debug";

class DebugDiv extends Component {
  componentDidMount() {
    this.props.fetchDebug();
  }

  render() {
    const { debug } = this.props;
    console.log(debug)

    return (
      <div>
        {this.props.debug}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    debug: state.debug
  };
}

export default connect(mapStateToProps, { fetchDebug })(DebugDiv);