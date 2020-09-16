import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import * as d3 from 'd3'

import { dimensionsPropsType } from "./utils/types"

const axisGeneratorsByDimension = {
    bottom: "axisBottom",
    left: "axisLeft",
}

const Axis = ({ position, dimensions, scale, label, formatTick, ticks, ...props }) => {

  const axisRef = useRef();
  useEffect(() => {
    const axisGenerator = d3[axisGeneratorsByDimension[position]]()
                            .scale(scale)
                            .tickFormat(formatTick)
                            .ticks(ticks)

    if (axisRef.current) {
      d3.select(axisRef.current)
        .transition()
        .call(axisGenerator)
    }
  }, [axisRef, position, scale, formatTick, ticks]);

  const computeAxisOffset = (position, dimensions) => {
    return position === "bottom" ? `translate(${dimensions.marginLeft}, ${dimensions.marksHeight + dimensions.marginTop})`
        : position === "left" ? `translate(${dimensions.marginLeft}, ${dimensions.marginTop})`
        : null
  }

  const computeAxisLabelOffset = (position, dimensions) => {
    return position === "bottom" ? `translate(${dimensions.marksWidth / 2}px, ${dimensions.marginBottom / 1.5}px)`
        : position === "left" ? `translate(${-dimensions.marginLeft / 1.5}px, ${dimensions.marksHeight / 2}px) rotate(-90deg)`
        : null
  }

  return (
      <g {...props}
        ref={axisRef}
        transform={computeAxisOffset(position, dimensions)}
      >
        {label && (
            <text
                style={{
                    transform: computeAxisLabelOffset(position, dimensions),
                    fill: "black",
                }}
            >
                { label }
            </text>
        )}    
      </g>
  )
}

Axis.propTypes = {
    dimensions: dimensionsPropsType,
    position: PropTypes.oneOf(["left", "bottom"]),
    scale: PropTypes.func,
    label: PropTypes.string,
    formatTick: PropTypes.func,
    ticks: PropTypes.number
}

Axis.defaultProps = {
    position: "bottom",
    scale: null,
    label: null,
    formatTick: d3.format(","),
    ticks: 5
}

export default Axis


