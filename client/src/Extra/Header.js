import React, {Component, useEffect} from 'react'
import styles from './Header.module.css'
import axios from 'axios'

export default class Header extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      myip:''
    }
  }

  componentDidMount(){
    axios.get('http://icanhazip.com').then(response=>{
      this.setState({myip:response.data})
    })
  }

  render(){
    return(
      <div className={styles.header}>
        To-Do list app at {this.state.myip}
      </div>
    )
  }
}