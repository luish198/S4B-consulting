import { NavLink, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "../createquote.css";
import Form from 'react-bootstrap/Form'
import {
    Button, Navbar, Container,
    Nav, NavDropdown,
    FormControl
} from 'react-bootstrap';
import { isCompositeComponent } from "react-dom/test-utils";
import { HashLoader } from 'react-spinners'



export default function CreateQuote_1({ onChange, addToSummary, summary }) {

    const [projects, setProjects] = useState("")
    const [products, setProducts] = useState("")
    const [companyType, setCompanyType] = useState([])
    const [companyTypeText, setCompanyTypeText] = useState("")



    //function to find type by Id from select
    //const findCoType = async (id) => {
        /*const testone = companyType.filter((item) => item.COTYPE_ID === parseInt(id))*/
        //setCompanyTypeText(companyType.filter((item) => item.COTYPE_ID === parseInt(id)))

        //if (companyTypeText[0].COTYPE) {
             //console.log(companyTypeText[0]?.COTYPE)
            //console.log(companyTypeText[0].COTYPE)
           //await addToSummary("companyType", setSummary(companyTypeText[0]?.COTYPE))

        //}

        //addToSummary({companyType:"sfasdfsadf"})


    //}









    //getting all Info for the dropdown........................
    useEffect(() => {

        //fetch("http://localhost:8080/projects")
            fetch("https://s4b-consulting-api-mysql.herokuapp.com/projects")
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then((data) => {
                setProjects(data);
                console.log(data.value)
            })
            .catch((error) => {
                console.log(error)
            });


            //fetch("http://localhost:8080/products")
            fetch("https://s4b-consulting-api-mysql.herokuapp.com/products")

            //fetch("https://s4b-consulting-api.herokuapp.com/clients")
            .then((res2) => {
                if (res2.ok) {
                    return res2.json();
                } else {
                    throw new Error('Something went wrong....')
                }
            })
            .then((data2) => {
                setProducts(data2);
                console.log(data2.value)
            })
            .catch((error) => {
                console.log(error)
            });

            //fetch("http://localhost:8080/clients/company-type")
            fetch("https://s4b-consulting-api-mysql.herokuapp.com/clients/company-type")

            //fetch("https://s4b-consulting-api.herokuapp.com/clients")
            .then((res3) => {
                if (res3.ok) {
                    return res3.json();
                } else {
                    throw new Error('Something went wrong here....')
                }
            })
            .then((data3) => {
                setCompanyType(data3);

                console.log(data3.value)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])


    console.log(summary?.companyType)

    return (
        <>
            {projects && products && companyType ? (


                <>

                    <main className="form-signin">

                        <h3>Create a quote  here ...</h3>


                        <form onSubmit="">
                            <div className="img-logo2"></div>
                            <h3 className="h3 mb-3 fw-normal">Start a Quote</h3>





                            <div className="form-floating">

                                <Form.Text className="text-muted">

                                    <div className="form-floating">
                                        <input
                                            onChange={onChange}
                                            type="text"
                                            name="companyQuoteForm"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Company Name"
                                            required

                                        />
                                        <label htmlFor="floatingInput">Company Name</label>
                                    </div>
                                </Form.Text>

                                <Form.Text className="text-muted">
                                    ...
                                </Form.Text>

                                 <Form.Select aria-label="Default select example" onChange={(e) => { onChange(e); addToSummary("companyType","supertype") }}

                                    className="select" name="companyTypeSelectedForm" required
                                >
                                    <option selected   >Company Type...</option>
                                    {companyType.map((coty, i) => (
                                        <option value={coty.COTYPE_ID}>
                                            {coty.COTYPE}
                                        </option>
                                    ))}
                                </Form.Select>

                                <Form.Text className="text-muted">
                                    ...
                                </Form.Text>



                                <Form.Select aria-label="Default select example" onChange={(e) => { onChange(e); addToSummary("project", "Project Selected...") }}
                                    className="select" name="projectSelectedForm" required
                                >
                                    <option value=""  >Select your project here...</option>
                                    {projects.map((pro, i) => (
                                        <option value={pro.PROJECT_ID}>
                                            {pro.CLUB_NAME + " " +
                                                pro.PROJECTEDITION + " " +
                                                pro.YEAR}
                                        </option>
                                    ))}
                                </Form.Select>

                                <Form.Select aria-label="Default select example" onChange={(e) => { onChange(e); addToSummary("product", "Product Selected...") }}
                                    className="select" name="productSelectedForm" required
                                >
                                    <option value="" >Select a product here...</option>
                                    {products.map((prod, i) => (
                                        <option value={prod.PRODUCT_ID}>
                                            {prod.product_name}
                                        </option>
                                    ))}
                                </Form.Select>


                                {/* <label htmlFor="floatingPassword">project</label> */}
                            </div>

                            <NavLink to="/home/createquote/2">
                                {/* <Nav.Link  to="/home/products"  as={Link} name="products">Products</Nav.Link> */}


                                <button
                                    className="w-100 btn btn-lg btn-primary"
                                    type="submit"
                                    //onClick={checking}
                                    to="/home/createquote/2" as={Link}
                                >
                                    Submit
                                </button>

                            </NavLink>
                            <p className="mt-5 mb-3 text-muted">&copy; 2021</p>

                        </form>

                    </main>


                </>

            )
                :
                (
                    <>
                        <HashLoader />
                    </>
                )

            }
        </>
    )


}