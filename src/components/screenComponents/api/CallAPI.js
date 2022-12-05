import react, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
const { userToken, idUser } = useContext(AuthContext);
const URL = 'http://192.168.0.38:5000/api/user';
export const getProFile = async () => {
  await fetch(`${URL}/${idUser}`, {
    method: 'GET',
    headers: { Authorization: userToken }
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
};
