import React from "react"
import firebase from 'firebase/app';
import "firebase/auth"
import "firebase/firestore"

// Firebase를 이용한 회원가입
class FirebaseSignup extends React.Component{

    constructor(){
        super();
        console.log('FirebaseSignup constructor() -> to prevent warning');        
    }

    // firebase를 이용해 회원가입 처리 기능 구현
    onClickButton(){

        console.log('버튼 클릭');

        // html의 input 태그의 id값을 이용해 회원가입에 필요한 Obj 가져오기
        const emailObj = document.getElementById('email');
        const idObj = document.getElementById('id');
        const pwObj = document.getElementById('pw');

        // 실제 입력한 정보 Obj에서 가져오기
        var email = emailObj.value;
        var id = idObj.value;
        var pw = pwObj.value;

        console.log(`email: ${email}, id: ${id}, pw:${pw}`);        

        // 회원가입 -> 기존에 있는 이메일로 회원가입한 경우 catch 처리
        firebase.auth().createUserWithEmailAndPassword(email, pw)        
        // 회원가입 성공하면 바로 로그인 된다.
            .then((userCredential) => {                
                console.log('createAccount success')
                
                // App.js에서 onAuthStateChanged 작성하여 전역에서 로그인, 로그아웃 정보 확인하도록 처리

                // firestore()에 유저 추가 정보(id) 저장
                const firestroe = firebase.firestore();
                firestroe.collection('users').doc(userCredential.user.uid).set({
                    uid: userCredential.user.uid,
                    email, id
                })
                .then(function(){
                    console.log('saved');
                    // 리다이렉트
                    window.location.href = '/';
                })                           
            })
            .catch((err) => {
                console.log('createAccount fail');
                console.log('err: ', err);
                const { code } = err;
                console.log('회원가입 실패한 이유: ', code);
                alert('회원가입 실패');

                // 입력창 지우기    
                emailObj.value = '';
                idObj.value = '';
                pwObj.value = '';
            })
    }

    render(){
        return(
            <div>
                <h1>파이어베이스 회원가입</h1>
                <input id='email' type='text' placeholder='email'></input><br></br>
                <input id='id' type='text' placeholder='id'></input><br></br>
                <input id='pw' type='password' placeholder='pw'></input><br></br>
                <input type='button' onClick={this.onClickButton} value='제출'></input>
           </div>
        )
    }
}

export default FirebaseSignup;