import * as React from "react";
import { MouseWheelZoomModifier } from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import { ZoomExtentsModifier } from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { FastLineRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { FastBubbleRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastBubbleRenderableSeries";
import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumberRange } from "scichart/Core/NumberRange";
import { EllipsePointMarker } from "scichart/Charting/Visuals/PointMarkers/EllipsePointMarker";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { XyzDataSeries } from "scichart/Charting/Model/XyzDataSeries";
import { useEffect } from 'react';
import {ChartComponentProps} from '../../types';

const did = Math.random();
 const Bubble: React.FC<ChartComponentProps> = props => 
 {
  const divid = "scichart-root-bubble"+did;
    useEffect(() => {
      initBubbleSciChart(props.color1);
    });

    
  const styles = {
  div: {
      height: 300,
      width:300    
  }};

   const element = 
    <div id={divid} style={styles.div}></div>;

   return element;
};

async function initBubbleSciChart(color1:string)
{
  const divid = "scichart-root-bubble"+did;

  // Create a SciChartSurface with X,Y Axis
  const { sciChartSurface, wasmContext } = await SciChartSurface.create(divid);
  sciChartSurface.xAxes.add(new NumericAxis(wasmContext));
  sciChartSurface.yAxes.add(new NumericAxis(wasmContext, { growBy: new NumberRange(0.05, 0.05) }));

  // Line Series
  const lineSeries = new FastLineRenderableSeries(wasmContext, {
      stroke: "#FFFFFF",
      strokeThickness: 2
  });
  sciChartSurface.renderableSeries.add(lineSeries);

  const bubbleSeries = new FastBubbleRenderableSeries(wasmContext, {
    pointMarker: new EllipsePointMarker(wasmContext, {
        width: 14,
        height: 15,
        strokeThickness: 0,
        fill: color1,
    })
    // Optional: PaletteProvider feature allows coloring per-point based on a rule
  });

  sciChartSurface.renderableSeries.add(bubbleSeries);
  

  // Populate data to both series
  const lineDataSeries = new XyDataSeries(wasmContext);
  const bubbleDataSeries = new XyzDataSeries(wasmContext);
  const POINTS = 20;
  let prevYValue = 0;
  for (let i = 0; i < POINTS; i++) {
      const curYValue = Math.sin(i) * 10 - 5;
      const size = Math.sin(i) * 60 + 3;

      lineDataSeries.append(i, prevYValue + curYValue);
      bubbleDataSeries.append(i, prevYValue + curYValue, size/5);

      prevYValue += curYValue;
  }

  // Assign dataSeries to renderableSeries
  lineSeries.dataSeries = lineDataSeries;
  bubbleSeries.dataSeries = bubbleDataSeries;

  sciChartSurface.renderableSeries.add(lineSeries);

  // Add some zooming and panning behaviour
  sciChartSurface.chartModifiers.add(new ZoomExtentsModifier());
  sciChartSurface.chartModifiers.add(new MouseWheelZoomModifier());

  sciChartSurface.zoomExtents();
  return { sciChartSurface, wasmContext };
}

  

export default Bubble;

