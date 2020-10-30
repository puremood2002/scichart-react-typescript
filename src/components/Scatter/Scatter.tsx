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
const did = Math.floor( Math.random()*100);

const Scatter: React.FC<ChartComponentProps> = props => 
 {
  const chartId = `scichart-candle${props.id}`;

    useEffect(() => {
      drawScatterChart(props.color1, chartId);
   });

   const styles = {
    div: {
        height: 300,
        width:300    
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
    SciChartSurface.setRuntimeLicenseKey("WcnXtRLwGVtfNA59XwvDQA11wSpykEA1NEpARELTB+Aq6kf2nJSK9GgWOKvCJA6P+jNg2xcVLw3oM7EdIIi0MJtvorAARa9au01LV/xLJ1jdOeDeMXpw/eT5ajSpukKcJXHe97tzsBzfB6wRziW6LgNjuB3ykFIk+tGvOmJyhRewYjF+FCSb/0q8Bq8em4lNmOfONzJz5spVWvvfHdn5iIYfvv00hhduow4bFzxXnRucLtHl2Bm1yFvrVYe0UOQcFpJ9DZ4S96GLhSw9SIkUSAy/C5r3FvdCkX8d40ehAg+n78w92QXwh4B41xF0f+9OHpeV3byaZDNr5L1afdS3qCahoyeYEnmt4hYdmGH3uS+KtC29bAcVXUqNA9P3pESndALjlEimVNfr6RrfKEY3jroWtPXEx2Oo9XcD3ZLUJiRrjDL0lTf/3a6+KN1xsl2K2eymqyo9Wggy7Mf3WymmvURil7SaxE3xBP5LWWGPMEXvf9m7vXGz6fkEtsZhdEC3HQprBwEGyV1zPdLxDqtWO9ltEBEBlS2FrzJ3984/zSp9sbc=");

    // Create the SciChartSurface in the div 'scichart-root'
    // The SciChartSurface, and webassembly context 'wasmContext' are paired. This wasmContext
    // instance must be passed to other types that exist on the same surface.
    const {sciChartSurface, wasmContext} = await SciChartSurface.create(chartId);

    // console.log("scatter urface created")

    sciChartSurface.xAxes.add(new NumericAxis(wasmContext));
    sciChartSurface.yAxes.add(new NumericAxis(wasmContext, { growBy: new NumberRange(0.05, 0.05) }));

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

    sciChartSurface.chartModifiers.add(new ZoomExtentsModifier(), new ZoomPanModifier(), new MouseWheelZoomModifier());

    sciChartSurface.zoomExtents();
    return { sciChartSurface, wasmContext };
  }

export default Scatter;

