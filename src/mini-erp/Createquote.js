import { useEffect, useState, useRef } from "react";
import "../createquote.css";
//import Form from 'react-bootstrap/Form'
import { Switch, Route } from "react-router-dom";
//import Products from "./Products";
import CreateQuote_1 from "./CreateQuote_1";
import Createquote_2 from "./Createquote_2";
import CreateQuote_3 from "./CreateQuote_3";
import CreateQuote_4 from "./CreateQuote_4";


const initialData = {
    companyQuoteForm: "",
    projectSelectedForm: [],
    productSelectedForm: [],
    clientEmail: "",
    clientFirstName: "",
    clientLastName: "",
    priceOffer: "",
    CompanyMarketSelectedForm: [],
    companyTypeSelectedForm: [],
    quoteKey:""


};

const initialSummary = {
    product: '',
    project: '',
    companyType: '',
    companyMarket: ''

}

export default function Createquote() {


    //fey code

    const [data, setData] = useState(initialData)
    const [summary, setSummary] = useState(initialSummary)

    const onChange = (e) => {
        const { name, value } = e.target;

        const newData = {
            ...data,
            [name]: value
        };

        setData(newData);
        console.log("hereis the data",data)
    }

    //end fey code

    const addToSummary = (name, value) => {

        const newSummary = {
            ...summary,
            [name]: value
        }

        setSummary(newSummary)
        console.log("hereis the SummaryData", summary)
    }

    return (
        <>

            <Switch>
                <Route path="/home/createquote/4">
                    <CreateQuote_4 data={data} />
                </Route>
                <Route path="/home/createquote/3">
                    <CreateQuote_3 data={data} summary={summary} />
                </Route>
                <Route path="/home/createquote/2">
                    <Createquote_2 onChange={onChange} />
                </Route>
                <Route path="/">
                    <CreateQuote_1 onChange={onChange} addToSummary={addToSummary} summary={summary}  />
                </Route>
            </Switch>


        </>
    )
}