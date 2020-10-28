import * as actionTypes from "./actionTypes";
import * as api from '../api';
import {FetchChartsSucceedAction, FetchSucceededDispatchType, CreateChartAction, CreateChartDispatchType,
SelectNodeAction, SelectNodeDispatchType} from '../types';
import {csCharts} from '../actions/index';


export function FetchCharts() {
    const action: FetchChartsSucceedAction = {
        type: actionTypes.FETCH_CHARTS_SUCCEEDED,
        charts: []
      };
    return fetchCharts(action);
}

export function CreateChart({title, description, charttype, color1, color2} :
    {title: any, description: any, charttype: any, color1: any, color2: any})
{
    const action: CreateChartAction = {
        type: actionTypes.CREATE_CHART_SUCCEDED,
        title: title,
        description: description,
        charttype: charttype,
        color1: color1,
        color2: color2

      };
    return createChart(action);
}

export function SelectNode(name:string)
{
    const action : SelectNodeAction ={
        type: actionTypes.SELECT_CS_NODE,
        name:name
    };
    return selectNode(action);
}


function fetchCharts(action : FetchChartsSucceedAction)
{
    console.log("start fetching charts...");
        action.charts = csCharts[0].chartsProps;

        return  (dispatch: FetchSucceededDispatchType) =>
            {
                // console.log("in dispatch, before api");
                // api
                // .fetchCharts() 
                // .then((resp: any) => {
                // // setTimeout(() => { 1 // dispatch(fetchTasksSucceeded(resp.data)); 1 // }, 2000); 1 
                //      throw new Error('Oh noes! Unable to fetch tasks!');
                // })
                // .catch((err: any) => {
                //     console.log("dispatch fetchchartsucceeded");
                // //dispatch(FetchTaskFailed(err.message));
                // });
                console.log("action.charts:");
                action.charts = csCharts[0].chartsProps;
                console.log(action.charts);

                dispatch(action);

         }
}

function createChart(action: CreateChartAction)
{
    console.log("start create charts");
    return (dispatch: CreateChartDispatchType) =>
    {
        dispatch(action);
    }
}

function selectNode(action: SelectNodeAction)
{
    console.log("starting select noe");
    return (dispatch: SelectNodeDispatchType) =>
    {
        dispatch(action);
    }
}




