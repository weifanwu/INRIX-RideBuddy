import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import '../ChatInput.css'
// import { Button, Input, TextField } from "@mui/material";
import {
  CloseOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  PlusOutlined,
  SendOutlined,
  SyncOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Button, Input, List, message, Space } from 'antd';


export default function ChatInput({ handleSendMsg, currentSocket }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    console.log("this is the emoji: ");
    console.log(emojiObject);
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  return (
    <div className="chat-input">
      <div className="button-container">
        <Input.TextArea
            // style={{marginRight: '10px', marginBottom:'20px', marginLeft: '10px'}}
            style={{width: '50%'}}
            type="text"
            placeholder="type your message here"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
        />
        <Button onClick={() => {handleSendMsg(msg);}}>
            Send Message
        </Button>
      </div>
    </div>
  );
}


