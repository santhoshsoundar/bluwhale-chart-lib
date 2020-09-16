This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) & cleaned for achieve a lean build for assessment.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Sample Component Definitions for Line and Bar Chart
```
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
```