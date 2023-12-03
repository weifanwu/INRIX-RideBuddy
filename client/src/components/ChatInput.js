import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import '../ChatInput.css'


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
      <div className="emoji-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <div className="button-container">
        <input
            type="text"
            placeholder="type your message here"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
        />
        <button onClick={() => {handleSendMsg(msg);}}>
            Send Message
        </button>
      </div>
    </div>
  );
}


