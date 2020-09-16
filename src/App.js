import React from 'react';
import './App.css';
import { curveMonotoneX } from "d3"

import Chart from "./ChartComponent/Chart";

function App() {
  const data = [
    { x: 0, y: 10 },
    { x: 1, y: 20 },
    { x: 2, y: 40 },
    { x: 3, y: 20 },
    { x: 4, y: 10 }
  ];
  const chartDimentions = {
    width: 600, 
    height: 400,
    marginTop: 60,
    marginRight: 40,
    marginBottom: 60,
    marginLeft: 75 
  };

  return (
    <div className="App">
        <Chart 
          data={data}
          dimensions={chartDimentions}
          backgroundColor={"white"}
          type="line"
          interpolation={curveMonotoneX}
          xAccessor={d => d.x} 
          yAccessor={d => d.y}
          xLabel={"line X"}
          yLabel={"line y"}
        />
        <Chart 
          data={data}
          dimensions={chartDimentions}
          color={"red"}
          backgroundColor={"white"}
          type="bar"
          xAccessor={d => d.x} 
          yAccessor={d => d.y}
          xLabel={"bars X"}
          yLabel={"bars y"}
        />
    </div>
  );
}

export default App;
