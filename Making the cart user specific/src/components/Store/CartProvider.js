import React, { useReducer } from "react";
import CartContext from "./CartContext";


let initialState = {
  items: [],
  selectedItem: [],
  totalAmount: 0
};



const reducer = (state, action) => {
  let updateItems;
  if (action.type === 'ADD') {
    

    const itemExistidx = state.items.findIndex((val) => val.id === action.value.id);
    const itemExist = state.items[itemExistidx];

    if (itemExist) {
      let updateItem = {
        ...itemExist,
        amount: parseInt(action.value.amount)
      };
      updateItems = [...state.items];
      updateItems[itemExistidx] = updateItem;
    } else {
      updateItems = [...state.items, action.value];
    }
    state.totalAmount = updateItems.reduce((tamount, item)=> tamount + (item.price * item.amount),0)
  }

  if (action.type === 'REMOVE') {
    updateItems = state.items.filter((val) => val.id !== action.value.id);
    state.totalAmount = updateItems.reduce((tamount, item)=> tamount + (item.price * item.amount),0)
  }

  if (action.type === 'SET_ITEMS'){
    updateItems=action.value
    state.totalAmount = updateItems.reduce((tamount, item)=> tamount + (item.price * item.amount),0)
  }
  if (action.type === 'EMPTY_CART'){
    updateItems=action.value
    state.totalAmount=0;
  }

  if (action.type === 'DETAILS') {
    state.selectedItem = [action.value];
  }

  return {
    ...state,
    items: updateItems || []
  };
};

const CartProvider = (props) => {

  const [cartState, dispatchItems] = useReducer(reducer, initialState);


  const api="https://crudcrud.com/api/1126cd26e87040c48ca24d786fc1232d"
  let userEmail
    const fetchData = async () => {
      userEmail = localStorage.getItem('email');
      if (userEmail) {
        userEmail = userEmail.replace(/[^a-zA-Z]/g, "");
      }
      console.log("fetch data");

      if (userEmail) {
        const url = `${api}/cart${userEmail}`;

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch cart data');
          }
          const data = await response.json();
          console.log(data)
          dispatchItems({ type: 'SET_ITEMS', value: data });
        } catch (error) {
          console.error(error);
          
        }
      }
    };


  const emptyCart =()=>{
    dispatchItems({ type: 'EMPTY_CART', value: [] });
  }
    
      
  const addItemsHandler = (item) => {
    dispatchItems({ type: 'ADD', value: item });
    userEmail = localStorage.getItem('email')
    if (userEmail){
      userEmail=userEmail.replace(/[^a-zA-Z]/g, "");
     }

     if (userEmail) {
      const url = `${api}/cart${userEmail}`;
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          })
        .then((response) => {
          if (response.ok) {
            console.log(response);
            console.log('Item added/updated');
          } else {
            console.error('Error adding/updating item');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    
    
  };
  

  const removeItemsHandler = (item) => {
    dispatchItems({ type: 'REMOVE', value: item });
    const itemDelete = cartState.items.find((val) => val.id === item.id);
     
    console.log(itemDelete)

    userEmail = localStorage.getItem('email')
    if (userEmail){
      userEmail=userEmail.replace(/[^a-zA-Z]/g, "");
     }
     console.log(userEmail)

    if (userEmail){
    fetch(`${api}/cart${userEmail}/${itemDelete._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok)
           console.log ("item deleted") 
        else {
          console.error("error while deleting item")
        }     
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  const selectedItemHandler = (item) => {
    dispatchItems({ type: 'DETAILS', value: item });
  };

  const cartContext = {
    items: cartState.items,
    fetchData:fetchData,
    totalAmount: cartState.totalAmount,
    selectedItem: cartState.selectedItem,
    emptyCart:emptyCart,
    selectedItemHandler: selectedItemHandler,
    addItem: addItemsHandler,
    removeItem: removeItemsHandler,
  };

  return (                   
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
