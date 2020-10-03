import React, {Component} from 'react';
import logo from './logo.svg';
import styles from './App.module.scss';

import Header from './Extra/Header'
import ListCards from './Todo/ListCards'
import SideBar from './SideBar/SideBar';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      selected: 1,
      selectedName:'',
    }
  }

  componentDidMount(){
    let nextId = localStorage.getItem('nextId') || 1
    if (nextId == 1)localStorage.setItem('nextId',nextId)
  }

  changeCategory = (id,name)=>{
    this.setState({selected: id, selectedName: name});
  }

  render(){
    
    return (
      <div className={styles.app}>
        {/* <ShowSideButton/> */}

        <Header/>
        {/* <SideBar onSelected={this.changeCategory} selected={this.state.selected}/> */}
        <ListCards selected = {this.state.selected} selectedName={this.state.selectedName}/>
        
      </div>
    );
  }
}

export default App;
