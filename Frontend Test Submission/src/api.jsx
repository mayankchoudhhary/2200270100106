import axios from "axios";

const BACKEND = "http://localhost:3000";
const LOGGING = "http://localhost:3000/log";

export async function logIt(level, pkg, message) {
  try {
    await axios.post(LOGGING, {
      stack: "frontend",
      level,
      package: pkg,
      message
    });
  } catch (e) {
    console.error("log failed");
  }
}

export async function createShort(data) {
  const res = await axios.post(`${BACKEND}/shorturls`, data);
  await logIt("info", "component", "Created short URL");
  return res.data;
}

export async function getStats(shortcode) {
  const res = await axios.get(`${BACKEND}/shorturls/${shortcode}`);
  await logIt("info", "component", "Fetched stats");
  return res.data;
}
