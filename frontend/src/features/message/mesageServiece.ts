import { AxiosError } from "axios";
import api from "../../API/api";
import type { bodydata } from "../../types/chatandMessage";

export const getMyMessages = async (chatId: string, page: string | null) => {
  try {
    const { data } = await api.get(
      `/messages/${chatId}?page=${page ? page : ""}`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return axiosError;
  }
};

export const sendMessage = async (bodydata: bodydata) => {
  try {
    const { data } = await api.post("/messages", bodydata, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return axiosError;
  }
};
