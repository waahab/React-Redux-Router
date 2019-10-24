import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class About extends Component {
    render() {
        const { userName } = this.props
        return (
            <div>
                <h1>Hello About {userName}</h1>
                <Link to='/'>Go to Home</Link>
            </div>
        )
    }
}

const mapStateToProp = (state) => {
    return ({
        userName: state.root.userName
    })
}


export default connect(mapStateToProp, null)(About);
