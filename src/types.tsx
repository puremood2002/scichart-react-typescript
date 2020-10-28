import { ButtonProps, Button, Link } from "@material-ui/core";
import React = require("react");

export interface TopState {
    charts:  ChartProps[] ,
    csCharts: CsChartProps[],
    isLoading: boolean,
    error:  any,
  }

  export interface DashboardProps{
    showNewCardForm: boolean,
    charts : ChartProps[],
    isLoading: boolean,
    onCreateChart: any
  }

  export interface DashboardState{
    showNewCardsForm : boolean,
    charts : ChartProps[],
  }

  export interface ChartListProps{
    //   type: string,
      charts: ChartProps[]
  }

  export interface CSTreeViewProps{
    onSelectCsNode: any,
    ccharts: CsChartProps[]
  }

  export interface ChartListState{
    charts : ChartProps[],
  }

  export interface SettingDialogProps {
    onCreateChart : any, 
    showDialog: any,
    closeDialog:any
  }

  export interface SettingDialogState{
    showNewCardForm:boolean,
    title:string,
    description:string,
    type:string, 
    color1:string,
    color2:string
  }
  
  export interface ChartProps{
    type:string,
    // chart : string,
    color1 : string, 
    color2 : string, 
    title : string, 
    id: any,
    description: string,
    status: string
  }

  export interface CsChartProps{
      name: string, 
      chartsProps : ChartProps[]
  }
  
  
  export type FetchChartsSucceedAction ={
        type: string,
        charts: ChartProps[]
  };

  export type CreateChartAction = {
      type: string,
      title: any,
      description: any,
      charttype: any,
      color1:any,
      color2: any
  }

  export type SelectNodeAction = {
        type: string,
        name :string
  };
 export type FetchSucceededDispatchType = (args: FetchChartsSucceedAction) => FetchChartsSucceedAction;
 export type CreateChartDispatchType = (args : CreateChartAction) => CreateChartAction;
 export type SelectNodeDispatchType = (args: SelectNodeAction) => SelectNodeAction;
