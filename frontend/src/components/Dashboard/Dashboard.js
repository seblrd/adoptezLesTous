import React from "react";
import API from "../../utils/API";
import {Container, Row, Col, Card} from 'react-bootstrap'

export class Dashboard extends React.Component {
  state = {
    loading: true,
    allMessage: [],
    bodyPostMessage: "",
    username: "",
    dataOneMessage:"",
    modfifiedAllMessage:""
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  async componentDidMount(){
    const response = await API.getMessage();
    var data = response.data
    const sortedData = {"message": data.message.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return a>b ? -1 : a<b ? 1 : 0;
      })}
    this.setState({ allMessage: sortedData.message, loading: false});
    var newData = this.state.allMessage
    for (var i = 0; i < newData.length; i++){
      var user = await API.getInfo(newData[i].usernameId);
      var username = user.data.user.username
      newData[i].username = username;
    }
    this.setState({ allMessage: newData, loading: false});
  };
  async getOneMessage(id){
    localStorage.setItem('idMess', id)
    window.location = "/"+ id;    
  }
  render() {
    return (
      <div>
        <Container>
          <div className="Dashboard">
            <h2> Adoptez les ! !</h2>
            <Row>
              <div>            
                {this.state.allMessage.map(message => (
                  <Col sm={4} md="auto" key={message._id} >
                    <Card onClick={()=> {this.getOneMessage(message._id)}} className="myCard">
                      <div className="cardImgBgDash">
                        <img alt={message.petName} src={message.petPic} className="myCardImg"/>
                      </div>

                      <div>
                        <Card.Body>
                          <div style={{marginBottom:1+"em",marginTop:.5+"em"}}>{message.petName}, {message.petAge} an(s)</div>
                        </Card.Body>
                          <small>
                           Par {message.username}, le "{message.lastModif}"
                          </small>
                      </div>
                    </Card>
                  </Col>
                ))}
              </div>
            </Row>
            <div>
            </div>
          </div>
        </Container>
      </div>
    );
    
  }
}