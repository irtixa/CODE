import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListItems from './ListItems'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

 library.add(faTrash)

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        text:'',
        key:''
      },
      edititems: false
    }
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    this.update= this.update.bind(this);
  }
  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;

    if(this.state.edititems === false){
      if(newItem.text !==""){
        const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem:{
          text:'',
          key:''
        }
      })
      }
    }
    else{
      this.setUpdate(this.state.currentItem.text,this.state.currentItem.key);
      this.state.edititems = false;
      this.setState({
        currentItem:{
          text:'',
          key:''
        }
      })

    
    }
  }
  handleInput(e){
    if(this.state.edititems == false){
      this.setState({
        currentItem:{
          text: e.target.value,
          key: Date.now()
        }
      })
    }else{
      this.setState({
        currentItem:{
          text: e.target.value,
          key: this.state.currentItem.key
        }
      })
    }
    
  }
  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })

  }
  update(key){
    const selectedItems= this.state.items.find(item => item.key === key);
    console.log("selectedItems",selectedItems);
    this.setState({
      currentItem : {
        text : selectedItems.text,
        key : selectedItems.key
      },
      edititems : true
    })
    // this.setState({
    //   items:filteredItems,
    //   item:selectedItems.title,
    //   key:key
    // })
  }
  setUpdate(text,key){
    console.log("text",text);
    console.log("key",key);
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    })
    
   
  }
 render(){
  return (
    <div className="App">
      <header>
        <form id="to-do-form" onSubmit={this.addItem}>
        <ion-icon name="bluetooth-outline"></ion-icon>
          <input type="text" placeholder="Enter task" value= {this.state.currentItem.text} onChange={this.handleInput}></input>
          <button type="submit">{this.state.edititems ? "Update" : "Add"}</button>
        
        </form>
        <p>{this.state.items.text}</p>
        
          <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate} update={this.update}/>
        
      </header>
    </div>
  );
 }
}


export default App;