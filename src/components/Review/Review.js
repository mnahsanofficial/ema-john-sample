import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewIten/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {

    const[cart,setCart]=useState([]);
    const [orderPlaced,setOrderPlace]=useState(false)
    const history =useHistory()


    const handleProceedCheckout=() =>{
        history.push('/shipment')
        // setCart([]);
        // setOrderPlace(true);
        // processOrder();

    }

    const handleRemoveProduct =(productKey)=>{
        const newCart =cart.filter(pd=>pd.key!==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }

    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const  productKeys=Object.keys(savedCart);
        const cartProducts= productKeys.map(key=>{
            const product =fakeData.find(pd=>pd.key===key);
            product.quantity=savedCart[key]
            return product;
        });
        setCart(cartProducts);
    },[])
    let thankYou;
    if(orderPlaced){
        thankYou=<img src={happyImage} alt="" srcset=""/>
    }
    return (
        <div className="twin-Container"> 
            <div className="product-container">
            {
                cart.map(pd=><ReviewItem key={pd.key} product={pd} handleRemoveProduct={handleRemoveProduct}></ReviewItem>)
            }
            {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
                <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
            </div>
        </div>
    );
};

export default Review;