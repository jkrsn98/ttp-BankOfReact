import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        return (
            <div>
            <h1>Bank of React</h1>

            <Link to="/login">Login</Link><br></br>
            <Link to="/userProfile">User Profile</Link><br></br>
            <Link to="/debits">Debits</Link><br></br>
            <Link to="/credits">Credits</Link><br></br>
            <AccountBalance accountBalance={this.props.accountBalance}/>
            </div>
        );
    }
}
