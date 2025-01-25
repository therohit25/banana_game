import axiosInstance from '../helpers/requestor';

export const fetchPlayers = async () => {
  const { data } = await axiosInstance.get(
    'http://localhost:3000/click-count/players'
  );
  return data?.data;
};

export const getPlayerScore = async () => {
  const { data } = await axiosInstance.get('http://localhost:3000/click-count');
  return data?.data;
};

export const getUserInfo = async () => {
  const { data } = await axiosInstance.get('http://localhost:3000/user');
  return data?.data;
};
