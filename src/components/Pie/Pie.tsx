import * as React from "react";
import {SciChartSurface} from "scichart/Charting/Visuals/SciChartSurface";
import {NumericAxis} from "scichart/Charting/Visuals/Axis/NumericAxis";
import {XyDataSeries} from "scichart/Charting/Model/XyDataSeries";
import {FastLineRenderableSeries} from "scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { useEffect } from 'react';
import {ChartComponentProps} from "../../types";
import { EAxisAlignment } from "scichart/types/AxisAlignment";
import { NumberRange } from "scichart/Core/NumberRange";
 const Pie: React.FC<ChartComponentProps> = props => 
 {
    useEffect(() => {
      initSciChart(props.color2);
   });

   const styles = {
    div: {
        height:350,
        width:350    
    }
  };

   const element = 
    <div id="scichart-root-pie" style={styles.div}></div>;

   return element;
};
  
  async function initSciChart(color1:string)
  {
    // console.log("start init scichart");
    // Below find a trial / BETA key for SciChart.js.
    // This Expires in 30 days - or 14th November 2020
    // Set this license key once in your app before calling SciChartSurface.create, e.g.
    SciChartSurface.setRuntimeLicenseKey("5xlOBMzBDebbZH5SyW8Emwi9BnUyYpZ5AcNh1TUojZoijarh3Gj4kjiAJHzBHpx2g7WJwFcuN8QG+tPLiiIyMH5FQ8sIfPYY1RKApHC7cxL95Ep7AFCD3539RYAc15Xo7UpxgzhSdYPGK37qtZ4SZy2NmSxMQ9mOnCyLxaHYr5VjP9zXsBENS5kS7rHKTih94vClBBgndiSoasQq6PZ+pmFv5Q/i7ksBWpzN1JPDgkAecudZBaHc0Ghq6zcoDwEGAhL9EInbNePBpNKD8Nv+JAOPCFdqFyHOzKCzqQH1RUUPR3iNVPs5EDNMwFidVtEf0ihRNKGWiqeRagWMB8mJEQQFA2ZvfyT/PbYxIRKhyrH4uc+IMsCmBGbkQisIWnXHthrMTPxVpzjp/rhLqWidB6M32izmX963msY++PUD+BggVSXcFnztllEJdZ4x3+0j+KijN5hxvpJCBiUpFDixn1DMHr2Gc03rrNs+pg3UaMH3GpGpvCx6Pa1shSS+eIhs5u05Ve+n");

    // Create the SciChartSurface in the div 'scichart-root'
    // The SciChartSurface, and webassembly context 'wasmContext' are paired. This wasmContext
    // instance must be passed to other types that exist on the same surface.
    const {sciChartSurface, wasmContext} = await SciChartSurface.create("scichart-root-pie");

    // console.log("surface created")

    // Create an X,Y Axis and add to the chart
      let nx = new NumericAxis(wasmContext);
      nx.drawMajorGridLines = false;
      nx.drawMinorGridLines = false;
      nx.drawMajorBands = false;
      nx.drawMinorTickLines = false;
      nx.drawMajorTickLines = false;
      nx.axisAlignment = EAxisAlignment.Top;
      sciChartSurface.xAxes.add(nx);

      let ny = new NumericAxis(wasmContext, { growBy: new NumberRange(0.05, 0.05) });
      ny.drawMajorGridLines = false;
      ny.drawMinorGridLines = false;
      ny.drawMajorBands = false;
      ny.drawMajorTickLines = false;
      ny.drawMinorTickLines = false;
      ny.axisAlignment = EAxisAlignment.Left;
      ny.growBy = new NumberRange(0.05, 0.05);
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
  
      sciChartSurface.zoomExtents();
      return { sciChartSurface, wasmContext };
    // That's it! You just created your first SciChartSurface!
  }
}

  
export default Pie;

