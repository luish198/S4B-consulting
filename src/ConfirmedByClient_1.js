import axios from 'axios';
import { useEffect, useState } from 'react';
//import Clients from './mini-erp/Clients';
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import Table from 'react-bootstrap/Table'
import ConfirmedByClient_2 from './ConfirmedByClient_2'

export default function ConfirmOffer_ByClient_1({ quoteData, setQuoteData }) {

    const { quote_key } = useParams()
    console.log("this is the quote key from confirmedbyclient 1...", quote_key)

    const [checkedTc, setCheckTc] = useState(false);

    const [product, setProduct] = useState()
    const [project, setProject] = useState()



    const checkIt = (e)=>{
        //console.log("for the tickbox....",e.target.checked)
        setCheckTc(e.target.checked)
    }

    useEffect(() => {
        getProductById();

    }, [project])

    useEffect(() => {
        getProjectById();

    }, [product])





    //Getting the Product information from the product Id 
    const getProductById = () => {
        axios.get('https://s4b-consulting-api-mysql.herokuapp.com/products/' + quoteData.productSelectedForm)
            .then(function (response) {
                // handle success
                console.log("Response from all products fetch for create quote 3", response.quoteData[0].product_name)
                setProduct(response.data[0].product_name)
                //addToSummary("product", response.data[0].product_name)
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
        axios.get('https://s4b-consulting-api-mysql.herokuapp.com/projects/' + quoteData.productSelectedForm)
            .then(function (response) {
                // handle success
                console.log("Response from all projects fetch for create quote 3", response.data[0].CLUB_NAME + response.data[0].PROJECTEDITION + response.data[0].YEAR)
                setProject(response.data[0].CLUB_NAME + "--" + response.data[0].PROJECTEDITION + "--" + response.data[0].YEAR)
                //addToSummary("project", response.data[0].CLUB_NAME + "--" + response.data[0].PROJECTEDITION + "--" + response.data[0].YEAR)
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







    useEffect(() => {

        //axios.get('http://localhost:8080/clients/quotes/' + quote_key)
        axios.get('https://s4b-consulting-api-mysql.herokuapp.com/clients/quotes/' + quote_key)

            .then(function (response) {
                // handle success
                console.log(response.data);
                setQuoteData(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
                console.log("all done")

            });

    }, [])




    useEffect(() => {
        if (quoteData.length !== 0) {
            console.log("Nearly ready to confirm...")
            console.log(quoteData[0].CLIENT_ID)
            console.log(quoteData)


        }
    }, [quoteData])









    return (
        (quoteData.length !== 0) ? (
            <>
                <h2> Your Order will be confirmed soon ! ...</h2>

                {/* form details--------------------------------------------------- */}

                <h3>Quote Summary here...</h3>

                <main className="form-signin">


                    <Card style={{ width: '50rem' }}>
                        <Card.Header>{quoteData[0].QUOTE_REF}</Card.Header>
                        <Card.Img variant="top" style={{ height: '15vh', width: '50rems', margin: 'auto', imageRendering: 'pixelated' }}
                            //src="https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/s4b-logo-long_eZmAw6pklB_.png?updatedAt=1631192744046" />
                            src="https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/s4b-logo-long_eZmAw6pklB_.png?updatedAt=1631192744046&tr=w-1200,h-628,fo-auto" />

                        <Card.Body>

                            <Card.Title>{quoteData[0].COMPANY_NAME}</Card.Title>
                            <Card.Text>

                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Contact Name</td>
                                            <td>{quoteData[0].MAIN_CONTACT}</td>
                                        </tr>
                                        <tr>
                                            <td>Client Email</td>
                                            <td>{quoteData[0].EMAIL}</td>
                                        </tr>
                                        <tr>
                                            <td>Quoted Price</td>
                                            <td> £ {quoteData[0].NET_AMOUNT}</td>
                                        </tr>
                                        <tr>
                                            <td>Product</td>
                                            <td>{product}</td>
                                        </tr>
                                        <tr>
                                            <td>Project</td>
                                            <td>{project}</td>
                                        </tr>
                                        <tr>
                                            <td>Company Type</td>
                                            <td>{quoteData.companyType}</td>
                                        </tr>
                                        <tr>
                                            <td>Company Market</td>
                                            <td>{quoteData.companyMarketSelectedForm}</td>
                                        </tr>
                                    </tbody>
                                </Table>


                            </Card.Text>

                            <div className="checkbox mb-3">
                                <label>
                                    <input type="checkbox"  onChange={checkIt}  /> Accept Terms and Conditions
                                </label>
                            </div>

                            <div className="">

                                {checkedTc? 

                                <NavLink to="/orderconfirmed/orderconfirmed_2">
                                    <Button variant="primary">Accept Quote</Button>
                                </NavLink>

                                : ""}


                            </div>
                        </Card.Body>
                        <Card.Footer className="text-muted">2021 - Terms and conditions</Card.Footer>
                    </Card>

                </main>

                {/* end of form details ------------------------------------------------- */}



            </>
        ) :
            (
                <>
                    <h1> Your Offer has expired please contact your consultant for a new quote ! ...</h1>
                </>
            )

    )
}