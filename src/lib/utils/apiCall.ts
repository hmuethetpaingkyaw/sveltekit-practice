
import axios from "axios";


export const host = 'http://localhost:3001'

export const call = async (method : string, path : string, data: any) => {
    //@ts-ignore
  const response = await axios[method](`${host}/api${path}`, data);
  return response.data;
};