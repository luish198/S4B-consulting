import { NavLink } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
//import { Image } from "react-bootstrap";
import "../createquote.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { HashLoader } from 'react-spinners'


export default function QuoteSummary({ data, summary, addToSummary, companyType }) {

    const [quoteKey, setquoteKey] = useState()
    const [product, setProduct] = useState()
    const [project, setProject] = useState()



    console.log(companyType)


    useEffect(() => {
        data.quoteKey = uuidv4();

    }, [])

    useEffect(() => {
        getProductById();

    }, [project])

    useEffect(() => {
        getProjectById();

    }, [product])

    

    console.log("outside  key....", quoteKey)
    console.log("outside  data.key....", data.quoteKey)

    console.log(data)
    console.log(data.projectSelectedForm)

    console.log("here is the summary...", summary)


    //Getting the Product information from the product Id 
    const getProductById = () => {
        //http://localhost:8080
        //https://s4b-consulting-api-mysql.herokuapp.com
        axios.get('https://s4b-consulting-api-mysql.herokuapp.com/products/' + data.productSelectedForm)
            .then(function (response) {
                // handle success
                console.log("Response from all products fetch for create quote 3", response.data[0].product_name)
                setProduct(response.data[0].product_name)
                addToSummary("product", response.data[0].product_name)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
                console.log("All products fetched ")
            });
    }
    //END Getting the Product information from the product Id 

    //Getting the Project information from the project Id 
    const getProjectById = () => {
        //http://localhost:8080
        //https://s4b-consulting-api-mysql.herokuapp.com
        axios.get('https://s4b-consulting-api-mysql.herokuapp.com/projects/' + data.productSelectedForm)
            .then(function (response) {
                // handle success
                console.log("Response from all projects fetch for create quote 3", response.data[0].CLUB_NAME + response.data[0].PROJECTEDITION + response.data[0].YEAR)
                setProduct(response.data[0].CLUB_NAME + "--" + response.data[0].PROJECTEDITION + "--" + response.data[0].YEAR)
                addToSummary("project", response.data[0].CLUB_NAME + "--" + response.data[0].PROJECTEDITION + "--" + response.data[0].YEAR)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
                console.log("All projects fetched ")
            });
    }
    //END Getting the Project information from the project Id 


    return (
        <>
            <h6>Quote Summary here...</h6>

            <main className="form-signin">




                <Card style={{ width: '30rem' }}>
                    <Card.Header>{summary.project}</Card.Header>
                    <Card.Img variant="top" style={{ height: '15vh', width: '50rems', margin: 'auto', imageRendering: 'pixelated' }}
                        //src="https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/s4b-logo-long_eZmAw6pklB_.png?updatedAt=1631192744046" />
                        src="https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/s4b-logo-long_eZmAw6pklB_.png?updatedAt=1631192744046&tr=w-1200,h-628,fo-auto" />

                    <Card.Body>

                        <Card.Title>{data.companyQuoteForm}</Card.Title>
                        <Card.Text>

                            {summary.product && summary.project ?

                                < Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Contact Name</td>
                                    <td>{data.clientFirstName} {data.clientLastName}</td>
                                </tr>
                                <tr>
                                    <td>Client Email</td>
                                    <td>{data.clientEmail}</td>
                                </tr>
                                <tr>
                                    <td>Quoted Price</td>
                                    <td> £ {data.priceOffer}</td>
                                </tr>
                                <tr>
                                    <td>Product</td>
                                    <td>{summary.product}</td>
                                </tr>
                                <tr>
                                    <td>Project</td>
                                    <td>{summary.project}</td>
                                </tr>
                                <tr>
                                    <td>Company Type</td>
                                    <td>{data.companyTypeSelectedForm}</td>
                                </tr>
                                <tr>
                                    <td>Company Market</td>
                                    <td>{data.companyMarketSelectedForm}</td>
                                </tr>
                            </tbody>
                        </Table>

                       :<div className="spinner"><HashLoader /></div>}


                    </Card.Text>
                    <div className="quoteButtons">
                        <NavLink to="/home/createquote/2">
                            <Button variant="primary">Go Back</Button>
                        </NavLink>

                        <NavLink to="/home/createquote/4">
                            <Button variant="primary">Send Quote</Button>
                        </NavLink>
                    </div>
                </Card.Body>
                <Card.Footer className="text-muted">2021</Card.Footer>
            </Card>

        </main>

        </>
    )
}