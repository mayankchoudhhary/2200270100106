import Shortener from "./components/Shortner";
import Stats from "./components/Stats";
import { useState } from "react";

export default function App() {
  const [list, setList] = useState([]);

  return (
    <div style={{ padding: 20 }}>
      <h1>URL Shortener</h1>
      <Shortener
        onCreated={(data) =>
          setList((prev) => [...prev, { original: "input", ...data }])
        }
      />
      {list.map((l, i) => (
        <div key={i}>
          <strong>{l.shortLink}</strong> (expires: {l.expiry})
        </div>
      ))}

      <h2 style={{ marginTop: 40 }}>Stats</h2>
      <Stats />
    </div>
  );
}
