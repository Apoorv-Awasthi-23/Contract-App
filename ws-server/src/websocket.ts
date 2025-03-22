import { WebSocket, WebSocketServer } from "ws";
import { Server } from "http";

const clients= new Set<WebSocket>();

export const socketServer = (server: Server) => {
    const ws = new WebSocketServer({ server });
    ws.on("connection", (conn:WebSocket) => {
        clients.add(conn);

    })
    ws.on("close", (conn:WebSocket) => {
        clients.delete(conn);
    })
}

