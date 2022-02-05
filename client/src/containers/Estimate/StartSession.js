import React, {useState} from "react";
//import {useSelector} from "redux"
import { Menu, MenuItem, Card, Elevation, Divider, FormGroup, InputGroup, Button, Position, Classes  } from "@blueprintjs/core";
import {Popover2} from "@blueprintjs/popover2"
import styles from './Estimate.module.css'

export default props => {
  
    const [userName, setUserName] = useState("Suhel")
    const [sessionTag, setSessionTag] = useState("debug")

    const sessionTagMenu = (<Menu className={Classes.ELEVATION_1}>
      <MenuItem text="test" onClick={()=>{setSessionTag('test')}} />
      <MenuItem text="practice" onClick={()=>{setSessionTag('practice')}}/>
      <MenuItem text="debug" onClick={()=>{setSessionTag('debug')}}/>
    </Menu>)

    

    return (
      <Card interactive={true} elevation={Elevation.TWO} className={styles.card}>
        <h5 className={styles.title} >Start a Session</h5>
        <Divider className={styles.no_margin_divider}/>
        <div>
          <div style={{marginBottom:'10px'}}></div>
          <FormGroup label="Username" labelFor="username-input" inline={true}>
            <InputGroup id="username-input" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
          </FormGroup>
          <Popover2 content={sessionTagMenu} position={Position.BOTTOM}>
            <FormGroup label="Session Type" labelFor="session-type" inline={true}>
              <InputGroup id="session-type" value={sessionTag} onChange={(e)=>{setSessionTag(e.target.value)}}/>  
            </FormGroup>
          </Popover2>
          <Button text='Start Session' fill={false}/>
          <Button text='Connect' fill={false}/>
        </div>
      </Card>
    )
  }
