import * as api from '../api';
import type {CsChartProps, ChartProps} from '../types';

let _id=1;

export function uniqueId()
{
    return _id++;
}

export const csCharts : CsChartProps[]
    = [
    {
        name:"rev-1",
        chartsProps: [
            {
              id:uniqueId(),
              type:'line',
              color1:'blue',
              color2:'green',
              title:'input output',
              description:"to be completed by this weekend",
              status:'In Progress'
            },
            {
              id:uniqueId(),
              type:'mountain',
              color1:'lightgray',
              color2:'darkgray',
              title:"m1-m2",
              description:"two sessions",
              status:'Unstarted'
            },
            {
              id:uniqueId(),
              type:'bar',
              title:"input1 - input2",
              color1:'blue',
              color2:'darkslategray',
              description:"no take out",
              status:'In Progress'
            },
            {
                id:uniqueId(),
                type:'scatter',
                title:'rate vs thick',
                color1:'purple',
                color2:'olive',
                description:'work hard',
                status:'done'
            },
            {
                id:uniqueId(),
                type:'candle',
                title:'data sample box',
                color1:'darkslateblue',
                color2:'yellow',
                description:'light it',
                status:'done'
            },
            {
              id:uniqueId(),
              type:'bubble',
              title:'error distribution',
              color1:'red',
              color2:'yellow',
              description:'read css official doc',
              status:"Unstarted"
            },
          ]
        },
        {
        name:"rev-2",
        chartsProps:[
            {
              id:uniqueId(),
              type:'line',
              color1:'red',
              color2:'yellow',
              title:'input output',
              description:"to be completed by this weekend",
              status:'In Progress'
            },    
            {
              id:uniqueId(),
              type:'bar',
              title:"input1 vs input2",
              color1:'red',
              color2:'yellow',
              description:"no take out",
              status:'In Progress'
            },
            {
                id:uniqueId(),
                type:'scatter',
                title:'rate vs thick',
                color1:'red',
                color2:'yellow',
                description:'work hard',
                status:'done'
            }
          ]
    }];


export function FetchChartsSucceed(charts : ChartProps[])
{
    return {
        type: 'FETCH_CHARTS_SUCCEEDED',
        payload: {
            charts:charts
        }
      };
}

export function FetchChartsFailed(error : any)
{
    return {
        type: 'FETCH_CHARTS_FAILED',
        payload:{
            error:error
        }
    }
}
export function CreateChartSucceeded(chart : any)
{
    return {
        type:'CREATE_CHART_SUCCEDED',
        payload:{
            chart:{id:uniqueId(),title:chart.title, description:chart.description, type:chart.type, color1:chart.color1, color2:chart.color2}
        }
    }
}

export function SelectNode(name : string)
{
    for(const x in csCharts)
    {
        var n = csCharts[x];
        if(n.name === name)
        {
            return {
                type:"SELECT_CS_NODE",
                payload:{
                charts: n.chartsProps
                }
            };
        }
    }
}

export function SlectCsNode(name : string)
{
    return  (dispatch: (arg0: { type: string; payload: { name: string; }; }) => void)=>
    SelectNode(name);
    
}

export function CreateChart({title, description, type, color1, color2} : {title: string, description: string, type: any; color1:string, color2 : string})
{
    return (dispatch: (arg0: { type: string; payload?: { chart: { id: number; title: any; description: any; type: any; color1: any; color2: any; }; }; }) => void)=>{
        try{
            dispatch(fetchChartsStarted());
            api.createChart({title, description, type, color1, color2})
            .then(resp=>
                {
                    // dispatch(CreateChartSucceeded(resp.data));
                dispatch(CreateChartSucceeded({title, description, type, color1, color2}));

                });
            }
            catch(err)
            {
                dispatch(CreateChartSucceeded({title, description, type, color1, color2}));
            }
        }

}

function fetchChartsStarted() {
        return {
          type: 'FETCH_TASKS_STARTED',
        };
}
    

export function FetchCharts()
    {
        return  (dispatch: (arg0: { type: string; payload: { charts: any; }; }) => void) =>
            {
                console.log("in dispatch, before api");
                api
                .fetchCharts() 
                .then((resp: any) => {
                // setTimeout(() => { 1 // dispatch(fetchTasksSucceeded(resp.data)); 1 // }, 2000); 1 
                     throw new Error('Oh noes! Unable to fetch tasks!');
                })
                .catch((err: any) => {
                    console.log("dispatch fetchchartsucceeded");
                //dispatch(FetchTaskFailed(err.message));
                dispatch(FetchChartsSucceed(csCharts[0].chartsProps));
                });
                dispatch(FetchChartsSucceed(csCharts[0].chartsProps));
         }
    }

    