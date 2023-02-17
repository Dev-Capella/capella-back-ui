
import userService from "../Service/userService";

export const getUsers=()=>{
    return async(dispatch,getState)=>{
       var response = await userService.getUsers();
       return response.data;
    }
}