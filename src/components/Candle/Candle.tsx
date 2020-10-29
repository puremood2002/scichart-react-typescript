import * as React from "react";
import { SciChartSurface } from "scichart";
import { CategoryAxis } from "scichart/Charting/Visuals/Axis/CategoryAxis";
import { NumberRange } from "scichart/Core/NumberRange";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { OhlcDataSeries } from "scichart/Charting/Model/OhlcDataSeries";
import { FastCandlestickRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastCandlestickRenderableSeries";
import { ZoomPanModifier } from "scichart/Charting/ChartModifiers/ZoomPanModifier";
import { ZoomExtentsModifier } from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";
// import { closeValues, dateValues, highValues, lowValues, openValues } from "./data/data";
import {MouseWheelZoomModifier} from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import {parseColorToUIntArgb} from "scichart/utils/parseColor";
import {
    EFillPaletteMode,
    EStrokePaletteMode,
    IFillPaletteProvider,
    IPaletteProvider,
    IStrokePaletteProvider
} from "scichart/Charting/Model/IPaletteProvider";
import {IRenderableSeries} from "scichart/Charting/Visuals/RenderableSeries/IRenderableSeries";

import { useEffect } from 'react';
import {ChartComponentProps} from "../../types";

const did = Math.random();
const closeValues = [1,3,5,2,4,6];
const openValues = [1.2,4.3,2.1,10,5,5];
const highValues = [10,3,9,2,7,11];
const lowValues = [1,1.1,2.1,0, 0.1,3];
const dateValues=[new Date('2012.08.10').getTime() / 1000,new Date('2012.08.11').getTime() / 1000,new Date('2012.08.12').getTime() / 1000,
new Date('2012.08.13').getTime() / 1000,new Date('2012.08.14').getTime() / 1000, new Date('2012.08.15').getTime() / 1000]
 const Candle: React.FC<ChartComponentProps> = props => 
 {
  const chartId = `scichart-candle${props.id}`;


    useEffect(() => {
      initSciChart(props.color1, props.color2, chartId);
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
  
  async function initSciChart(color1 : string, color2: string, chartId:string)
  {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(chartId);

    // Add an XAxis of type CategoryAxis - which collapses gaps in stock market data
    const xAxis = new CategoryAxis(wasmContext);
    xAxis.growBy = new NumberRange(0.05, 0.05);
    sciChartSurface.xAxes.add(xAxis);

    // Create a NumericAxis on the YAxis
    const yAxis = new NumericAxis(wasmContext);
    yAxis.visibleRange = new NumberRange(1.1, 1.2);
    yAxis.growBy = new NumberRange(0.1, 0.1);
    yAxis.labelProvider.formatLabel = (dataValue: number) => dataValue.toFixed(3);
    sciChartSurface.yAxes.add(yAxis);

    // Create a OhlcDataSeries with open, high, low, close values
    const dataSeries = new OhlcDataSeries(wasmContext, {
        xValues: dateValues, // XValues is number[] array of unix timestamps
        openValues, // Assuming open, high, low, close values are number[] arrays
        highValues,
        lowValues,
        closeValues,
    });

    // Create and add the Candlestick series
    const candlestickSeries = new FastCandlestickRenderableSeries(wasmContext, {
        strokeThickness: 1,
        dataSeries,
        dataPointWidth: 0.5,
        brushUp: color1,
        brushDown: color2,
        strokeUp: color1,
        strokeDown: color2,
        // paletteProvider: new CandlestickPaletteProvider()
    });
    sciChartSurface.renderableSeries.add(candlestickSeries);

    // Optional: Add some interactivity modifiers
    sciChartSurface.chartModifiers.add(new ZoomExtentsModifier(), new ZoomPanModifier(), new MouseWheelZoomModifier());

    sciChartSurface.zoomExtents();
    return { dataSeries, sciChartSurface };
};


export default Candle;

