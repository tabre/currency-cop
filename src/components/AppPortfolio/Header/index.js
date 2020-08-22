import React, { PropTypes } from 'react'
import './index.css'

import HeaderMeta from './Meta'
import HeaderChart from './Chart'
import HeaderLargeStats from './Stats'

class PortfolioHeader extends React.Component {

  constructor (props) {
    super(props);
    this.getSelectedTimeframe = this.getSelectedTimeframe.bind(this);

    this.state = {
      selectedTimeframe: 60
    };
  }

  render () {
    this.state.timeframeData = this.getTimeframeData(
      this.props.data, this.state.selectedTimeframe
    )

    return (
      <div className="portfolio-header">
        <h1>
          {this.props.name}

          <i onClick={(e) => this.edit(e)} className="material-icons">&#xE8B8;</i>
        </h1>

        <HeaderMeta
          history={this.props.data}
          league={this.props.league}
          lastChecked={this.props.lastChecked}
          lastUpdated={this.props.lastUpdated}
          getSelectedTimeframe={this.getSelectedTimeframe}/>

        <HeaderLargeStats
          holdings={this.props.holdings}
          profit={this.props.change}
          rate={this.getRate(this.state.timeframeData)}/>

        <HeaderChart
          data={this.state.timeframeData} />
      </div>
    )
  }

  getSelectedTimeframe = (timeframe) => {
    this.setState({selectedTimeframe: timeframe });
  }

  getTimeframeData(data, timeframe) {

    let x = data.map(i => new Date(i.createdAt));
    let y = data.map(i => i.total);

    if (timeframe !== 'league') {
      let now = new Date();
      let startTime = new Date(now - (timeframe * 60000));

      x = x.filter((i: any) => {return i >= startTime;});
      y = y.slice(y.length - x.length);

    };

    return {
      x: x,
      y: y
    };
  }

  getRate(data){
    let tStart = new Date();
    let tEnd = tStart;
    let cStart = 0;
    let cEnd = 0;

    if (data.x.length > 0) {
      tStart = data.x[0];
      tEnd = data.x[data.x.length - 1];
      cStart = data.y[0];
      cEnd = data.y[data.y.length - 1];
    } else {return 0};

    let tDelta = Math.abs(tEnd - tStart) / (1000*60*60);
    let cDelta = (cEnd - cStart);

    return (Math.round(cDelta/tDelta * 100) / 100);
  }

  edit () {
    CC.Events.emit('/screen/portfolio/update', {
      portfolioId: this.props.id
    })
  }
}

export default PortfolioHeader
