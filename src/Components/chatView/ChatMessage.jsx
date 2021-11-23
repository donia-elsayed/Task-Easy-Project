const ChatMassage = ({ owner, msgData, photoURl}) => {
    return (
      <div className={`chat-msg ${owner && "owner"}`}>
        <div className="chat-msg-profile">
          <img className="chat-msg-img" src={photoURl} alt=""/>
          <div className="chat-msg-date">Message sent</div>
        </div>
        <div className="chat-msg-content">
          <div className="chat-msg-text">{msgData}</div>
        </div>
      </div>
    );
  };
  
  export default ChatMassage;
  