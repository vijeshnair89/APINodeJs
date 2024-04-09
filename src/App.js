import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Alert } from 'reactstrap'
import UserComponent from './user-component.js'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      items: [],
      error: false,
      errorMsg: []
    }

    this.getUsers = this.getUsers.bind(this)

    this.errorcount = 0
    this.error = false
    this.errorMsg = []
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers() {

    axios.get("https://<your-api-id>.execute-api.us-east-1.amazonaws.com/prod/api/users")
      .then(res => {
        console.log(res.data)
        const items = []
        res.data.forEach(item => {
          items.push(
            <UserComponent id={item.userid} firstname={item.FirstName} lastname={item.LastName} department={item.Department} location={item.Location} />
          )
        })
        this.error = false
        this.setState({
          ...this.state,
          items
        })
      }).catch(err => {

        this.error = true
        this.errorcount++
        const errorMsg = [...this.state.errorMsg]
        errorMsg.push(<Alert color="danger">{new Date().toLocaleString() + " - " + err}</Alert>)

        this.setState({
          error: true,
          errorMsg
        })

      })
  }
  render() {
    return (
      <div>
        <div id="banner" className="banner">
          <img src="/logo-white-text.png" alt="" className="whiz-logo" />
        </div>
        <div className="content-div">
        <div className="title" id="user-title">
          <h3>User Details</h3>
        </div>
          <div className="content">
            <div> {this.state.errorMsg}</div>
            <div>{this.state.items}</div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
