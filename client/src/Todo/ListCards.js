import React, {Component} from 'react'
import getUrl from '../helpers/url';
import Card from './Card'
import styles from './ListCards.module.scss'
import axios from 'axios'


export default class ListCards extends Component{
  constructor(props){
    super(props);
    this.state={
      cards:[],
      selectedCache:props.selected,
      expandedCard:-1,
      failed:false,
      inited:false,
    }
    
  }

  componentDidMount(){
    axios.get(`${getUrl()}/posts`).then(response=>{
      this.setState({cards:response.data,inited:true})
    }).catch(err=>{
      this.setState({failed:true})
    })
    // let cards = localStorage.getItem(`Category${this.props.selected}`) || "[]"
    
  }

  static getDerivedStateFromProps(props,state){
    if(props.selected !== state.selectedCache){
      let cards = localStorage.getItem(`Category${props.selected}`) || "[]"
      return {selectedCache: props.selected, cards:JSON.parse(cards)}
    }
    return {}
  }

  addCard = ()=>{
    axios.post(`${getUrl()}/posts`,{name:"Nueva tarjeta"}).then(response=>{
      this.setState((state,props)=>{
        // console.log({response})
        let newCards = state.cards.concat([{name:'Nueva tarjeta', id: response.data.newId}]);
        
        return {cards:newCards};
      })
    })
    
  }

  deleteCard = (id)=>{
    axios.delete(`${getUrl()}/posts/${id}`).then(response=>{
      console.log(`rettt ${id}`)
      
      this.setState((state,props)=>{
        let cards = state.cards.filter(card=>card.id !== id);
  
        
        // localStorage.removeItem(`Card${id}`)
        // localStorage.setItem(`Category${state.selectedCache}`,JSON.stringify(cards))
        return {cards}
      })
    });
    
  }

  render(){
    return (
      <>
        {/* <ShowSideButton/> */}
        {/* <div></div> */}
        <div className={styles.todoList}>
          {this.state.failed?(<h1>:C</h1>):''}
          {/* <h3 className={styles.categoryTitle}>{this.props.selectedName}</h3> */}
          {this.state.cards.map((card,i)=>(<Card cardId={card.id} key={card.id} name={card.name} expanded={card.id===this.state.expandedCard} expandCard={(id)=>this.setState({expandedCard:id})} changeTitle={this.props.changeTitle} onComplete={this.props.onComplete} deleteCard={this.deleteCard}/>)) }
          {!this.state.inited?'':<button className={styles.addButton} onClick={this.addCard}><i className={`material-icons`}>add</i></button>}
        </div>
      </>
    )
  }
}
