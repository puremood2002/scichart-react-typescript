import * as React from "react";
import {SciChartSurface} from "scichart/Charting/Visuals/SciChartSurface";
import {NumericAxis} from "scichart/Charting/Visuals/Axis/NumericAxis";
import {XyDataSeries} from "scichart/Charting/Model/XyDataSeries";
import {XyScatterRenderableSeries} from "scichart/Charting/Visuals/RenderableSeries/XyScatterRenderableSeries";
import { EllipsePointMarker } from "scichart/Charting/Visuals/PointMarkers/EllipsePointMarker";
import {EStrokePaletteMode,IPointMarkerPaletteProvider,TPointMarkerArgb,} from "scichart/Charting/Model/IPaletteProvider";
import { useEffect } from 'react';
import { NumberRange } from "scichart/Core/NumberRange";
import {ChartComponentProps} from "../../types";
import { MouseWheelZoomModifier } from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import { ZoomPanModifier } from "scichart/Charting/ChartModifiers/ZoomPanModifier";
import { ZoomExtentsModifier } from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";
import { ENumericFormat } from "scichart/Charting/Visuals/Axis/LabelProvider/NumericLabelProvider";
import { RubberBandXyZoomModifier } from "scichart/Charting/ChartModifiers/RubberBandXyZoomModifier";
const did = Math.floor( Math.random()*100);

const Scatter: React.FC<ChartComponentProps> = props => 
 {
  const chartId = `scichart-candle${props.id}`;

    useEffect(() => {
      drawScatterChart(props.color1, chartId);
   });

   const styles = {
    div: {
        height: 350,
        width:350    
    }
  };

   const element = 
    <div id={chartId} style={styles.div}></div>;

   return element;
};
  
  async function drawScatterChart(color1:string, chartId:string)
  {

    // console.log("start init scatter scichart");
    // Below find a trial / BETA key for SciChart.js.
    // This Expires in 30 days - or 14th November 2020
    // Set this license key once in your app before calling SciChartSurface.create, e.g.
    SciChartSurface.setRuntimeLicenseKey("5xlOBMzBDebbZH5SyW8Emwi9BnUyYpZ5AcNh1TUojZoijarh3Gj4kjiAJHzBHpx2g7WJwFcuN8QG+tPLiiIyMH5FQ8sIfPYY1RKApHC7cxL95Ep7AFCD3539RYAc15Xo7UpxgzhSdYPGK37qtZ4SZy2NmSxMQ9mOnCyLxaHYr5VjP9zXsBENS5kS7rHKTih94vClBBgndiSoasQq6PZ+pmFv5Q/i7ksBWpzN1JPDgkAecudZBaHc0Ghq6zcoDwEGAhL9EInbNePBpNKD8Nv+JAOPCFdqFyHOzKCzqQH1RUUPR3iNVPs5EDNMwFidVtEf0ihRNKGWiqeRagWMB8mJEQQFA2ZvfyT/PbYxIRKhyrH4uc+IMsCmBGbkQisIWnXHthrMTPxVpzjp/rhLqWidB6M32izmX963msY++PUD+BggVSXcFnztllEJdZ4x3+0j+KijN5hxvpJCBiUpFDixn1DMHr2Gc03rrNs+pg3UaMH3GpGpvCx6Pa1shSS+eIhs5u05Ve+n");

    // Create the SciChartSurface in the div 'scichart-root
    // The SciChartSurface, and webassembly context 'wasmContext' are paired. This wasmContext
    // instance must be passed to other types that exist on the same surface.
    const {sciChartSurface, wasmContext} = await SciChartSurface.create(chartId);

    // console.log("scatter urface created")
    sciChartSurface.background = `white`;
    let nx = new NumericAxis(wasmContext);
    nx.drawMajorGridLines = false;
    nx.drawMinorGridLines = false;
    nx.drawMajorBands = false;
    nx.drawMinorTickLines = false;
    nx.drawMajorTickLines = false;
    nx.labelProvider.numericFormat = ENumericFormat.Decimal_0
    nx.maxAutoTicks = 5;
    sciChartSurface.xAxes.add(nx);
    let ny = new NumericAxis(wasmContext);
    ny.drawMajorGridLines = false;
    ny.drawMinorGridLines = false;
    ny.drawMajorBands = false;
    ny.drawMajorTickLines = false;
    ny.drawMinorTickLines = false;
    sciChartSurface.yAxes.add(ny);
    // Create a Scatter Series with EllipsePointMarker
    // Multiple point-marker types are available including Square, Triangle, Cross and Sprite (custom)
    const scatterSeries = new XyScatterRenderableSeries(wasmContext, {
        pointMarker: new EllipsePointMarker(wasmContext, {
            width: 7,
            height: 7,
            strokeThickness: 1,
            fill: color1,
            stroke: color1,
        })
        // Optional: PaletteProvider feature allows coloring per-point based on a rule
    });

    // Create some Xy data and assign to the Scatter Series
    const dataSeries = new XyDataSeries(wasmContext);
    for (let i = 0; i < 1000000; i++) {
        dataSeries.append(i, Math.sin(i * 0.1));
    }
    scatterSeries.dataSeries = dataSeries;
    sciChartSurface.renderableSeries.add(scatterSeries);


    const rubberBandZoom = new RubberBandXyZoomModifier();
    const mouseWheelZoom = new MouseWheelZoomModifier();
    const zoomExtentsModifier = new ZoomExtentsModifier();
    sciChartSurface.chartModifiers.add(rubberBandZoom);
    sciChartSurface.chartModifiers.add(mouseWheelZoom);
    sciChartSurface.chartModifiers.add(zoomExtentsModifier);
      
    sciChartSurface.zoomExtents();
    return { sciChartSurface, wasmContext };
  }

export default Scatter;

