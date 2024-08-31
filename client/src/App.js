import { useState } from "react";
import axios from "axios";

const App = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendMail = (e) => {
    e.preventDefault();
    axios
      .get("https://mailer-test-mj26.onrender.com/mailingport", {
        params: {
          email,
          subject,
          message,
        },
      })
      .then(() => console.log("Success Right there"))
      .catch(() => console.log("Oops! That failed"));
  };

  return (
    <div>
      <h1>Send us an Email</h1>
      <form>
        <input
          type="email"
          placeholder="Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /> <br />
        <input
          type="text"
          placeholder="Subject of mail"
          onChange={(e) => setSubject(e.target.value)}
        />
        <br /> <br />
        <input
          type="text"
          placeholder="Body of mail"
          onChange={(e) => setMessage(e.target.value)}
          className="mailbody"
        />
        <br /> <br />
        <button onClick={sendMail}>Send Email</button>
      </form>
    </div>
  );
};

export default App;
