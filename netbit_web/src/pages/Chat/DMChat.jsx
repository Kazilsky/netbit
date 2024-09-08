import React, { useState, useContext, useRef, useEffect } from 'react';
import { ThemeContext } from '../../main';
import { Send, Paperclip } from 'lucide-react';

const ChatInterface = () => {
  const { theme } = useContext(ThemeContext);
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', avatar: 'https://docs.material-tailwind.com/img/face-2.jpg', lastMessage: 'Hey, how are you?', online: true },
    { id: 2, name: 'Jane Smith', avatar: 'https://docs.material-tailwind.com/img/face-3.jpg', lastMessage: 'See you later!', online: false },
    // Add more contacts as needed
  ]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, sent: true }]);
      setNewMessage('');
    }
  };

  return (
    <div className={`flex w-screen h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Contacts List */}
      <div className={`w-1/4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-r overflow-y-auto`}>
        <h2 className="text-xl font-bold p-4">Contacts</h2>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
              selectedContact === contact ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200') : ''
            }`}
            onClick={() => setSelectedContact(contact)}
          >
            <div className="relative">
              <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full" />
              {contact.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="ml-4">
              <h3 className="font-semibold">{contact.name}</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{contact.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-b flex items-center`}>
              <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-full" />
              <h2 className="ml-4 font-semibold">{selectedContact.name}</h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.sent
                        ? theme === 'dark'
                          ? 'bg-blue-600'
                          : 'bg-blue-500 text-white'
                        : theme === 'dark'
                        ? 'bg-gray-700'
                        : 'bg-gray-300'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-t flex`}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className={`flex-1 p-2 rounded-l-lg ${
                  theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                }`}
              />
              <button
                type="button"
                className={`p-2 ${
                  theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <Paperclip size={20} />
              </button>
              <button
                type="submit"
                className={`p-2 rounded-r-lg ${
                  theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                <Send size={20} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Select a contact to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
