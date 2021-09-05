import { BrowserRouter as Router, Switch, Route, Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import {
    Button, Navbar, Container,
    Nav, NavDropdown, Form,
    FormControl
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//components-----------------------------------------
import Ctrlpanel from './mini-erp/Ctrlpanel'
import Createquote from './mini-erp/Createquote'
import ConfirmOffer from './mini-erp/ConfirmOffer'
import Reports from './mini-erp/Reports'
import Clients from './mini-erp/Clients'
import Consultants from './mini-erp/Consultants'
import Products from './mini-erp/Products'
import ClientCreate from './mini-erp/ClientCreate'

import MenuBar from "./mini-erp/MenuBar";


//--------------------------------------end Components


export default function Home() {

    


    const [notification, setNotification] = useState();
    const history = useHistory();
    const [user, setUser] = useState(null);

    const logout = () => {

        fetch("http://localhost:5000/users/logout", {
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
                history.push("/");
                //window.location.href = "http://localhost:3000/";

            })
            .catch(error => {
                setNotification(error.message);
            })
    }


    useEffect(() => {

        fetch("http://localhost:5000/users/checkSession", { credentials: 'include' })
            .then((response) => response.json())
            .then((response) => {
                //console.log(response.user.username)
                setUser(response.user);
            })
    }, [])








    return (

        <>

            {user ? (
                <div>
                    {/* mini-erp area---------------------------------------------------- */}

                    <MenuBar logout={logout}   />

                    

                    <h1>Members Area ! V.I.P </h1>

                    {notification && <h2>notification</h2>}
                    {user && <p>{user.username}</p>}
                    {user && <p>{user.email}</p>}
                    {user && <p>{user.role}</p>}







                    <Switch>
                        <Route exact path="Ctrlpanel">
                            <Ctrlpanel />
                        </Route>
                        <Route exact path="/create-quote">
                            <Createquote />
                        </Route>
                        <Route exact path="/confirm-quote">
                            <ConfirmOffer />
                        </Route>
                        <Route exact path="/reports">
                            <Reports />
                        </Route>
                        <Route exact path="/clients">
                            <Clients />
                        </Route>
                        <Route exact path="/clientCreate">
                            <ClientCreate />
                        </Route>
                        <Route exact path="/consultants">
                            <Consultants />
                        </Route>
                        <Route exact path="/products">
                            <Products />
                        </Route>
                        


                    </Switch>




                </div>






            ) : ("Loading...")
            }


        </>



    )




}
