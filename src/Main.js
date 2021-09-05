import { logDOM } from '@testing-library/react';
import './main.css';
import s4blogo from "./images/s4b-logo-single.png";
import Login from "./Login"
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';


export default function Main() {

    const [login, setLogin] = useState(false)

    const goToLogin = (event) => {
        setLogin(!login)
        //console.log(login)
    }

    return (
        <>
            <div className="box-1">

                <div className="logo">
                    <img className="logo" src={s4blogo} alt="" width="60" height="60" />
                    <p className="tajam-menu">S4B Consulting</p>
                </div>

                <div>
                    <ul className="main_menu">
                        <li>HOME</li>
                        <li>ABOUT</li>
                        <li>PROJECTS</li>
                        <li>CONTACT</li>
                        <li><button onClick={goToLogin}>{login? "Back" : "Login"}</button></li>

                    </ul>
                </div>

                <div className="heading1 center-text margin-text color-text-1" >
                    <h1 className="hmargin">Luis Higuera</h1>
                    <hr className="line" />
                    <p className="margin-text">Web Development & Solutions for Business</p>
                    <div className="img-avatar">..</div>
                </div>

            </div>

            {/* <div>main box</div> */}
            <div>
                {login? <Login />: ""}
            </div>

            
            <div>footer</div>

        </>

    )
}