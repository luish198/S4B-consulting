import { NavLink } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import { HashLoader } from 'react-spinners'
import axios from 'axios';
import { Last } from "react-bootstrap/esm/PageItem";
import Image from 'react-bootstrap/Image'

export default function QuoteSummary({ data }) {

    const [saveStatus, setSaveStatus] = useState("")
    const [okImage, setOkImage] = useState("")
    const [emailStatus, setEmailStatus] = useState("")
    const [lastClientId, setLastClientId] = useState("")
    const [lastPreconfoId, setLastPreconfoId] = useState("")
    const [QuoteRef, setQuoteRef] = useState("")






    //Posting the Quote Object to the DB........................
    useEffect(() => {

        postQuote_client()

    }, [])


    useEffect(() => {

        if (lastClientId) {

            postNewPreconfo()

        }

    }, [lastClientId])



    useEffect(() => {

        if (lastPreconfoId) {

            postQuoteWithRef()

        }

    }, [lastPreconfoId])


    useEffect(() => {

        if (QuoteRef) {

            postQuote(QuoteRef)

        }

    }, [QuoteRef])






    //Function to send the email--------------------------------

    const sentQuoteEmail = () => {
        //axios.post('http://localhost:8080/sent-email', {
        axios.post('https://s4b-consulting-api-mysql.herokuapp.com/sent-email', {

            "companyName": data.companyQuoteForm,
            "companyType": data.companyTypeSelectedForm,
            "companyMarket": data.companyMarketSelectedForm,
            "companyEmail": data.clientEmail,
            "clientFirstName": data.clientFirstName,
            "clientLastName": data.clientLastName,
            "priceOffer": data.priceOffer,
            "phone": "+49176 5697 2222",
            "message": "We are looking forward to Welcoming you on Board soon ! please click here to confirm your quote",
            "quoteKey": data.quoteKey
        })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    console.log("all good here...", response.status)
                    setEmailStatus("Quote Email Sent Successfully to the client !")
                } else {
                    console.log("error", response.status)
                    setEmailStatus("Quote Email NOT sent, Please contact your Admin Team !")
                }
            })
            .catch(function (error) {
                console.log(error);
                setEmailStatus("Quote Email NOT sent, Please contact your Admin Team !")
            });
    }
    //end of Function to send the email ------------------------


    //create the function to get post the info to save in the DB and then send email -----------------

    const postQuote_client = () => {
        //axios.post('http://localhost:8080/clients/newclient', {
        axios.post('https://s4b-consulting-api-mysql.herokuapp.com/clients/newclient', {

            COMPANY_NAME: data.companyQuoteForm,
            TYPECO_ID: data.companyTypeSelectedForm,
            COMARKET_ID: data.companyMarketSelectedForm,
            MAIN_CONTACT: data.clientFirstName,
            EMAIL: data.clientEmail
        })
            .then((response) => {

                console.log("inside the then ...")
                console.log(response);
                console.log("all good here...", response.status)

                setSaveStatus("Quote Saved Successfully")
                setOkImage(true)


                setLastClientId(response.data.insertId)
                console.log("thelatest last client id before posting the confo", lastClientId)

                //postNewPreconfo()
                //sentQuoteEmail()
                //console.log("email sent .... ")

                console.log(response.data);
                console.log(response.status);

                //setLastClientId(response.data.insertId)

            })
            .catch(function (error) {
                const failImage = `<Image src='https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/critical_RLQRVnFd-.png?updatedAt=1633510133720' roundedCircle />`
                console.log("inside the catch ...")
                console.log(error);
                setSaveStatus("There were a problem, Quote NOT Saved")
                setOkImage(false)
                setEmailStatus("Quote Email NOT sent, Please contact your Admin Team !")
                console.log("emailstatus", emailStatus)
                console.log("savestatus inside", saveStatus)
            });

    }
    // end of create the function to get post the info to save in the DB and then send email ----------






    //create the function to post the Preconfirmation taken the client Id from previous post to save in the DB  -----------------

    const postNewPreconfo = () => {
        //axios.post('http://localhost:8080/orders/newpreorder', {
        axios.post('https://s4b-consulting-api-mysql.herokuapp.com/orders/newpreorder', {

            PROJECT_ID: data.projectSelectedForm,
            CLIENT_ID: lastClientId,
            NET_AMOUNT: data.priceOffer

        })
            .then((response) => {
                console.log(response);
                console.log("preconfo all good here...", response.status)
                //setSaveStatus("Quote Saved Successfully")
                //sentQuoteEmail()
                //postQuote()

                console.log(response.data);
                console.log(response.status);

                setLastPreconfoId(response.data.insertId)

            })
            .catch(function (error) {
                console.log(error);
                //setSaveStatus("There were a problem, Quote NOT Saved")
                //setEmailStatus("Quote Email NOT sent, Please contact your Admin Team !")
                //console.log("emailstatus", emailStatus)
                //console.log("savestatus inside", saveStatus)
            });

    }
    // end of the function to post the Preconfo taken the client Id from previous pos to save in the DB ----------








    //create the function to post the Quote taken the Ide from previous post to save in the DB  -----------------

    //getting the Max Id and calling the postQoute function






    //END of getting the Max Id and calling the postQoute function

    const postQuoteWithRef = () => {

        //axios.get('http://localhost:8080/clients/quotesmaxref')
        axios.get('https://s4b-consulting-api-mysql.herokuapp.com/clients/quotesmaxref')

            .then(function (response) {
                // handle success
                console.log("here is the response data for the max Quote Ref.....", typeof (response.data[0].MAX_QUOTE_REF));
                setQuoteRef(response.data[0].MAX_QUOTE_REF + 1)
                //postQuote(QuoteRef)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
                console.log("Max quote reference query done...")

            });

    }




    // Function to post a creation of a new quote after receiving the maxReference previously

    const postQuote = (QuoteRef) => {
        //axios.post('http://localhost:8080/clients/newquote', {
        axios.post('https://s4b-consulting-api-mysql.herokuapp.com/clients/newquote', {

            //QUOTE_REF: 100,
            CLIENT_ID: lastClientId,
            QUOTE_REF: QuoteRef,
            PRECONFIRMATION_ID: lastPreconfoId,
            QUOTECODE: data.quoteKey

        })
            .then(function (response) {
                console.log(response);
                console.log("all good here with quote...", response.status)


                sentQuoteEmail()

                console.log("Quote Saved !! .... ")

                console.log(response.data);
                console.log(response.status);

            })
            .catch(function (error) {
                console.log(error);

            });

    }
    // end of the function to post the Quote taken the Ide from previous pos to save in the DB ----------





    console.log("savestatus outside...", saveStatus)
    console.log("last client Id here outside...", lastClientId)
    console.log("last PreOrder Id here outside...", lastPreconfoId)
    console.log(QuoteRef)

    console.log("the last data of the day....", data.clientEmail)



    return (
        <>
            {emailStatus && saveStatus ? (
                <div>
                    <h3>{saveStatus}</h3>
                    <h3>{emailStatus}</h3>

                    {okImage?
                    <div>
                        <Image src="https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/ok_YMgi1R5Ar.png?updatedAt=1633510133585" roundedCircle />
                    </div>
                    :
                    <div>
                    <Image src="https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/critical_RLQRVnFd-.png?updatedAt=1633510133720" roundedCircle />
                    </div>}



                    <NavLink to="/home/Ctrlpanel">
                        <Button variant="primary">Go Back Home</Button>
                    </NavLink>
                </div>
            )
                : (
                    <>
                        <HashLoader />
                    </>

                )


            }

            {/* <NavLink to="/home/Ctrlpanel"> */}
            {/* <Button variant="primary">Go Back Home</Button> */}
            {/* </NavLink> */}

        </>
    )
}


//accessing the API with fetch request example (problems with data type)

/*fetch("http://localhost:8080/clients/newclient", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({

        COMPANY_NAME: data.companyQuoteForm,
        TYPECO_ID: "1",
        COMARKET_ID: "1"
    })
})
.then(response => response.json())
.then(response => {console.log("here response..."+response)})
.catch(error => console.log("Error " + error))*/




//questions to Fey
//.then(function (response) { doesn't work on line 68 ... it doesn't take the else option of the if
