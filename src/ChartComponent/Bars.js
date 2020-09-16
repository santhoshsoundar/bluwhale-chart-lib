import React from "react"
import PropTypes from "prop-types"

const Bars = ({ data, dimensions, xAccessor, yAccessor, barWidth, color, ...props }) => (
  <React.Fragment>
    {data.map((d, i) => {
      return <rect {...props}
        key={i}
        x={xAccessor(d)}
        y={yAccessor(d)}
        width={barWidth}
        height={dimensions.marksHeight - yAccessor(d)}
        fill={color}
      />
    })}
  </React.Fragment>
)

Bars.propTypes = {
  data: PropTypes.array,
  xAccessor: PropTypes.func,
  yAccessor: PropTypes.func,
  barWidth: PropTypes.number
}

Bars.defaultProps = {
  barWidth: 20
}

export default Bars
