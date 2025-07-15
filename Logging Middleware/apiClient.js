const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtYXlhbmsyMjEwMjA4QGFrZ2VjLmFjLmluIiwiZXhwIjoxNzUyNTYwNjQ0LCJpYXQiOjE3NTI1NTk3NDQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJkNGM4ZDBlZi1lMGRkLTQ1MDEtOTY3YS05NDc0Y2Y3NGY2ODUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtYXlhbmsgY2hvdWRoYXJ5Iiwic3ViIjoiNWQ4YmQzOTgtOWIyYy00MzBhLWIzZmItNWYxNjQwMTc1MWRmIn0sImVtYWlsIjoibWF5YW5rMjIxMDIwOEBha2dlYy5hYy5pbiIsIm5hbWUiOiJtYXlhbmsgY2hvdWRoYXJ5Iiwicm9sbE5vIjoiMjIwMDI3MDEwMDEwNiIsImFjY2Vzc0NvZGUiOiJ1dU1ieVkiLCJjbGllbnRJRCI6IjVkOGJkMzk4LTliMmMtNDMwYS1iM2ZiLTVmMTY0MDE3NTFkZiIsImNsaWVudFNlY3JldCI6InZWSGFNRkdIdWpUeXhhS0sifQ.lgMTgyv2GJ01OzI8AI7ilTEM8mYuq4RQu1ZUS5YiK0M"

async function sendLog(stack, level, pkg, message) {
  try {
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: pkg,
        message: message
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Log API error:", errorData);
    } else {
      const data = await response.json();
      console.log("Log sent successfully:", data);
    }
  } catch (err) {
    console.error("Error sending log:", err.message);
  }
}

module.exports = { sendLog };
