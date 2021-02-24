import * as React from "react";
import { SciChartSurface } from "scichart";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import { EAxisAlignment } from "scichart/types/AxisAlignment";
import { NumberRange } from "scichart/Core/NumberRange";
import { FastMountainRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/FastMountainRenderableSeries";
import { GradientParams } from "scichart/Core/GradientParams";
import { Point } from "scichart/Core/Point";
import { XyDataSeries } from "scichart/Charting/Model/XyDataSeries";
import { RubberBandXyZoomModifier } from "scichart/Charting/ChartModifiers/RubberBandXyZoomModifier";

import { IRenderableSeries } from "scichart/Charting/Visuals/RenderableSeries/IRenderableSeries";
import { parseColorToUIntArgb } from "scichart/utils/parseColor";
import { MouseWheelZoomModifier } from "scichart/Charting/ChartModifiers/MouseWheelZoomModifier";
import { ZoomPanModifier } from "scichart/Charting/ChartModifiers/ZoomPanModifier";
import { ZoomExtentsModifier } from "scichart/Charting/ChartModifiers/ZoomExtentsModifier";

import { useEffect } from 'react';
import {ChartComponentProps} from "../../types";
import { ENumericFormat } from "scichart/Charting/Visuals/Axis/LabelProvider/NumericLabelProvider";
   
 const Mountain: React.FC<ChartComponentProps> = props => 
 {

  const chartId = `scichart-candle${props.id}`;

    useEffect(() => {
      initSciChart(props.color2, props.color2, chartId);
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

  async function initSciChart(color1:string, color2:string, chartId:string)
  {
    SciChartSurface.setRuntimeLicenseKey("WcnXtRLwGVtfNA59XwvDQA11wSpykEA1NEpARELTB+Aq6kf2nJSK9GgWOKvCJA6P+jNg2xcVLw3oM7EdIIi0MJtvorAARa9au01LV/xLJ1jdOeDeMXpw/eT5ajSpukKcJXHe97tzsBzfB6wRziW6LgNjuB3ykFIk+tGvOmJyhRewYjF+FCSb/0q8Bq8em4lNmOfONzJz5spVWvvfHdn5iIYfvv00hhduow4bFzxXnRucLtHl2Bm1yFvrVYe0UOQcFpJ9DZ4S96GLhSw9SIkUSAy/C5r3FvdCkX8d40ehAg+n78w92QXwh4B41xF0f+9OHpeV3byaZDNr5L1afdS3qCahoyeYEnmt4hYdmGH3uS+KtC29bAcVXUqNA9P3pESndALjlEimVNfr6RrfKEY3jroWtPXEx2Oo9XcD3ZLUJiRrjDL0lTf/3a6+KN1xsl2K2eymqyo9Wggy7Mf3WymmvURil7SaxE3xBP5LWWGPMEXvf9m7vXGz6fkEtsZhdEC3HQprBwEGyV1zPdLxDqtWO9ltEBEBlS2FrzJ3984/zSp9sbc=");

      // Create a SciChartSurface
      const { wasmContext, sciChartSurface } = await SciChartSurface.create(chartId);
      sciChartSurface.background = `white`;

      let nx = new NumericAxis(wasmContext);
      nx.drawMajorGridLines = false;
      nx.drawMinorGridLines = false;
      nx.drawMajorBands = false;
      nx.drawMinorTickLines = false;
      nx.drawMajorTickLines = false;
      nx.axisAlignment = EAxisAlignment.Top;
      nx.labelProvider.numericFormat = ENumericFormat.Decimal_0

      sciChartSurface.xAxes.add(nx);

      let ny = new NumericAxis(wasmContext);
      ny.drawMajorGridLines = false;
      ny.drawMinorGridLines = false;
      ny.drawMajorBands = false;
      ny.drawMajorTickLines = false;
      ny.drawMinorTickLines = false;
      ny.axisAlignment = EAxisAlignment.Left;
      ny.growBy = new NumberRange(0.05, 0.05);
      sciChartSurface.yAxes.add(ny);

      // Create an XAxis and YAxis
    //   sciChartSurface.xAxes.add(
    //       new NumericAxis(wasmContext, {
    //           axisAlignment: EAxisAlignment.Top,
    //       })
    //   );
    //   sciChartSurface.yAxes.add(
    //       new NumericAxis(wasmContext, {
    //           axisAlignment: EAxisAlignment.Left,
    //           growBy: new NumberRange(0.05, 0.05),
    //           labelFormat: ENumericFormat.Decimal_2,
    //       })
    //   );
  
      // Create a Mountain Series and add to the chart
      const mountainSeries = new FastMountainRenderableSeries(wasmContext, {
          stroke: color1,
          strokeThickness: 5,
          zeroLineY: 0.0,
          fill: color2, // is not used, because we have fillLinearGradient
          fillLinearGradient: new GradientParams(new Point(0, 0), new Point(0, 1), [
              { color: color1, offset: 0 },
              { color: "rgba(70,130,180,0.2)", offset: 1 },
          ]),
          // Optional: Allows per-point colouring of mountain fill and stroke
          // paletteProvider: new MountainPaletteProvider(),
      });
      sciChartSurface.renderableSeries.add(mountainSeries);
  
      // Create some Xy data and assign to the mountain series
      const dataSeries = new XyDataSeries(wasmContext);
      const POINTS = 1000;
      const STEP = (3 * Math.PI) / POINTS;
      for (let i = 0; i <= 1000; i++) {
          dataSeries.append(i, Math.abs(Math.sin(i * STEP)));
      }
      mountainSeries.dataSeries = dataSeries;
        
      const rubberBandZoom = new RubberBandXyZoomModifier();
    const mouseWheelZoom = new MouseWheelZoomModifier();
    const zoomExtentsModifier = new ZoomExtentsModifier();
    sciChartSurface.chartModifiers.add(rubberBandZoom);
    sciChartSurface.chartModifiers.add(mouseWheelZoom);
    sciChartSurface.chartModifiers.add(zoomExtentsModifier);

      sciChartSurface.zoomExtents();
      return { wasmContext, sciChartSurface };
  }


export default Mountain;

