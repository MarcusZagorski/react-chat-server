import "./LoadMessages.scss";
import { useState } from "react";

const LoadMessages = ({ messageData, updateMessages }) => {
  const [messages, setMessages] = useState(true);
  const handleClick = () => {
    setMessages(!messages);
  };
  return (
    <>
      <button onClick={handleClick} className="latestMessages">
        {messages ? "See" : "Hide"} latest messages
      </button>
      {messageData && !messages
        ? messageData.map((messages, index) => (
            <div
              key={index}
              className={
                messages.id % 2 === 0 ? "loadMessages" : "loadMessagesAlt"
              }
            >
              <p className="loadMessages__from">From: {messages.from}</p>
              <p className="loadMessages__message">{messages.text}</p>
              <p className="loadMessages__timesent">{messages.timeSent}</p>
              <button
                className={
                  messages.id % 2 === 0 ? "loadMessages__delete" : "deleteAlt"
                }
                onClick={async () => {
                  const clickedID = messages.id;
                  const response = await fetch(
                    `https://marcus-chat-server.glitch.me/messages/${clickedID}`,
                    {
                      method: "DELETE",
                    }
                  );
                  if (response.ok) {
                    console.log("Your message was deleted successfully!");
                    updateMessages();
                  } else {
                    console.error(
                      "There was an error locating the ID you specified to delete"
                    );
                  }
                }}
              >
                X
              </button>
            </div>
          ))
        : ""}
    </>
  );
};

export default LoadMessages;
