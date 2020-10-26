import { ButtonProps, Button, Link } from "@material-ui/core";
import React = require("react");

export interface TopState {
    charts:  ChartProps[] ,
    csCharts: any[],
    isLoading: boolean,
    error:  any,
  }

  export interface CSTreeViewProps{
      csCharts: ChartProps[],
      onSelectCsNode: any,
  }
  
  export interface DashboardProps{
    showNewCardForm: any,
    charts : ChartProps[],
    isLoading: boolean,
    onCreateChart: any
  }

  export interface DashboardState{
    showNewCardsForm : boolean
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
    chart : string,
    color1 : string, 
     color2 : string, 
     title : string, 
     id: any
  }

//   export interface ChatState {
//     messages: Message[]
//   }

//   export interface SystemState {
//     loggedIn: boolean
//     session: string
//     userName: string
//   }

//     export const SEND_MESSAGE = 'SEND_MESSAGE'
//     export const DELETE_MESSAGE = 'DELETE_MESSAGE'

//     interface SendMessageAction {
//     type: typeof SEND_MESSAGE
//     payload: Message
//     }

//     interface DeleteMessageAction {
//     type: typeof DELETE_MESSAGE
//     meta: {
//         timestamp: number
//     }
//     }

// export type ChatActionTypes = SendMessageAction | DeleteMessageAction