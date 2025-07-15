import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { createShort } from "../api";

export default function Shortener({ onCreated }) {
  const [url, setUrl] = useState("");

  const handle = async () => {
    const data = await createShort({ url });
    onCreated(data);
    setUrl("");
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <TextField
        label="URL to shorten"
        value={url}
        onChange={e => setUrl(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handle} sx={{ mt: 2 }}>
        Shorten
      </Button>
    </div>
  );
}
