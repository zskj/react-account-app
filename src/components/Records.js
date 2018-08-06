import React, { Component } from 'react';
import Record from './Record';
import * as RecordsAPI from '../utils/RecorsAPI';
import RecordForm from './RecordForm';
import AmountBox from './AmountBox'; // Import

class Records extends Component {
constructor(){
  super();
  this.state ={
    error : null,
    isLoaded : false,
    records:[]
  }
}

componentDidMount(){
 RecordsAPI.getAll().then(
  response => this.setState({
    isLoaded:true,
    records:response.data
  })
  ).catch(

  error => this.setState({
    isLoaded:true,
    error
  })

)
}

addRecord(record){
  this.setState({
    error: null,
    isLoaded: true,
    records: [
      ...this.state.records,
      record
    ]
  })

}

updateRecord(record, data) {
  const recordIndex = this.state.records.indexOf(record);
  const newRecords  = this.state.records.map( (item, index) => {
    if(index !== recordIndex) {
      // This isn't the item we care about - keep it as-is
      return item;
    }
     // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...data
    };
  });
  this.setState({
    records: newRecords
  });
}

deleteRecord(record) {
  const recordIndex = this.state.records.indexOf(record);
  const newRecords = this.state.records.filter( (item, index) => index !== recordIndex);
  this.setState({
    records: newRecords
  });
}

credits() {
  let credits = this.state.records.filter((record) => {
    return record.amount >= 0;
  })

  return credits.reduce((prev, curr) => {
    return prev + Number.parseInt(curr.amount, 0)
  }, 0)
}

debits() {
  let debits = this.state.records.filter((record) => {
    return record.amount < 0;
  })

  return debits.reduce((prev, curr) => {
    return prev + Number.parseInt(curr.amount, 0)
  }, 0)
}

balance() {
  return this.credits() + this.debits();
}




  render() {

    const {isLoaded,error,records} = this.state;
    let recordsComponent ;
   if(error){
    recordsComponent= 'Error:'+ error.message
   }else if(!isLoaded){
    recordsComponent= 'Loading ...'
   }else{
    recordsComponent= (
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>日期</th>
              <th>事项</th>
               <th>金额</th>
               <th>操作</th>
            </tr>
          </thead>
          <tbody>
          {records.map((record)=><Record key = {record.id}  {...record} record={record} 
          handleEditRecord={this.updateRecord.bind(this)} 
          handleDeleteRecord={this.deleteRecord.bind(this)}
          
          />)}
          </tbody>
        </table>
    );
   }
   return (
     <div>
       <h2>记账表</h2>
       <div className="row mb-3">
          <AmountBox text="收入" type="success" amount={this.credits()} />
          <AmountBox text="支出" type="danger" amount={this.debits()} />
          <AmountBox text="余额" type="info" amount={this.balance()} />
        </div>
       <RecordForm handleNewRecord={this.addRecord.bind(this)}/>
        {recordsComponent}
     </div>

   );


  }
}

export default Records ;
