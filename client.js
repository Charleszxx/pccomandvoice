const { io } = require("socket.io-client");
const { exec } = require("child_process");

const socket = io("http://YOUR_SERVER_IP:3000"); // Replace with your server IP
const deviceName = "My-PC"; // Change for each PC

socket.on("connect", () => {
    console.log("Connected to server");
    socket.emit("register-device", deviceName);
});

socket.on("execute-command", (cmd) => {
    console.log("Command received:", cmd);

    if (cmd.includes("shutdown")) exec("shutdown /s /f /t 0");
    else if (cmd.includes("restart")) exec("shutdown /r /f /t 0");
    else if (cmd.includes("sleep")) exec("rundll32.exe powrprof.dll,SetSuspendState 0,1,0");
    else if (cmd.includes("open notepad")) exec("start notepad");
    else if (cmd.includes("close tab")) exec("taskkill /im chrome.exe"); // Example
    // Add more commands as needed
});
