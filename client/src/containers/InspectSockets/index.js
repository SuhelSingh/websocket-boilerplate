import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, Card, Elevation, InputGroup, Button, Tab, Tabs, Text } from "@blueprintjs/core";
import {Popover2} from "@blueprintjs/popover2" 
import CodeEditor from '@uiw/react-textarea-code-editor';
import styles from './inspectSockets.module.css'
import { addSocket, removeSocket } from "../../store/actions/sockets"


const LayoutContainer = props => {
  return (
    <div className={styles.main}>
      {props.children}
    </div>
  )
}


const TableRow = props => {
  return (<tr>
    <td>{props.k}</td>
    <td><Text >{props.v}</Text></td>
  </tr>)
}

const DictToTable = props => {

  const bodyRows = Object.entries(props.dict).map( 
    ([k,v]) => <TableRow key={k} k={k} v={v}/>
  )
  
  return (
    <div>
      <h5>{props.title}</h5>
        <table className="bp3-html-table">
        <thead>
          <tr>
            <th>{props.headers[0]}</th>
            <th>{props.headers[1]}</th>
          </tr>
        </thead>
        <tbody>
          {bodyRows}
        </tbody>
      </table>
    </div>
  )
}




const AddSocketPanel = props => {
    
    const [socketName, setSocketName] = useState("default_socket");
    const [host, setHost] = useState("ws://localhost:5000");
    const [path, setPath] = useState("");
    
    const dispatch = useDispatch()

    const onChangeHost = (e) => {
      setHost(e.target.value)
    }

    const onSubmit = () => {
      dispatch(addSocket(host, path, socketName))
    }
 
    return (
        <Card interactive={true} elevation={Elevation.TWO} className={styles.panel}>
          <div>
          <FormGroup label="Socket Name" labelFor="socket-name-input" labelInfo="(required)" inline={true}>
              <InputGroup id="socket-name-input" value={socketName} onChange={(e)=>{setSocketName(e.target.value)}}/>
          </FormGroup>
          <FormGroup label="URL" labelFor="url-input" labelInfo="(required)" inline={true}>
              <InputGroup id="url-input" value={host} onChange={onChangeHost}/>
          </FormGroup>
          <FormGroup label="Path" labelFor="path-input" labelInfo="(required)" inline={true}>
              <InputGroup id="path-input" value={path} onChange={(e)=>{setPath(e.target.value)}}/>
          </FormGroup>
          <Button 
            text="Add Socket"
            onClick={onSubmit}/>
          </div>
        </Card>
    )
  }

const SocketControls = props => {
  // requires ws as a websocket input

  const dispatch = useDispatch()
  const [eventName, setEventName] = useState("")
  const [code, setCode] = useState("")

  const emitToBackend = () => {
    props.ws.functions.emit_json(eventName, code)
  }

  const EmitEventPopover = (
    <Card>
      <div className={styles.emit_event_popover}>
        <h5>Emit Event to Backend</h5>
        <InputGroup 
          id="event-name-input" 
          placeholder='Event Name' 
          value={eventName} 
          onChange={(e)=>{setEventName(e.target.value)}}
        />
        <CodeEditor
          value={code}
          language="js"
          placeholder="Event Payload (in javascript)"
          onChange={(e) => setCode(e.target.value)}
          padding={15}
          style={{
            fontSize: 12,
            backgroundColor: "#f5f5f5",
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
        <Button text='Emit Event' onClick={emitToBackend} />
      </div>
    </Card>
  )

  return (
    <div>
      <h5>{'Button Controls'}</h5>
      <div className={styles.hflex_container}>
        <Button text='Remove Socket' onClick={()=>{dispatch(removeSocket(props.ws.name))}}/>
        <Button text='Log Socket' onClick={()=>{console.log(props.ws)}} />
        <Popover2 content={EmitEventPopover}>
          <Button text='Emit Event' />
        </Popover2>
      </div>
    </div>
      
      
        
        
        
      
    
  )

}


const SingleSocketPanel = props => {

  const get_socket_info = (ws) => {
    return {
      'info':{
        'name':ws.name,
        'socketId':ws.socket.id,
        'connected':ws.socket.connected.toString(),
        'uri':ws.socket.io.uri,
      },
      'functions': Object.fromEntries(
        Object.entries(ws.functions).map( ([k,v]) => [k,v.toString()])
      ),
      'callbacks':Object.fromEntries(
        Object.entries(ws.socket._callbacks).map( ([k,v]) => [k,v.toString()])
      )
    }
  }

  const ws_dict = get_socket_info(props.ws)

  return (
    <Card>
      <DictToTable 
        title='Socket Info'
        dict={ws_dict.info}
        headers={['field','value']}
      />
      <DictToTable 
        title='Outbound Functions'
        dict={ws_dict.functions}
        headers={['function','definition']}
      />
      <DictToTable 
        title='Listeners'
        dict={ws_dict.callbacks}
        headers={['callback','definition']}
      />
      <SocketControls 
        ws={props.ws}
      />
    </Card>
  )

}

const ExploreSocketPanel = () => {

  const sockets = useSelector( state => state.sockets )

  const socketTabElements = Object.entries(sockets).map(([k,v]) => (
    <Tab key={k} id={k} title={k} panel={<SingleSocketPanel ws={v}/>} />
  ))

  const [selectedTab, setSelectedTab] = useState('addSocket')
  const onTabChange = (newTabId) => { setSelectedTab(newTabId) }

  return (
    <Card interactive={true} elevation={Elevation.TWO} className={styles.card}>
      <h3>Websocket Connections</h3>
      <Tabs id="TabsExample" selectedTabId={selectedTab} onChange={onTabChange} panelClassName={styles.panel}>
          <Tab id={'addSocket'} title={'Add a Websocket'} panel={<AddSocketPanel/>} key={'addSocket'}  />
          {socketTabElements}
      </Tabs>
    </Card>
  )

}


const InspectSockets = props => {

  return (
    <LayoutContainer>
      <div style={{marginBottom: "50px"}}></div>
      {<ExploreSocketPanel/>}
    </LayoutContainer>
  )
}

export default InspectSockets;