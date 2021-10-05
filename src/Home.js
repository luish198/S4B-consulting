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

//---------------------------------------Component states global

const [projectSelected, setProjectSelected] = useState("")
const [productSelected, setProductSelected] = useState("")
const [companyQuote, setCompanyQuote] = useState("")

//---------------------------------------- End Component States global


    const [notification, setNotification] = useState();
    const history = useHistory();
    //const [user, setUser] = useState(null);
    const [user, setUser] = useState("luis higuera");


    /*useEffect(() => {

        //fetch("http://localhost:5000/users/checkSession", { credentials: 'include' })
            fetch("https://s4b-consulting-user-api.herokuapp.com/users/checkSession", { credentials: 'include' })

            .then((response) => response.json())
            .then((response) => {
                //console.log(response.user.username)
                setUser(response.user);
            })
    }, [])*/



    return (

        <>

            {user ? (
                <div>
                    {/* mini-erp area---------------------------------------------------- */}

                    <MenuBar />



                    {/* <h1>Members Area ! V.I.P </h1> */}

                    {/* {notification && <h2>notification</h2>} */}
                    {/* {user && <p>{user.username}</p>} */}
                    {/* {user && <p>{user.email}</p>} */}
                    {/* {user && <p>{user.role}</p>} */}







                    <Switch>
                        <Route path="/home/Ctrlpanel">
                            <Ctrlpanel />
                        </Route>
                        <Route path="/home/createquote">
                            <Createquote 
                            projectSelected={projectSelected} 
                            setProjectSelected={setProjectSelected}
                            productSelected = {productSelected}
                            setProductSelected = {setProductSelected}
                              />
                        </Route>
                        <Route path="/home/confirm-quote">
                            <ConfirmOffer />
                        </Route>
                        <Route path="/home/reports">
                            <Reports />
                        </Route>
                        <Route path="/clients">
                            <Clients />
                        </Route>
                        <Route path="/home/client-create">
                            <ClientCreate />
                        </Route>
                        <Route path="/consultants">
                            <Consultants />
                        </Route>
                        <Route path="/home/products">
                            <Products />
                        </Route>
                        <Route path="/home/clients">
                            <Clients />
                        </Route>



                    </Switch>




                </div>






            ) : ("Loading...")
            }


        </>



    )




}
