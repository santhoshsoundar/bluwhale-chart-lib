import React from "react"
import PropTypes from "prop-types"
import { line, curveLinear } from "d3"

const Line = ({ data, xAccessor, yAccessor, interpolation, color, ...props }) => {
  const lineGenerator = line()
    .x(xAccessor)
    .y(yAccessor)
    .curve(interpolation)

  return (
    <path {...props}
      d={lineGenerator(data)}
      style={{ fill: "none", 
        stroke: color, 
        strokeWidth: "3px", 
        strokeLinecap: "round"
      }}
    />
  )
}

Line.propTypes = {
  data: PropTypes.array,
  xAccessor: PropTypes.func,
  yAccessor: PropTypes.func,
  interpolation: PropTypes.func,
  color: PropTypes.string
}

Line.defaultProps = {
  interpolation: curveLinear,
  color: "dodgerblue"
}

export default Line
