import React from "react";
import {Card} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import API from "../../utils/API";

export class DetailMessage extends React.Component {
  state = {
    loading: true,
    allMessage: [],
    bodyPostMessage: "",
    username: localStorage.getItem("username"),
    dataOneMessage:""
  }
  async componentDidMount(){
    try{
      var id = window.location.pathname.split('/')[1]
      const oneMess = await API.getOneMessage(id);
      this.setState({ dataOneMessage: oneMess.data.message, loading: false })
      
    } catch(error){
      alert(error.response.data.error)
      window.location = "/";  
    }
  }
  render() {
    const data = this.state.dataOneMessage;
    return (
      <div>
        <Container>
        <div>
            <Card style={{ width: 'auto' }} >
              <Card.Img width="100%" src={data.petPic} />
              {/* <Card.Img width="100%" src={data.petPic} /> */}
              <div>
                <Card.Body>
                  <div style={{marginBottom:1+"em",marginTop:.5+"em"}}>
                    <h2>{data.petName}, {data.petAge} an(s)</h2>
                    {data.description}
                    <div style={{marginBottom:1+"em",marginTop:2+"em",textAlign:'left'}}>
                      <ul>
                        <li>Localisation: {data.petLocation}</li>
                        <li>Race: {data.petBreed}</li>
                        <li>Sexe: {data.petSexe}</li>
                      </ul>
                    </div>
                  </div>
                </Card.Body>
                  <small>
                  Par {data.username}, posté le "{data.date}"
                  </small>
              </div>
            </Card>
        </div>
        </Container>
      </div>
    );
    
  }
}