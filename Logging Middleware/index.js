const { validateInputs } = require("./validators");
const { sendLog } = require("./apiClient");
async function Log(stack, level, pkg, message) {
  try {
    validateInputs(stack, level, pkg);
    await sendLog(stack, level, pkg, message);
  } catch (err) {
    console.error("Logging error:", err.message);
  }
}
module.exports = { Log };