import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.onChangeNit = this.onChangeNit.bind(this);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      countries: [],
      departments:[],
      cities:[],
      full_name: '',
      nit: '',
      address: '',
      phone: '',
      credit_limit: 0,
      available_credit: 0,
      city: '',
      department: '',
      country: '',
    }
  }

  componentDidMount() {
      axios.get('http://localhost:4000/api/clients/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                full_name: response.data.full_name,
                nit: response.data.nit,
                address: response.data.address,
                phone: response.data.phone,
                credit_limit: response.data.credit_limit,
                available_credit: response.data.available_credit,
                city: response.data.city,
                department: response.data.department,
                country: response.data.country
              });

              axios.get('http://localhost:4000/api/countries')
              .then(response => {
                this.setState({ countries: response.data });
              })
              .catch(function (error) {
                console.log(error);
              })


          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangeNit(e) {
    this.setState({
      nit: e.target.value
    });
  }
  
  onChangeFullName(e) {
    this.setState({
      full_name: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }
  
  onChangePhoneNumber(e){
    this.setState({
      phone: e.target.value
    });
  }
  
  onChangeCountry(e){
    this.setState({
      country: e.target.value
    });

    axios.get('http://localhost:4000/api/departments/country/'+ e.target.value)
    .then(response => {
      this.setState({ departments: response.data });

      
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  
  onChangeDepartment(e){
    this.setState({
      department: e.target.value
    });

    axios.get('http://localhost:4000/api/cities/department/'+ e.target.value)
    .then(response => {
      this.setState({ cities: response.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  
  onChangeCity(e){
    this.setState({
      city: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      full_name: this.state.full_name,
      nit: this.state.nit,
      address: this.state.address,
      phone: this.state.phone,
      credit_limit: this.state.credit_limit,
      available_credit: this.state.available_credit,
      city: this.state.city,
      department: this.state.department,
      country: this.state.country
     };
 
    axios.patch('http://localhost:4000/api/clients/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/clients');
  }
 
  render() {

    let countriesList = this.state.countries.length > 0
      && this.state.countries.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}</option>
      )
    }, this);

    let departmentsList = this.state.departments.length > 0
      && this.state.departments.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}</option>
        )
    }, this);

    let citiesList = this.state.cities.length > 0
      && this.state.cities.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}</option>
      )
    }, this);

    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Business</h3>
            <form onSubmit={this.onSubmit}>
               <div className="form-group">
                    <label>Nit: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.nit}
                      onChange={this.onChangeNit}
                      />
                </div>
                <div className="form-group">
                    <label>Full Name: </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.full_name}
                      onChange={this.onChangeFullName}
                      />
                </div>
                <div className="form-group">
                    <label>Phone Number: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.phone}
                      onChange={this.onChangePhoneNumber}
                      />
                </div>
                <div className="form-group">
                    <label>Address: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.address}
                      onChange={this.onChangeAddress}
                      />
                </div>
                <div className="form-group">
                    <label>Country: </label>
                    <select className="form-control"   
                      value={this.state.country}
                      onChange={this.onChangeCountry}>
                          <option></option>
                      {countriesList}
                    </select>
                </div>
                <div className="form-group">
                    <label>State: </label>
                    <select className="form-control"   
                      value={this.state.department}
                      onChange={this.onChangeDepartment}>
                          <option></option>
                      {departmentsList}
                    </select>
                </div>

                <div className="form-group">
                    <label>City: </label>
                    <select className="form-control"   
                      value={this.state.city}
                      onChange={this.onChangeCity}>
                          <option></option>
                      {citiesList}
                    </select>
                </div>
                
                <div className="form-group">
                    <input type="submit" 
                      value="Save client" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}