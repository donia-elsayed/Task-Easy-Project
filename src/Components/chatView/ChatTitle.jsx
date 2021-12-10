import { useContext } from "react";
import { SecondUserContext } from "../context/secondUser";
import '../layout/Chat.scss'
const ChatTitle = () => {
  const { secondUserData } = useContext(SecondUserContext);
  return (
    <div className="chat-area-header bg-white p-2 mx-4 text-info">
      <div className="chat-area-title text-capitalize fs-3"> 
        <span className="rounded-circle me-2 bg-light ps-3 pe-3 py-2 text-center"> 
          {secondUserData?.photoURL} 
        </span>  
        {secondUserData.name}
      </div>
    </div>
  );
};

export default ChatTitle;

