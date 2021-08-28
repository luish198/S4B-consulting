import s4blogo_long from "./images/s4b-logo-long.png";
import './login.css';
import Image from 'react-bootstrap/Image'



export default function Login() {

    return (
        <>

            <main className="form-signin">
                <form>

                

                    <div className="img-logo2">
                        .........
                        ........
                        ........

                    </div>
                    
                    
                    
                    <h3 className="h3 mb-3 fw-normal">Members Area</h3>

                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        //onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                        //onChange={(e) => setPass(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button
                        className="w-100 btn btn-lg btn-primary"
                        type="submit"
                    //onClick={checking}
                    >
                        Sign in
                    </button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
                </form>
            </main>



        </>
    )
}