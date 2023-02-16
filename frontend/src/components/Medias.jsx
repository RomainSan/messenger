import { VscTrash, VscPersonAdd, VscGripper } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { getRooms, setMessage } from "../features/messagesSlice";
import { useAuthUser } from "react-auth-kit";
import $ from "jquery";
import axios from "axios";

const Medias = () => {
  const users = useSelector((state) => state.messages.message);
  const themeState = useSelector((state) => state.user.theme);
  const auth = useAuthUser();
  const dispatch = useDispatch();

  const styles = {
    medias: `border-l w-96 h-full p-5 duration-500 ${
      !themeState && "border-gray-800"
    }`,
    header: `flex p-2 justify-around`,
    button: `text-slate-500 text-2xl border py-2 px-5 rounded-xl duration-500 ${
      themeState ? "bg-white shadow hover:shadow-lg" : "border-gray-900"
    }`,
  };

  const deleteRoom = async () => {
    const data = {
      user: auth().id,
    };

    await axios.delete("http://localhost:5000/chat/deleteRoom/" + users._id);
    await axios
      .get("http://localhost:5000/chat/getRooms/" + auth().id)
      .then((res) => {
        $(".room").removeClass("active");

        dispatch(getRooms(res.data));
        dispatch(setMessage());
      });
  };

  return (
    <div className={styles.medias}>
      <div className={styles.header}>
        <button
          className={`hover:text-red-500 + ${styles.button}`}
          onClick={() => deleteRoom()}
        >
          <VscTrash />
        </button>
        <button className={`hover:text-sky-500 + ${styles.button}`}>
          <VscPersonAdd />
        </button>
        <button className={`hover:text-purple-500 + ${styles.button}`}>
          <VscGripper />
        </button>
      </div>
    </div>
  );
};

export default Medias;
