import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput.js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import socket from "../utils/socket.js";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../ChatInput.css'

const Chatpanel = styled(Card)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '10% 80% 10%', // Corrected syntax
  width: '80%',
  height: '80%', 
  ...theme.typography.body2,
  textAlign: 'center',
}));

const ChatHeader = styled(Card)(({ theme }) => ({
  width: '100%',
  height: '100%', 
  backgroundColor: "lightgrey",
  ...theme.typography.body2,
  fontSize: '20px',
  textAlign: 'left',
}));

export default function ChatContainer({ currentChat, currentSocket }) {
  const sendMessageRoute = "";
  const recieveMessageRoute = "";
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const user_receive = localStorage.getItem("to");
  const user_send = localStorage.getItem("from");
  // useEffect(async () => {
  //   const data = await JSON.parse(
  //     localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //   );
  //   const response = await axios.post(recieveMessageRoute, {
  //     from: data._id,
  //     to: currentChat._id,
  //   });
  //   setMessages(response.data);
  // }, [currentChat]);

  // useEffect(() => {
  //   const getCurrentChat = async () => {
  //     if (currentChat) {
  //       await JSON.parse(
  //         localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //       )._id;
  //     }
  //   };
  //   getCurrentChat();
  // }, [currentChat]);
  socket.on('message', (arrivalMessage) => {
    setMessages([...messages, arrivalMessage]);
  });
  

  const handleSendMsg = async (msg) => {
    // const data = await JSON.parse(
    //   localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    // );
    socket.emit("message", {
      name: "weifan",
      to: user_receive,
      from: user_send,
      conversation_id: 1,
      msg,
    });
    // await axios.post(sendMessageRoute, {
    //   from: data._id,
    //   to: currentChat._id,
    //   message: msg,
    // });

    // const msgs = [...messages];
    // msgs.push({ fromSelf: true, message: msg });
    // setMessages(msgs);
  };

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("msg-recieve", (msg) => {
  //       setArrivalMessage({ fromSelf: false, message: msg });
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage]);

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  return (
    <Chatpanel>
      <ChatHeader variant="outlined" className="chat-header">
        <AccountCircleIcon fontSize="large" className="account-icon"/>
        Weifan
      </ChatHeader>
      <Card>
        {messages.map((message) => {
            return (
              <div
                className={"message " + ((message.from === user_send) ? "sended" : "recieved")}
              >
                <div className="content ">
                  <p>{message.msg}</p>
                  </div>
              </div>
            );
          })}
      </Card>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Chatpanel>
  );
}




// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 10% 80% 10%;
//   gap: 0.1rem;
//   overflow: hidden;
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     grid-template-rows: 15% 70% 15%;
//   }
//   .chat-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 0 2rem;
//     .user-details {
//       display: flex;
//       align-items: center;
//       gap: 1rem;
//       .avatar {
//         img {
//           height: 3rem;
//         }
//       }
//       .username {
//         h3 {
//           color: white;
//         }
//       }
//     }
//   }
//   .chat-messages {
//     padding: 1rem 2rem;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     overflow: auto;
//     &::-webkit-scrollbar {
//       width: 0.2rem;
//       &-thumb {
//         background-color: #ffffff39;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .message {
//       display: flex;
//       align-items: center;
//       .content {
//         max-width: 40%;
//         overflow-wrap: break-word;
//         padding: 1rem;
//         font-size: 1.1rem;
//         border-radius: 1rem;
//         color: #d1d1d1;
//         @media screen and (min-width: 720px) and (max-width: 1080px) {
//           max-width: 70%;
//         }
//       }
//     }
//     .sended {
//       justify-content: flex-end;
//       .content {
//         background-color: #4f04ff21;
//       }
//     }
//     .recieved {
//       justify-content: flex-start;
//       .content {
//         background-color: #9900ff20;
//       }
//     }
//   }
// `;
