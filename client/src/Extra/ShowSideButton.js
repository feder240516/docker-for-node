import React, {Component} from 'react'
import styles from './ShowSideButton.module.scss'

export default class ShowSideButton extends Component{
  render(){
    return (
      <button className={styles.showButton} onClick={this.props.onClick}>
        <i className={`material-icons`}>menu</i>
      </button>
    )
  }
}