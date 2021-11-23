import { useCollectionData } from "react-firebase-hooks/firestore";
import FriendInbox from "./FriendInbox";

import { auth, usersCollection } from "../../firebase";
import '../layout/Chat.scss'

const FriendList = () => {
  const [users] = useCollectionData(usersCollection);
  return (
    <>
      {users
        ?.filter((data) => data.uid !== auth.currentUser.uid)
        ?.map((data,i) => (
          <div className="friend bg-white mb-3" key={i}> 

            <FriendInbox active data={data} key={data.uid} />
          </div>
        ))}
    </>
  );
};

export default FriendList;
