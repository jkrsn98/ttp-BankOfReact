import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login.js";
import Debits from "./components/Debits";
import axios from "axios";
import Credits from "./components/Credits.js";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountBalance: 333,
      debitData: [],
      creditData: [],
      currentUser: {
        userName: "john doe",
        memberSince: "01-01-1949",
      },
    };
  }

  async componentDidMount() {
    axios.get(`https://moj-api.herokuapp.com/debits`)
      .then((res) => {
        const data = res.data;
        this.setState({ debitData: data });
        let total = this.state.accountBalance;
        data.forEach((element) => (total -= element.amount));
        this.setState({ accountBalance: total });
      })
      .catch((err) => console.log(err));

    axios.get(`https://moj-api.herokuapp.com/credits`)
      .then((res) => {
        const data = res.data;
        this.setState({ creditData: data });
        let total = this.state.accountBalance;
        data.forEach((element) => {
          total += element.amount;
        });
        this.setState({ accountBalance: total });
      })
      .catch((err) => console.log(err));
  }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  Credits = (credit) => {
    let newCredit = [credit, ...this.state.creditData];
    this.setState({ creditData: newCredit });
    this.setState({
      accountBalance: this.state.accountBalance + parseInt(credit.amount),
    });
  };

  Debits = (debit) => {
    let newDebit = [debit, ...this.state.debitData];
    this.setState({ debitData: newDebit });
    this.setState({ accountBalance: this.state.accountBalance - debit.amount });

  };

  render() {
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );
    const LogInComponent = () => (
      <Login user={this.state.currentUser} mockLogIn={this.mockLogIn}{...this.props} />
    );
    const DebitComponent = () => (
      <Debits balance={this.state.accountBalance} debitData={this.state.debitData} Debits={this.Debits} />
    );
    const CreditComponent = () => (
      <Credits balance={this.state.accountBalance} creditData={this.state.creditData} Credits={this.Credits} />
    );
    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent}></Route>
          <Route exact path="/userProfile" render={UserProfileComponent}></Route>
          <Route exact path="/Login" render={LogInComponent} />
          <Route exact path="/Credits" render={CreditComponent}></Route>
          <Route exact path="/Debits" render={DebitComponent}></Route>
        </div>
      </Router>
    );
  }
}