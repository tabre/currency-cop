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

export default HistoryDropdown
