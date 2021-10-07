import Image from 'react-bootstrap/Image'
import { Container } from 'react-bootstrap'
import '../Ctrlpanel.css'

export default function HomeStart() {

    return (
        <>
        <h3>Welcome To Sales To Go Module ...</h3>
            <div className="homestart">
            

            <Container>
              <Image src="https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/favicontodo2_MZvkkROAf.png?updatedAt=1633510134446" roundedCircle />
            </Container>

            <hr/>
            
            <Container>
            <Image src="https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/s4b-logo-single_iqFhlbyse.png?updatedAt=1631192743690" roundedCircle />
            </Container>

            <hr/>

            <Container>
            <Image src="https://ik.imagekit.io/bwcdq46tkc8/s4b-consulting/email_sent_d4_IGckpL.png?updatedAt=1633510134034" roundedCircle />        
            </Container>

            <hr/>        
                        

            </div>
        </>
    )
}
