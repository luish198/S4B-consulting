import {
    Button, Navbar, Container,
    Nav, NavDropdown, Form,
    FormControl
} from 'react-bootstrap';

import s4blogo from "../images/s4b-logo-single.png";
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';



export default function MenuBar(){

    const history = useHistory();
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState();

        //handle submit from bootstrap ----------------

        const handleSubmitnav = (event) => {
            
            const form = event.currentTarget;
            history.push(form.name);
            event.preventDefault();
        }
        //---------------------------------------------





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



    return (

        <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#"><img className="logo" src={s4blogo} alt="" width="60" height="60" /></Navbar.Brand>
                        <Navbar.Brand href="#">Mini ERP - S4B Consulting </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="mr-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link href="#" onClick={handleSubmitnav} name="Ctrlpanel">Cpanel</Nav.Link>

                                <Nav.Link href="#" onClick={handleSubmitnav} name="create-quote" >Create an offer</Nav.Link>

                                <Nav.Link href="#" onClick={handleSubmitnav} name="confirm-quote">Confirm Quote</Nav.Link>

                                <Nav.Link href="#" onClick={handleSubmitnav} name="reports">Reports</Nav.Link>

                                <Nav.Link href="#" onClick={handleSubmitnav} name="products">Products</Nav.Link>


                                <NavDropdown title="Clients" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#" onClick={handleSubmitnav} name="clients">Clients list</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action4" onClick={handleSubmitnav} name="clientCreate">Create a new client</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">Client reports</NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="Consultants" id="navbarScrollingDropdown2">
                                    <NavDropdown.Item href="#" onClick={handleSubmitnav} name="consultants">Consultants</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">Consultant Reports</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">Consultant details</NavDropdown.Item>
                                </NavDropdown>


                                <Button variant="outline-success" onClick={logout}>Logout</Button>

                            </Nav>

                            {/* <Form className="d-flex" onsubmit={handleSubmitnav}> */}
                            {/* <FormControl */}
                            {/* type="search" */}
                            {/* placeholder="Search" */}
                            {/* className="mr-2" */}
                            {/* aria-label="Search" */}

                            {/* /> */}
                            {/* <Button variant="outline-success">Search</Button> */}
                            {/* </Form> */}


                        </Navbar.Collapse>

                    </Navbar>
    )


}