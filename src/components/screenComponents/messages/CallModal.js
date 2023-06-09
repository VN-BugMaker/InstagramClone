import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { io } from 'socket.io-client';
import { URL } from '../../screenComponents/api/Url';
import {
  RTCView,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription
} from 'react-native-webrtc';
import axios from 'axios';

const CallModal = ({ route, navigation }) => {
  const { fullname, avatar } = route.params;

  const { userToken, idUser, avatarUser, peer } = useContext(AuthContext);

  const [video, setVideo] = useState(false);

  const [mic, setMic] = useState(true);

  const localStream = useRef();
  const remoteStream = useRef();
  const peerConnection = useRef();

  const socket = io(URL);
  useEffect(() => {
    socket.on('addMessageToClient', (msg) => {
      console.log(msg);
    });

    return () => socket.off('addMessageToClient');
  }, [socket]);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    localStream.current = stream;
    remoteStream.current = new MediaStream();

    const configuration = {
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    };
    peerConnection.current = new RTCPeerConnection(configuration);
    peerConnection.current.addStream(localStream.current);

    peerConnection.current.onaddstream = (event) => {
      remoteStream.current.addTrack(event.track);
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        // Send the candidate to the other peer using a signaling server
      }
    };

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    // Send the offer to the other peer using a signaling server
  };

  // const sendMessage = async (text, sender, recipient) => {
  //   setTextContent('');

  //   await socket.emit('addMessage', {
  //     sender,
  //     text,
  //     recipient,
  //     user: { _id, avatar, fullname, username },
  //     createdAt: new Date().toISOString()
  //   });
  //   await axios.post(
  //     `${URL}/api/message`,
  //     {
  //       text,
  //       sender,
  //       recipient,
  //       createdAt: new Date().toISOString()
  //     },
  //     {
  //       headers: { Authorization: userToken }
  //     }
  //   );
  //   setReload(true);
  // };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ alignItems: 'center', marginTop: 100, marginBottom: 100 }}>
        <Image
          source={{ uri: avatar }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100
          }}
        />
        <Text style={{ fontSize: 26, fontWeight: '400', marginVertical: 10 }}>
          {fullname}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: 16 }}>Đang liên hệ...</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'red',
          borderRadius: 50,
          width: 45,
          height: 45,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <MaterialIcons
          onPress={startCall}
          name="call-end"
          style={{
            color: 'white',
            fontSize: 28
          }}
        />
      </View>
      <RTCView
        style={{ width: 200, height: 200 }}
        streamURL={localStream.current?.toURL()}
      />
      <RTCView
        style={{ width: 200, height: 200 }}
        streamURL={remoteStream.current?.toURL()}
      />

      {video == true ? (
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            borderRadius: 50,
            width: 45,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => setVideo(false)}
        >
          <FontAwesome5
            style={{
              color: 'white',
              fontSize: 18
            }}
            name="video"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            borderRadius: 50,
            width: 45,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => setVideo(true)}
        >
          <FontAwesome5
            style={{
              color: 'white',
              fontSize: 18
            }}
            name="video-slash"
          />
        </TouchableOpacity>
      )}
      {mic == true ? (
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            borderRadius: 50,
            width: 45,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => setMic(false)}
        >
          <Feather
            style={{
              color: 'white',
              fontSize: 18
            }}
            name="mic"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            borderRadius: 50,
            width: 45,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => setMic(true)}
        >
          <Feather
            style={{
              color: 'white',
              fontSize: 18
            }}
            name="mic-off"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CallModal;

const styles = StyleSheet.create({});
