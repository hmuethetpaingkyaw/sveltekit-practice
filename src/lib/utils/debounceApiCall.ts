import axios from "axios";

function debounce(callbackFunction : any, delay = 250) : any {
  let timeout : any;

  return (...args : any) => {
    clearTimeout(timeout);
    return new Promise((resolve, reject) => {
      timeout = setTimeout(async () => {
        try {
          const result = await callbackFunction(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}

export const debounceApiCall = debounce(async (url : string) => {
  const result = await axios.get(url);
  return result.data;
}, 1000);

