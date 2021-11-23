import { useContext, useState } from "react";
import { SecondUserContext } from "../context/secondUser";
import { BiSend } from "react-icons/bi";
import { messagesCollection } from "../../firebase";
import { auth } from "../../firebase";
import '../layout/Chat.scss'

const ChatFooter = () => {
  const [msgContent, setMsgContent] = useState("");
  const { secondUserData } = useContext(SecondUserContext);
  
  const handleSendMsg = (e) => {
    e.preventDefault();
    messagesCollection.add({
      createdAt: new Date(),
      Msg: msgContent,
      createdBy: auth.currentUser.uid,
      sentTo: secondUserData.uid,
      relation: `${auth.currentUser.uid}/${secondUserData.uid}`,
    });
    setMsgContent("");
  };
  return (
    <div className="chat-area-footer">
      <form onSubmit={handleSendMsg}>
        <input
          type="text"
          value={msgContent}
          onChange={(e) => setMsgContent(e.target.value)}
          placeholder="Type something here..."
        />
        
        <button type="submit" className="btn btn-info"> <BiSend/>  </button>
      </form>
    </div>
  );
};

export default ChatFooter;
