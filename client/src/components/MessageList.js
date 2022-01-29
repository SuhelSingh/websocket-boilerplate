import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchMessages } from "../store/actions/messages";

const MessageList = props => {

  useEffect(() => {props.fetchMessages()},[]);
  
  let messageList = (props.messages).map(m => (
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


function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

export default connect(mapStateToProps, { fetchMessages })(MessageList);