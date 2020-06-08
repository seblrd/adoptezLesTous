import React, {useState} from "react";
import API from "../../utils/API";
import {Container, Row, Col, Card, Button} from 'react-bootstrap'

export default function SideBar(){
  return(
    <div>
      <Container>
        <Card >
          <Button onClick={()=>this.se}> Button</Button>
          <div>Barre de recheche</div>
          <div>Barre de recheche</div>
          <div>Barre de recheche</div>
          <div>Barre de recheche</div>
          <div>Barre de recheche</div>
          <div>Barre de recheche</div>
          <div>Barre de recheche</div>
          <div>Barre de recheche</div>
          <div>Barre de recheche</div>
        </Card>
      </Container>
    </div>
  )
}