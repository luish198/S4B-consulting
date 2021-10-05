import './login.css';
import { useEffect, useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
//importing components here ---------------------------------------------


export default function Login() {


    const history = useHistory();

    const loginForm = useRef(null);
    const [notification, setNotification] = useState(null);
    const [user, setUser] = useState(null);
    


    const login = (e) => {
        e.preventDefault();
        const data = new FormData(loginForm.current)
        const formToObject = Object.fromEntries(data.entries());
        //console.log(formToObject.email)
        //console.log(formToObject.password)

        //fetch("http://localhost:5000/users/login", {
        fetch("https://s4b-consulting-user-api.herokuapp.com/users/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            //"Access-Control-Allow-Origin": "http://localhost:5000",
            "Access-Control-Allow-Origin": "https://s4b-consulting-user-api.herokuapp.com",
            body: JSON.stringify(formToObject)
        })
            .then(response => {
                response.headers.forEach((value, key) => {
                    //console.log(key, value);
                })
                if (response.status !== 200) {
                    return response.json().then(data => { throw new Error(data.message) })
                } else {
                    return response.json();
                }
            })
            .then(response => {
                setNotification("Welcome back " + response.data.username);
                setUser(response.data);
                //window.location.href = "https://mini-erp.s4b-consulting.de";
                history.push("/home", {userInfo: {user}});

            })
            .catch(error => {
                setNotification(error.message);
                setTimeout(() => {
                    setNotification(null);
                }, 6000);
            })
    }


    const logout = () => {
        //fetch("http://localhost:8080/users/logout", {
        fetch("https://s4b-consulting-user-api.herokuapp.com/users/logout", {

            credentials: 'include'
        })
            .then(response => {

                if (response.status !== 200) {
                    return response.json().then(data => { throw new Error(data.message) })
                } else {
                    return response.json();
                }
            })
            .then(response => {
                setUser(null);
                // document.cookie = "cookie.sid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                setNotification(response.message);
            })
            .catch(error => {
                setNotification(error.message);
            })
    }

    useEffect(() => {
        setTimeout(() => {
            setNotification(null);
        }, 6000);
    }, [notification]); 

    useEffect(() => {
        //console.log("from browser", document.cookie)
        //fetch("http://localhost:5000/users/me", {
        fetch("https://s4b-consulting-user-api.herokuapp.com/users/me", {

            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            //"Access-Control-Allow-Origin": "http://localhost:8080"
            "Access-Control-Allow-Origin": "https://s4b-consulting-user-api.herokuapp.com"

            

        })
            .then(response => {
                if (response.status !== 200) {
                    return response.json().then(data => { throw new Error(data.message) })
                } else {
                    return response.text();
                }
            })
            .then(response => {
                //console.log({ response });
                setUser(response.data);
            })
            .catch(error => {
                setUser(null);
            })
    }, []);

    return (
        <>

            {notification && <h2>{notification}</h2>}
            {/* <button onClick={logout}> logout </button> */}
            {/* {user && <p>{user.username}</p>} */}
            {/* {user && <p>{user.email}</p>} */}
            {/* {user && <p>{user.role}</p>} */}

            <main className="form-signin">
                <form ref={loginForm} onSubmit={login}>



                    <div className="img-logo2"></div>



                    <h3 className="h3 mb-3 fw-normal">Members Area</h3>

                    <div className="form-floating">
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        //onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                        //onChange={(e) => setPass(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button
                        className="w-100 btn btn-lg btn-primary"
                        type="submit"
                    //onClick={checking}
                    >
                        Sign in
                    </button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
                </form>
            </main>

            







        </>
    )
}