// about react
import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
// firebase
import firebase from 'firebase/app';
// router componenet
import Navigation from "./Navigation";
import FirebaseSignup from "./routes/FirebaseSingup";
import MyPage from "./routes/MyPage";
import Main from "./routes/Main";
import Logout from "./routes/Logout";

class App extends React.Component {

  // firebase init
  // constructor()에 해당 내용을 넣어 메인 컴포넌트가 마운트되기 전에 firebase를 초기화한다. 
  constructor(){

    super();

    // firebase 프로젝트 생성 시 발급되는 비공개키
    // 테스트 프로젝트이기 때문에 간편 사용을 위해 바로 끌어다 사용
    const firebase_params = {
      "apiKey": "AIzaSyDt2mWadNneumLdqrVCywhdnRFHvsI7_Z4",
      "type": "service_account",
      "projectId": "fir-auth-bea2a",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC0aqkS9wI6tBTk\nCck8qKXrN8+NpgG1vwHOD90fCdLDJ9HbRZ+M71cS+1uVP0EnyPuuYjhpfX5K3JrV\n4mDwFe5COZ2+pp2S7XM05RbhIc4celJch3KdY+/M1msm+kb0VTnVja60HwX0LLG9\nrkm+Yovih1VirP/cQ9y9as5t4H3tY8jzr8VbwM5PhEq6ezaBr27qnshZZJvmK9lA\nJ/g6anbXGaucc6JyUPQoZpHaRwDoCZakEqfNIIYpyWA7wCYc7WwImxu1/ciL9wSp\nGOx/PmFH86lUlpcA/mmPv67uNIVo+Lvar2Xl6HPTTb2J/9j+oso9Ju5/Amk+nAdZ\nw+ziVFf7AgMBAAECggEAI+YvU1s8IdMwbvm1hbDnJuk5ju1v3KqvoMGOVb0+J1/2\nhYOSjlgXgurqG8X04IZA8j+QCwmSBjJkStfbQxqSCLJvPX7oztIZwPYuuchgu1Dp\nr4iyGThIAIHP23ckhDyrH9+r2iJsLFxyV5RlDxGL1RzptBNJbBpCw5wLjFiFpiUE\nzPaMPIaWVlLVCDq55D8F+B4cYdH3VSQIE947rDDOmgy+BqYAZoCfMIxsBb2aYz5P\nDgBy09ViyWlm89g6eKETCv1/mhNBM1t1pHrEiPWB7By9iiZnJBikt+zi8pokEoI2\nCEDG+l+WVCxhdtuTMKd4tUaJYyenehUu/Ji+TtvkLQKBgQD6wZ62VzvIczS8u5WV\nw7mK1OdXVeMmxrdI2ANGJ6eZQ7qHsqCxylSyoerI2DVER7hEMu65e3idSlqDfugb\nuaRJs5+AnGDtRzbfBNv87KwUodptaf9v28K8GYiu4FmTC9avCeWn1/TzmfH8dArG\nUcDYbvD/+DyNwSqaVMNwS0iQtQKBgQC4MH1C+thNCPplx7LtlrWu3K07t2sYOeax\n/2eyJz8nh23ctp2XabSCmWfguCVOepexoJa6OOCQE0PxAIJJF69rOJ1xeIMz+D6t\n+ygd4MLynjal+c5C+4Bj5wr10RNS77GQEfUX37Vu2u2wgyyoWTil8iaHJSL0nPy3\noc0aoOqj7wKBgHsmQAYZDXlCazINhkdJGoR+TydrPOW8TiNuQx1fOEZjJuah6Z2n\nWrVoI+CDnpVsC6kiwm9BnljRPWa7Gs8S+wZfOwR0yH1/rgkVX9z1dwWi/50go5yR\n9y9d8uy/rf4zoDnSyIEH5HsGrftoGiqP1//zbFSp20NbDMtCucEamAbJAoGAc8tA\nJIiwzRVU3gHC0i0KQUlIux8fe9aC2upXVZ/oy0AP6E8CGfuBWQ16ScNa6NCXZzsv\nJxm0y77g2rVYMv1p8b1g9cIusdBiD1yzJr1zsbWXY5b9fgzA9Y19zXZIcL5x4cH4\nVK72UB/giDSfMaMNwv3ODO5i4GeFVSiqWhBKEw8CgYAHF4wCVNHhwKPiT3bj88iP\nYsI89xJp0P5Iu+sb547dOeocr1w+5XpheG3MU8TToogPqiiebLFdlCYNYej6lFgi\nS9+/arcP/28gmyFJ4v9Xl8ss8BeYZyhbca6j6u0IgjJrcOXkZcgeZquVdkO0C5ux\n4PrZnmgWbNaRQ9JNiK/hLA==\n-----END PRIVATE KEY-----\n",
      "private_key_id": "937e32f13a7ec42389e7cafc250cf03c90c8a120",
      "client_email": "firebase-adminsdk-6j7ak@fir-auth-bea2a.iam.gserviceaccount.com",
      "client_id": "106710747811478638404",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6j7ak%40fir-auth-bea2a.iam.gserviceaccount.com"
    }


    console.log('App constructor');

    //firebase - 현재 firebase app이 없는 경우에만 초기화 진행
    if(!firebase.apps.length){
      firebase.initializeApp(firebase_params);
    }

    // 로그인, 로그아웃한 경우 바로바로 상태 출력
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log('User is signed in');
        console.log(user);
      } else {
        console.log('User is singed out');        
      }
    })

    console.log('firebase.auth().currentUser', firebase.auth().currentUser);
  }  

  render(){

    /**
     * return 구성
     * Main: 상단 네비게이션
     * BrowserRouter: 라우터
     *  - FirebaseSignup: firebase 회원가입
     *  - InsertNotice: firebase 권한 확인
     */

    return(
      <div>
        <Navigation></Navigation>
        <BrowserRouter>
          <Route exact path='/' component={Main}></Route>
          <Route path='/firebasesignup' component={FirebaseSignup}></Route>
          <Route path='/mypage' component={MyPage}></Route>
          <Route path='/logout' component={Logout}></Route>
        </BrowserRouter>
      </div>
    )
  } 
}

export default App