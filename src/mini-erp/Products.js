import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//import MenuBar from "../mini-erp/MenuBar"
import {
    ListGroup, Table
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


export default function Products(){

    const [products, setProducts] = useState()
    const [notification, setNotification] = useState();
    const [user, setUser] = useState(null);
    const history = useHistory();




    useEffect(() => {

        async function UserSales() {
            try {
                //const response = await axios.get('http://localhost:8080/products');
                const response = await axios.get('https://s4b-consulting-api-mysql.herokuapp.com/products');

              console.log("my sales axios respons...",response);

              setProducts(response.data)
            } catch (error) {
              console.error(error);
            }
          }

          UserSales()



    }, [])



//&& user

    return (
        <>

            {products? (

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
                                        <th>£ Price</th>


                                    </tr>
                                </thead>

                        {products.map((pro) => (

                            
                                <tbody>
                                    <tr>
                                        <td>{pro.PRODUCT_ID}</td>
                                        <td>{pro.product_name}</td>
                                        <td>{pro.REPORT_PRODUCT}</td>
                                        <td>{pro.PRICE}</td>

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

