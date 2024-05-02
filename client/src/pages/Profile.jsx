import { useSelector } from "react-redux";

function Profile() {
  const { userInfo } = useSelector((state) => state.auth);
  return <div>{`Welcome ${userInfo.username}`}</div>;
}

export default Profile;
