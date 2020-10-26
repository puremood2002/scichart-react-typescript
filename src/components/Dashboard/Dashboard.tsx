import * as React from "react";
import {Component}  from 'react';
import ChartList from '../ChartList';
import template from "./Dashboard.jsx";
import Button from '@material-ui/core/Button';
import {DashboardProps, DashboardState} from '../../types';

import SettingDialog from '../SettingDialog';
const CHART_TYPES = ['line', 'bubble', 'mountain', 'bar', 'scatter', 'candle'];

class Dashboard  extends React.Component<DashboardProps, DashboardState> {
  constructor(props : any)
    {
        super(props);
        this.state ={
            showNewCardsForm:false,
        };
    }
 
  toggleForm=()=>{
      this.setState({showNewCardsForm: !this.state.showNewCardsForm});
  }

  closeDialog=()=>{
    this.toggleForm();
  }
  render() {
    if (this.props.isLoading) {
      return (
        <div className="tasks-loading">
          Loading...
        </div>
      );
    }
    return(
      <div >
      <div className="dashboard-content">
      <Button variant="contained" 
          onClick={this.toggleForm}>
              + New Chart
      </Button>          
      </div>
         <div>
             {this.state.showNewCardsForm && 
             <SettingDialog 
             onCreateChart = {this.props.onCreateChart} 
             showDialog={this.state.showNewCardsForm}
              closeDialog={this.closeDialog}
             />}
        </div>
        
   <div className="flex-container wrap content">
       <ChartList charts={this.props.charts}/>
   </div>
   </div>
  );
}
}

export default Dashboard;
