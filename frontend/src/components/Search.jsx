const styles = {
  backdrop:
    "fixed top-0 left-0 h-screen w-full bg-black/30 z-20 backdrop-blur-sm",
  div: "fixed w-full flex justify-center top-52 z-30",
  input : "py-3 px-2 w-96 outline-none bg-white/20 border-b text-white placeholder:text-white/80"
};

const Search = ({ setSearchUser }) => {
  return (
    <>
      <div
        className={styles.backdrop}
        onClick={() => setSearchUser(false)}
      ></div>
      <div className={styles.div}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.input}
        />
      </div>
    </>
  );
};

export default Search;
