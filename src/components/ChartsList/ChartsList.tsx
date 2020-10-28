import * as React    from "react";
import Line from '../Line';
import Bubble from '../Bubble';
import Pie from '../Pie';
import Mountain from '../Mountain';
import Scatter from '../Scatter';
import Candle from '../Candle';
import '../../App.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import type {ChartListProps, ChartProps, ChartListState} from '../../types';
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {useState} from 'react';

const ChartsList: React.FC<ChartListProps> = props =>
 {

    const charts:  ChartProps[] = useSelector(
      (state: ChartListState) => state.charts,
      shallowEqual
    );


    console.log("ChartListCharts from state ");
    console.log(charts);
    console.log("end charts from states");

    let dragdiv : any;
    let dragId;
    let dropId : any;
    let index = -1;

    const drag = (ev : any) =>
    {
        dragdiv = ev.target;
        let divparent = document.getElementById("chartslist");
        if(divparent!==null)
        {
          for(let i=0; i< divparent.children.length;i++)
          {
              if(divparent.children[i]===dragdiv)
              {
                  dragId = i;
                  break;
              }
          }
        }
      ev.dataTransfer.setData("text", ev.target.id);
    };

    const drop = (ev : any)  =>
    {
      let dropdiv = ev.currentTarget;
      ev.preventDefault();
      let divparent = document.getElementById("chartslist");
      if(divparent!==null)
      {
        for(let j=0; j< divparent.children.length;j++)
        {
            if(divparent.children[j]===dropdiv)
            {
                dropId = j;
                break;
            }
        }
        divparent.insertBefore(dragdiv, divparent.childNodes[dropId]);
      }
    };

    const allowDrop =(ev : any)=>
    {
      ev.preventDefault();
    };


  const createChart = (c : ChartProps) =>
  {
    let ct = c.type;
    console.log("in create chart, type = ");
    console.log(ct);
    switch(ct)
    {
        case 'line':
          return <div  draggable="true"  onDragStart={drag} onDrop={drop} onDragOver={allowDrop}>
                <div className="cardtitle">Bubble</div>
                <Card className="cardroot">
                <CardContent>
                    <Line />
                </CardContent>
            </Card>
            </div>;
            break;
        case 'bubble':
          console.log("create bubble");
             return <div  draggable="true"  onDragStart={drag} onDrop={drop} onDragOver={allowDrop}>
                <div className="cardtitle">Bubble</div>
                <Card className="cardroot">
                <CardContent>
                    <Bubble />
                </CardContent>
            </Card>
            </div>;
            break;
        case 'bar':
            break;
        case 'mountain':
            return <div  draggable="true" onDragStart={drag} onDrop={drop} onDragOver={allowDrop}>
                <div className="cardtitle">Mountain</div>
                <Card className="cardroot">
                <CardContent>
                    <Mountain />
                </CardContent>
            </Card>
            </div>
          break;
        case 'scatter':
             return <div draggable="true"  onDragStart={drag} onDrop={drop} onDragOver={allowDrop}>
                  <div className="cardtitle">Scatter</div>
                  <Card className="cardroot">
                      <CardContent>
                          <Scatter />
                      </CardContent>
                  </Card>
                </div>
            break;
        case 'candle':
             return  <div draggable="true"  onDragStart={drag} onDrop={drop} onDragOver={allowDrop}>
                <div className="cardtitle">Candle</div>
                <Card className="cardroot">
                    <CardContent>
                        <Candle />
                    </CardContent>
                </Card>
                </div>
            break;
        }
    };
    
  // getId(){
  //     index +=1;
  //     alert("index="+index);
  //     return index;
  // };

  const element =
      <div>
          {/* <div>
             {props.type}
         </div> */}
          <div  className="flex-container wrap dashboard" id="chartslist">        
              {
                charts.map((c : ChartProps) => 
                {
                  return (createChart(c));
                })
              }
          </div>
      </div>;

      return element;
}

export default ChartsList;