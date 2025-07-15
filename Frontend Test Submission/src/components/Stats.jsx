import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { getStats } from "../api";

export default function Stats() {
  const [code, setCode] = useState("");
  const [data, setData] = useState(null);

  const handle = async () => {
    const res = await getStats(code);
    setData(res);
  };

  return (
    <div>
      <TextField
        label="Shortcode"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <Button variant="outlined" onClick={handle} sx={{ ml: 2 }}>
        Get Stats
      </Button>

      {data && (
        <pre style={{ textAlign: "left", marginTop: 20 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
