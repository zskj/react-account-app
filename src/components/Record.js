import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as RecordsAPI from '../utils/RecorsAPI';
import { confirmAlert } from 'react-confirm-alert'; // Import
import '../react-confirm-alert.css' // Import css


export default class Record extends Component {
  constructor(props){
    super(props);
    this.state = {
      edit : false
    }
  }
  handleToggle(){
    this.setState({
      edit : !this.state.edit
    })
  }

  handleEdit(e){
    e.preventDefault();
    const record = {
      date: this.refs.date.value,
      title: this.refs.title.value,
      amount: Number.parseInt(this.refs.amount.value, 0)
    }
    RecordsAPI.update(this.props.id, record).then(
      response => {
        this.props.handleEditRecord(this.props.record, response.data);
        this.setState({
          edit:false
        })
      }
    ).catch(
      error => console.log(error.message)
    )
  }

  handleDelete(e){
    e.preventDefault();
      confirmAlert({
        title: '删除',
        message: '确定要删除？',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {  
              RecordsAPI.remove(this.props.id).then(
              response => {
                this.props.handleDeleteRecord(this.props.record);
              }
            ).catch(
              error => console.log(error.message)
            )
            console.log('proceed!') ;}
          },
          {
            label: 'No',
            onClick: () => {}
          }
        ]
      })
   
  }




  recordRow(){
    return (
      <tr key={this.props.id}>
      <td>{this.props.date}</td>
      <td>{this.props.title}</td>
      <td>{this.props.amount}</td>
      <td>
        <button className='btn btn-info mr-1' onClick={this.handleToggle.bind(this)}>编辑</button>
        <button className='btn btn-danger'    onClick={this.handleDelete.bind(this)}>删除</button>
      </td>
      </tr>
  );
  }

  recordForm(){
    return (
      <tr>
      <td><input type="text" className="form-control" defaultValue={this.props.date} ref="date" /></td>
      <td><input type="text" className="form-control" defaultValue={this.props.title} ref="title" /></td>
      <td><input type="text" className="form-control" defaultValue={this.props.amount} ref="amount" /></td>
      <td>
        <button className='btn btn-info mr-1' onClick={this.handleEdit.bind(this)}>更新</button>
        <button className='btn btn-danger' onClick={this.handleToggle.bind(this)}>放弃</button>
      </td>
      </tr>
  );

  }




  render() {
    if(this.state.edit){

      return this.recordForm();

    }else{

      return this.recordRow();
    }

    



  }
}

Record.propTypes = {
  id : PropTypes.string,
  date:PropTypes.string,
  title:PropTypes.string,
  amount:PropTypes.number
}

