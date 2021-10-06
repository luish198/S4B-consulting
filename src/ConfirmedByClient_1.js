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

    const checkIt = (e)=>{
        
        //console.log("for the tickbox....",e.target.checked)
        setCheckTc(e.target.checked)

    }

    useEffect(() => {

        axios.get('http://localhost:8080/clients/quotes/' + quote_key)
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

        //console.log("clients consol...", Clients)

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
                                            {/* <td>{quoteData.product}</td> */}
                                        </tr>
                                        <tr>
                                            <td>Project</td>
                                            {/* <td>{quoteData.project}</td> */}
                                        </tr>
                                        <tr>
                                            <td>Company Type</td>
                                            {/* <td>{quoteData.companyType}</td> */}
                                        </tr>
                                        <tr>
                                            <td>Company Market</td>
                                            {/* <td>{quoteData.companyMarketSelectedForm}</td> */}
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