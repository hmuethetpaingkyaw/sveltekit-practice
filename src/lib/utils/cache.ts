import { browser } from "$app/environment";

export const getToken = () => {
  if (browser) {
    return localStorage.getItem("user-token");
  }
  return;
};

export const setToken = (token: string) => {
  if (browser) {
    return localStorage.setItem("user-token", token);
  }
  return;
};

export const getUser = () => {
  if (browser) {
    const user = localStorage.getItem("chat-user");
    if (user) {
      return JSON.parse(user);
    }
  }
  return;
};

export const setUser = (data: { id: number; name: string }) => {
  if (browser) {
    return localStorage.setItem("chat-user", JSON.stringify(data));
  }
  return;
};
