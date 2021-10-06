import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//import MenuBar from "../mini-erp/MenuBar"
import {
    ListGroup, Table
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


export default function Products(){

    const [clients, setClients] = useState()
    const [notification, setNotification] = useState();
    const [user, setUser] = useState(null);
    const history = useHistory();




    useEffect(() => {

        async function UserSales() {
            try {
                //const response = await axios.get('http://localhost:8080/products');
                const response = await axios.get('https://s4b-consulting-api-mysql.herokuapp.com/products');

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
                        <h1>Product List list !</h1>

                        <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Product ID</th>
                                        <th>Item</th>
                                        <th>Ref</th>

                                    </tr>
                                </thead>

                        {clients.map((cli) => (

                            
                                <tbody>
                                    <tr>
                                        <td>{cli.PRODUCT_ID}</td>
                                        <td>{cli.product_name}</td>
                                        <td>{cli.REPORT_PRODUCT}</td>

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

