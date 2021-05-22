import React from "react"
import "firebase/auth"
 
class Navigation extends React.Component{

    constructor(){
        super();
        console.log('Navigation constructor -> to prevent warning');
    }
   
    render(){
        return(
            <div>
                <h1>네비게이션</h1>
                <a href='/'>Main</a><br></br>
                <a href='/firebasesignup'>FirebaseSignup</a><br></br>
                <a href='/mypage'>MyPage</a><br></br>
                <a href='/logout'>Logout</a><br></br>
            </div>
        )
    }}

export default Navigation;