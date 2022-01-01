import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMessages } from "../store/actions/messages";

class MessageList extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }

  render() {
    const { messages } = this.props;
    console.log(messages)
    let messageList = messages.map(m => (
      <div key={m._id}>
        {m.name}
      </div>
    ));

    return (
      <div>
        <h1>Messages:</h1>
        {messageList}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

export default connect(mapStateToProps, { fetchMessages })(MessageList);