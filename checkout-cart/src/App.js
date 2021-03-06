import React, { useState, useEffect } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import Game from './Component/Game';
import GameList from './GameList';
import Summary from './Component/Summary'
import Banner from './Component/Banner'
import background from './photo/background.jpg'
import { nanoid } from 'nanoid';

var LOCAL_STORAGE_KEY_FOR_CARTID = 'csc301-a1-cartId';
var CARTS_URL = 'https://szae6kjook.execute-api.ca-central-1.amazonaws.com/default/carts';
var ITEMS_URL = 'https://cbx468lra3.execute-api.ca-central-1.amazonaws.com/default/items';

function generateID() {
  return nanoid(8);
}

/**
 * Return cart from db, an array of items and count,
 * model:
 * [
 *  {
 *   itemId: string,
 *   count: Number
 *  }
 * ]
 */


/**
 * Example
    items = [{count:2, itemId: "_PI0GfYp"},{count: 3, itemId:"5U76ImCT"}]
 */
function getAllItemsFromDB(setGame) {
  const url = ITEMS_URL;
  fetch(url, {
    mode: "cors",
    method: 'GET',
  })
    .then(res => {
      return res.json();
    })
    .then(items => {
      setGame(items);
    })
    .catch(err => {
      console.log("getAllItemErr", err);
    });
}
function updateCartToDB(items) {
  // Get current cart id
  let cartId;
  cartId = localStorage.getItem(LOCAL_STORAGE_KEY_FOR_CARTID);
  if (!cartId) {
    cartId = generateID();
    localStorage.setItem(LOCAL_STORAGE_KEY_FOR_CARTID, cartId)
  }
  // console.log("cartId", cartId);
  // console.log("updateTODB",items)
  const url = CARTS_URL;
  fetch(url, {
    mode: "cors",
    method: 'PUT',
    body: JSON.stringify({
      cartId: cartId,
      items: items
    })
  })
    .then(res => {
      console.log("updateCartToDB", res.status);
    })
    .catch(err => {
      console.log("updateCartToDB", err);
    });
}
  
function getCartFromDB(updateCart) {
  // Get current cart id
  let cartId;
  cartId = localStorage.getItem(LOCAL_STORAGE_KEY_FOR_CARTID);
  if (!cartId) {
    cartId = generateID();
    localStorage.setItem(LOCAL_STORAGE_KEY_FOR_CARTID, cartId)
  }
  console.log("cartId", cartId);
  const {games} = GameList
  const url = CARTS_URL+'?cartId=' + cartId;
  fetch(url, {
    mode: "cors",
    method: 'GET',
  })
    .then(res => {
      return res.json();
    })
    .then(cart => {
      const lst = [];
      let i;
      for (i = 0; i < cart.length; i++) {
        // eslint-disable-next-line 
        const temp = games.find(k => k.id === cart[i].itemId);
        lst.push({ ...temp, num:cart[i].count });
      }

      console.log("cart", cart);
      updateCart(lst)
      
    })
    .catch(err => {
      console.log("getCartFromDB", err);
    });

}



function App() {
  // const testItems = [{count:2, itemId: "_PI0GfYp"},{count: 3, itemId:"5U76ImCT"}];
  const [games, setGame] = useState([]);
  const [item, updateCart] = useState([]);
  const [dbItem, cartUpdation] = useState([]);
  
  const SampleComponent = () => {
    useEffect(() => {
      getAllItemsFromDB(setGame)
      getCartFromDB(updateCart)

    }, [])
    return (<div></div>)
  }
  SampleComponent()


  /**
 * Return array of items from database,
 * follows the following model:
 * [
 *  {
 *   id: string,
 *   image: string,
 *   name: string,
 *   price: Number
 *  }
 * ]
 */

  function completeOrder() {
    updateCart([])
    cartUpdation([])
    updateCartToDB([])
  }


  const addItem = (gameItem) => {
    const itemInCart = item.find(k => k.id === gameItem.id);
    console.log("dbItembefore",dbItem)
    if (itemInCart) {

      updateCart(item.map(x => x.id === gameItem.id ? {
        ...itemInCart, num: itemInCart.num + 1
      } : x)
      );
      console.log("item", itemInCart.id)
      const s = dbItem.find(k => k.id === gameItem.id);
      dbItem.splice(dbItem.indexOf(s), 1);
      dbItem.push({ count: itemInCart.num + 1, itemId: itemInCart.id })
      console.log("dbItem",dbItem)
      updateCartToDB(dbItem)
    }
    else {
      updateCart([...item, { ...gameItem, num: 1 }])
      dbItem.push({ count: 1, itemId: gameItem.id })
      cartUpdation(dbItem)
      console.log("singleItem",dbItem)
      updateCartToDB(dbItem)
    }

  }
  const deleteItem = (gameItem) => {
    const itemInCart = item.find((x) => x.id === gameItem.id);
    if (itemInCart.num === 1) {
      removeAll(gameItem)
      updateCartToDB(dbItem)
    } else {
      updateCart(
        item.map((x) =>
          x.id === gameItem.id ? { ...itemInCart, num: itemInCart.num - 1 } : x
        )
      );
      const s = dbItem.find(k => k.id === gameItem.id);
      dbItem.splice(dbItem.indexOf(s), 1);
      dbItem.push({ count: itemInCart.num - 1, itemId: itemInCart.id });
      updateCartToDB(dbItem)
    }
    
  };

  const removeAll = (gameItem) => {
    updateCart(item.filter((x) => x.id !== gameItem.id));
    const s = dbItem.find(k => k.id === gameItem.id);
    dbItem.splice(dbItem.indexOf(s), 1);
    updateCartToDB(dbItem)
    // getCartFromDB(dbItem)

  }
  return (
    <div className="App" style={{ backgroundImage: `url(${background})`, }}>
      <Banner></Banner>
      <div className="container">
        <div className="games">
          <h1 className="title">Hottest Sale</h1>
          <div className="item">
            {games.map((gameItem) => (
              
              <Game key={gameItem.id} gameItem={gameItem} addItem={addItem}></Game>
            ))}
          </div>
        </div>
      </div>
      <Summary completeOrder={completeOrder} item={item} addItem={addItem} deleteItem ={deleteItem} removeAll={removeAll}></Summary>
      <div className="foot">About Us/Contact Us/Join Us/
      <br></br>2021 Gamer Galaxy. All Rights Reseved.
      </div>

    </div>
  );
}
export default App;
