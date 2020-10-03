import React, {Component} from 'react'
import styles from './Card.module.scss'
import axios from 'axios'
import getUrl from '../helpers/url';

export default class Card extends Component{

  constructor(props){
    super(props);
    this.state = {
      expanded: false,
      
      renaming: false,

      title: props.name || '',
      subtasks: [],

      addButton: React.createRef(),
      editButton: React.createRef(),
      deleteButton: React.createRef(),
      doneButton: React.createRef(),
      editingSub: -1,
    }
  }

  componentDidMount(){
    
    /*let cardData = localStorage.getItem(`Card${this.props.cardId}`,) || JSON.stringify({title: 'new Card', subtasks:[
      {text:'Hacer el diseño UI', completed: false},
      {text:'Hacer el diseño UI', completed: false}, 
      {text:'Hacer el diseño UI', completed: false},
    ]})
    cardData = JSON.parse(cardData);
    console.log(cardData)
    this.setState({title: cardData.title, subtasks:cardData.subtasks});*/
  }

  saveChangesToStorage = ()=>{
    this.setState((state,props)=>{
      let newCardData = {title:state.title, subtasks:state.subtasks};
      localStorage.setItem(`Card${this.props.cardId}`,JSON.stringify(newCardData));
      return {};
    })
  }

  addSubtask = ()=>{
    this.setState((state,props)=>{
      let subtasks = state.subtasks.concat({text:'Nueva subtarea',completed:false});
      return {subtasks,expanded:true};
    })
    this.saveChangesToStorage();
  }

  deleteSubtask = (i)=>{
    this.setState((state,props)=>{
      let subtasks = state.subtasks.filter((task,index)=>index!==i)
      return {subtasks};
    })
    this.saveChangesToStorage();
  }

  handleClick = (e)=>{
      // console.log({e:e.target.classList})
      let classList = e.target.classList;

      switch(e.target){
        case this.state.addButton.current:
          // this.addSubtask();
          break;
        case this.state.editButton.current:
          // console.log('aca')
          this.setState({renaming:true});
          break;
        case this.state.deleteButton.current:
          console.log(`${this.props.cardId} card`)
          this.props.deleteCard(this.props.cardId);
          break;
        case this.state.doneButton.current:
          this.finishCardRenaming(this.props.cardId);
          break;
        default:
          
          // this.props.expandCard(this.props.cardId);
          break;
          // this.setState((state,props)=>{
          //   return {expanded: state.renaming? true: !state.expanded}
          // })
      }
      /*if (classList.includes(styles['icon--add'])){
        console.log('adding')
      }*/
      
    
  }

  handleDoubleClick = ()=>{
    // console.log('double')
    //this.setState({renaming:true})
  }

  finishCardRenaming = ()=>{
    this.setState({renaming:false,expanded:true})
    axios.put(`${getUrl()}/posts`,{id:this.props.cardId,name:this.state.title})
  }

  handleChangeTitle = (event)=>{
    this.setState({title:event.target.value})
  }

  handleCompleted = (i,newStatus)=>{
    this.setState((state,props)=>{
      let subtasks = [...state.subtasks]
      subtasks[i] = {...subtasks[i], completed:newStatus};
      //console.log({jjjjjj:subtasks})
      return {subtasks}
    })
    this.saveChangesToStorage();
  }

  editSubtask = (i)=>{
    this.setState({editingSub:i});
    this.saveChangesToStorage();
  }

  renameSubtask = (i,newName)=>{
    this.setState((state,props)=>{
      let subtasks = [...state.subtasks ]
      subtasks[i] = {...subtasks[i], text:newName};
      return {subtasks};
    })
  }

  finishEditSubtask = ()=>{
    this.setState({editingSub:-1})
    this.saveChangesToStorage();
  }

  render(){

    // console.log(this.state.subtasks.map(task=>task.completed))

    let headerContents = this.state.renaming
        ? (<>
            <input type='text' value={this.state.title} className={styles.card__header__changeName} 
                            onChange={this.handleChangeTitle}/>
            <i ref={this.state.doneButton} className={`material-icons ${styles.icon}`}>done</i>
          </>)
        : (<>
            <span style={{fontSize:24}}>{this.props.cardId}: {this.state.title} 
              {/* <i ref={this.state.addButton} className={`material-icons ${styles.icon}`}>add</i> */}
              <i ref={this.state.editButton} className={`material-icons ${styles.icon}`}>edit</i>
              <i ref={this.state.deleteButton} className={`material-icons ${styles.icon}`}>delete</i>
            </span>
          </>)
    
    //console.log({tt:this.state.subtasks})
    let subcards = this.state.subtasks.map((task,i)=>(
      <div key={i} className={styles.card__body__subtask}>
        {i !== this.state.editingSub
            ?<>
              <input type="checkbox"  checked={task.completed} onChange={(event)=>this.handleCompleted(i,event.target.checked)} className={`${styles.subTask} ${task.completed?styles['subTask--complete']:styles['subTask--incomplete']}`}/>
              <span>
                {task.text}
                <i className={`material-icons ${styles.icon} ${styles.littleIcon}`} onClick={()=>this.editSubtask(i)}>edit</i>
                <i className={`material-icons ${styles.icon} ${styles.littleIcon}`} onClick={()=>this.deleteSubtask(i)}>delete</i>
              </span>
            </>
            :<>
              <input type='text' value={task.text} onChange={(event)=>this.renameSubtask(i,event.target.value)}></input>
              <i className={`material-icons ${styles.icon} ${styles.littleIcon}`} onClick={()=>this.finishEditSubtask()}>done</i>
            </>}
      </div>))

    if (this.state.subtasks.length === 0){
      /*subcards = (
        <div key={-1} className={`${styles.card__body__notask}`} onClick={this.addSubtask}>
          Ninguna subtarea ha sido añadida. Haga click aquí o en el botón <i className={`material-icons ${styles.littleIcon}`}>add</i> de arriba para añadir una subtarea a esta tarea.
        </div>
      )*/
    }
        

    return (
      
        <div className={`${styles.card}`} >
          {/* <span>{this.props.cardId}</span> */}
          <div className={styles.card__header} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
            {headerContents}
            
          </div>
          {/* <div className={`${styles['collapsible-wrapper']} ${this.props.expanded?'':styles['collapsed']}`}> */}
            <div className={`${styles.card__body }`}>
              
              {subcards}
              
              <div className={styles.card__shadow}></div>
            </div>
          
          {/* </div> */}
        </div>
    )
  }
}