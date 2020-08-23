import React, { PropTypes } from 'react'
import * as Helpers from '@/helpers'
import TimeframeDropdown from './TimeframeDropdown'
import moment from 'moment-shortformat'
import './index.css'

class HeaderMeta extends React.Component {

  render () {
    return (
      <div className="portfolio-meta">
        <div className="portfolio-meta-league">{ this.props.league }</div>

        <TimeframeDropdown
          list={this.getTimeframeList()}
          selected={this.props.selectedTimeframe}
          getSelectedTimeframe={this.props.getSelectedTimeframe}/>

        <div>Last checked { moment(this.props.lastChecked).short() }</div>
      </div>
    )
  }

  getTimeframeList () {

    let list = [
      {label: "1 hour", value: 60},
      {label: "12 hours", value: 720},
      {label: "1 day", value: 1440},
      {label: "1 week", value: 10080},
      {label: "1 month", value: 43200},
      {label: "league", value: "league"}
    ]

    return list.map((item, index) => {
      return {
        key: index,
        value: item.value,

        displayContent: (
          <span>{item.label}</span>
        ),

        dropdownContent: (
          <div className="dropdown-item">
            <span className="total"><br />{item.label}</span>
          </div>
        )
      }
    })
  }

  // getHistoryList () {
  //   if (!this.props.history || !this.props.history.length) {
  //     return []
  //   }
  //
  //   let list = this.props.history.map(item => item)
  //   return list.reverse().splice(0, 5).map((item, index) => {
  //     return {
  //       index,
  //       createdAt: item.createdAt,
  //
  //       displayContent: (
  //         <span>Portfolio History</span>
  //       ),
  //
  //       dropdownContent: (
  //         <div className="dropdown-item">
  //           <span className="total">{ Helpers.formatNumber(item.total) } C</span>
  //           <span className="time"><br />{ moment(item.createdAt).format('MM/DD/YY hh:mm A') }</span>
  //         </div>
  //       )
  //     }
  //   })
  // }

}

export default HeaderMeta
