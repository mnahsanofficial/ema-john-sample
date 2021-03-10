import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart=props.cart;
    //const totalPrice=cart.reduce((total,prd)=>total+prd.price,0 );
    let totalPrice=0;
    for(let i=0;i<cart.length;i++){
        const product =cart[i];
        totalPrice=totalPrice+product.price*product.quantity;
    }
    let shipping=0;
    if(totalPrice>35){
        shipping=0;
    }
    else if(totalPrice>15){
        shipping=4.99;
    }
    else if(totalPrice>0){
        shipping=12.99;
    }
    const tax=totalPrice/10;

    const formatNumber=num=>{
        const precision=num.toFixed(2);
        return Number(precision);
    }
    
    

   return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price:{totalPrice}</p>
            <p>ShippingCost:{shipping}</p>
            <p>Tax+VAT:{formatNumber( tax)}</p>
            <p>Total Price:{formatNumber( totalPrice+shipping+tax)}</p>
            <br/>
            {
                props.children
            }
            {/* <Link to="/review">
            <button className="main-button">Review Button</button>
            
            </Link> */}
        </div>
    );
};

export default Cart;