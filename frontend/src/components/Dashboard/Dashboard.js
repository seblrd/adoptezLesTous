import React from "react";
import API from "../../utils/API";
import {Card} from "react-bootstrap"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
export class Dashboard extends React.Component {
  state = {
    loading: true,
    allMessage: [],
    bodyPostMessage: "",
    username: localStorage.getItem("username")
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  async componentDidMount(){
    const response = await API.getMessage();
    const data = response.data;
    const sortedData = {"message": data.message.sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a>b ? -1 : a<b ? 1 : 0;
    })}
    this.setState({ allMessage: sortedData.message, loading: false });
    console.log(this.state.allMessage)
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
                  <Col sm={4} md="auto" key={message._id}>
                    <Card style={{ width: 'auto' }}>
                      <Card.Img width="100%" src={require("../../assets/picPug.jpg")} />
                      <div>
                        <Card.Body>
                          <div style={{marginBottom:1+"em",marginTop:.5+"em"}}>{message.petName}, {message.petAge} an(s)</div>
                        </Card.Body>
                          <small>
                           Par {message.username}, le "{message.date}"
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
        <h2>Les derniers adoptés !</h2>
      </div>
    );
    
  }
}