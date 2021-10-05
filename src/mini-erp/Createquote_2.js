import { useEffect, useState, useRef } from "react";
import "../createquote.css";
import Form from 'react-bootstrap/Form'
//import CreateQuote_3 from "./CreateQuote_3";
import { FaThumbsUp } from 'react-icons/fa';
import { NavLink, Link } from "react-router-dom";
//import { v4 as uuidv4 } from 'uuid';
import { HashLoader } from 'react-spinners'


export default function CreatequoteClient({ onChange }) {

    const [cMarket, setCMarket] = useState()

  
    //const [clientFormShow2, setClientFormShow2] = useState(true)
    //const quoteForm2 = useRef(null);

    /* const clientQuoteFormHandler = (event) => {
         event.preventDefault();
         const data = new FormData(quoteForm2.current)
         const formToObject = Object.fromEntries(data.entries());
 
     }*/


    //getting Generic Market for the dropdown........................
    useEffect(() => {
        fetch("http://localhost:8080/clients/company-market")
            //fetch("https://s4b-consulting-api.herokuapp.com/clients")
            .then(res => res.json())
            .then(data => {
                setCMarket(data);
                console.log(data.value)
            })

    }, [])


    return (
        <>
            <div>

                {cMarket ?

                    <main className="form-signin">
                        <p>Quote - client details....</p>

                        <form  >
                            <NavLink to="/home/createquote">
                                <button className="w-100 btn btn-lg btn-primary">
                                    Go Back
                                </button>
                            </NavLink>

                            <Form.Text className="text-muted">
                                ...
                            </Form.Text>


                            <div className="img-logo2"></div>
                            <h3 className="h3 mb-3 fw-normal">Client Information...</h3>


                            <div className="form-floating">
                                <input
                                    onChange={onChange}
                                    type="email"
                                    name="clientEmail"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="name@example.com"
                                    required

                                />
                                <label htmlFor="floatingInput">Client Email address</label>
                            </div>

                            <div className="form-floating">
                                <input
                                    onChange={onChange}
                                    type="text"
                                    name="clientFirstName"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Client First Name"
                                    required

                                />
                                <label htmlFor="floatingInput">Client First Name</label>
                            </div>

                            <div className="form-floating">
                                <input
                                    onChange={onChange}
                                    type="text"
                                    name="clientLastName"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Client Last Name"
                                    required

                                />
                                <label htmlFor="floatingInput">Client Last Name</label>
                            </div>

                            <div className="form-floating">
                                <input
                                    onChange={onChange}
                                    type="number"
                                    name="priceOffer"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Offer Price"
                                    required

                                />
                                <label htmlFor="floatingInput"> £ Offer Net Price</label>
                            </div>

                            <div className="form-floating">

                                <Form.Select aria-label="Default select example" onChange={onChange}
                                    className="select" name="companyMarketSelectedForm" required
                                >
                                    <option value="">Select market here...</option>
                                    {cMarket.map((cmark, i) => (
                                        <option value={cmark.COMARKET_ID}>
                                            {cmark.COMARKET_NAME}

                                        </option>
                                    ))}
                                </Form.Select>
                            </div>

                            <NavLink to="/home/createquote/3">

                                <button
                                    className="w-100 btn btn-lg btn-primary"
                                    type="submit"
                                >
                                    Submit .... <FaThumbsUp />
                                </button>

                            </NavLink>

                            <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
                        </form>

                    </main>

                    : <HashLoader/>}
            </div>


        </>

    )

}

