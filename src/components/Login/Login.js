import React,{useState} from 'react';


import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
firebase.initializeApp(firebaseConfig)


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user,setUser] = useState({
    isSignedIn: false,
   
    name: '', 
    email: '',
    password:'',
    error:'',
    sucess: false,
    photo: ''
  })

  const [loggedInUser,setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  


  const provider = new firebase.auth.GoogleAuthProvider();
  const FbProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignIn = () =>{
  firebase.auth().signInWithPopup(provider)
  .then(res =>{
    const{displayName, photoURL, email} = res.user;
    
    const signedInUser = {
      isSignedIn: true,
    name: displayName, 
    email: email, 
    photo: photoURL
    }
    setUser(signedInUser);
    setLoggedInUser(signedInUser);
    history.replace(from);
    console.log(displayName, photoURL, email);
  })
  .catch(err =>{
    console.log(err);
    console.log(err.message);
  })
  }

  const handlefbSignIn = () =>{
    firebase.auth().signInWithPopup(FbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
     
      setLoggedInUser(user);
      history.replace(from);
      console.log('fb user',user);
      // ...
    }).catch(err =>{
      console.log(err);
      console.log(err.message);
      // The email of the user's account used.
      var email = err.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = err.credential;
      // ...
    });
  }
  
         const handleSignOut = () => {
          firebase.auth().signOut().then(function() {
           const signUser = {
              isSignedIn: false,
              name:'',
              photo: '',
              password:'',
              email: ''
           }
           setUser(signUser);
          }).catch(function(error) {
            // An error happened.
          });
           console.log('signout clicked')
         }

         
         const handleBlur=(event)=>{
                  let isFormValid = true;
                  if(event.target.name === 'email'){
                            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
                           
                  }
                  if(event.target.name === 'password'){
                        isFormValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(event.target.value);
                       
                  }
                  if(isFormValid){
                             const newUserInfo = {...user}
                             newUserInfo[event.target.name] = [event.target.value];
                             setUser(newUserInfo);
                  }
                  
         }
         const handleSubmit = (event) =>{
            console.log(user.email,user.password)
                 if( newUser && user.email && user.password){
                  firebase.auth().createUserWithEmailAndPassword(user.email[0], user.password[0]).then(res =>{
                    const newUserInfo={...user};
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    console.log(res);
                    updateUserName(user.name[0]);

                  })
                  .catch(error=> {
                    // Handle Errors here.
                    const newUserInfo = {...user};
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    // ...
                  
                  });
                  
                 }
               
                 if(!newUser && user.email && user.password){
                  firebase.auth().signInWithEmailAndPassword(user.email[0], user.password[0]).then(res =>{
                    const newUserInfo={...user};
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log('sign in user info', res.user);
                  })
                  .catch(function(error) {
                    const newUserInfo = {...user};
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                  });
                 } 
                 event.preventDefault();
         } 

         const updateUserName = (name) =>{
         const user = firebase.auth().currentUser;

          user.updateProfile({
            displayName: name,
            // photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(function() {
            console.log('user name updated successfully')
          }).catch(function(error) {
             console.log('An error happened');
          });
         }
  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleSignIn}>Sign In</button>
      }
      <button onClick={handlefbSignIn}>Sign in Using Facebook</button>
      {
        user.isSignedIn && <p> welcome, {user.name}</p>
      }
      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() =>setNewUser(!newUser) } name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      
      
      <form onSubmit={handleSubmit}>
      {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name"/>}
      <br/>
      <input type="text" name="email" onBlur={handleBlur} placeholder="Enter your Email Address" required/>
      <br/>
      <input type="password" name="password" onBlur={handleBlur}  placeholder="Enter your password" required/>
      <br/>
      <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{color:'red'}}>{user.error}</p>
      {user.success && <p style={{color:'green'}}>User {newUser ? 'created' : 'loggedIn'} successfully</p> }
    </div>

  );
}

export default Login;
