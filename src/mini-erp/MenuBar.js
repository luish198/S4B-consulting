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

       

        const logout = () => {

            //fetch("http://localhost:5000/users/logout", {
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
                                 <Nav.Link to="/home/Ctrlpanel"    as={Link}  name="Ctrlpanel">Cpanel</Nav.Link>                                 
                                 <Nav.Link to="/home/createquote"  as={Link}  name="create-quote" >Create an offer</Nav.Link>



                                <Nav.Link  to="/home/confirm-quote"  as={Link} name="confirm-quote">Quotes</Nav.Link>

                                <Nav.Link  to="/home/reports"  as={Link}  name="reports">Reports</Nav.Link>

                                <Nav.Link  to="/home/products"  as={Link} name="products">Products</Nav.Link>


                                <NavDropdown title="Clients" id="navbarScrollingDropdown">
                                    <NavDropdown.Item  to="/home/clients" as={Link}  name="clients">Clients list</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item  to="/home/client-create" as={Link}  name="client-create">Create a new client</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item  to="/home/client-reports" as={Link} >Client reports</NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="Consultants" id="navbarScrollingDropdown2">
                                    <NavDropdown.Item href="#"  name="consultants">Consultants</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">Consultant Reports</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">Consultant details</NavDropdown.Item>
                                </NavDropdown>


                                <Button variant="outline-success" onClick={logout}>Logout</Button>

                                {user?
                                 <Nav.Link  name="user">User: {user && user.username}</Nav.Link> : ""
                                }

                                

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





// Comments 
// try to pass the user information into the menubar component instead of Login component