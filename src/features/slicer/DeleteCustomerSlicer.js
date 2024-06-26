import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { getCustomersApi } from "./CustomerSlicer";
import { toast } from "react-toastify";

// delete customer/user
export const deleteCustomerApi = createAsyncThunk(
  "adminPanel/getCustomers",
  async (Id, { dispatch }) => {
    return await axios
      .post(`${baseUrl}users/delete-user`, { userId: Id }, config)
      .then((resp) => {
        toast.success("Customer Deleted Successfully");
        dispatch(getCustomersApi());
        return resp.data;
      })
      .catch((err) => {
        return err.message;
      });
  }
);
const initialState = {
  isLoading: false,
  isError: false,
  isOpen : false
};

const DeleteCustomerSlicer = createSlice({
  name: "deletecustomer",
  initialState,
  reducers: {
    setIsCustomerDelModal : (state) =>{
      state.isOpen = true
      console.log(state.isOpen)
    },
    setIsCustomerDelModalClose : (state,) =>{
      state.isOpen = false
      console.log(state.isOpen)
    }
  },
  extraReducers: (builder) => {
    /// for delete user
    builder.addCase(deleteCustomerApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCustomerApi.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteCustomerApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export const  {setIsCustomerDelModal, setIsCustomerDelModalClose} =  DeleteCustomerSlicer.actions
export default DeleteCustomerSlicer.reducer;
