import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useSignIn } from "react-auth-kit";
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
  input: "py-3 placeholder:capitalize outline-none bg-slate-600 border-b",
  button:
    "bg-emerald-500 text-white w-fit self-end py-2 px-5 mt-5 duration-200 rounded-xl hover:shadow-lg duration-500",
  link: "text-emerald-500",
  error: "text-white bg-red-500 py-3 px-5 rounded w-fit mx-auto flex gap-x-5",
};

const Signin = () => {
  const [alert, setAlert] = useState();
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email: e.target[0].value, password: e.target[1].value };
    await axios.post("http://localhost:5000/user/login", data).then((res) => {
      if (res.data.code === 401) {
        setAlert("The email address or password you entered is invalid");
        e.target[1].value = "";
      } else {
        signIn({
          token: res.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: {
            email: res.data.email,
            id: res.data.id,
            name: res.data.name,
            theme: res.data.theme,
          },
        });
        navigate("/dashboard");
      }
    });
  };

  return (
    <>
      {alert && (
        <div className={styles.error}>
          <p>{alert}</p>
          <button onClick={() => setAlert(false)}>
            <IoCloseOutline />
          </button>
        </div>
      )}
      <div className={styles.signup}>
        <div className={styles.leftPart}>
          <p className={styles.title}>Sign in</p>
          <p className={styles.p}>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.link}>
              Sign up
            </Link>
          </p>
        </div>
        <div className={styles.rightPart}>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <input
              className={styles.input}
              type="email"
              placeholder="email"
              required
            />
            <input
              className={styles.input}
              type="password"
              placeholder="password"
              required
            />
            <button className={styles.button}>Sign In</button>
            <p className="rounded-xl"></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
