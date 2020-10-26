import * as React from "react";
import {Component} from 'react';
import {connect, useStore} from 'react-redux';
import {CreateChart, FetchCharts, SlectCsNode} from './actions'
import FlashMessage from './components/FlashMessage'
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import CSTreeView from './components/CSTreeView';
import { stringify } from "querystring";
import { AnyRecordWithTtl } from "dns";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import type {TopState} from './types';
import {useDispatch, useSelector} from "react-redux";


class App extends Component<TopState, {}> {
  componentDidMount() {
    FetchCharts();
  }

  onCreateChart = ({title, description, type, color1, color2} : { title: string, description: string, type:string, color1:string, color2:string})=>{
    CreateChart({title, description, type, color1, color2});
  }

  onSelectCsNode = (name : any)=>{
    SlectCsNode(name);
  }
    
   onCreateTask = ({title, description} : {title:string, description:string}) =>{
    //  this.props.dispatch.CreateTask({title, description}));
    }
    onStatusChange=(id:any, status:any)=>{
      // this.props.dispatch(EditTask(id, {status}));
    }
   render (){
    return (
      <div>
      <header className="topNav center">
        Dashboard Prototype
      </header>
      <main className='container'>
          {this.props.error &&
          <FlashMessage message={this.props}></FlashMessage>
          }
        <aside className="sidenav">
          <CSTreeView  
             csCharts =  {this.props.csCharts}
             onSelectCsNode = {this.onSelectCsNode}
          />
        </aside>
        <div className="dashboard-content">
          <Dashboard 
            showNewCardForm={true}
            charts={this.props.charts}
            isLoading={this.props.isLoading}
            onCreateChart = {this.onCreateChart}>
          </Dashboard>
        </div>  
      </main>
      </div>
    );
  }
}

function mapStateToProps(state : TopState) : TopState {
  const { charts, csCharts, isLoading, error } = state
  return state;
}

export default connect(mapStateToProps)(App);


// export default App;
