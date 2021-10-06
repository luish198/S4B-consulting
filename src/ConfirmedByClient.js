import { BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from 'react';
import ConfirmedByClient_1 from './ConfirmedByClient_1'
import ConfirmedByClient_2 from './ConfirmedByClient_2'

import { useParams } from 'react-router-dom'



export default function ConfirmOffer_ByClient() {

    //const { quote_key } = useParams()
    //console.log("this is the quote key...", quote_key)

    const [quoteData, setQuoteData] = useState([]);




    return (
        <>
            {/* <h1>Client will confirm here offer here ...</h1> */}
            
            <Switch>
                
                <Route path="/orderconfirmed/orderconfirmed_1/:quote_key">
                    <ConfirmedByClient_1 quoteData={quoteData} setQuoteData={setQuoteData}   />
                </Route>
                <Route path="/orderconfirmed/orderconfirmed_2">
                    <ConfirmedByClient_2 quoteData={quoteData}  />
                </Route>
            </Switch>
        </>
    )
}


/*<Route path="/home/createquote/4">
                    <CreateQuote_4 data={data} />
                </Route>
                <Route path="/home/createquote/3">
                    <CreateQuote_3 data={data} summary={summary} />
                </Route>
                <Route path="/home/createquote/2">
                    <Createquote_2 onChange={onChange} />
                </Route>*/