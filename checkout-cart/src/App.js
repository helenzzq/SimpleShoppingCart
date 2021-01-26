import React, { useState, useEffect } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
const removeIcon = <svg t="1599643167569" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1290" width="200" height="200"><path d="M804.414 123.434h-156.903c-7.827-67.871-65.572-120.767-135.51-120.767-69.935 0-127.672 52.893-135.499 120.767h-156.911c-63.498 0-115.15 51.667-115.15 115.163v5.909c0 48.523 30.213 90.055 72.775 106.977v544.022c0 63.498 51.659 115.163 115.152 115.163h439.272c63.495 0 115.15-51.67 115.15-115.163v-544.02c42.559-16.924 72.775-58.456 72.775-106.977v-5.909c0-63.498-51.657-115.165-115.15-115.165zM512 57.282c39.777 0 72.978 28.51 80.324 66.151h-160.633c7.344-37.643 40.547-66.151 80.309-66.151zM792.174 895.504c0 33.385-27.163 60.55-60.537 60.55h-439.272c-33.374 0-60.537-27.167-60.537-60.55v-535.836h560.347v535.836zM864.948 244.505c0 33.385-27.163 60.55-60.537 60.55h-584.822c-33.374 0-60.537-27.165-60.537-60.55v-5.909c0-33.385 27.163-60.55 60.537-60.55h584.824c33.374 0 60.537 27.165 60.537 60.55v5.909zM365.594 886.209c15.082 0 27.307-12.23 27.307-27.305v-307.468c0-15.078-12.227-27.309-27.307-27.309s-27.307 12.232-27.307 27.309v307.468c-0.002 15.08 12.225 27.305 27.307 27.305zM512 886.209c15.082 0 27.309-12.23 27.309-27.305v-307.468c0-15.078-12.232-27.309-27.309-27.309-15.08 0-27.307 12.232-27.307 27.309v307.468c0 15.08 12.225 27.305 27.307 27.305zM658.406 886.209c15.08 0 27.305-12.23 27.305-27.305v-307.468c0-15.078-12.227-27.309-27.305-27.309-15.084 0-27.309 12.232-27.309 27.309v307.468c-0.002 15.08 12.23 27.305 27.309 27.305z" fill="#ffffff" p-id="1291"></path></svg>;

const INIT_ITEMS = [
  {
    text: 'Apple'
  },
  {
    text: 'Banana'
  },
  {
    text: 'Carrot'
  }
]

function Item({ item, removeItem, index }) {
  return (
    <div className="cart">
      <div className="item">
        {item.text}
      </div>
      <a className="remove" href="#!" onClick={(e) => removeItem(e, index)}>
        {removeIcon}
      </a>
    </div>
  )
}

function ItemForm({ addItem }) {
  const [value, setValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addItem(value);
    setValue('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        className="input"
        onChange={(e) => {setValue(e.target.value)}}
      />
        
    </form>
  )
}

function App () {
  const localItems = JSON.parse(localStorage.getItem('items'));
  const [items, setItems] = useState(localItems || INIT_ITEMS);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items])

  const addItem = text => {
    const newItems = [{ text }, ...items];
    setItems(newItems);
  };

  const removeItem = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className="app">
      <div className="cart-list">
        <ItemForm addItem={addItem} />
        {
          items.map((v, index) => (
            <Item
              key={v.text} 
              item={v} 
              index={index} 
              removeItem={removeItem}
            />
          ))
        }
      </div>
    </div>
  )
}
export default App;
