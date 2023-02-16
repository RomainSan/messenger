import Medias from "./Medias";
import axios from "axios";
import { CiImageOn } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { getMessages, getRooms } from "../features/messagesSlice";
import $ from "jquery";
import { useRef, useState } from "react";
import { useAuthUser } from "react-auth-kit";

const Messages = () => {
  const messages = useSelector((state) => state.messages.message);
  const themeState = useSelector((state) => state.user.theme);
  const [image, setImage] = useState({ img: "" });
  const dispatch = useDispatch();
  const myDivRef = useRef(null);
  const auth = useAuthUser();

  const styles = {
    messages: `rounded-r-2xl w-full flex overflow-hidden shadow duration-500 ${
      themeState ? "bg-white" : "bg-gray-900"
    }`,
    div: `w-full md-5 flex flex-col `,
    header: `border-b p-5 flex items-center text-slate-500 select-none duration-500 ${
      themeState ? "bg-white" : "border-gray-800 text-gray-400 bg-gray-900"
    }`,
    main: `p-5 h-full overflow-auto flex flex-col`,
    content: `content w-fit pl-3 py-1 text-justify p-5 ${
      themeState ? "text-slate-100" : "text-slate-300"
    }`,
    date: `flex justify-end text-xs px-5 py-2 ${
      themeState ? "text-slate-100" : "text-slate-400"
    }`,
    form: `text-slate-500 py-5 px-20 flex gap-x-5 w-full mx-auto`,
    input: `px-5 py-3 w-full rounded-md outline-none duration-500 shadow ${
      themeState
        ? "bg-white focus:bg-slate-100"
        : "bg-gray-800 text-white focus:bg-gray-700"
    }`,
    button: `text-2xl px-2`,
    blank: `flex flex-col w-full justify-center items-center text-5xl`,
    blank_txt: `text-slate-300 italic mt-5`,
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

  const scrollBottom = () => {
    myDivRef.current.scrollTo({
      top: myDivRef.current.scrollHeight,
    });
  };

  const sendMessage = async (e, id) => {
    e.preventDefault(e);
    if (e.target[0].value) {
      const data = {
        message: e.target[0].value,
        user: { username: auth().name, userId: auth().id },
        date: Date.now(),
      };
      await axios
        .put("http://localhost:5000/chat/sendMessage/" + id, data)
        .then((res) => dispatch(getMessages(res.data)));
      axios
        .get("http://localhost:5000/chat/getRooms/" + auth().id)
        .then((res) => {
          dispatch(getRooms(res.data));
          $(".room").removeClass("active");
          $(".room:nth-child(1)").addClass("active");
        });

      e.target[0].value = "";
      scrollBottom();
    }
  };

  const createPost = async (newImage) => {
    // try {
    //   await axios.post("http://localhost:5000/chat/sendImage/", newImage);
    // } catch (err) {}
    console.log(newImage);
  };

  const sendImage = (e) => {
    e.preventDefault();
    createPost(image);
    console.log(image);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage({ ...image, img: base64 });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className={styles.messages}>
      {messages ? (
        <>
          <div className={styles.div}>
            <div className={styles.header}>
              <p className="p-1">{messages.name}</p>
            </div>
            <div className={styles.main} ref={myDivRef}>
              {messages.messages?.map((item, index) => (
                <div
                  key={index}
                  className={`mb-4 w-full duration-500 ${
                    item.user.userId === auth().id
                      ? themeState
                        ? "bg-sky-500 rounded-b-xl rounded-tl-xl max-w-[35rem] self-end"
                        : "bg-sky-500/30 shadow-md rounded-b-xl rounded-tl-xl max-w-[35rem] self-end"
                      : themeState
                      ? "bg-emerald-500 rounded-b-xl rounded-tr-xl max-w-[35rem]"
                      : "bg-emerald-500/30 shadow-md border-emerald-500 rounded-b-xl rounded-tr-xl max-w-[35rem]"
                  }`}
                >
                  <p className={styles.content}>{item.message}</p>
                  <small className={styles.date}>
                    {dateFormater(item.date)}
                  </small>
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <form className="image-upload py-3 px-5" onSubmit={sendImage}>
                {image.img ? (
                  <button type="submit">sub</button>
                ) : (
                  <>
                    <label
                      htmlFor="file-input"
                      className="cursor-pointer text-2xl text-gray-500 hover:text-gray-200 duration-500"
                    >
                      +
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      accept=".jpeg, .jpg, .png"
                      onChange={(e) => handleFileUpload(e)}
                    />
                  </>
                )}
              </form>
              <form
                className={styles.form}
                onSubmit={(e) => sendMessage(e, messages._id)}
              >
                <input
                  className={styles.input}
                  placeholder="Type your message..."
                />
              </form>
            </div>
          </div>
          <Medias />
        </>
      ) : (
        <div className={styles.blank}>
          <small className={styles.blank_txt}>Bonjour {auth().name}</small>
        </div>
      )}
    </div>
  );
};

export default Messages;
