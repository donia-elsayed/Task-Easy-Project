const ChatMassage = ({ owner, msgData, photoURl}) => {
  console.log(photoURl)
    return (
      <div className={`chat-msg ${owner && "owner"}`}>
        <div className="chat-msg-profile">
          <div className="chat-msg-img d-flex justify-content-center align-items-center">{photoURl}</div> 
        </div>
        <div className="chat-msg-content">
          <div className="chat-msg-text">{msgData}</div>
          <div className="chat-msg-date">Message sent</div>
        </div>
      </div>
    );
  };
  export default ChatMassage;
  