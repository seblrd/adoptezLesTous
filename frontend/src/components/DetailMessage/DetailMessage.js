import React from "react";
import {Card, Button, Form, Row, Col} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import API from "../../utils/API";

export class DetailMessage extends React.Component {
  state = {
    loading: true,
    bodyPostMessage: "",
    username: localStorage.getItem("username"),
    userId: localStorage.getItem('userId'),
    dataOneMessage:"",
    isWriter: false,
    displayForm: false,
    modifs: false,
    phoneNumber:"",
    email:"",
    userInfo:"",
    messId:window.location.pathname.split('/')[1],
  }
  async componentDidMount(){
    try{
      const oneMess = await API.getOneMessage(this.state.messId);
      const response = await API.getInfo(oneMess.data.message.usernameId);
      const data = response.data.user;
      var format = data['phoneNumber'];
      format = format.match(/.{1,2}/g).join(".")
      data['phoneNumber'] = format
      this.setState({
        userInfo: data,
        username: data.username,
        phoneNumber: data.phoneNumber,
        email: data.email ,
        dataOneMessage: oneMess.data.message,
        loading: false
      });
      if(oneMess.data.message.usernameId === localStorage.getItem("userId")){
        this.setState({isWriter: true})
      }
      
    } catch(error){
      console.log("load error \n" + error)
      alert("load error \n" + error)
      window.location = "/";  
    }
  }
  editButton(isWriter){
    if (!isWriter) {
      return null;
    }
    var editForm = ()=>{
      if(this.state.displayForm === false){
        this.setState({displayForm: true})
      }
      else if(this.state.displayForm === true){
        this.setState({displayForm: false})
      }
    }
    return (
      <div>
        <Button onClick={()=>editForm()} >Editer</Button>
        <Button onClick={()=>this.deleteMess()} >Supprimer</Button>
      </div>
    );
  }
  handleChange = (event) => {
    var data = this.state.dataOneMessage
    data[event.target.id] = event.target.value
    this.setState({
      dataOneMessage: data,
      modifs: true
    });
    
  };
  fileSelectedHandler = (event)=>{
    var data = this.state.dataOneMessage
    data['petImg'] = event.target.files[0]
    this.setState({
      dataOneMessage: data,
      modifs: true
    });
  };
  displayForm(displayForm, props){
    var { petSexe,description,petLocation,petName,petType,petAge,petBreed } = this.state.dataOneMessage; 
    if (!displayForm) {
      return null;
    }
    var send = async () => {
      try{
        if(this.state.modifs === false){
          throw Error('Aucune Modification')
        }
        await API.modifyMessage(this.state.dataOneMessage._id, this.state.dataOneMessage);
        console.log("Message modifié")
        alert("Message modifié")
        window.location.reload()
      } catch (error) {
        console.log('Les modifications ont échouées' + error)
        alert("Les modifications ont échouées: \n" + error)
      }
    };
    return(
      <div>
        <div className="col-md-6 col-md-offset-3">
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
        <Button onClick={send} variant="primary" type="submit" >
          Valider
        </Button>
        </div>
      </div>
    )
  };
  async deleteMess(){
    try{
      await API.deleteMessage(this.state.dataOneMessage._id);
      console.log("Suppression réussie")
      alert("Suppression réussie")
      window.location = "/";
    } catch (error) {
      console.log('Suppression échouée' + error)
      alert("Suppression échouée: \n" + error)
    }
  }
  render() {
    const data = this.state.dataOneMessage
    return (
      <div>
        <Container>
        <div>
            <Card style={{ width: 'auto' }} className="myCard">
              <div className="cardImgBg">
                <img alt={data.petName} src={data.petPic} className='myCardImgDetail'/>
              </div>
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
                        <li>Type: {data.petType}</li>
                        <li>Tel: {this.state.phoneNumber}</li>
                        <li>email: {this.state.email}</li>
                      </ul>
                    </div>
                  </div>
                </Card.Body>
                  <small>
                  Par {this.state.username}, posté le "{data.date}"
                  </small>
                   {this.editButton(this.state.isWriter)}
                  {this.state.displayForm && this.displayForm(this.state.displayForm, data)}
              </div>
            </Card>
        </div>
        </Container>
      </div>
    );
    
  }
}