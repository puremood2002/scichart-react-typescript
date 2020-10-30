import * as React from "react";
import {Component} from 'react';
import {connect} from 'react-redux';
// import {CreateChart, FetchCharts, SlectCsNode} from './actions';
import {FetchCharts, CreateChart, SelectNode} from './store/actionCreators';
import FlashMessage from './components/FlashMessage';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import CSTreeView from './components/CSTreeView';
import type {TopState, CsChartProps} from './types';
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {Dispatch} from 'redux';
import { useEffect, useState} from 'react';
import {ChartProps} from './types';

  const App: React.FC = () => {
    // console.log(" starting App state");
  
  const error:  any = useSelector(
    (state: TopState) => state.error,
    shallowEqual
  );

  const charts:  ChartProps[] = useSelector(
    (state: TopState) => state.charts,
    shallowEqual
  );

  // console.log(charts);

  const csCharts: CsChartProps[] = useSelector(
    (state: TopState) => state.csCharts,
    shallowEqual
  );

  const isLoading : any=useSelector(
    (state:TopState) =>state.isLoading,
    shallowEqual
  );

  const topState :any = useSelector(
    (state:TopState) =>state,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  const onCreateChart =
    React.useCallback(
    ({title, description, type, color1, color2} :
      {title: any, description: any, type: any, color1: any, color2: any}) =>
      dispatch(CreateChart({title, description, type, color1, color2})),
    [dispatch]
    );

  const onSelectCsNode = React.useCallback(
    (name:string) => 
      dispatch(SelectNode(name)),
    [dispatch]
  );

    const load = ()=> {
      console.log("isLoading=");
      console.log(isLoading);
        console.log("app component did mount");
        dispatch(FetchCharts());
      };    

  //  const onSelectCsNode = (name : any)=>{
  //     // dispatch(SlectCsNode(name));
  //   }

    useEffect(() => {
      if(isLoading)
      {
        console.log("fetching charts");
        load();
      }
    });

  // const onCreateTask = ({title, description} : {title:string, description:string}) =>{
  //   dispatch(CreateTask({title, description}));
  // }
  // const onStatusChange=(id:any, status:any)=>{
  //    dispatch(EditTask(id, {status}));
  // }

  const containerstyle={
    // width:"100%",
    // height:"90%",
    // top:"60px", 
    // left:"100px", 
    // position:"fixed" as "fixed"
  };

  const dashboardcontentstyle = {
       top: "60px",
       height:"100%",
       left:"200px",
       width:"100%",
       position:"fixed" as "fixed",
       overflow:"scroll" as "scroll",
  };


  const sidestyle = {
    top: "60px",
    left: 0,
    backgroundColor:"gray",
    color: "white",
    fontWeight:"bold" as "bold",
    overFlowX: "hidden" as "hidden",
    padding: "30px",
    transition: "0.5s",
    height: "100%", 
    width: "150px",
    position: "fixed" as "fixed",
    zIndex: 1
  }

  const topnavstyle = {
    height: "60px",
    width: "100%",
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    backgroundColor: "darkslategray",
    color:" white",
    fontSize: 20,
    fontWeight: "bold" as "bold"
  }

  const centerstyle={
    margin: "auto" as "auto",
    width: "100%",
    border: "3px solid darkslategray",
    padding: "10px"
  }

  const headerstyle={
    ...topnavstyle,
    ...centerstyle
  }
    const element = 
    <div id="topapp">
        <header style={headerstyle}>
          Dashboard Prototype
        </header>
        <main style={containerstyle}>
            {error &&
            <FlashMessage message={topState}></FlashMessage>
            }
          <aside style={sidestyle}>
            <CSTreeView 
              ccharts =  {csCharts}
              onSelectCsNode = {onSelectCsNode}
            />
          </aside>
          <div style={dashboardcontentstyle}>
            <Dashboard 
              showNewCardForm={true}
              charts={charts}
              isLoading={isLoading}
              onCreateChart = {onCreateChart}>
            </Dashboard>
          </div>  
        </main>
      </div>
      
   
    return (element);
};


export default App;
