import React from "react";
import API from "../../utils/API";
import {Container, Row, Col, Card, Button, Form} from 'react-bootstrap'
// import SideBar from "./SideBar";
export class Finder extends React.Component {
  state = {
    loading: true,
    allMessage: [],
    bodyPostMessage: "",
    username: "",
    dataOneMessage:"",
    modfifiedAllMessage:"",
    petLocation: '',
    petType: '',
    petAge: '',
    petLocation: '',
    petSexe: '',
    petBreed: '',
    petAgeSign: 'more',
    displaySideBar: true,
    modifs: false,
    getAllBreed: '',
    refreshMessage: false,
    filterMessage: []
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
      modifs: true
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
  componentDidUpdate(prevProps, prevState){
    if(this.state.refreshMessage !== prevState.refreshMessage){
      console.log('Update Call')
      this.setState({allMessage: this.state.filterMessage})
    }
  }
  async getOneMessage(id){
    localStorage.setItem('idMess', id)
    window.location = "/"+ id;    
  }
  sideBar(){
    const{ petSexe, petType, petAge, petBreed, petAgeSign, petLocation } = this.state;

    var getAllBreed = ()=>{
      var breeds = this.state.allMessage
      var uniqueBreeds = [];
      copyUniqueBoucle: for(var element in breeds){
        for(var uBreed in uniqueBreeds){
          if(uniqueBreeds[uBreed] === breeds[element].petBreed || breeds[element].petBreed ===  ''){
            continue copyUniqueBoucle
          }
        }
        uniqueBreeds.push(breeds[element].petBreed)
      }
      return(
        uniqueBreeds.map(message => (
          <option key={message} value={message}> {message} </option>
        ))
      )
    }
    var getAllLocation = ()=>{
      var locations = this.state.allMessage
      var uniqueLocation = [];
      copyUniqueBoucle: for(var element in locations){
        for(var uLocation in uniqueLocation){
          if(uniqueLocation[uLocation] === locations[element].petLocation || locations[element].petLocation ===  ''){
            continue copyUniqueBoucle
          }
        }
        uniqueLocation.push(locations[element].petLocation)
      }
      return(
        uniqueLocation.map(message => (
          <option key={message} value={message}> {message} </option>
        ))
      )
    }
    var filterMessage = async () => {
      try{
        if(this.state.modifs === false){
          throw Error('Aucune Modification')
        }
        const{ petSexe, petType, petAge, petBreed, petAgeSign, petLocation  } = this.state; 
        var filter = await API.getFilterMessage({ petSexe, petType, petAge, petBreed, petLocation });
        this.setState({filterMessage: filter.data.message, refreshMessage: true})
      } catch (error) {
        console.log('Aucun résultat' + error)
        alert("Aucun résultat: \n" + error)
      }
      this.setState({modifs: false})
    };
    return(
      <div>
        <Container>
          <Card >
            <Card.Header>Filtrer</Card.Header>
            <Form.Group controlId="petType" as={Row}>
              <Form.Label column="true" sm="4">Type d'animal</Form.Label>
              <Col sm="8">
                <Form.Control as="select" 
                value={petType}
                onChange={this.handleChange}>
                  <option value=''>Tout</option>
                  <option value='dog'>Chien</option>
                  <option value='cat'>Chat</option>
                  <option value='bird'>Oiseau</option>
                  <option value='fish'>Poisson</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group controlId="petSexe" as={Row}>
              <Form.Label column="true" sm="4">Sexe</Form.Label>
              <Col sm="8">
                <Form.Control as="select"
                value={petSexe}
                onChange={this.handleChange}>
                  <option value="">Tout</option>
                  <option value="male">Male</option>
                  <option value="femelle">Femelle</option>
                </Form.Control>
              </Col>
            </Form.Group>

            
            <Form.Group controlId="petBreed" as={Row}>
              <Form.Label column="true" sm="4">Race</Form.Label>
              <Col sm="8">
                <Form.Control as="select" 
                value={petBreed}
                onChange={this.handleChange}>
                  <option value=''>Tous</option>
                  {getAllBreed()}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group controlId="petLocation" as={Row}>
              <Form.Label column="true" sm="4">Localisation</Form.Label>
              <Col sm="8">
                <Form.Control as="select" 
                value={petLocation}
                onChange={this.handleChange}>
                  <option value=''>Tous</option>
                  {getAllLocation()}
                </Form.Control>
              </Col>
            </Form.Group>

            <Button onClick={filterMessage}  variant="primary" type="submit"> Valider</Button>

          </Card>
        </Container>
      </div>
    )
  }
  render() {
    return (
      <div>
        <h2> Rechercher</h2>
        <Row>
        <Col  sm={2}>
        <Container>
          {/* {()=> {this.sideBar()}} */}
          {this.state.displaySideBar && this.sideBar()}
        </Container>
        </Col>
        <Col sm ={9}>
        <Container >
            <div className="finder">
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
        </Col>
      </Row>
      </div>
    );
    
  }
}