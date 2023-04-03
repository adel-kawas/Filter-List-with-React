import React, { Component } from "react";
import CardList from "../Components/CardList";
import SearchBox from "../Components/SearchBox";
import "../Containers/App.css";
import Scroll from '../Components/Scroll'
import ErrorBoundry from "../Components/ErrorBoundry";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(responce =>  responce.json())
      .then(users => this.setState({ robots: users }));
  }

  OnsearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const {robots, searchfield} = this.state;
    const filteredRobots = robots.filter((robots) => {
      return robots.name
        .toLowerCase()
        .includes(searchfield.toLowerCase());
    });
    if (!robots.length){
      return <h1>Loading</h1>
    } else {

     return (
      <div className="tc">
        <h1 className="f1">Robot Friends</h1>
        <SearchBox searchChange={this.OnsearchChange} />
      <Scroll>
      <ErrorBoundry>
        <CardList robots={filteredRobots} />
        </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}}

export default App;
