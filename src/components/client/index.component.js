import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import { Link } from 'react-router-dom';

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {clients: []};
    }

    componentDidMount(){
      axios.get('http://localhost:4000/api/clients')
        .then(response => {
          this.setState({ clients: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    
    tabRow(){
      return this.state.clients.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    render() {
      return (
        <div>
          <h3 style={{ marginTop: 20 }} align="center">Clients List</h3>
          <Link to={'/create'} className="btn btn-primary">New</Link>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Nit</th>
                <th>Full name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Credit limit</th>
                <th>Available credit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }