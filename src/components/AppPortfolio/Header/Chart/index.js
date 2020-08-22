import React, { PropTypes } from 'react'
import './index.css'
import Plot from 'react-plotly.js'
import {getTimeframeData} from '@/helpers'

class HeaderChart extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let data = getTimeframeData(this.props.data, this.props.timeframe)

    let layout =  {
      autosize: true,
      title: {
        text: "",
        xanchor: "left"
      },
      paper_bgcolor: "#282828",
      plot_bgcolor: "#282828",
      font: {
        color: "#777"
      },
      margin: {
        l: 50,
        r: 25,
        t: 25,
        b: 50
      },
      xaxis: {gridcolor: "#444"},
      yaxis: {title: "Net Worth (C)", gridcolor: "#444"}
    };

    let chartData = [
      {
        x: data.x,
        y: data.y,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: "#8fd331"},
        line: {shape: 'spline'}
      }
    ];

    let config = {displayModeBar: false};

    return (
      <div
        style={{
            width: "100%"
        }}
      >
        <Plot
          useResizeHandler
          style={{ width: '100%', height: '100%' }}
          data={chartData}
          layout={layout}
          config={config}
        />
      </div>
    )
  }

}

export default HeaderChart
