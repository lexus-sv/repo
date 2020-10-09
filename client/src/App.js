import React, {Component} from 'react';
import './App.css';
import {CreateNewBike} from "./components/CreateNewBike";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import {UserListRent} from "./components/UserListRent";
import {UserListAvailableBike} from "./components/UserListAvailableBike";

class App extends Component{
  constructor(props){
    super(props);
  }

    render() {
    return (
        <Container>
          <h1>Awesome bike rental</h1>
          <form className="App" >
            <CreateNewBike />
          </form>
          <UserListRent/>
          <UserListAvailableBike/>
        </Container>
    );
  }
}

export default App;
