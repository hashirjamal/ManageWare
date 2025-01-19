import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState ={
    inventory: [
    {}
]
}

export const fetchItems = createAsyncThunk("inventory/fetchItems",async ()=>{
    
    //call get inventory items

    const res = await axios.get("http://localhost:3000/api/v1/inventory/items");
    return res.data;

})

const invSlice = createSlice(
    {
        name:'inventory',
        initialState,
        reducers:{
            addItems:{
                reducer(state,action){
                    state.inventory.push(action.payload)
                },
                prepare(){
                    return {
                        payload:{}
                    }
                }
            },
            removeItem(state,action){
                let ind;
                const {sku} = action
                for(const item of state.inventory){
                    if(sku == item.sku){
                        ind = state.inventory.indexOf(item);
                    }
                }
                if(item){
                    state.inventory.splice(ind,1);
                }
            }
        },
        extraReducers: function(builder){
            builder.addCase(fetchItems.fulfilled,(state,action)=>{
                // console.log(action.payload)
                state.inventory = [...action.payload.data]
            })
            builder.addCase(fetchItems.rejected,(state,action)=>{
                console.log(action.error,"Error while fetching")
                // state.inventory.concat(action.payload)
            })
        }
    }
)

export const getAllItems = (state)=>state.inventory


export const {addItems, removeItem} = invSlice.actions;

export default invSlice.reducer;