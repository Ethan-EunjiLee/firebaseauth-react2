import React from "react"
import firebase from 'firebase/app';
import "firebase/auth"
import "firebase/firestore"

// 회원 정보 보기 + 이메일 변경
class MyPage extends React.Component{ //eslint-disable-next-line
   
    constructor(){
        super();
        this.state = {}
        
        // 바인딩 이후 onClickButton 함수 내에서 state 사용 가능
        this.onClickButton = this.onClickButton.bind(this);
        console.log('MyPage constructor');
    }

    componentDidMount(){

        // firebase.auth().currentUser: 페이지가 로드된다고 해서 자격 증명을 다시 검사하는게 아니기 때문에 null로 출력
        // firebase.auth().onAuthStateChanged 사용 권장
        firebase.auth().onAuthStateChanged((user) => {
            if(user){ 
                this.setState({user});

                console.log(user);
                console.log('user.uid: ', user.uid);
                console.log('user.email: ', user.email);

                const tempUid = user.uid;
                console.log('tempUid: ', tempUid);

                // firestore()에 저장된 정보 가져오기
                const firestore = firebase.firestore();                
                firestore.collection('users').doc(tempUid).get()
                    .then((userInfo) => {
                        console.log(userInfo);
                        console.log(userInfo.data());
                        const { uid, id, email } = userInfo.data();

                        console.log(userInfo.data().email);

                        // state에 userinfo 저장 => render()에서 사용
                        // 유동적인 데이터를 state에 저장해두고 필요할 때 꺼내 쓴다.
                        this.setState({
                            email, id, uid
                        })

                })
            } else {
                alert('로그인 X');
                window.location.href = '/';
            }
          })
    }
    
    onClickButton(){

        console.log('버튼 클릭');

        // 변경할 이메일
        const emailObj = document.getElementById('email');
        var email = emailObj.value;

        console.log('email: ', email);

        console.log('state.user.email: ', this.state.user.email);
        console.log('state.user.uid: ', this.state.user.uid);
        
        const {user, uid} = this.state;        

        // auth에서 이메일 변경 -> firestore에서도 변경
        user.updateEmail(email)
            // Function 사용할 경우 this가 자신을 가장 마지막으로 품고 있는 scope로 변한다.
            // 여기서는 updateEmail함수가 아니라 component로 연결해야 하기 때문에 => (arrow function) 사용
            .then(()=>{
                console.log('이메일 update 성공');

                // firestore에서 이메일 변경
                const firestore = firebase.firestore();                
                firestore.collection('users').doc(uid).update({
                    'email': email
                })
                // stae에서 email값 변경 -> this 적용을 위해 then 함수를 arrow로 변경
                this.setState({
                    'email': email
                })

                alert('update 성공');
            })
            .catch(function(err){
                alert('update실패');
                console.log('update실패: ', err);
            })
            document.getElementById('email').value ='';
    }

    render(){
        // state에 넣은 userInfo값 가져다가 변수에 저장한 후 브라우저 출력
        console.log('this state: ', this.state);
        const { id, email, uid } = this.state;

        return(            
            <div>
                <h1>마이페이지</h1>
                <div>
                    id: {id} <br></br>
                    uid: {uid} <br></br>
                    email: <input id='email' type='text' placeholder={email}></input>
                    <input type='button' onClick={this.onClickButton} value='이메일 변경'></input>
                </div>
            </div>
        )
    }}

export default MyPage;