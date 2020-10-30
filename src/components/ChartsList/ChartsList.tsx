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
import {uniqueId} from "../../actions";

const ChartsList: React.FC<ChartListProps> = props =>
 {

    const charts:  ChartProps[] = useSelector(
      (state: ChartListState) => state.charts,
      shallowEqual
    );

    console.log(333, "charts.length", charts.length);


    // console.log("ChartListCharts from state ");
    // console.log(charts);
    // console.log("end charts from states");

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


    var uid = ()=>
    {
      var idd = uniqueId();
      console.log("idd=");
      console.log(idd);
      return idd;
    };

  const createChart = (c : ChartProps, index: number) =>
  {
    let ct = c.type;
    console.log(334, "in create chart, type = ", c);
    // console.log(ct);
    let idx = uniqueId();
    switch(ct)
    {
        case 'line':
          return <div key={idx} draggable="true"  onDragStart={drag} onDrop={drop} onDragOver={allowDrop}>
                <div className="cardtitle">Line</div>
                <Card className="cardroot">
                <CardContent>
                    <Line  id={idx} color1={c.color2} color2={c.color2}/>
                </CardContent>
            </Card>
            </div>;
            break;
        case 'bubble':
          // console.log("create bubble");
             return <div key={idx} draggable="true"  onDragStart={drag} onDrop={drop} onDragOver={allowDrop}>
                <div className="cardtitle">Bubble</div>
                <Card className="cardroot">
                <CardContent>
                    <Bubble id={idx} color1={c.color2} color2={c.color2}/>
                </CardContent>
            </Card>
            </div>;
            break;
        case 'bar':
            break;
        case 'mountain':
            return <div key={idx} draggable="true" onDragStart={drag} onDrop={drop} onDragOver={allowDrop}>
                <div className="cardtitle">Mountain</div>
                <Card className="cardroot">
                <CardContent>
                    <Mountain id={idx} color1={c.color2} color2={c.color2}/>
                </CardContent>
            </Card>
            </div>
          break;
        case 'scatter':
          // console.log("creating scatter chart");
             return <div key={idx} draggable="true"  onDragStart={drag} onDrop={drop} onDragOver={allowDrop}>
                  <div className="cardtitle">Scatter</div>
                  <Card className="cardroot">
                      <CardContent>
                          <Scatter id={idx} color1={c.color2} color2={c.color2}/>
                      </CardContent>
                  </Card>
                </div>
            break;
        case 'candle':
             return  <div key={uniqueId()} draggable="true"  onDragStart={drag} onDrop={drop} onDragOver={allowDrop}>
                <div className="cardtitle">Candle</div>
                <Card className="cardroot">
                    <CardContent>
                        <Candle id={idx} color1={c.color2} color2={c.color2}/>
                    </CardContent>
                </Card>
                </div>
            break;
        }
    };
    
    const chartliststyle = {
      position:"fixed" as "fixed",
      overflow:"scroll" as "scroll",
      height:"100%",
      width:"100%",
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
      <div style={chartliststyle}>
          {/* <div>
             {props.type}
         </div> */}
          <div  style={flexcontanierstyle} id="chartslist">        
              {
                charts.map((c : ChartProps, index) =>
                {
                  return (createChart(c, index));
                })
              }
          </div>
      </div>;

      return element;
}

export default ChartsList;
