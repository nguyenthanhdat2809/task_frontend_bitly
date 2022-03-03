import { useState } from "react";
import { createdLink } from "./service/linkService";
import "./InputLink.css";

export default function InputLink() {
  const [link, setLink] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [err, setErr] = useState("");

  const handleOnChange = (e) => {
    console.log(e.target.value);
    setLink(e.target.value);
  };

  const handleSubmit = async () => {
    let res = await createdLink({
      longUrl: link,
    });
    setErr("");

    if (res && res.data) {
      setLink(res.data.shortUrl);
      setIsSubmit(true);
    }

    if (isSubmit) {
      navigator.clipboard.writeText(link);
      setIsCopy(true);
      setTimeout(() => {
        setIsCopy(false);
        setIsSubmit(false);
        setLink("");
      }, 1000);
    } else {
      if (res.data.message === "That is already") {
        setErr(res.data.message);
        setIsSubmit(false);
        return;
      }

      if (res.data.message === "Invalid long url") {
        setErr(res.data.message);
        setIsSubmit(false);
        return;
      }
    }
  };
  return (
    <div className="container-form">
      <div className="input-link">
        <div className="left">
          <input
            type="text"
            className=""
            value={link}
            onChange={(e) => handleOnChange(e)}
          />
        </div>

        <div className="right">
          <button
            className={isCopy ? "copied" : "submit"}
            onClick={handleSubmit}
          >
            {isSubmit ? "Copy" : "Shorten"}
          </button>
        </div>
      </div>

      {err && (
        <div className="err-noty">
          <div className="content">
            <span>{err}</span>
          </div>
        </div>
      )}
    </div>
  );
}
