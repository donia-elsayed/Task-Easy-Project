import { useContext } from "react";
import { SecondUserContext } from "../context/secondUser";
import '../layout/Chat.scss'
const FriendInbox = ({ data }) => {
  const { secondUserData, setSecondUserData } = useContext(SecondUserContext);
  return (
    <div
      className={`msg ${data?.uid === secondUserData?.uid && "active"}`}
      onClick={() => setSecondUserData(data)}
    >
      <div className="msg-profile group">
        <div> {data?.photoURL} </div> 
      </div>
      <div className="msg-detail">
        <div className="msg-username">{data?.name}</div>
      </div>
    </div>
  );
};

export default FriendInbox;
