import React, { PropTypes } from 'react'
import * as Helpers from '@/helpers'
import moment from 'moment-shortformat'

import './index.css'

class HistoryDropdown extends React.Component {
  render () {
    let {selected, list} = this.props

    return (
      <div className={this.getContainerClassName()}>
        <div className={this.getDropdownClassName()} onClick={ this.show }>
          { list[selected].displayContent }
          <i className="material-icons">&#xE5C5;</i>
        </div>

        <div className="dropdown-list">
          <div>
            {this.renderListItems()}
          </div>
        </div>
      </div>
    )
  }

  renderListItems () {
    return this.props.list.map((item, index) => {
      return (
        <div
          key={item.createdAt}
          className={`${this.props.selected === index ? 'selected' : ''}`}
          onClick={(e) => this.select(item)}>
          {item.dropdownContent}
        </div>
      )
    })
  }

  constructor (props) {
    super(props)

    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.select = this.select.bind(this)

    this.state = {
      listVisible: false
    }
  }

  select (selected) {
    // ...
  }

  show () {
    this.setState({ listVisible: true })
    document.addEventListener("click", this.hide)
  }

  hide () {
    this.setState({ listVisible: false })
    document.removeEventListener("click", this.hide)
  }

  getContainerClassName () {
    return `dropdown-container ${this.state.listVisible ? " show" : ""}`
  }

  getDropdownClassName () {
    return `dropdown-container ${this.state.listVisible ? " clicked": ""}`
  }
}

class TimeframeDropdown extends React.Component {
  render () {
    let {selected, list} = this.props
    return (
      <div className={this.getContainerClassName()}>
        <div className={this.getDropdownClassName()} onClick={ this.show }>
          { list[selected].displayContent }
          <i className="material-icons">&#xE5C5;</i>
        </div>

        <div className="dropdown-list">
          <div>
            {this.renderListItems()}
          </div>
        </div>
      </div>
    )
  }

  renderListItems () {
    return this.props.list.map((item, index) => {
      return (
        <div
          key={item.key}
          className={`${this.props.selected === index ? 'selected' : ''}`}
          onClick={(e) => this.select(item)}>
          {item.dropdownContent}
        </div>
      )
    })
  }

  constructor (props) {
    super(props)

    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.select = this.select.bind(this)

    this.state = {
      listVisible: false
    }
  }

  select (selected) {
    this.props.getSelectedTimeframe(selected.value);
  }

  show () {
    this.setState({ listVisible: true })
    document.addEventListener("click", this.hide)
  }

  hide () {
    this.setState({ listVisible: false })
    document.removeEventListener("click", this.hide)
  }

  getContainerClassName () {
    return `dropdown-container ${this.state.listVisible ? " show" : ""}`
  }

  getDropdownClassName () {
    return `dropdown-container ${this.state.listVisible ? " clicked": ""}`
  }
}

class HeaderMeta extends React.Component {

  render () {
    return (
      <div className="portfolio-meta">
        <div className="portfolio-meta-league">{ this.props.league }</div>

        <HistoryDropdown
          list={this.getHistoryList()}
          selected={0} />

        <TimeframeDropdown
          list={this.getTimeframeList()}
          selected={0}
          getSelectedTimeframe={this.props.getSelectedTimeframe}/>

        <div>Last checked { moment(this.props.lastChecked).short() }</div>
      </div>
    )
  }

  getHistoryList () {
    if (!this.props.history || !this.props.history.length) {
      return []
    }

    let list = this.props.history.map(item => item)
    return list.reverse().splice(0, 5).map((item, index) => {
      return {
        index,
        createdAt: item.createdAt,

        displayContent: (
          <span>Portfolio History</span>
        ),

        dropdownContent: (
          <div className="dropdown-item">
            <span className="total">{ Helpers.formatNumber(item.total) } C</span>
            <span className="time"><br />{ moment(item.createdAt).format('MM/DD/YY hh:mm A') }</span>
          </div>
        )
      }
    })
  }

  getTimeframeList () {

    let list = [
      {key: 0, label: "1 hour", value: 60},
      {key: 1, label: "12 hours", value: 720},
      {key: 2, label: "1 day", value: 1440},
      {key: 3, label: "1 week", value: 10080},
      {key: 4, label: "1 month", value: 43200},
      {key: 5, label: "league", value: "league"}
    ]

    return list.map((item, index) => {
      return {
        index,
        value: item.value,

        displayContent: (
          <span>timeframe</span>
        ),

        dropdownContent: (
          <div className="dropdown-item">
            <span className="total"><br />{ item.label }</span>
          </div>
        )
      }
    })
  }

}

export default HeaderMeta
