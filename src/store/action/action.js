
import ActionTypes from '../constant/constant';
import history from '../../History';
// import createBrowserHistory from 'history/createBrowserHistory'
import firebase from 'firebase';
// import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory()

// const hsitory = createBrowserHistory()




// Initialize Firebase
var config = {
    apiKey: "AIzaSyAE6vqCmAU6iA43phS2y7b8vqAC2m6G7AY",
    authDomain: "chat-room-935bb.firebaseapp.com",
    databaseURL: "https://chat-room-935bb.firebaseio.com",
    projectId: "chat-room-935bb",
    storageBucket: "chat-room-935bb.appspot.com",
    messagingSenderId: "967204331612"
};
firebase.initializeApp(config);



export function changeUserName() {
    return dispatch => {
        dispatch({ type: ActionTypes.USERNAME, payload: 'Uzair' })
    }
}


export function signupAction(user) {

    return dispatch => {
        console.log('user', user);
        // history.push('/signin');

        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((createdUser) => {
                console.log('signed up successfully', createdUser.uid);
                delete user.password;
                user.uid = createdUser.uid;
                firebase.database().ref('users/' + createdUser.uid + '/').set(user)
                    .then(() => {
                        firebase.database().ref('users/').once('value')
                            .then((userData) => {
                                let allUsers = userData.val();
                                let currentUserUid = firebase.auth().currentUser.uid;
                                dispatch({ type: ActionTypes.ALLUSERS, payload: allUsers })
                                dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid })
                                firebase.database().ref('message/').once('value')
                                    .then((messagesData) => {
                                        let messages = messagesData.val();
                                        console.log(messages);
                                        dispatch({ type: ActionTypes.MESSAGES, payload: messages })
                                        history.push('/chat');
                                    })

                            })
                    })


            })



    }
}



export function signinAction(user) {
    return dispatch => {
        console.log('user in signin', user);
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((signedinUser) => {
                firebase.database().ref('users/').once('value')
                    .then((userData) => {
                        let allUsers = userData.val();
                        console.log('allUsers********', allUsers)
                        let currentUserUid = firebase.auth().currentUser.uid;
                        let allUsersArr = [];
                        for (var key in allUsers) {
                            allUsersArr.push(allUsers[key]);
                        }
                        console.log(allUsersArr);
                        dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersArr })
                        dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid })
                        firebase.database().ref('message/').once('value')
                            .then((messagesData) => {
                                // const messages = []
                                // let messages = messagesData.val();
                                // console.log('messages', Object.values(messages));
                                let messages = [...Object.values(messagesData.val())];
                                dispatch({ type: ActionTypes.MESSAGES, payload: messages })
                                history.push('/chat');
                            })
                    })
            })
    }
}






export function changeRecipientUID(recUser) {
    console.log(recUser)
    return dispatch => {
        dispatch({ type: ActionTypes.CHANGERECPUID, payload: recUser.uid })
        dispatch({ type: ActionTypes.USERNAME, payload: recUser.username })
    }
}



export function sendMessage(message) {
    return dispatch => {
        // message.senderID = firebase.auth().currentUser.uid;
        firebase.database().ref('message/').push(message)
            .then(() => {
                console.log('message sent')
            })

    }
}