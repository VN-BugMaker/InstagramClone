import react, { useContext } from 'react';
import URL from './Url';
import { AuthContext } from '../../../context/AuthContext';
const { userToken, idUser } = useContext(AuthContext);
export const getProFile = async () => {
  await fetch(`${URL}/api/user/${idUser}`, {
    method: 'GET',
    headers: { Authorization: userToken }
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
};
