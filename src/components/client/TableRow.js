import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TableRow extends Component {
  render() {
    return (
        <tr>
          <td>{this.props.obj.nit}</td>
          <td>{this.props.obj.full_name}</td>
          <td>{this.props.obj.address}</td>
          <td>{this.props.obj.phone}</td>
          <td>{this.props.obj.credit_limit}</td>
          <td>{this.props.obj.available_credit}</td>
          <td>
            <Link to={"/edit/"+this.props.obj.id} className="btn btn-primary">Edit</Link>
          </td>
        </tr>
    );
  }
}

export default TableRow;