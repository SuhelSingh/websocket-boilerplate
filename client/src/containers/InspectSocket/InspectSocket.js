import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, Card, Elevation, InputGroup, Button, Tab, Tabs, Text } from "@blueprintjs/core";
import {Popover2} from "@blueprintjs/popover2" 
import CodeEditor from '@uiw/react-textarea-code-editor';
import styles from './InspectSocket.module.css'

import {ws_actions} from '../../services/socket/middleware'

// Code for testing the "emit" functionality
// echo_action: {"type":"LOAD_DEBUG","debug_obj";"yo check this"}


const TableRow = props => {
  return (<tr>
    <td>{props.k}</td>
    <td><Text >{props.v}</Text></td>
  </tr>)
}

const DictToTable = props => {
  let bodyRows = null
  if (Object.keys(props.dict).length > 0 ) {
    bodyRows = Object.entries(props.dict).map( 
      ([k,v]) => <TableRow key={k} k={k} v={v}/>
    )
  }
  
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
    
    const [socketName, setSocketName] = useState("defaultSocket");
    const [host, setHost] = useState("ws://localhost:5000");
    
    const dispatch = useDispatch()

    const onChangeHost = (e) => {
      setHost(e.target.value)
    }
    
    const onSubmit = () => {
      dispatch(ws_actions(socketName).connect(host))
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

  const emit = ws_actions(props.socketName).emit
  const removeSocket = () => {
    dispatch( ws_actions(props.socketName).remove() )
  }
  const emitToBackend = () => {
    dispatch( emit(eventName, JSON.parse(code) ) )
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
          placeholder="JSON Payload"
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
        <Button text='Remove Socket' onClick={removeSocket}/>
        <Button text='Log Socket' onClick={()=>{console.log('implement later')}} />
        <Popover2 content={EmitEventPopover}>
          <Button text='Emit Event' />
        </Popover2>
      </div>
    </div> 
  )

}


const SingleSocketPanel = props => {

  const socketInfo = useSelector( state => state.sockets[props.socketName])

  const noSocketInfoYet = {
    info : { name: '...', socketId:'...', connected:'Not yet', uri:'...'}, callbacks:{} 
  }

  const transformSocketInfo = (socketInfo) => {
    if (socketInfo == null) {
      return noSocketInfoYet
    } else {
      return {
        info : {
          name : socketInfo.name,
          socketId : socketInfo.socketId,
          connected : socketInfo.connected,
          uri : socketInfo.uri
        },
        callbacks : socketInfo.callbacks
      }
    }
  }
  const ws_dict = transformSocketInfo( socketInfo )

  return (
    <Card>
      <DictToTable 
        title='Socket Info'
        dict={ws_dict.info}
        headers={['field','value']}
      />
      <DictToTable 
        title='Listeners'
        dict={ws_dict.callbacks}
        headers={['callback','definition']}
      />
      <SocketControls 
        socketName={props.socketName}
      />
    </Card>
  )
}

const ExploreSocketPanel = () => {

  const sockets = useSelector( state => Object.keys( state.sockets ) )

  const socketTabElements = sockets.map( k => (
    <Tab key={k} id={k} title={k} panel={<SingleSocketPanel socketName={k}/>} />
    )
  )

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


const InspectSocket = props => {

  return (
    <div className={styles.main}>
      <div style={{marginBottom: "50px"}}></div>
      {<ExploreSocketPanel/>}
    </div>
  )
}

export default InspectSocket;