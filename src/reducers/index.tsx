import * as Types from '../types';

import { TopState } from "../types";
import {SELECT_CS_NODE,
FETCH_CHARTS_STARTED,
FETCH_CHARTS_SUCCEEDED ,
FETCH_CHARTS_FAILED,
CREATE_CHART_SUCCEDED,
FetchCharts} from "../store/actionTypes";
import {ChartProps, CsChartProps} from '../types';
import {csCharts} from '../actions';
import {uniqueId} from "../actions";


var uid = ()=>
{
    return uniqueId();
};


const initialState : TopState= {
    charts:[] as ChartProps[] ,
    csCharts: [] as CsChartProps[],
    isLoading: true,
    error: null as any,
  };
  
  const reducer = (
    state: TopState = initialState,
    action: any
    ): TopState => {
      console.log("in reducer with action.type=");
        console.log(action.type);
        console.log("that is the action type");

    if(action.type===SELECT_CS_NODE){
        return {
          ...state,
          charts:action.payload.charts
        };
      }
      if(action.type===FETCH_CHARTS_STARTED){
        return {
          ...state,
          isLoading: true,
        };
      }
      if(action.type === FETCH_CHARTS_SUCCEEDED){
          console.log("reducer = fetch charts succeeded");
          // console.log(action.charts);
        return {
          ...state,
          isLoading: false,
          charts: action.charts,
        };
      }
      if(action.type === FETCH_CHARTS_FAILED){
          return{
            ...state,
            isLoading:false,
            error: action.payload.error
          }
      }
      if(action.type===CREATE_CHART_SUCCEDED)
      {
        console.log("in reducing - create_chart_succeeded");
        console.log(action);
        const cht : ChartProps = {
          title: action.title,
          type:action.charttype,
          description:"a new scatter chart",
          color1: action.color1,
          color2:action.color2,
          id:uniqueId(),
          status:"Unstarted",
        };
        var x = state.charts.concat(cht);
        console.log("x=");
        console.log(x);
        return {
          ...state,
          isLoading: false,
          charts: x,
        };
      }
      return state; 
    };
    
    export default reducer;


//   export function charts(state : TopState =initialState, action : any)
//   {
//     if(action.type==="SELECT_CS_NODE"){
//       return {
//         ...state,
//         charts:action.payload.charts
//       };
//     }
//     if(action.type==='FETCH_CHARTS_STARTED'){
//       return {
//         ...state,
//         isLoading: true,
//       };
//     }
//     if(action.type === 'FETCH_CHARTS_SUCCEEDED'){
//         console.log("reducer = fetch charts succeeded");
//         console.log(action.payload.charts);
//       return {
//         ...state,
//         charts: action.payload.charts,
//         isLoading: false,
//       };
//     }
//     if(action.type === 'FETCH_CHARTS_FAILED'){
//         return{
//           ...state,
//           isLoading:false,
//           error: action.payload.error
//         }
//     }
//     if(action.type==="CREATE_CHART_SUCCEDED")
//     {
//       return {
//         ...state,
//         charts: state.charts.concat(action.payload.chart),
//         isLoading: false,
//       };
//     }
//     if (action.type === 'EDIT_TASK') {
//       const { payload } = action;
//       return {
//         charts: state.charts.map(chart => {
//           if (chart.id === payload.id) {
//             return Object.assign({}, chart, payload.param);
//           }
  
//           return chart;
//         }),
//       };
//     }
  
//     return state;
//   }



