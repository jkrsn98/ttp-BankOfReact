import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Debits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debitData: {
        debitDescription: "",
        amount: 0,
        date: "",
      },
      isRedirect: false,
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addDebit(this.state.debitData);
    this.setState({ isRedirect: true });
  };

  handleChange = (e) => {
    let input = e.target.name;
    let value = e.target.value;
    let newDebit = { ...this.state.debitData };
    newDebit[input] = value;
    const date = new Date().toLocaleDateString("en-US");
    newDebit.date = date;
    this.setState({ debitData: newDebit });
  };

  render() {
    let renderData = this.props.debitData.map((details) => {
      return (
        <div className="debitData">
          <ul>
            <li>Description: {details.description}</li>
            <li>Amount: {details.amount}</li>
            <li>Date: {details.date.toString()}</li>

          </ul>
        </div>

      );

    });

    return (
      <>
        <div>
          <Link to="/">Home</Link>
          <Link to="/Credits">Credits</Link>
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
                value={this.state.debitData.amount}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                placeholder="Enter Credit Description"
                name="description"
                value={this.state.debitData.description}
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
