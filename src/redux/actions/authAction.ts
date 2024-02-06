import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkAction, AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { CREATE_USER_SUCCESS } from "../type/type";

// export const login = createAsyncThunk("CREATE_USER_SUCCESS", async(data:any) => {
//     const user_email = data.user_email;
//     const user_password = data.user_password;

//     console.log(user_email + user_password);
// });

export const loginAction = (data: any) => {
    const posting_data = {
        email : data.user_email,
        password : data.user_password
    }

    console.log(posting_data);

    const config = {
        headers: {
          "Content-Type": "application/json",
        },
    };

    const result = axios.post('https://localhost:3030/auth/login', posting_data, config);

    console.log(result);
    
    return{
        type: CREATE_USER_SUCCESS,
        payload: result
    }
}

export const registerAction = (data: any) => {
    const posting_data = {
        firstName: data.user_firstname,
        lastName: data.user_lastname,
        email: data.user_email,
        password: data.user_password
    }

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const result = axios.post('https://localhost:3030/auth/register', posting_data, config);

    console.log(result);

    return{
        type: CREATE_USER_SUCCESS,
        payload: result
    }
}

// export {login};