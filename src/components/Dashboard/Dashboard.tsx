import * as React from "react";
import {Component}  from 'react';
import ChartsList from '../ChartsList';
import Button from '@material-ui/core/Button';
import {DashboardProps, DashboardState, ChartProps} from '../../types';
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {useState} from 'react';
import {Dispatch} from 'redux';
import SettingDialog from '../SettingDialog';
import { constants } from "buffer";
const CHART_TYPES = ['line', 'bubble', 'mountain', 'bar', 'scatter', 'candle'];


const Dashboard: React.FC<DashboardProps> = props => {
  // const charts:  ChartProps[] = useSelector(
  //   (state: DashboardState) => state.charts,
  //   shallowEqual
  // );

  // console.log("Dashboard props.charts:");
  // console.log(props.charts);
  // console.log("End dashboard props.charts");

  const [showNewCardsForm, setShowNewCardsFrom] = useState<boolean>();

  // const showNewCardsForm = useSelector(
  //   (state:DashboardState) => state.showNewCardsForm,
  //   shallowEqual
  // ).;

  const dispatch: Dispatch<any> = useDispatch();

  const toggleForm = ()=> 
  {
    setShowNewCardsFrom(!showNewCardsForm);
  };

  const closeDialog = ()=> 
  {
     toggleForm();
  };

  const dbcontentstyle={
      paddingTop: "60px",
      width: "100%",
      left:"10%",
  };

  const flexcontainerstyle1 ={
    padding: 0,
    margin: 0,
    listStyle: "none" as "none",
    border: "1px solid silver",
    msBoxOrient: "horizontal",
    display: "-webkit-box",
  };

  const flexcontainerstyle2 ={
    padding: 0,
    margin: 0,
    listStyle: "none" as "none",
    border: "1px solid silver",
    msBoxOrient: "horizontal",
    display: "-moz-box",
  };

  const  flexcontainerstyle3 ={
    padding: 0,
    margin: 0,
    listStyle: "none" as "none",
    border: "1px solid silver",
    msBoxOrient: "horizontal",
    display: "-ms-flexbox",
  };
  

  const  flexcontainerstyle4 ={
    padding: 0,
    margin: 0,
    listStyle: "none" as "none",
    border: "1px solid silver",
    msBoxOrient: "horizontal",
    display: "-moz-flex",
  };

  const flexcontainerstyle5 ={
    padding: 0,
    margin: 0,
    listStyle: "none" as "none",
    border: "1px solid silver",
    msBoxOrient: "horizontal",
    display: "-webkit-flex",
  };

  const flexcontainerstyle6 ={
    padding: 0,
    margin: 0,
    listStyle: "none" as "none",
    border: "1px solid silver",
    msBoxOrient: "horizontal",
    display: "flex" as "flex"
  };

  const wrapstyle={
      WebkitFlexWrap: "wrap" as "wrap",
      flexWrap: "wrap" as "wrap"
  };

  const flexcontanierstyle={
    ...flexcontainerstyle1,
    ...flexcontainerstyle2,
    ...flexcontainerstyle3,
    ...flexcontainerstyle4,
    ...flexcontainerstyle5,
    ...flexcontainerstyle6,
    ...wrapstyle,
  };


  const element = 
    <div>
        <div>
        <Button variant="contained" 
            onClick={toggleForm}>
                + New Chart
        </Button>          
        </div>
          <div>
              {showNewCardsForm && 
              <SettingDialog 
              onCreateChart = {props.onCreateChart} 
              showDialog={showNewCardsForm}
                closeDialog={closeDialog}
              />}
          </div>
          
        <div>
            {<ChartsList charts={props.charts}/>}
        </div>
    </div>

    return element;
};             

 
export default Dashboard;