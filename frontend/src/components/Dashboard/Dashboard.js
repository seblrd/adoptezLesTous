import React from "react";
import { Button } from "react-bootstrap";
import API from "../../utils/API";

export class Dashboard extends React.Component {
  state = {
    loading: true,
    allMessage: [],
    bodyPostMessage: "",
    username: localStorage.getItem("username"),
    editPost:""
  }
  username = localStorage.getItem("username");
  postMessage = async() => {
    const { bodyPostMessage } = this.state;
    const { username } = this.state;
    if(!bodyPostMessage || bodyPostMessage.length === 0) return;
    try {
      const { data } = await API.postMessage({ bodyPostMessage, username });
      console.log("Message Envoyé");
      console.log(data)
      window.location = "/dashboard";
    } catch (error) {
      console.error("erreur envoi to backend" + error);
    }
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
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  editButton = (postUsername, oldBody, postId)=>{
    if(localStorage.getItem("username").localeCompare(postUsername) === 0)
    {

      return (
        <div className="gridContainer">
          <Button onClick={() => this.setState({editPost:postId})} type="button" className="gridItem" type="submit" >Editer</Button>
          <Button onClick={()=> this.deletePost(oldBody)} type="button" className="gridItem" type="submit">Supprimer</Button>
        </div>
      );
    }
  };
  editMessage(oldBody){
    return(
    <div className="form-group" style={{maxWidth: 30 +"em",  margin: "auto", marginTop: 30+"px"}}>
    <textarea className="form-control" id="bodyEditMessage" name="bodyEditMessage" rows="3" value={ oldBody }></textarea>
    <Button type="button" className="btn btn-primary" type="submit">
      Envoyer votre message
    </Button>
  </div>)
  } 

  render() {
    const { bodyPostMessage } = this.state;
    return (
      <div>
        <div className="Dashboard">
        <h2>Tous les animaux !</h2>
        </div>
          <div> Tweet du jour !</div>
      </div>
    );
    
  }
}