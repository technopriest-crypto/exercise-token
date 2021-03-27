import React from 'react';
import {Line} from 'react-chartjs-2';

const steps = {
  labels: ["2021-03-16", "2021-03-17", "2021-03-18", "2021-03-19",
  "2021-03-20", "2021-03-21", "2021-03-22"],
  datasets: [
    {
      label: 'Steps',
      fill: false,
      lineTension: 0.3,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [2230, 12234, 5432, 6578,
      7898, 4200, 6942]
    }
  ]
}

export default class App extends React.Component {
  render() {
    return (
        <Line
          data={steps}
          options={{
            title:{
              display:false,
              text:'Daily',
              fontSize:20
            },
            legend:{
              display:false,
              position:'right',
            },
            scales: {
            xAxes: [{
                type: 'time',
                distribution: 'series'
              }]},
            layout: {
              padding: {
                  left: 50,
                  right: 50,
                  top: 0,
                  bottom: 50 }
              }
          }}
        />
    );
  }
}
