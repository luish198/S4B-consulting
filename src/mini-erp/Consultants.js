import MenuBar from "../mini-erp/MenuBar"
import { useEffect, useState, useRef } from 'react';

export default function Consultants() {

    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState();


    useEffect(() => {

        fetch("http://localhost:5000/users/checkSession", { credentials: 'include' })
            
            .then(response => {
                if (response.status !== 200) {
                    return response.json().then(data => { throw new Error(data.message) })
                } else {
                    return response.json();
                }
            })
            .then(response => {
                setNotification("Welcome back " + response.user.username);
                setUser(response.user);
            })
            .catch(error => {
                setNotification(error.message);
                setTimeout(() => {
                    setNotification(null);
                }, 6000);
            })

    }, [])

    return (
        <>

            {user ? (

                <div>
                    <MenuBar />
                    <h1>Consultants here ....</h1>
                    <h1>Members Area ! V.I.P </h1>


                    {notification && <h2>{notification}</h2>}
                    {user && <p>{user.username}</p>}
                    {user && <p>{user.email}</p>}
                    {user && <p>{user.role}</p>}


                </div>



                


            ):(
                <>
                "loading..."
                {notification && <h2>{notification}</h2>}
                
                </>
                )
         
        
        
        }


        </>
    )
}