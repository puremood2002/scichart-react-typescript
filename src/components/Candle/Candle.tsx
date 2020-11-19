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
import { closeValues, dateValues, highValues, lowValues, openValues } from "./data";
import { ENumericFormat } from "scichart/Charting/Visuals/Axis/LabelProvider/NumericLabelProvider";

const did = Math.random();
 const Candle: React.FC<ChartComponentProps> = props => 
 {
  const chartId = `scichart-candle${props.id}`;
    useEffect(() => {
      initSciChart(props.color1, props.color2, chartId);
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
  
  async function initSciChart(color1 : string, color2: string, chartId:string)
  {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(chartId);

    sciChartSurface.background=`white`;

    let nx = new CategoryAxis(wasmContext);
      nx.drawMajorGridLines = false;
      nx.drawMinorGridLines = false;
      nx.drawMajorBands = false;
      nx.drawMinorTickLines = false;
      nx.drawMajorTickLines = false;
      nx.autoTicks = false;
      // nx.growBy = new NumberRange(0.05, 0.05);
      nx.labelProvider.numericFormat = ENumericFormat.Date_DDMM
      nx.maxAutoTicks=3;
      // nx.labelProvider.formatLabel = (unixTimestamp) => {
      //   const day =  new Date(unixTimestamp * 1000).toLocaleDateString("en-GB", {
      //     day: "numeric"
      //   });
      //   return `${day}d`
      // }
      sciChartSurface.xAxes.add(nx);


      let ny = new NumericAxis(wasmContext);
      ny.drawMajorGridLines = false;
      ny.drawMinorGridLines = false;
      ny.drawMajorBands = false;
      ny.drawMajorTickLines = false;
      ny.drawMinorTickLines = false;
      // ny.growBy = new NumberRange(0.05, 0.05);
      ny.visibleRange = new NumberRange(1.1, 1.2);
      // ny.growBy = new NumberRange(0.1, 0.1);
      ny.labelProvider.formatLabel = (dataValue: number) => dataValue.toFixed(3);

      sciChartSurface.yAxes.add(ny);
    // Add an XAxis of type CategoryAxis - which collapses gaps in stock market data
    // const xAxis = new CategoryAxis(wasmContext);
    // xAxis.growBy = new NumberRange(0.05, 0.05);
    // sciChartSurface.xAxes.add(xAxis);

    // Create a NumericAxis on the YAxis
    // const yAxis = new NumericAxis(wasmContext);
    // yAxis.labelProvider.formatLabel = (dataValue: number) => dataValue.toFixed(3);
    // sciChartSurface.yAxes.add(yAxis);

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

