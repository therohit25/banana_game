import axiosInstance from "../helpers/requestor";

export const fetchPlayers = async () => {
  const { data } = await axiosInstance.get(
    `${import.meta.env.API_URL}/click-count/players`
  );
  return data?.data;
};

export const getPlayerScore = async () => {
  const { data } = await axiosInstance.get(
    `${import.meta.env.API_URL}/click-count`
  );
  return data?.data;
};

export const getUserInfo = async () => {
  const { data } = await axiosInstance.get(`${import.meta.env.API_URL}/user`);
  return data?.data;
};
