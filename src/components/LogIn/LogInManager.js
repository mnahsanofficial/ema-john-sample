import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework=()=>{
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
     }else {
        firebase.app(); // if already initialized, use that one
     }
    //firebase.initializeApp(firebaseConfig);
}
export const handleGoogleSignIn = ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider)
    .then(res=>{
      const {displayName,photoURL,email} = res.user;
      const signInUser={
        isSignedIn:true,
        name: displayName,
        email:email,
        photo:photoURL,
        success:true,
      }
      return signInUser;
      console.log(displayName,email,photoURL);
    })
    .catch(error=>{
      console.log(error);
      console.log(error.message);
    })
  
  }

  export const handleFBSinIn=()=>{
      
  const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      var user = result.user;
      user.success=true;
      console.log(user)
      return user;
      var accessToken = credential.accessToken;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

  export const handleSignOut=()=>{
    return firebase.auth().signOut()
    .then(res=>{
      const signedOutUser={
        isSignedIn:false,
        name:'',
        email:'',
        password: '',
        photo:'',
        success:true,
      }
      return signedOutUser;
  
    })
    .catch(error=>{
  
    })
  
  }

  export const createUserWithEmailAndPassword=(name,email,password)=>{
    return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(res=>{
    //   const newUserInfo={...user};
    const newUserInfo=res.user;
      newUserInfo.error='';
      newUserInfo.success=true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo={};
      newUserInfo.error=error.message;
      newUserInfo.success=false;
      return newUserInfo;
    });
  
  }
  export const signInWithEmailAndPassword =(email,password)=>{
    return firebase.auth().signInWithEmailAndPassword(email,password)
    .then(res=>{
    //   const newUserInfo={...user};
      const newUserInfo=res.user;
      newUserInfo.error='';
      newUserInfo.success=true;
      return newUserInfo
      
    })
    .catch((error) => {
      const newUserInfo={};
      newUserInfo.error=error.message;
      newUserInfo.success=false;
      return newUserInfo;
    });
  }
  const updateUserName=name=>{
    const user = firebase.auth().currentUser;
  
  user.updateProfile({
    displayName: name,
    //photoURL: "https://example.com/jane-q-user/profile.jpg"
  }).then(function() {
    console.log('user name updated')
  }).catch(function(error) {
    console.log(error)
  });
  }