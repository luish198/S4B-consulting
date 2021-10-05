import { NavLink } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
//import { Image } from "react-bootstrap";
import "../createquote.css";
import {useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';


export default function QuoteSummary({ data, summary, companyType }) {

   const [quoteKey, setquoteKey] = useState()

   console.log(companyType)
   

    useEffect(()=>{
        data.quoteKey = uuidv4()
    },[])

    console.log("outside  key....",quoteKey)
    console.log("outside  data.key....",data.quoteKey)

    console.log(data)
    console.log(data.projectSelectedForm)

    console.log("here is the summary...",summary)


    

    return (
        <>
            <h3>Quote Summary here...</h3>

            <main className="form-signin">

                
            
            
                <Card style={{ width: '50rem' }}>
                    <Card.Header>{summary.project}</Card.Header>
                    <Card.Img variant="top" style={{ height: '15vh', width: '50rems', margin:'auto', imageRendering:'pixelated'}}
                    //src="https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/s4b-logo-long_eZmAw6pklB_.png?updatedAt=1631192744046" />
                    src="https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/s4b-logo-long_eZmAw6pklB_.png?updatedAt=1631192744046&tr=w-1200,h-628,fo-auto" />

                    <Card.Body>
                        
                        <Card.Title>{data.companyQuoteForm}</Card.Title>
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
                                        <td>{summary.companyType}</td>
                                    </tr>
                                    <tr>
                                        <td>Company Market</td>
                                        <td>{data.companyMarketSelectedForm}</td>
                                    </tr>
                                </tbody>
                            </Table>


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