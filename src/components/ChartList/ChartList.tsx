import * as React from 'react';
import Line from '../Line';
import Bubble from '../Bubble';
import Pie from '../Pie';
import Mountain from '../Mountain';
import Scatter from '../Scatter';
import Candle from '../Candle';
import '../../App.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {ChartProps} from '../../types';

const ChartList =( props : any) => {
    return (
        <div>
            <div>
               {props.type}
           </div>
            <div  className="flex-container wrap dashboard" id="chartslist">        
            {props.charts.map((chart : ChartProps) => (
                createChart(chart.type,chart.color1, chart.color2, chart.title )
            ))}</div>
        </div>
    );
}
 function allowDrop(ev : any){
    ev.preventDefault();
  }
  
  let dragdiv : any;
  let dragId;
  let dropId : any;
  function drag(ev : any){
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
  }
  
  function drop (ev : any)  {
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
    // alert(" dropid = "+dropId);
    //var data = ev.dataTransfer.getData("text");
    // ev.target.appendChild(document.getElementById(data));
  }
  
  let index = -1;
  function getId(){
      index +=1;
      alert("index="+index);
      return index;
  }
//   

function createChart(chartType: string, color1 : string, color2 : string, title: string)
{
    switch(chartType)
    {
        
        case 'line':
            return (
            <div draggable="true" onDragStart={drag} onDrop={drop} onDragOver={allowDrop}>
                <div className="cardtitle">Line</div>
                <Card className="cardroot">
                    <CardContent>
                        <Line />
                    </CardContent>
                </Card>
                </div>
            );
            break;
        case 'bubble':
            return(
                <div  draggable="true"  onDragStart={drag} onDrop={drop} onDragOver={allowDrop}>
                <div className="cardtitle">Bubble</div>
                <Card className="cardroot">
                <CardContent>
                    {/* <Bubble  title={title}/> */}
                    <Bubble />
                </CardContent>
            </Card>
            </div>
            );
            break;
        case 'bar':
            return(
                <div  draggable="true" onDragStart={drag} onDrop={drop} onDragOver={allowDrop}>
                <div className="cardtitle">Bar</div>
                <Card className="cardroot">
                <CardContent>
                    {/* <Pie colors={[color1, color2]}  title={title}/> */}
                    <Pie />
                </CardContent>
            </Card>
            </div>
            )
            break;
        case 'mountain':
            return(
                <div  draggable="true" onDragStart={drag} onDrop={drop} onDragOver={allowDrop}>
                <div className="cardtitle">Mountain</div>
                <Card className="cardroot">
                <CardContent>
                    {/* <Mountain colors={[color1, color2]}  title={title}/> */}
                    <Mountain />
                </CardContent>
            </Card>
            </div>
            )
          break;
        case 'scatter':
            return(
                <div draggable="true"  onDragStart={drag} onDrop={drop} onDragOver={allowDrop}>
                <div className="cardtitle">Scatter</div>
                <Card className="cardroot">
                    <CardContent>
                        {/* <Scatter colors={[color1, color2]}  title={title}/> */}
                        <Scatter />
                    </CardContent>
                </Card>
                </div>
            )
            break;
        case 'candle':
            return(
                <div draggable="true"  onDragStart={drag} onDrop={drop} onDragOver={allowDrop}>
                <div className="cardtitle">Candle</div>
                <Card className="cardroot">
                    <CardContent>
                        {/* <Candle colors={[color1, color2]}  title={title}/> */}
                        <Candle />
                    </CardContent>
                </Card>
                </div>
            )
            break;
    }
}

export default ChartList;
