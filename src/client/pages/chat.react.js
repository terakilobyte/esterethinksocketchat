/**
 * Created by nathanleniz on 6/16/15.
 */
import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import Editable from '../components/editable.react';
import React from 'react';
import {msg} from '../intl/store';
import * as actions from '../chat/actions';
import immutable from 'immutable';

class Chat extends Component {

  constructor(props) {
    super(props);
  }

  handleKeys(e) {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    const input = React.findDOMNode(this.refs.chatInput).value;
    React.findDOMNode(this.refs.chatInput).value = '';
    actions.sentMessage(input);
  }

  render() {
    const {chat} = this.props;
    const messages = chat.get('messages')
      .map((message, index) => {
        return <p key={index}>{message}</p>;
      });

    return (
      <DocumentTitle title={msg('chat.title')}>
        <div className="chat-page">
          <h2>Chat</h2>
          {messages}
          <input onKeyPress={this.handleKeys.bind(this)}
                 ref="chatInput"
                 type="text" />
          <input onClick={this.handleSubmit.bind(this)}
                 type="submit" />
        </div>
      </DocumentTitle>
    );
  }

}

Chat.propTypes = {
  chat: React.PropTypes.instanceOf(immutable.Map).isRequired
};

export default Chat;