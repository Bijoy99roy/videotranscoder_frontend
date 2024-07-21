import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface WebSocketContextProps {
    messages: string[];
    sendMessage: (message: string) => void;
}


const WebSocketContext = createContext<WebSocketContextProps | null>(null);


export const WebSocketProvider = ({ children }: { children:React.ReactNode }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const workerRef = useRef<SharedWorker | null>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const portRef = useRef<MessagePort | null>(null);

    useEffect(() => {
        if (!window.SharedWorker) {

            workerRef.current = new SharedWorker('/shared-worker.js');
            portRef.current = workerRef.current.port;


            portRef.current.onmessage = (event: MessageEvent) => {
                setMessages((prevMessages) => [...prevMessages, event.data]);
            };


            return () => {
                if (portRef.current) {
                    portRef.current.close();
                }
            };
        } else {

            console.warn('Shared Workers are not supported in your browser. Falling back to regular WebSocket.');
            socketRef.current = new WebSocket('ws://whole-adapted-mammoth.ngrok-free.app');


            socketRef.current.onmessage = (event) => {
                setMessages((prevMessages) => [...prevMessages, event.data]);
            };

            return () => {
                if (socketRef.current?.readyState === 1) {
                    socketRef.current.close();
                    console.warn('Shared Workers closed');
                }
            };
        }
    }, []);


    const sendMessage = (message: string) => {
        if (portRef.current) {
            portRef.current.postMessage(message);
        } else if (socketRef.current) {
            socketRef.current.send(message);
        }
    };

    return (
        <WebSocketContext.Provider value={{ messages, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};


export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
