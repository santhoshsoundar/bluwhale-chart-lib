import React, { useRef } from "react"
import * as d3 from "d3"

import Axis from "./Axis"
import Line from "./Line"
import Bars from "./Bars"

const computeChartDim = dimensions => {
  const defaultMargin = {
    marginTop: 40,
    marginRight: 30,
    marginBottom: 40,
    marginLeft: 75
  }

  // library user can override default chart margin 
  // by passing new values via dimensions object
  const chartDim = {
    ...defaultMargin, 
    ...dimensions
  }

  return {
    ...chartDim,
    marksHeight: Math.max(chartDim.height - chartDim.marginTop - chartDim.marginBottom, 0),
    marksWidth: Math.max(chartDim.width - chartDim.marginLeft - chartDim.marginRight, 0),
  }
}

const computeScale = type  => {
  // types defined assuming the data is either linear or categorical for Line and Bar charts
  const scaleType = {
    linear: "scaleLinear",
    band: "scaleBand"
  }
  return d3[scaleType[type]]()
}

const computeScaleDomain = (data, accessor, type, position, padding) => {
  if(type === "linear") {
    // data padding used to render marks within axis range
    const [min, max] = d3.extent(data, accessor);
    // const range = max - min;
    //   return [min - range * padding, max + range * padding];    // to be revisited ⏰
    return [min, max];
  }

  if(type === "band") {
    return data.map(accessor);
  }

}

// todo -> axis labels 
const Chart = ({ data, dimensions, backgroundColor, type, color, xAccessor, yAccessor, xLabel, yLabel, interpolation }) => {

  const svgRef = useRef();
  const chartDim = computeChartDim(dimensions);

  const xScalePadding = 0.5, 
    yScalePadding = 0.7;

  const xDomainType = type === "bar" ? "band" : "linear"
  const xDomain = computeScaleDomain(data, xAccessor, xDomainType, xScalePadding);
  const xScale = computeScale(xDomainType)
    .domain(xDomain)
    .range([0, chartDim.marksWidth])

  if(type === "bar") {
    xScale.padding(0.5);
  }

  const yDomainType = "linear"
  const [, yMax] = computeScaleDomain(data, yAccessor, yDomainType, yScalePadding);
  const yScale = computeScale(yDomainType)
    .domain([0, yMax])
    .range([chartDim.marksHeight, 0])


  const xAccessorScaled = d => xScale(xAccessor(d))
  const yAccessorScaled = d => yScale(yAccessor(d))

  return (
    <svg ref={svgRef} width={chartDim.width} height={chartDim.height} style={{ backgroundColor: backgroundColor }}>
      <Axis
        dimensions={chartDim}
        position="left"
        scale={yScale}
        label={yLabel}
      />
      <Axis
        dimensions={chartDim}
        position="bottom"
        scale={xScale}
        label={xLabel}
      />
      <g transform={`translate(${chartDim.marginLeft}, ${chartDim.marginTop})`}>
        {type === "line" && 
          <Line
            data={data}
            xAccessor={xAccessorScaled}
            yAccessor={yAccessorScaled}
            interpolation={interpolation}
            color={color}
        />}
        {type === "bar" && 
          <Bars
            data={data}
            dimensions={chartDim}
            xAccessor={xAccessorScaled}
            yAccessor={yAccessorScaled}
            barWidth={xScale.bandwidth()}
            color={color}
        />}
      </g>
    </svg>
  )
}

export default Chart