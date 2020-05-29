import React from "react";
import {Button, Form, Row, Col, Alert} from "react-bootstrap";
import API from "../../utils/API";


export class NewPet extends React.Component {
  state = {
    username: localStorage.getItem('username'),
    description: '',
    petLocation: '',
    petImg: '',
    petName: '',
    petType: 'chien',
    petAge: '',
    petBreed: '',
    petSexe: 'male',
  };
  send = async () => {
    const { petSexe,description,username,petLocation,petName,petType,petAge,petBreed } = this.state; 
    var { petImg } = this.state; 
    try{
      await API.postMessage({ petSexe,username,description,petLocation,petName,petType,petAge,petBreed,petImg });
      console.log("Message posté")
      alert("Message posté")
      window.location= "/newPet"
    } catch (error) {
      console.log(error)
      alert(error)
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  fileSelectedHandler = (event)=>{
    this.setState({petImg: event.target.files[0]})
  }
  render() {
    const{ description,petLocation,petName,petType,petAge,petBreed,petSexe } = this.state; 
    return (
      <div className="col-md-6 col-md-offset-3">
      <h2>Information de l'animal !</h2>
      <small>Les champs marqués d'une * sont obligatoire</small>
      <Form>
        <Form.Group controlId="petName" as={Row}>
          <Form.Label column="true" sm="5">Prénom*</Form.Label>
          <Col sm="7">
            <Form.Control type="string" placeholder="Dobby" 
            value={petName}
            onChange={this.handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group controlId="petSexe" as={Row}>
          <Form.Label column="true" sm="5">Sexe*</Form.Label>
          <Col sm="7">
            <Form.Control as="select"
            value={petSexe}
            onChange={this.handleChange}>
              <option value="male">Male</option>
              <option value="femelle">Femelle</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group controlId="description" as={Row}>
          <Form.Label column="true" sm="5">Description*</Form.Label>
          <Col column="true" sm="7">
            <Form.Control as="textarea" rows="3" placeholder="Dobby est très sage, ..."
            value={description}
            onChange={this.handleChange}></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group controlId="petAge" as={Row}>
          <Form.Label column="true" sm="5">Age*</Form.Label>
          <Col sm="7">
            <Form.Control type="number" placeholder="5" 
            value={petAge}
            onChange={this.handleChange}></Form.Control>
          </Col>
        </Form.Group>

        <Form.Group controlId="petType" as={Row}>
          <Form.Label column="true" sm="5">Type d'animal*</Form.Label>
          <Col sm="7">
            <Form.Control as="select" 
            value={petType}
            onChange={this.handleChange}>
              <option value='dog'>Chien</option>
              <option value='cat'>Chat</option>
              <option value='bird'>Oiseau</option>
              <option value='fish'>Poisson</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group controlId="petImg" as={Row}>
          <Form.Label column="true" sm="5">Image*</Form.Label>
          <Col sm="7">
            {/* <Form.File
              value={petImg}
              onChange={this.handleChange}
            /> */}
            <input type="file" onChange={this.fileSelectedHandler}/>
          </Col>
          <Form.Label column="true" sm="auto"> <small row="true">Uniquement format jpg, jpeg, png. (5mo maximum)</small></Form.Label>
        </Form.Group>
        

        <Form.Group controlId="petBreed" as={Row}>
          <Form.Label column="true" sm="5">Race</Form.Label>
          <Col sm="7">
            <Form.Control type="string" placeholder="Labrador" 
            value={petBreed}
            onChange={this.handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group controlId="petLocation" as={Row}>
          <Form.Label column="true" sm="5">Localisation*</Form.Label>
          <Col sm="7">
            <Form.Control type="string" placeholder="Rennes" 
            value={petLocation}
            onChange={this.handleChange}></Form.Control>
          </Col>
        </Form.Group>

      </Form>
      <Button onClick={this.send} variant="primary" type="submit" >
        Valider
      </Button>
      </div>
    );
  }
}