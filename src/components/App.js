import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import QuestionForm from "./QuestionForm";
import Leaderboard from "./Leaderboard";
import PollView from "./PollView";
import PrivateRoute from "../authentication/privateroute";
import NotFound from "./404Page";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div className="App">
        <Router>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/add" component={QuestionForm} />
          <PrivateRoute path="/leaderboard" component={Leaderboard} />
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/404-page" component={NotFound} />
          <PrivateRoute path="/questions/:id" component={PollView} />
        </Router>
      </div>
    );
  }
}

export default connect()(App);
