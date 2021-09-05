import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MenuBar from "../mini-erp/MenuBar"
import {
    ListGroup, Table
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Clients() {

    const [clients, setClients] = useState()
    const [notification, setNotification] = useState();
    const [user, setUser] = useState(null);
    const history = useHistory();


    useEffect(() => {

        fetch("http://localhost:5000/users/checkSession", { credentials: 'include' })

            .then(response => {
                if (response.status !== 200) {
                    return response.json().then(data => { throw new Error(data.message) })
                } else {
                    return response.json();
                }
            })
            .then(response => {
                setNotification("Welcome back " + response.user.username);
                setUser(response.user);
            })
            .catch(error => {
                setNotification(error.message);
                setTimeout(() => {
                    setNotification(null);
                    history.push("/");
                }, 6000);



            })

    }, [])


    useEffect(() => {

        fetch("http://localhost:8080/clients")
            .then(res => res.json())
            .then(data => {
                setClients(data);
            })

    }, [])




    return (
        <>

            {clients && user ? (

                <div>
                    <MenuBar />
                    <h1>Consultants here ....</h1>
                    <h1>Members Area ! V.I.P </h1>


                    {notification && <h2>{notification}</h2>}
                    {user && <p>{user.username}</p>}
                    {user && <p>{user.email}</p>}
                    {user && <p>{user.role}</p>}


                    <div>
                        <h1>Clients list !</h1>

                        {clients.map((cli) => (


                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Company Name</th>
                                        <th>Main Contact</th>
                                        <th>Town</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>{cli.COMPANY_NAME}</td>
                                        <td>{cli.MAIN_CONTACT}</td>
                                        <td>{cli.TOWN}</td>
                                        
                                        
                                    </tr>
                                    
                                </tbody>
                            </Table>





                        ))}
                    </div>

                </div>


            )
                : (
                    <>
                        "Loading..."
                        {notification && <h2>{notification}</h2>}
                    </>
                )}



        </>



    )
}


/*<ul>
                                <li key={cli.id}>{cli.COMPANY_NAME}</li>
                                <li key={cli.id}>{cli.MAIN_CONTACT}</li>
                            </ul> */