// Allowed values
const validStacks = ["backend", "frontend"];
const validLevels = ["debug", "info", "warn", "error", "fatal"];
const backendPackages = [
  "cache","controller","cron_job","db","domain","handler","repository","route","service"
];
const frontendPackages = [
  "api","component","hook","page","state","style"
];
const sharedPackages = ["auth","config","middleware","utils"];

function validateInputs(stack, level, pkg) {
  if (!validStacks.includes(stack)) {
    throw new Error(`Invalid stack: ${stack}`);
  }

  if (!validLevels.includes(level)) {
    throw new Error(`Invalid level: ${level}`);
  }

  const allowedPackages =
    stack === "backend"
      ? [...backendPackages, ...sharedPackages]
      : [...frontendPackages, ...sharedPackages];

  if (!allowedPackages.includes(pkg)) {
    throw new Error(`Invalid package: ${pkg} for stack: ${stack}`);
  }
}

module.exports = { validateInputs };
