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
    _textAreaHandler(event) {
        this.setState({
            textAreaVal: event.target.value
        })
    }
    sendMessage() {
        console.log(this.state.textAreaVal);
        let messageData = {
            senderID: this.props.currentUser,
            receiverID: this.props.recipientID,
            message: this.state.textAreaVal
        }
        console.log(messageData, 'messageDatamessageData');
        this.props.sendMessage(messageData);
    }
    render() {
        console.log(this.props.messages, 'aaaaaaaaaa')
        return (
            <div>
                <h2>{this.props.recipientName}</h2>
                <div style={{ width: '250px', height: '300px', border: '2px solid black' }}>

                    {this.props.messages.map((msg, ind) => {
                        return (msg.receiverID === this.props.recipientID && msg.senderID === this.props.currentUser) || (msg.receiverID === this.props.currentUser && msg.senderID === this.props.recipientID) ?
                            <ul style={{ border: '1px solid red', height: '40px', overflow: 'scroll' }}>
                                {
                                    msg.receiverID === this.props.recipientID ?
                                        <li style={{ listStyleType: 'none', textAlign: 'start', border: '1px solid blue' }}>
                                            {msg.message}
                                        </li>
                                        :
                                        <li style={{ listStyleType: 'none', textAlign: 'end', border: '1px solid blue' }}>
                                            {msg.message}
                                        </li>
                                }
                            </ul>
                            :
                            null
                    })}

                </div>
                <textarea value={this.state.textAreaVal} onChange={this._textAreaHandler.bind(this)}></textarea>
                <button onClick={this.sendMessage.bind(this)}>send</button>


            </div>
        )
    }
}

function mapStateToProp(state) {
    console.log('state**', state)
    return ({
        currentUser: state.root.currentUser,
        recipientID: state.root.recipientID,
        messages: state.root.messages,
        recipientName: state.root.userName
    })
}

function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
        sendMessage: (msg) => {
            dispatch(sendMessage(msg));
        }
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(ChatBox);
