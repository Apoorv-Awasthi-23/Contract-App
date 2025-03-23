"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketServer = void 0;
const ws_1 = require("ws");
const clients = new Set();
const socketServer = (server) => {
    const ws = new ws_1.WebSocketServer({ server });
    ws.on("connection", (conn) => {
        clients.add(conn);
    });
    ws.on("close", (conn) => {
        clients.delete(conn);
    });
};
exports.socketServer = socketServer;
