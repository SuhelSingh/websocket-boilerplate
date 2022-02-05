import React from "react";
import { useNavigate } from "react-router-dom";
import { Alignment, Navbar, Button } from "@blueprintjs/core";

const MyNavbar = props => {

  const navigate = useNavigate();

  return (
        <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>Suhel's Website</Navbar.Heading>
            <Navbar.Divider />
            <Button className="bp3-minimal" icon="home" text="Home" onClick={() => { navigate('/')} }/>
            <Button className="bp3-minimal" text="Estimate" onClick={() => { navigate('/estimate')}}/>
            <Button className="bp3-minimal" text="Estimate Debug" onClick={() => { navigate('/estimate_debug')}}/>
            <Button className="bp3-minimal" text="Debug" onClick={() => { navigate('/debug')}}/>
            <Button className="bp3-minimal" text="Inspect Sockets" onClick={() => { navigate('/inspect_sockets')}}/>
        </Navbar.Group>
        </Navbar>
    );
  }

export default MyNavbar;