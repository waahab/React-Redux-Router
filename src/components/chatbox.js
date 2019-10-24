import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendMessage } from '../store/action/action'

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textAreaVal: ''
        }
    }
    _textAreaHandler = (event) => {
        this.setState({
            textAreaVal: event.target.value
        })
    }
    sendMessage = () => {
        const { sendMessage, currentUser, recipientID } = this.props
        const { textAreaVal } = this.state
        let messageData = {
            senderID: currentUser,
            receiverID: recipientID,
            message: textAreaVal
        }
        sendMessage(messageData);
    }
    render() {
        const { recipientName, messages, recipientID, currentUser } = this.props;
        const { textAreaVal } = this.state
        return (
            <div>
                <h2>{recipientName}</h2>
                <div style={{ width: '250px', height: '300px', border: '2px solid black' }}>

                    {messages.map((msg, ind) => {
                        return (msg.receiverID === recipientID && msg.senderID === currentUser) || (msg.receiverID === currentUser && msg.senderID === recipientID) ?
                            <ul style={{ border: '1px solid red', height: '40px', overflow: 'scroll' }}>
                                {msg.receiverID === recipientID ?
                                    <li style={{ listStyleType: 'none', textAlign: 'start', border: '1px solid blue' }}>
                                        {msg.message}
                                    </li>
                                    :
                                    <li style={{ listStyleType: 'none', textAlign: 'end', border: '1px solid blue' }}>
                                        {msg.message}
                                    </li>}
                            </ul>
                            :
                            null
                    })}

                </div>
                <textarea value={textAreaVal} onChange={this._textAreaHandler.bind(this)}></textarea>
                <button onClick={this.sendMessage.bind(this)}>send</button>
            </div>
        )
    }
}

const mapStateToProp = (state) => {
    console.log('state**', state)
    return ({
        currentUser: state.root.currentUser,
        recipientID: state.root.recipientID,
        messages: state.root.messages,
        recipientName: state.root.userName
    })
}

const mapDispatchToProp = (dispatch) => {
    return ({
        sendMessage: (msg) => {
            dispatch(sendMessage(msg));
        }
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(ChatBox);
