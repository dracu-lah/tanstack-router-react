import { baseURL } from "./apiConfig";
import axios from "./axiosConfig";
import Axios from "axios";
import endPoint from "./endPoint";
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* AUTH START */
export const LoginAPI = async (postData: any) => {
  try {
    const { data } = await Axios.post(`${baseURL + endPoint.login}`, postData);
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
/* DASHBOARD START  */

export const GetDashboardAPI = async (params: any) => {
  try {
    const { data } = await Axios.get(`https://dummyjson.com/products`, {
      params: params,
    });
    // const { data } = await Axios.get(`${baseURL + endPoint.dashboard}`, {
    //   params: params,
    // });
    return data;
  } catch (error) {
    throw error;
  }
};
/* DASHBOARD END  */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
