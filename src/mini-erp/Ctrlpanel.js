//import {Panel} from 'rsuite'
import { Doughnut } from 'react-chartjs-2'
import { HashLoader } from 'react-spinners'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Ctrlpanel() {

    const [covid, setCovid] = useState([])
    const [sales, setSales] = useState([])


    useEffect(async () => {


        fetch(`https://api.covid19api.com/summary`)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error('Error!')
                }
            })
            .then(async (res) => {
                console.log(res.Global)
                setCovid([await res])
            })
        console.log(covid[0])



        /*fetch(`http://localhost:8080/users/sales`)
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else{
            throw new Error('Error!')
          }
        })
        .then(async (res)=>{
          console.log(res)
          setSales([await res])
        })*/
        //console.log("sales consol...",sales[0])    

        axios.get('http://localhost:8080/users/sales')
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
                console.log("all done")
            });

            console.log("sales consol...",sales[0])  




    }, [])





    return (
        <>
            <h1>Control Panel here ...</h1>


            <>

                {covid.length ?

                    // <Panel className="panel" header={<h4>Global Pandemic Data</h4>} collapsible bordered>
                    <div className="chart-container" style={{ position: 'relative', height: '10vh', width: '30vw' }}>
                        <div className="covid">
                            <Doughnut
                                height={200}
                                width={200}
                                data={{
                                    labels: ['Total Cases Confirmed', 'Total Cases Recovered', 'Total Deaths'],
                                    datasets: [
                                        {
                                            label: "Global Covid Data",
                                            data: [`${covid[0].Global.TotalConfirmed}`, `${covid[0].Global.TotalRecovered}`, `${covid[0].Global.TotalDeaths}`],
                                            backgroundColor: [
                                                '#C43B44', '#763BC4', 'Black'
                                            ]

                                        }
                                    ]
                                }}

                            />
                            <Doughnut
                                height={200}
                                width={200}
                                data={{
                                    labels: ['New Cases Confirmed', 'New Cases Recovered'],
                                    datasets: [
                                        {
                                            label: "Global Covid Data",
                                            data: [`${covid[0].Global.NewConfirmed}`, `${covid[0].Global.NewRecovered}`],
                                            backgroundColor: [
                                                '#3BC4BB', '#89C43B'
                                            ],
                                            borderColor: [
                                                'black'
                                            ]
                                        }
                                    ]
                                }}

                            />
                        </div>
                        {/* </Panel> */}
                    </div>


                    : <HashLoader />}
            </>




            {/* ===================================================================== */}
        </>

    )
}

