import { useContext, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { messagesCollection } from "../../firebase";
import { SecondUserContext } from "../context/secondUser";

import { auth } from "../../firebase";
import ChatMassage from "./ChatMessage";
import '../layout/Chat.scss'

const ChatContent = () => {
  const { secondUserData } = useContext(SecondUserContext);
  const [messagesSorted, setMessagesSorted] = useState([]);
  const query =
    secondUserData?.uid &&
    messagesCollection
      .where("relation", "in", [
        `${auth.currentUser.uid}/${secondUserData.uid}`,
        `${secondUserData.uid}/${auth.currentUser.uid}`,
      ])
      .limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  useEffect(() => {
    if (messages) {
      setMessagesSorted(messages?.sort((a, b) => a.createdAt - b.createdAt));
    }
  }, [messages]);
  return (
    <div className="chat-area-main">
      {messagesSorted.map((data, index) => (
        <ChatMassage
          key={index}
          owner={data.createdBy === auth.currentUser.uid}
          msgData={data.Msg}
          photoURl={
            data.createdBy === auth.currentUser.uid
              ? auth.currentUser.photoURL
              : secondUserData.photoURL  
          }
        />
      ))}
    </div>
  );
};

export default ChatContent;
