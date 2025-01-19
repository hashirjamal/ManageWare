import React, { useEffect } from 'react'
import Item from '../Components/Item'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems, getAllItems } from './InventorySlice';


const Inventory = () => {

  const dispatch = useDispatch();
  const invSelector = useSelector(getAllItems);

  useEffect(()=>{
    dispatch(fetchItems());
    console.log(invSelector)
  },[])



  return (
    <section className='py-10 '>
        <h2 className='mb-5 text-3xl font-semibold'>Inventory</h2>

        {/* table to display the inventory */}

        <div className='border rounded-lg border-gray-300 w-5/6 m-auto sm:w-3/4 overflow-auto'>
        <div className='flex justify-between rounded-t-md px-8 py-3 border-b-2 border-gray-400 bg-[#200139] text-gray-100'>
          <p >Items</p>
          <span>
            Filters
          </span>
        </div>
         {
          invSelector.inventory.map((v,i)=>{
           
            return  <Item data={v} index={i+1} key={i}/>
          })
         }
          {/* <Item index={2}  />
          <Item index={3} /> */}
        </div>
<br />
        
        </section>
  )
}

export default Inventory