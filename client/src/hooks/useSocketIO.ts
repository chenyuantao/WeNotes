import { useEffect, useState } from 'react';

export default (url: string): SocketIOClient.Socket | null => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  useEffect(() => {
    const _socket = io(url);
    _socket.on('connect', () => {
      setSocket(_socket);
    });
    _socket.on('disconnect', () => {
      _socket.open();
    });
    return () => {
      _socket.disconnect();
    };
  }, []);
  return socket;
};
