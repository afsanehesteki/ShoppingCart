//reducer params: old state and action

const reducer = (state, action) => {
   
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading:false };
  }

  
  if (action.type === "LOADING") {
    return { ...state, loading:true};
  }
  
  if (action.type === "CLEAR_CART") {
    console.log("clearing...");
    return { ...state, cart: [] };
  }

  
  if (action.type === "REMOVE") {
    let tempCart = state.cart.filter((item) => item.id !== action.payload);
    
    //const tmpAmount = state.totalAmount - state.cart.find((el) => el.id === action.payload).amount; //use "GET_TOTALS" instead 

    return {
      ...state,
      //totalAmount: tmpAmount,//use "GET_TOTALS" instead 
      cart: tempCart,
    };
  }

  if (action.type === "INCREASE") {
    return {
      ...state,
     // totalAmount: state.totalAmount + 1,//use "GET_TOTALS" instead 
      cart: state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      }),
    };
  }

  if (action.type === "DECREASE") { 
     const itemAmount = state.cart.find((el) => el.id === action.payload).amount;   
     if (itemAmount > 1) {  
          var tempCart = state.cart.map((item) => {     
           if (item.id === action.payload) {   
                 return { ...item, amount: item.amount - 1 };
                } 
        else return item;     
       });   
     } 
    else
     {    
        //remove    
        var tempCart = state.cart.filter((item) => item.id !== action.payload); 
       }
      return {   
       ...state,    
     // totalAmount: state.totalAmount - 1,   //use "GET_TOTALS" instead 
       cart: tempCart  
 };  
}

  if (action.type === "GET_TOTALS") {
    let totalPrice = state.cart.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.amount;
    }, 0);

    const totalAmount = state.cart.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.amount;
    }, 0);

    totalPrice = parseFloat(totalPrice.toFixed(2));

    return {
      ...state,
      totalAmount: totalAmount,
      total: totalPrice,
    };
  }
};

export default reducer;
