import React, { Component } from 'react';
import { changeRecipientUID } from '../store/action/action'
import { connect } from 'react-redux';
import ChatBox from './chatbox';

class Chat extends Component {
    setRecipient = (recUser) => {
        const { changeRecUID, history } = this.props
        changeRecUID(recUser);
        history.push('/chatbox');
    }
    render() {
        const { allUsers } = this.props
        return (
            <div>
                <h1>Hello Chat</h1>
                {allUsers ?
                    <ul>
                        {allUsers.map((user, index) => {
                            return (
                                <li><button key={index} onClick={this.setRecipient.bind(this, user, user.username)}>{user.username}</button></li>
                            )
                        })
                        }
                    </ul> : null
                }
            </div>
        )
    }
}

const mapStateToProp = (state) => {
    return ({
        currentUser: state.root.currentUser,
        allUsers: state.root.users,
        allMessages: state.root.messages,
        recipientID: state.root.recipientID
    })
}
const mapDispatchToProp = (dispatch) => {
    return ({
        changeRecUID: (recUser) => {
            dispatch(changeRecipientUID(recUser));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Chat);