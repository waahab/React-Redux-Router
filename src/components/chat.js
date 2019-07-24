import React, { Component } from 'react';
import { changeRecipientUID } from '../store/action/action'
import { connect } from 'react-redux';
import ChatBox from './chatbox';

class Chat extends Component {
    constructor(props) {
        super(props)
    }
    setRecipient(recUser) {
        console.log('recipient', recUser);

        this.props.changeRecUID(recUser);
        this.props.history.push('/chatbox');
    }
    render() {
        console.log(this.props.currentUser, '////////////////');
        console.log(this.props.allUsers, 'allUsers')
        console.log(this.props.allMessages, 'aaaaaaaaaa');
        return (
            <div>
                <h1>Hello Chat</h1>
                {this.props.allUsers ?
                    <ul>
                        {

                            this.props.allUsers.map((user, index) => {
                                return (
                                    <li><button key={index} onClick={this.setRecipient.bind(this, user, user.username)}>{user.username}</button></li>
                                )
                            })
                        }
                    </ul>
                    :
                    null
                }

                {/* <ChatBox /> */}

            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        currentUser: state.root.currentUser,
        allUsers: state.root.users,
        allMessages: state.root.messages,
        recipientID: state.root.recipientID
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
        changeRecUID: (recUser) => {
            dispatch(changeRecipientUID(recUser));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Chat);