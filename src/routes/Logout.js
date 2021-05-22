import React from "react"
import firebase from 'firebase/app';
import "firebase/auth"

class Logout extends React.Component{

    constructor(){
        super();
        console.log('Logout component constructor');
    }

    // 로그아웃 버튼 클릭 이벤트
    onClickButton(){

        console.log('로그아웃 버튼 클릭');

        firebase.auth().onAuthStateChanged((user) => {
            if(!user){
                alert('로그인 정보가 없어 Main으로 돌아갑니다.');
                window.location.href = '/';       
            } else {
                firebase.auth().signOut().then(()=>{
                    console.log('logout');
                })
            }
        })
    }

    render(){
        return(
            <div>
                <h1>로그아웃</h1>
                <input type='button' onClick={this.onClickButton} value='로그아웃'></input>
           </div>
        )
    }
}

export default Logout;