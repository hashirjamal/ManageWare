import React, { useRef, useState,useEffect } from 'react'
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from './Modal';
// import { DialogTrigger } from '@radix-ui/react-dialog';
import styles from "./Item.module.css"

import 'primeicons/primeicons.css';
import UpdateModal from './UpdateModal';
        

const Item = ({index,data}) => {
    const [infoBox, setInfoBox] = useState(false);

    const boxRef = useRef(null);
    const outerBoxRef = useRef(null);


    useEffect(()=>{
      gsap.to(outerBoxRef.current,{
        opacity:1,
        // y:1,
        duration:0.8*index
      })
    },[])

    useEffect(() => {
      if (boxRef.current) {
        if (infoBox) {
          // Expand box
          gsap.to(boxRef.current, {
            height: 'auto',
            duration: 0.35,
            ease: 'power2.out',
            padding: '20px', // Adjust based on your design
          });
        } else {
          // Collapse box
          gsap.to(boxRef.current, {
            height: 0,
            duration: 0.35,
            ease: 'power2.in',
            padding: 0,
          });
        }
      }
    }, [infoBox]);
  



    // useGSAP(()=>{
    //   gsap.to(boxRef.current,{
    //     y:5,
    //     // rotate:180,
    //     duration:0.5,
    //     opacity:1
    //   })
    // })

  return (
    <div className={`border-b-2 border-[#cbd1dd]  pt-4 rounded-lg text-sm opacity-0 overflow-x-auto ${index%2==0?"bg-[#e7e7e7]":""}  `} ref={outerBoxRef}>


    <div className={`flex justify-between text-sm flex-wrap  gap-2 py-1 px-4 items-center max-w-150   `} >
        <p>{data.sku}</p>
        <p className=' max-w-150 max-h-20 overflow-auto min-w-10'>{data.name}</p>
        <p className='min-w-10 max-w-xl'>{data.category}</p>
        <p className='min-w-10 max-w-150'>{data.quantityAvailable} Units</p>
        <p className='min-w-10 max-w-150'>$ {data.unitCost}</p>
     

          <Modal title={"Update Item"}  desc={""} >
        <button ><span className='pi pi-pencil '></span></button>
        <UpdateModal content={data} />
            </ Modal >


          <Modal open={"open"} >
        <button ><span className='pi pi-trash '></span></button>
           <input type="text" />
            </ Modal >


        <button onClick={()=>setInfoBox(p=>!p)}><span className='pi pi-eye '></span></button>

    </div>

         <div
        ref={boxRef}
        style={{
          height: 0,
          overflow: 'hidden',
          padding: 0, // Set to 0 for initial state
        }}
        className="flex flex-wrap justify-between rounded my-1 transition-all"
      >
      
      <div className='max-w-60'>
        <p className='font-semibold text-gray-800 mb-2'>Desciption</p>
        <p >{data.description}   </p>
      </div>
      <div>
        <p className='font-semibold text-gray-800 mb-2'>Location</p>
        <p className='text-gray-700'>{data.location?.warehouse}</p>
        <p className='text-gray-700'>{data.location?.aisle} {data.location?.shelf}</p>
      </div>
      <div>
        <p className='font-semibold text-gray-800 mb-2'>Supplier</p>
        <p className='text-gray-700'>{data.supplier?.name}</p>
        <p className='text-gray-700'>{data.supplier?.contact}</p>
      </div>
      
       </div>
     { infoBox &&  <p className=' text-gray-700 px-4'>Minimum Threshold : {data.minThreshold}</p>}
    </div>
  )
}

export default Item