import axios from "axios";

// Throttle function implementation
function throttle(callbackFunction : any, delay = 250) : any {
    let shouldWait = false;

    return (...args : any) => {
        if (!shouldWait) {
          shouldWait = true;
          return new Promise(async (resolve, reject) => {
            try {
              const result = await callbackFunction(...args);
              resolve(result);
            } catch (error) {
              reject(error);
            } finally {
              setTimeout(() => {
                shouldWait = false;
              }, delay);
            }
          });
        } else {
            
          return Promise.resolve(); // Return a resolved promise if the call is throttled
        }
      };
  }

// Throttled API call function
export const throttledAPICall = throttle(async (url : string) => {
  const response = await axios.get(url);
  return response.data;
}, 1000);
