import React from "react";
import {Button, Toast} from "@blueprintjs/core";
import PromptCard from './PromptCard'
import {AppToaster, BottomToaster, AnonymousToaster} from '../../services/Toaster'
//export const AppToaster = Toaster.create({autoFocus:true,canEscapeKeyClear:true, usePortal:true});
import {toast} from './redux'
export default props => {

    const myToast = <Toast message='My guys this is a toast' intent='primary' />
    const myParentToast = <Toast message='My guys this is a toast' intent='primary' >
      <div style={{height:'250px',width:'500px'}}>
        <p>Listen here, I've got a god damn child I need to take care of! </p>
      </div>
    </Toast>

    return (
      <PromptCard title={'Test Toasts'}>
        
        <div style={{rowGap:'5px'}}>
          <Button text='Success' onClick={()=> {toast.success('yoyoyo, a successful toast my dude')}}/>
          <Button text='Failure' onClick={()=> {toast.failure('hey bro, this toast is not looking good')}}/>
          <Button text='Primary' onClick={()=> {toast.message('Yo and this completely regular toast is actually meant to be really really really really really fucking long. I guess we\'ll see how blueprint renders this length of text internally')}}/>
        </div>

        <div style={{rowGap:'5px'}}>
          <Button text='Top Toaster' onClick={()=> {AppToaster.show({message:'Yoo, this shit works??', intent:'success'}); console.log(AppToaster)}}/>
          <Button text='Bottom Toaster' onClick={()=> {BottomToaster.show({message:'hey bro, wtf? The socket disconnected',intent:'danger'})}}/>
          <Button text='Anonymous Toaster' onClick={()=> {AnonymousToaster.show({message:'The session started yo',intent:'primary'})}}/>
        </div>

        <div style={{rowGap:'5px'}}>
          <Button text='<Toast>' onClick={()=> {
            AppToaster.show(myToast)}} />
          <Button text='Toast with a div' onClick={()=> {BottomToaster.show(myParentToast)}}/>
        </div>
      </PromptCard> 
    )
  }