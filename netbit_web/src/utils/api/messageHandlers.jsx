
export const messageHandlers = (initSocket) => {
    let socket;
  
    return {
      initializeSocket(onMessageReceived, onMessageRead, onDeletedRead) {
        if (!socket) {
          socket = initSocket();
        }
  
        socket.on('messageReceived', onMessageReceived);
        socket.on('messageRead', onMessageRead);
        socket.on('deletedRead', onDeletedRead);
  
        return () => {
          socket.off('messageReceived');
          socket.off('messageRead');
          socket.off('deletedRead');
        };
      },
  
      markMessageAsRead(messageId) {
        if (socket) {
          socket.emit('markAsRead', messageId);
        } else {
          console.error('Socket connection not established');
        }
      },
  
      deleteMessage(messageId) {
        if (socket) {
          socket.emit('deletedRead', messageId);
        } else {
          console.error('Socket connection not established');
        }
      },
  
      sendMessage(message) {
        if (socket) {
          socket.emit('sendMessage', message);
        } else {
          console.error('Socket connection not established');
        }
      }
    };
  };
  