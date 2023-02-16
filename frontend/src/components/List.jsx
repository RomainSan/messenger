import axios from "axios";
import {
  VscChromeClose,
  VscAdd,
  VscSearch,
  VscSignOut,
  VscListSelection,
} from "react-icons/vsc";
import { BiMoon } from "react-icons/bi";
import { RxSun } from "react-icons/rx";
import $ from "jquery";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getRooms,
  getMessages,
  clearState,
  setRoom,
} from "../features/messagesSlice";
import { setTheme } from "../features/userSlice";
import { useSignOut, useAuthUser } from "react-auth-kit";
import Search from "./Search";

const List = () => {
  const [createNew, setCreateNew] = useState(false);
  const [roomName, setRoomName] = useState([]);
  const [menu, setMenu] = useState(false);
  const [searchUser, setSearchUser] = useState(false);
  const rooms = useSelector((state) => state.messages.rooms);
  const themeState = useSelector((state) => state.user.theme);
  const dispatch = useDispatch();
  const signOut = useSignOut();
  const auth = useAuthUser();

  const styles = {
    list: `rounded-l-2xl w-96 text-slate-500 shadow select-none flex flex-col overflow-hidden duration-500 ${
      themeState ? "bg-white" : "bg-gray-900"
    }`,
    search: `p-4 flex justify-center border-b duration-500 ${
      themeState ? "bg-white" : "bg-gray-900 border-gray-800"
    }`,
    input: `py-2 px-3  rounded-2xl outline-none duration-500 w-full ${
      themeState ? "bg-slate-50 focus:bg-slate-100" : "bg-gray-800"
    }`,
    rooms: `rooms h-full overflow-y-auto overflow-x-hidden flex flex-col duration-500`,
    div: `room pl-5 py-5 text-left cursor-pointer hover:bg-black/[3%] duration-100 flex gap-x-5 items-center inline-block`,
    pp: `border-2 py-2 px-5 rounded-full shadow duration-500 min-w-[50px] min-h-[50px] ${
      themeState ? "bg-white" : "bg-gray-900 border-emerald-800"
    }`,
    last_message: `flex gap-x-2 italic text-slate-400`,
    bottom_list: `border-t w-full text-left duration-500 ${
      themeState ? "border-t" : "border-t-gray-800"
    }`,
    bottom_list_button: `w-fit text-2xl p-3 m-2 duration-500 ${
      themeState
        ? "text-slate-500 hover:text-emerald-500"
        : "text-gray-500 hover:text-emerald-500"
    }`,
    menu: `flex justify-center gap-x-1 w-full p-4 duration-500 ${
      themeState ? "bg-slate-50" : "bg-gray-800"
    }`,
    menu_buttons: `text-2xl border py-2 px-5 rounded-xl shadow hover:shadow-lg duration-500 z-20 ${
      themeState ? "bg-white" : "bg-gray-900 border-gray-800"
    }`,
    modal_backdrop: `fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-black/40`,
    modal: `fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] shadow w-80 rounded-xl flex flex-col ${
      themeState ? "bg-white" : "bg-gray-900"
    }`,
    modal_header: `flex justify-between py-4 w-[90%] mx-auto items-center`,
    modal_header_button: `text-2xl`,
    modal_input: `py-2 outline-none w-[90%] h-full border-b ${
      themeState ? "bg-white" : "bg-gray-900 text-white"
    }`,
    modal_button: `border shadow w-fit self-end py-2 px-5 my-5 duration-200 rounded-xl hover:shadow-lg duration-500 self-end ${
      themeState ? "bg-white" : "bg-gray-800 border-gray-900"
    }`,
  };

  const active = async (roomId) => {
    if ($(".room").hasClass("active")) {
      $(".room").removeClass("active");
      $("#" + roomId).addClass("active");
    } else {
      $("#" + roomId).addClass("active");
    }
    dispatch(setRoom(roomId));
    await axios
      .get("http://localhost:5000/chat/getMessages/" + roomId)
      .then((res) => {
        dispatch(getMessages(res.data));
      });
  };

  const dateFormater = (date) => {
    let days = Math.floor((new Date() - new Date(date)) / (1000 * 3600 * 24));
    if (days === 0) {
      return new Date(date).toString().substring(16, 21);
    } else if (days === 1) {
      return "Yesterday :" + new Date(date).toString().substring(16, 21);
    } else {
      return days + " days ago";
    }
  };

  const filtered = (e) => {
    console.log(e);
    // const filter = rooms?.filter((item) => item.name.includes(e));
  };

  const createRoom = async (e) => {
    e.preventDefault();
    const data = {
      name: roomName,
      users: [auth().id],
      messages: [],
    };
    axios
      .post("http://localhost:5000/chat/createRoom/" + auth().id, data)
      .then((res) => {
        dispatch(getRooms(res.data));
        dispatch(setRoom(res.data[0]));
        dispatch(getMessages(res.data[0]));

        $(".room").removeClass("active");
        $(".room:first-child").addClass("active");
      });

    e.target[0].value = "";
    console.log(e.target[0].value);
    setCreateNew(false);
  };

  const openCreateRoomModal = () => {
    setMenu(false);
    setCreateNew(!createNew);
  };

  const logout = async () => {
    dispatch(clearState());
    signOut();
    window.location.reload("/");
  };

  const darkOrLight = async () => {
    await axios
      .put("http://localhost:5000/user/changeTheme/" + auth().id, {
        status: !themeState,
      })
      .then(() => {
        dispatch(setTheme(!themeState));
      });
  };

  return (
    <div className={styles.list}>
      <div className={styles.search}>
        <input
          type="text"
          className={styles.input}
          placeholder="Search..."
          onChange={(e) => filtered(e.target.value)}
        />
      </div>
      <div className={styles.rooms}>
        <div>
          {rooms &&
            rooms.map((item, index) => (
              <div
                key={index}
                className={styles.div}
                id={item._id}
                onClick={() => active(item._id)}
              >
                <div className={styles.pp}></div>
                <div className="w-full mr-3">
                  {item.name.length > 12 ? (
                    <p>{item.name.substring(0, 12) + "..."}</p>
                  ) : (
                    <p>{item.name}</p>
                  )}
                  <div className="flex justify-between">
                    {item.messages
                      .map((item) =>
                        item.message.length > 12 ? (
                          <>
                            <p className={styles.last_message}>
                              {item.message.substring(0, 12) + "..."}
                            </p>
                            <small>{dateFormater(item.date)}</small>
                          </>
                        ) : (
                          <>
                            <p className={styles.last_message}>
                              {item.message.substring(0, 12)}
                            </p>
                            <small>{dateFormater(item.date)}</small>
                          </>
                        )
                      )
                      .pop()}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {menu && (
        <div className={styles.menu}>
          <button
            onClick={logout}
            className={`text-red-500 + ${styles.menu_buttons}`}
          >
            <VscSignOut />
          </button>
          <button
            className={`${
              themeState ? "hover:text-blue-600" : "hover:text-yellow-500"
            } + ${styles.menu_buttons}`}
            onClick={() => darkOrLight()}
          >
            {themeState ? <BiMoon /> : <RxSun />}
          </button>
          <button
            className={`hover:text-purple-500 + ${styles.menu_buttons}`}
            onClick={() => setSearchUser(!searchUser)}
          >
            <VscSearch />
          </button>
          <button
            className={`hover:text-green-500 + ${styles.menu_buttons}`}
            onClick={() => openCreateRoomModal()}
          >
            <VscAdd />
          </button>
        </div>
      )}
      <div className={styles.bottom_list}>
        <button
          onClick={() => setMenu(!menu)}
          className={styles.bottom_list_button}
        >
          {menu ? (
            <VscChromeClose className="text-red-500" />
          ) : (
            <VscListSelection />
          )}
        </button>
      </div>
      {createNew && (
        <>
          <div
            className={styles.modal_backdrop}
            onClick={() => setCreateNew(false)}
          ></div>
          <div className={styles.modal}>
            <div className={styles.modal_header}>
              <p>Create Room</p>
              <button
                className={styles.modal_header_button}
                onClick={() => setCreateNew(false)}
              >
                <VscChromeClose />
              </button>
            </div>
            <form onSubmit={(e) => createRoom(e)}>
              <input
                type="text"
                className={styles.modal_input}
                onChange={(e) => setRoomName(e.target.value)}
                required
                placeholder="Room's name..."
              />
              <button className={styles.modal_button}>Create</button>
            </form>
          </div>
        </>
      )}
      {searchUser && <Search setSearchUser={setSearchUser} />}
    </div>
  );
};

export default List;
