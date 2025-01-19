import {configureStore} from "@reduxjs/toolkit"
import Inventory from "./Pages/Inventory"
import invSlice from "./Pages/InventorySlice"

export const store = configureStore({
    reducer:{
        inventory: invSlice
    }
})