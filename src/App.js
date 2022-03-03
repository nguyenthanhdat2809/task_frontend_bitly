import InputLink from "./InputLink";
import "./styles.css";
import { useEffect, useState } from "react";
import { getAllLink } from "./service/linkService";

export default function App() {

  const [data, setData] = useState([]);

  useEffect(async () => {
    let res = await getAllLink();
    setData(res.data)
  },[]);

  return (
    <div className="App">
      <div className="form-short">
        <InputLink />
      </div>
    </div>
  );
}
