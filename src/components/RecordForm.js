import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecorsAPI';


export default class RecordForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      date:'',
      title:'',
      amount:''
    }

  }

  vaild(){
    return this.state.date && this.state.title && this.state.amount ;
  }

handleChange(e){
let obj; 
const {name, value} = e.target;
obj = {} ;
obj[''+ name] = value ;
this.setState(obj);
}

handleSubmit(event) {
  event.preventDefault();
  const data = {
    date: this.state.date,
    title: this.state.title,
    amount: Number.parseInt(this.state.amount, 0)
  };

  RecordsAPI.create(data).then(
    response => {
      this.props.handleNewRecord(response.data);
      this.setState({
        date: "",
        title: "",
        amount: ""
      })
    }
  ).catch(
    error => console.log(error.message)
  )
}

  render() {
    return (
      <form className='form-inline mb-3' onSubmit={this.handleSubmit.bind(this)}>
      <div className='form-group mr-1'>
      <input className='form-control' placeholder="日期" onChange={this.handleChange.bind(this)}  name='date' value={this.state.date}/>
      </div>  
      <div className='form-group mr-1'>
      <input className='form-control' placeholder="事项" onChange={this.handleChange.bind(this)} name='title' value={this.state.title}/>
      </div> 
      <div className='form-group mr-1'>
      <input className='form-control' placeholder="金额" onChange={this.handleChange.bind(this)}  name='amount' value={this.state.amount}/>
      </div> 
      <button type='submit' className='btn btn-primary' disabled={!this.vaild()}>创建</button>
      </form>
    );
  }
}


