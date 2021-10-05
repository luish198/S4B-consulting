import { Switch, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { HashLoader } from 'react-spinners'
import { jsPDF } from "jspdf";
import dotenv from "dotenv"
import fs from 'fs';
import AWS from 'aws-sdk';

dotenv.config()


export default function ConfirmOffer_ByClient_2({ quoteData }) {

    const [saveConfoStatus, setSaveConfoStatus] = useState("")
    const [emailConfoStatus, setEmailConfoStatus] = useState("")
    const [confoRef, setConfoRef] = useState("")



    const doc = new jsPDF();


    //console.log("this is data passed until client 2.. ...", quoteData[0].PRECONFIRMATION_ID)

    //Posting the Quote Object to the DB........................

    useEffect(() => {

        if (quoteData.length !== 0) {
            //postQuote_Confirmed()
            doc.text("Order Confirmation", 80, 10);
            doc.text("Confirmation Reference", 18, 80);
            doc.text(JSON.stringify(quoteData[0].PRECONFIRMATION_ID), 95, 80);
            doc.addImage("https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/s4b-logo-long_eZmAw6pklB_.png?updatedAt=1631192744046&tr=w-1200,h-628,fo-auto", "JPEG", 15, 20, 180, 40);
            doc.save(process.cwd() +"a4.pdf");

            

        } else {
            setSaveConfoStatus("There were a problem, Confirmation NOT Saved")

        }


    }, [])


    useEffect(()=>{

        postConfoWithRef()

    },[])



    useEffect(()=>{

        if(confoRef){
            postQuote_Confirmed(confoRef)
        }  

    },[confoRef])






    //create the function to get post the Quote Confirmed to save in the DB as Confirmation -----------------

        //Getting the Max Id and calling the postQuote_Confirmed function

        const postConfoWithRef = () => {

            axios.get('http://localhost:8080/orders/confomaxref')
                .then(function (response) {
                    // handle success
                    console.log("here is the response data for the max Confirmation Ref.....",typeof(response.data[0].MAX_CONFIRMATION_REFERENCE));
                    setConfoRef(response.data[0].MAX_CONFIRMATION_REFERENCE + 1)
                    //postQuote(QuoteRef)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                    console.log("Max Confirmation reference query done...")
    
                });
    
        }


        //END of Getting the Max Id and calling the postQuote_Confirmed function




    const postQuote_Confirmed = (confoRef) => {
        axios.post('http://localhost:8080/orders/newconfirmation', {
            //CONFIRMATION_REFERENCE: "10010",
            CONFIRMATION_REFERENCE: confoRef,
            PRECONFIRMATION_ID: quoteData[0].PRECONFIRMATION_ID
            //COMARKET_ID: data.companyMarketSelectedForm,
            //MAIN_CONTACT: data.clientFirstName,
            //EMAIL: data.clientEmail
        })
            .then((response) => {
                console.log("inside the then ...")
                console.log(response);
                console.log("all good here...", response.status)
                console.log(quoteData[0].PRECONFIRMATION_ID)

                setSaveConfoStatus("Confirmation Saved Successfully")

                sentConfoEmail()

                console.log(response.data);
                console.log(response.status);


            })
            .catch(function (error) {
                console.log("inside the catch ...")
                console.log(error);
                setSaveConfoStatus("There were a problem, Confirmation NOT Saved")
                setEmailConfoStatus("Quote Email NOT sent, Please contact your Admin Team !")
                console.log("emailstatus", emailConfoStatus)
                console.log("savestatus inside", saveConfoStatus)
            });

    }
    // end of create the function to get post the info to save in the DB and then send email ----------




    //---------------------------------------------------------------------------------------------------

        //Function to send the email--------------------------------

        const sentConfoEmail = () => {
            axios.post('http://localhost:8080/sent-invoice-email', {

            
                "Confirmation": confoRef,
                "companyType": "Super Co",
                "companyMarket": "Super Market",
    
                "phone": "+49176 5697 2222",
                "message": "Welcome on Board ! please click here to confirm your quote",
                "quoteKey": "SuperKey"
            })
                .then(function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        console.log("all good here...", response.status)
                        setEmailStatus("Invoice Email Sent Successfully to the client !")
                    } else {
                        console.log("error", response.status)
                        setEmailStatus("Invoice Email NOT sent, Please contact your Admin Team !")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    setEmailStatus("Invoice Email NOT sent, Please contact your Admin Team !")
                });
        }
        //end of Function to send the email ------------------------

    //---------------------------------------------------------------------------------------------------



    console.log("emailstatus before return", emailConfoStatus)
    console.log("savestatus before return", saveConfoStatus)

    //emailConfoStatus && 
    return (
        <>
            {saveConfoStatus ? (
                <div>
                    <h3>{saveConfoStatus}</h3>
                    <h3>{emailConfoStatus}</h3>
                    <NavLink to="/">
                        <Button variant="primary">Done</Button>
                    </NavLink>
                </div>
            )
                : (
                    <>
                        <HashLoader />
                    </>

                )


            }




        </>

    )
}