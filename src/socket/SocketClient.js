import { View, Text } from 'react-native';
import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect } from 'react';

const SocketClient = () => {
  const { username, userToken, avatarUser, idUser, socket, newData } =
    useContext(AuthContext);
  useEffect(() => {
    socket.emit('joinUser', newData);
  }, [newData]);

  return <></>;
};

export default SocketClient;
