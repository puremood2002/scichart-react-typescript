import * as React from "react";
import {SciChartSurface} from "scichart/Charting/Visuals/SciChartSurface";
import {NumericAxis} from "scichart/Charting/Visuals/Axis/NumericAxis";
import {XyDataSeries} from "scichart/Charting/Model/XyDataSeries";
import {FastLineRenderableSeries} from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { useEffect } from 'react';
import { ZoomPanModifier } from "scichart/Charting/ChartModifiers/ZoomPanModifier";
import { MouseWheelZoomModifier } from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import { ZoomExtentsModifier } from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";
import {ChartComponentProps} from "../../types";
import { NumberRange } from "scichart/Core/NumberRange";

 const Line: React.FC<ChartComponentProps> = props => 
 {
  const chartId = `scichart-line${props.id}`;
    useEffect(() => {
      // console.log("in line, before initscichart");
      initLineSciChart(props.color1, chartId);
      // console.log("in line, after initscichart")
   });

   const styles = {
    div: {
        height:350,
        width:350    
    }
  };

   const element = 
    <div id={chartId} style={styles.div}></div>;

   return element;
};
  
  async function initLineSciChart(color1 : string, chartId:string )
  {

    // console.log("start init scichart");
    // Below find a trial / BETA key for SciChart.js.
    // This Expires in 30 days - or 14th November 2020
    // Set this license key once in your app before calling SciChartSurface.create, e.g.
    SciChartSurface.setRuntimeLicenseKey("WcnXtRLwGVtfNA59XwvDQA11wSpykEA1NEpARELTB+Aq6kf2nJSK9GgWOKvCJA6P+jNg2xcVLw3oM7EdIIi0MJtvorAARa9au01LV/xLJ1jdOeDeMXpw/eT5ajSpukKcJXHe97tzsBzfB6wRziW6LgNjuB3ykFIk+tGvOmJyhRewYjF+FCSb/0q8Bq8em4lNmOfONzJz5spVWvvfHdn5iIYfvv00hhduow4bFzxXnRucLtHl2Bm1yFvrVYe0UOQcFpJ9DZ4S96GLhSw9SIkUSAy/C5r3FvdCkX8d40ehAg+n78w92QXwh4B41xF0f+9OHpeV3byaZDNr5L1afdS3qCahoyeYEnmt4hYdmGH3uS+KtC29bAcVXUqNA9P3pESndALjlEimVNfr6RrfKEY3jroWtPXEx2Oo9XcD3ZLUJiRrjDL0lTf/3a6+KN1xsl2K2eymqyo9Wggy7Mf3WymmvURil7SaxE3xBP5LWWGPMEXvf9m7vXGz6fkEtsZhdEC3HQprBwEGyV1zPdLxDqtWO9ltEBEBlS2FrzJ3984/zSp9sbc=");

    // Create the SciChartSurface in the div 'scichart-root'
    // The SciChartSurface, and webassembly context 'wasmContext' are paired. This wasmContext
    // instance must be passed to other types that exist on the same surface.
    const {sciChartSurface, wasmContext} = await SciChartSurface.create(chartId);

    // console.log("surface created")

    // Create an X,Y Axis and add to the chart
    let nx = new NumericAxis(wasmContext);
      nx.drawMajorGridLines = false;
      nx.drawMinorGridLines = false;
      nx.drawMajorBands = false;
      nx.drawMinorTickLines = false;
      nx.drawMajorTickLines = false;
      nx.growBy = new NumberRange(0.05, 0.05);
      sciChartSurface.xAxes.add(nx);

      let ny = new NumericAxis(wasmContext, { growBy: new NumberRange(0.05, 0.05) });
      ny.drawMajorGridLines = false;
      ny.drawMinorGridLines = false;
      ny.drawMajorBands = false;
      ny.drawMajorTickLines = false;
      ny.drawMinorTickLines = false;
      ny.growBy = new NumberRange(0.05, 0.05);
      ny.visibleRange = new NumberRange(1.1, 1.2);
      ny.growBy = new NumberRange(0.1, 0.1);
      ny.labelProvider.formatLabel = (dataValue: number) => dataValue.toFixed(3);

      sciChartSurface.yAxes.add(ny);

    for (let seriesCount = 0; seriesCount < 100; seriesCount++) {        
      const xyDataSeries = new XyDataSeries(wasmContext);

      const opacity = (1 - ((seriesCount / 120))).toFixed(2);

      // Populate with some data
      for(let i = 0; i < 10000; i++) {
          xyDataSeries.append(i, Math.sin(i* 0.01) * Math.exp(i*(0.00001*(seriesCount+1))));
      }

      // Add and create a line series with this data to the chart
      // Create a line series        
      const lineSeries = new FastLineRenderableSeries(wasmContext, {
          dataSeries: xyDataSeries, 
          stroke: color1,
          strokeThickness:2
      });
      sciChartSurface.renderableSeries.add(lineSeries);
      sciChartSurface.chartModifiers.add(new ZoomExtentsModifier(), new ZoomPanModifier(), new MouseWheelZoomModifier());
      
      sciChartSurface.zoomExtents();
      return { sciChartSurface, wasmContext };
    // That's it! You just created your first SciChartSurface!
  }
}


export default Line;

