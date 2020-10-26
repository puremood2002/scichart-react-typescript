import * as Types from '../types';

const initialState : Types.TopState= {
    charts: [] as any[] ,
    csCharts:[] as any[],
    isLoading: false,
    error: null as any,
  };
  
  export default function charts(state=initialState, action : any)
  {

    if(action.type==="SELECT_CS_NODE"){
      return {
        ...state,
        charts:action.payload.charts
      };
    }
    if(action.type==='FETCH_CHARTS_STARTED'){
      return {
        ...state,
        isLoading: true,
      };
    }
    if(action.type === 'FETCH_CHARTS_SUCCEEDED'){
        console.log("reducer = fetch charts succeeded");
      return {
        ...state,
        charts: action.payload.charts,
        isLoading: false,
      };
    }
    if(action.type === 'FETCH_CHARTS_FAILED'){
        return{
          ...state,
          isLoading:false,
          error: action.payload.error
        }
    }
    if(action.type==="CREATE_CHART_SUCCEDED")
    {
      return {
        ...state,
        charts: state.charts.concat(action.payload.chart),
        isLoading: false,
      };
    }
    if (action.type === 'EDIT_TASK') {
      const { payload } = action;
      return {
        charts: state.charts.map(chart => {
          if (chart.id === payload.id) {
            return Object.assign({}, chart, payload.param);
          }
  
          return chart;
        }),
      };
    }
  
    return state;
  }