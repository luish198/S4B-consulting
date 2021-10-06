import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//import MenuBar from "../mini-erp/MenuBar"
import {
    ListGroup, Table
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


export default function Clients() {

    const [clients, setClients] = useState()
    const [notification, setNotification] = useState();
    const [user, setUser] = useState(null);
    const history = useHistory();


   /* useEffect(() => {

        //fetch("http://localhost:5000/users/checkSession", { credentials: 'include' })
            fetch("https://s4b-consulting-user-api.herokuapp.com/users/checkSession", { credentials: 'include' })

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

    }, [])*/

    


    /*useEffect(() => {

        fetch("http://localhost:8080/clients")
        //fetch("https://s4b-consulting-api.herokuapp.com/clients")
            .then(res => res.json())
            .then(data => {
                setClients(data);
            })

    }, [])*/

    useEffect(() => {

        async function UserSales() {
            try {
            //const response = await axios.get('http://localhost:8080/clients');
            const response = await axios.get('https://s4b-consulting-api-mysql.herokuapp.com/clients');

              console.log("my sales axios respons...",response);

              setClients(response.data)
            } catch (error) {
              console.error(error);
            }
          }

          UserSales()



    }, [])



//&& user

    return (
        <>

            {clients  ? (

                <div>
                    {/* <MenuBar /> */}
                    {/* <h1>Consultants here ....</h1> */}
                    <h2>Members Area Only ! V.I.P </h2>


                    {notification && <h2>{notification}</h2>}
                    {user && <p>{user.username}</p>}
                    {user && <p>{user.email}</p>}
                    {user && <p>{user.role}</p>}


                    <div>
                        <h1>Clients list !</h1>

                        <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Company Name</th>
                                        <th>Main Contact</th>
                                        <th>Contact Email</th>
                                        <th>Town</th>
                                    </tr>
                                </thead>

                        {clients.map((cli) => (

                            
                                <tbody>
                                    <tr>
                                        <td>{cli.CLIENT_ID}</td>
                                        <td>{cli.COMPANY_NAME}</td>
                                        <td>{cli.MAIN_CONTACT}</td>
                                        <td>{cli.EMAIL}</td>
                                        <td>{cli.TOWN}</td>


                                    </tr>

                                </tbody>
                            
                        ))}
                        </Table>


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