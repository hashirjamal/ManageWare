import React, { useEffect, useState } from 'react'
import styles from "./Item.module.css"
const UpdateModal = ({content}) => {

    const [data,setData] = useState({});

    useEffect(()=>{
        setData(p=>({...content}))
    },[])


    const handleChange = (key,nestedKey=null,value)=>{
        let obj = {...data};
        obj[key] = value;

        setData(p=>obj);
    }


  return (
    <div className='h-4/5 mt-2'>
          <span className={styles.modalInpBox}>
          <label htmlFor="sku">SKU</label>
           <input type="text" id='sku' className={styles.modalInp}/>
        </span>
        <span className={styles.modalInpBox}>
          <label htmlFor="name">Name</label>
           <input type="text" id='name' className={styles.modalInp}/>
        </span>
        <span className={`${styles.modalInpBox} `}>
          <label htmlFor="desc">Description</label>
           <input type="text" id='desc'  className={`${styles.modalInp}`}/>
        </span>
        <span className={styles.modalInpBox}>
          <label htmlFor="category">Category</label>
           <input type="text" id='category' className={styles.modalInp}/>
        </span>
        <span className={styles.modalInpBox}>
          <label htmlFor="qty">Quantity Available</label>
           <input type="number" id='qty' className={styles.modalInp}/>
        </span>
        <span className={styles.modalInpBox}>
          <label htmlFor="minT">Minimum Threshold</label>
           <input type="number" id='minT' className={styles.modalInp}/>
        </span>
        <span className='flex justify-between'>
          <label htmlFor="cost">Unit Cost</label>
           <input type="text" id='cost' className={styles.modalInp}/>
        </span>
        <span className={styles.modalInpBox}>
          <label htmlFor="warehouse">Warehouse</label>
           <input type="text" id='warehouse' className={styles.modalInp}/>
        </span>
        <span className={styles.modalInpBox}>
          <label htmlFor="aisle">Aisle</label>
           <input type="text" id='aisle' className={styles.modalInp}/>
        </span>
        <span className={styles.modalInpBox}>
          <label htmlFor="Shelf">Shelf</label>
           <input type="text" id='Shelf' className={styles.modalInp}/>
        </span>
        <span className={styles.modalInpBox}>
          <label htmlFor="SupplierName">Supplier Name</label>
           <input type="text" id='SupplierName' className={styles.modalInp}/>
        </span>
        <span className={styles.modalInpBox}>
          <label htmlFor="SupplierContact">Supplier Contact</label>
           <input type="text" id='SupplierContact' className={styles.modalInp}/>
        </span>
    </div>
  )
}

export default UpdateModal