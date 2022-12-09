
import React from 'react'
import { CardNumeric } from '../../components/CardNumeric'

import { Chart } from "react-google-charts";

export const data = [
  ["Element", "Density", { role: "style" }],
  ["Copper", 8.94, "#b87333"], // RGB value
  ["Silver", 10.49, "silver"], // English color name
  ["Gold", 19.3, "gold"],
  ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
];


export const Dashboard = () => {
  return (
    <div className='container-fluid'>
    
      <div className='d-flex gap-2 justify-content-center align-middle'>
        <CardNumeric />
        <CardNumeric />
        <CardNumeric />
      </div>
      
      <div className='container'>
        <div className='d-flex g-2 justify-content-center align-middle'>
          <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
          <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
        </div>
      </div>

      <div className=''>

      </div>

    </div>
  )
}
