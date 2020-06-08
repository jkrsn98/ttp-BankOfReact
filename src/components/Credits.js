import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Credits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creditData: {
                description: "",
                amount: 0.00,
                date: "",
            },
            isRedirect: false,
        };
    }

    handleChange = (e) => {
        const newCredit = { ...this.state.creditData };
        const input = e.target.name;
        const value = e.target.value;
        newCredit[input] = value;
        const date = new Date().toLocaleDateString("en-US");
        newCredit.date = date;
        this.setState({ creditData: newCredit });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addCredit(this.state.creditData);
        this.setState({ redirect: true });
    };

    render() {

        let renderData = this.props.creditData.map((credit) => {
            return (
                <div className="creditData">
                    <ul>
                        <li>Description: {credit.description}</li>
                        <li>Amount: {credit.amount}</li>
                        <li>Date: {credit.date}</li>
                    </ul>
                </div>
            );
        });

        return (
            <>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/Debits">Debit</Link>
                    <Link to="/Login">Login</Link>
                    <Link to="/UserProfile">User Profile</Link>
                </div>
                <div>
                    <h1>Add Transaction</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="amount">Amount</label>
                            <input
                                type="number"
                                name="amount"
                                placeholder="0.00"
                                value={this.state.creditData.amount}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                placeholder="Enter Credit Description"
                                name="description"
                                value={this.state.creditData.description}
                                onChange={this.handleChange}
                            />
                        </div>
                        <button>
                            Confirm
                </button>
                    </form>
                </div>
                {renderData}
            </>

        );
    }
}
