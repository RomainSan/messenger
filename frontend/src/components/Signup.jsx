import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const styles = {
  signup:
    "w-[42rem] h-[20rem] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-center flex",
  leftPart:
    "w-1/3 p-2 bg-white flex flex-col justify-between rounded-2xl mr-2 shadow-lg",
  rightPart: "w-2/3 p-2 bg-slate-600 flex items-center rounded-2xl shadow-lg",
  title: "text-[#242424] capitalize text-left p-2 text-2xl",
  p: "text-[#242424] text-left p-2",
  form: "flex flex-col gap-y-2 w-full mx-5",
  input:
    "input py-3 placeholder:capitalize outline-none bg-slate-600 border-b focus:border-b-white duration-500",
  button:
    "bg-emerald-500 text-white w-fit self-end py-2 px-5 mt-5 duration-200 rounded-xl hover:shadow-lg duration-500",
  link: "text-emerald-500",
  errorMessage:
    "absolute top-10 left-[50%] translate-x-[-50%] flex justify-center bg-red-500 py-3 px-5 rounded-full cursor-pointer hover:shadow-lg hover:-translate-y-1 duration-200",
  successMessage:
    "absolute top-10 left-[50%] translate-x-[-50%] flex justify-center bg-emerald-500 py-3 px-5 rounded-full cursor-pointer hover:shadow-lg hover:-translate-y-1 duration-200",
};

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };

    await axios.post("http://localhost:5000/user/signup", data).then((res) => {
      if (res.data.code === "400") {
        setSuccessMessage();
        setErrorMessage("Email already registered");
        e.target[1].value = "";
        e.target[2].value = "";
      } else {
        setErrorMessage();
        setSuccessMessage("Your account was successfully created");
        e.target[0].value = "";
        e.target[1].value = "";
        e.target[2].value = "";
      }
    });
  };

  return (
    <>
      <div className={styles.signup}>
        <div className={styles.leftPart}>
          <p className={styles.title}>Sign up</p>
          <p className={styles.p}>
            Already registered ?{" "}
            <Link to="/signin" className={styles.link}>
              Sign in
            </Link>
          </p>
        </div>
        <div className={styles.rightPart}>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <input
              className={styles.input}
              type="text"
              name="username"
              placeholder="name"
              required
            />
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="email"
              required
            />
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="password"
              required
            />
            <button className={styles.button}>Sign Up</button>
          </form>
        </div>
      </div>
      {errorMessage && (
        <p className={styles.errorMessage} onClick={() => setErrorMessage()}>
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <div
          className={styles.successMessage}
          onClick={() => setSuccessMessage()}
        >
          <p>
            {successMessage}{" "}
            <Link to="/signin" className="underline">
              Log in
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Signup;
