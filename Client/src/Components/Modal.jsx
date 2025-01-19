import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { createStoreHook } from 'react-redux'
import "./Modal.css"

const Modal = ({title,desc,children}) => {
  const [uiElements,setUIElements] = useState([])
  useEffect(()=>{
setUIElements(p=>{
  let arr =[...children]
  arr.splice(0,1);
  return arr
})
  },[])
  return (
    <Dialog>
  <DialogTrigger>{children[0]}</DialogTrigger>

  <DialogContent  className="overlay">
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>
       {desc}
      </DialogDescription>
      {uiElements}
    </DialogHeader>
  </DialogContent>

</Dialog>
  )
}

export default Modal