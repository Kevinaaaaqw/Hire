import React, { useState, useEffect } from "react";
import {redirect} from 'react-router-dom'
import { Row, Col, ConfigProvider, Button } from "antd";
import axios from "axios";
import ChatNavBar from "./ChatNavBar/ChatNavBar";
import ChatBar from "./ChatBar/ChatBar";
import { ChatBody } from "./ChatBody/ChatBody";
import webSocket from "socket.io-client";
import { ChatFooter } from "./ChatFooter/ChatFooter";
const socket = webSocket.connect("http://localhost:9000");


export const Chat = ({setShow}) => {
  return (
    <Button
      style={{
        height: "50px",
        width: "200px",
        textAlign: "center",
        alignItems: "center",
        position: "fixed",
        right: "5px",
        bottom: "5px",
        fontSize:"1.7rem"
      }}
      size="large"
      className="ms-3 btnColor cartFontSize"
      onClick={() => {
        setShow('1');
      }}
    >
      聊聊<i className="ps-2 bi bi-messenger"></i>
    </Button>
  );
};

export const Main = ({chatInfo,showRoom }) => {
  const [show,setShow] = useState("")
  const [roomName, setRoomName] = useState("");
  const [productAccount,setProductAccount]= useState("")
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [removeRoom ,setRemoveRoom] = useState("")

  localStorage.getItem("userInfo")?(
    localStorage.setItem(
      "userName",
      localStorage.getItem("userInfo").slice(1, -1)
    )
  ):( redirect('/login'))


  useEffect(() => {
    if(chatInfo.trim()){
       axios
      .post("http://localhost:8000/cart/chatInfo", {
        account: localStorage.getItem("userInfo").slice(1, -1).trim(),
        productAccount: chatInfo,
      })
      .then((res) => {
        setRoomName(res.data)
        setShow(showRoom)
        setProductAccount(chatInfo)
      });
    }
  },[chatInfo,showRoom])

  useEffect(() => {
    setMessages([])
  },[roomName])

  socket.emit("newUser", {
    userName: localStorage.getItem("userInfo").slice(1, -1),
    socketID: socket.id,
  });

  return (
    show?(
      <ConfigProvider
      theme={{
        token: {
          fontSize: "2rem",
        },
      }}
      >
      <Row
        className="m-5"
        style={{
          border: "3px solid #0B7597",
          borderRadius: "10px",
          width: "600px",
          position: "fixed",
          right: "-45px",
          bottom: "-45px",
          zIndex: 1000,
        }}
        >
        <Col span={24}>
          <ChatNavBar setShow={setShow} productAccount={productAccount} />
        </Col>
        <Col style={{ borderTop: "3px solid #0B7597 " }} span={24}>
          <Row>
            <Col span={6} style={{ borderRight: "3px solid #0B7597" }}>
              <ChatBar socket={socket} removeRoom={removeRoom} setMessages={setMessages} setRoomName={setRoomName} setProductAccount={setProductAccount} />
            </Col>
            <Col span={18}>
              <Row>
                <Col span={24}>
                  <ChatBody productAccount={productAccount} setRemoveRoom={setRemoveRoom} socket={socket} setMessages={setMessages} messages={messages} roomName={roomName} />
                </Col>
                <Col span={24}>
                  <ChatFooter socket={socket} message={message} setMessage={setMessage} roomName={roomName} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </ConfigProvider>
  ):<Chat setShow={setShow}/>
  );
};
