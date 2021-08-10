import React, { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFBSinIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LogInManager';

function LogIn() {
  const [newUser,setNewUser]=useState(false);

  const [user,setUser]=useState({
    isSignedIn:false,
    name: '',
    email: '',
    photo: '',
    error: '',
    success:false,
  });
  initializeLoginFramework();
  const [loggedInUser,setLoggedInUser]=useContext(UserContext);
  const history=useHistory();
  const location=useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleResponse=(res,redirect)=>{
    setUser(res);
    setLoggedInUser(res);
      if(redirect){
        history.replace(from);
      }

  }

  const googleSignIn=()=>{
      handleGoogleSignIn()
      .then(res=>{
        handleResponse(res,true);
      })
  }
  const fBSinIn=()=>{
      handleFBSinIn()
      .then(res=>{
        handleResponse(res,true);
      })
  }
  const signOut=()=>{
      handleSignOut()
      .then(res=>{
        handleResponse(res,false);
      })
  }


const handleSubmit=(event)=>{
  if(newUser && user.email && user.password){
   createUserWithEmailAndPassword(user.name,user.email,user.password)
   .then(res=>{
    handleResponse(res,true);
   })
  }
  if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email,user.password)
      .then(res=>{
        handleResponse(res,true);

      })


  }
  event.preventDefault();

}
const handleChange=(event)=>{
  let isFieldValid=true;
  if(event.target.name==='email'){
   isFieldValid = (/\S+@\S+\.\S+/.test(event.target.value))   
  }
  if(event.target.name==='password'){
    const isPasswordValid=event.target.value.length>6;
    const passwordHasNumber= /\d{1}/.test(event.target.value)
    isFieldValid=isPasswordValid && passwordHasNumber;

  }
  if(isFieldValid){
    const newUserInfo={...user};
    newUserInfo[event.target.name]=event.target.value;
    setUser(newUserInfo);


  }

}

  return (
    <div className="App">
     {
       user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
       <button onClick={googleSignIn}>Sign in</button>
       }
       <br/>
       <button onClick={fBSinIn}>Sign in Using Facebook</button>

       
       
     {
       user.isSignedIn &&<div>
          <p>Welcome , {user.name}</p>
          <p>Your email:{user.email}</p>
          <img src={user.photo} alt=""/>
          </div>
     }

     <h1>Our own Authentication</h1>
     <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""/>
     <label htmlFor="newUser">New User Sign Up</label>
     <form onSubmit={handleSubmit}>
       {newUser && <input type="text" name="name" onBlur={handleChange} placeholder="Your Name"/>}
       <br/>
     <input type="text" onBlur={handleChange} name="email" placeholder="Your Email Address" required />
     <br/>
     <input type="password" onBlur={handleChange} name="password" placeholder="Your  Password" id="" required />
     <br/>
     <input type="submit" value={newUser?'Sign In':'Sign Up'}/>
     </form>
     <p style={{color: 'red'}}>{user.error}</p>
     {user.success && <p style={{color: 'green'}}>User {newUser?'created':'logged in'} successfully</p>}


    </div>
  );
}

export default LogIn;
