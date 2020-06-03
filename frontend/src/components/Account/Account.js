import React from "react";
import {Button, Form, Row, Col, Card, Container,FormGroup, FormControl, FormLabel} from "react-bootstrap";
import API from "../../utils/API";


export class Account extends React.Component {
  state = {
    loading: true,
    userInfo: [],
    username: localStorage.getItem('username'),
    userId: localStorage.getItem('userId'),
    displayForm: false,
    modifs: false,
    email: "",
    password: "",
    cpassword: "",
    username: "",
    errorMessage:'',
    phoneNumber:""
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
    this.setState({ modifs: true });
  };
  async componentDidMount(){
    const response = await API.getInfo(this.state.userId);
    const data = response.data.user;
    var format = data['phoneNumber'];
    format = format.match(/.{1,2}/g).join(".")
    data['phoneNumber'] = format
    this.setState({ userInfo: data, loading: false });
  }
  displayForm(displayForm, props){
    
    if (!displayForm) {
      return null;
    }
    var send = async () => {
      
      try{
        if(this.state.modifs === false){
          throw Error('Aucune Modification')
        }
        const { email, password, cpassword, username, phoneNumber } = this.state;
        await API.editAccount(this.state.userId,{ email, password, cpassword, username, phoneNumber });
        console.log("Information(s) modifiée(s)")
        alert("Information(s) modifiée(s)")
      } catch (error) {
        console.log('Les modifications ont échouées' + error)
        alert("Les modifications ont échouées: \n" + error)
      }
    };
    const { email, password, cpassword, username, phoneNumber } = this.state;
    return(
      <div className="col-md-8 col-md-offset-2">
        <small>Remplissez uniquement les champs que vous voulez modifier.</small>
        <Form style={{marginTop:"1em"}}>
        <FormGroup controlId="email" size="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={this.handleChange}
            placeholder="adoptezLesTous@alt.fr" 
          />
        <FormGroup controlId="username" size="large">
          <FormLabel>Nom d'utilisateur</FormLabel>
          <FormControl
            autoFocus
            value={username}
            onChange={this.handleChange}
            type="string"
            placeholder="Animalerie Coco" 
          />
        </FormGroup>
        </FormGroup>
        <FormGroup controlId="password" size="large">
          <FormLabel>Mot de Passe</FormLabel>
          <FormControl
            value={password}
            onChange={this.handleChange}
            type="password"
            placeholder="Mot de passe..." 
          />
        </FormGroup>
        <FormGroup controlId="cpassword" size="large">
          <FormLabel> Confirmer Mot de Passe</FormLabel>
          <FormControl
            value={cpassword}
            onChange={this.handleChange}
            type="password"
            placeholder="Confirmer mot de passe..." 
            />
            <Row><small>Obligatoire si vous changer le mot de passe</small></Row>
        </FormGroup>
        <FormGroup controlId="phoneNumber" size="large">
          <FormLabel>Numéro de téléphone</FormLabel>
          <FormControl
            autoFocus
            value={phoneNumber}
            onChange={this.handleChange}
            type="number"
            placeholder="06XXXXXXXX"
          />
        </FormGroup>
        </Form>
        <Button onClick={send} variant="primary" type="submit" >
          Valider
        </Button>
      </div>
    )
  };
  editForm = ()=>{
    if(this.state.displayForm === false){
      this.setState({displayForm: true})
    }
    else if(this.state.displayForm === true){
      this.setState({displayForm: false})
    }
  }
  async deleteAccount(){
    try{
      if( window.confirm("Etes-vous sur de vouloir supprimer votre compte ?") ){
        await API.deleteAccount(this.state.userId);
        console.log("Suppression réussie")
        alert("Suppression réussie")
        API.logout()
        window.location = "/";
      }
    } catch (error) {
      console.log('Suppression échouée' + error)
      alert("Suppression échouée: \n" + error)
    }
  }
  render() {
    const data = this.state.userInfo;
    const { email, password, cpassword, username, phoneNumber } = this.state;
    return (
      <div>
          <Container style={{width: "50em"}}>
            <Col >
              <Card style={{ width: 'auto' }} >
                <Card.Header><h4>Mes informations</h4></Card.Header>
                <Card.Body >
                  <div  style={{marginBottom:1+"em",marginTop:.5+"em", textAlign:'center'}}>
                    <Row style={{marginBottom:1+"em"}}>
                      <Col sm={4}>Email: </Col><Col sm={4}>{data.email} </Col>
                    </Row>
                    <Row style={{marginBottom:1+"em"}}>
                      <Col sm={4}>Nom utilisateur: </Col><Col sm={4}>{data.username} </Col>
                    </Row>
                    <Row style={{marginBottom:1+"em"}}>
                      <Col sm={4}>Mot de passe: </Col><Col sm={4}>******** </Col>
                    </Row>
                    <Row style={{marginBottom:1+"em"}}>
                      <Col sm={4}>Numéro de téléphone: </Col><Col sm={4}>{data.phoneNumber} </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
                <Button onClick={()=>this.editForm()} >Editer Compte</Button>
                <Button onClick={()=>this.deleteAccount()} style={{marginLeft:5+"em"}}>Supprimer Compte</Button>
                  {this.state.displayForm && this.displayForm(this.state.displayForm, data)}
            </Col>
          </Container>
      </div>
    )
  }
}