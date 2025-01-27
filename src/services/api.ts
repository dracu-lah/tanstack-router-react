import { baseURL } from "../constants/apiConfig";
import endPoint from "../constants/endPoint";
import axios from "./axiosConfig";
import Axios from "axios";
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* AUTH START */
export const LoginAPI = async (loginData: any) => {
  try {
    const { data } = await Axios.post(`${baseURL + endPoint.login}`, loginData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const RefreshAPI = async (postData: any) => {
  try {
    const { data } = await Axios.post(
      `${baseURL + endPoint.refresh}`,
      postData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
/* AUTH END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
