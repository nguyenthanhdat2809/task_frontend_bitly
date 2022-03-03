import { useEffect, useState } from "react";
import { createdLink, getAllLink } from "./service/linkService";
import "./InputLink.css";

export default function InputLink() {
  const [link, setLink] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [err, setErr] = useState("");
  const [listLink, setListLink] = useState([]);

  useEffect(async () => {
    await getAllLinkService();
  }, []);

  const getAllLinkService = async () => {
    let res = await getAllLink();
    setListLink(res.data);
  }

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

    await getAllLinkService();
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    toastr.success('We do have the Kapua suite available.', 'Turtle Bay Resort', {timeOut: 1000})
  }

  const handleRiderect = (url) => {
    window.open(
      url,
      '_blank'
    );
  }

  console.log(listLink);
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

      {listLink &&
        listLink.map((link, i) => {
          return (
            <div className="result">
              <div className="result-left">
                <div className="long url">
                  <span>
                    {link.longUrl}
                  </span>
                </div>
              </div>

              <div className="result-right">
                <div className="short-url">
                  <span onClick={() => handleRiderect(link.shortUrl)}>{link.shortUrl}</span>
                </div>

                <div className="btn">
                  <button className="btn-copy" onClick={() => handleCopy(link.shortUrl)}>Copy</button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
