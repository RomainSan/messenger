import { useEffect } from "react";
import List from "./List";
import Messages from "./Messages";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "../features/messagesSlice";
import { useAuthUser } from "react-auth-kit";
import { setTheme } from "../features/userSlice";
const styles = {
  dashboard: "flex h-full gap-x-2",
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useAuthUser();
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:5000/chat/getRooms/" + auth().id)
        .then((res) => {
          dispatch(getRooms(res.data));
        });
      axios
        .get("http://localhost:5000/user/getTheme/" + auth().id)
        .then((res) => dispatch(setTheme(res.data.theme)));
    };
    getData();
  }, []);

  return (
    <div className={styles.dashboard}>
      <List />
      <Messages />
    </div>
  );
};

export default Dashboard;
