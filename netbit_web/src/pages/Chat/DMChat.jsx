import React, { useState, useContext, useRef, useEffect } from 'react';
import { ThemeContext } from '../../main';
import { Send, Paperclip, Search, Phone, User } from 'lucide-react';

const ChatInterface = () => {
  const { theme } = useContext(ThemeContext);
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', avatar: 'https://docs.material-tailwind.com/img/face-2.jpg', status: 'online', lastMessage: 'Hey, how are you?' },
    { id: 2, name: 'Jane Smith', avatar: 'https://docs.material-tailwind.com/img/face-3.jpg', status: 'offline', lastMessage: 'See you later!' },
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

  const getStatusColor = (status) => {
    return status === 'online' ? 'bg-green-500' : 'bg-gray-500';
  };

  return (
    <div className={`flex w-screen h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {/* Contacts List */}
      <div className={`w-64 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} overflow-y-auto`}>
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className={`w-full p-2 pl-8 rounded ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
            />
            <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        </div>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex items-center p-3 cursor-pointer ${
              selectedContact === contact ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300') : ''
            } hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}
            onClick={() => setSelectedContact(contact)}
          >
            <div className="relative">
              <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full" />
              <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(contact.status)} rounded-full border-2 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}></div>
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="font-semibold truncate">{contact.name}</p>
              <p className={`text-sm truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{contact.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-b flex items-center justify-between`}>
              <div className="flex items-center">
                <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-full" />
                <div className="ml-3">
                  <h2 className="font-semibold">{selectedContact.name}</h2>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{selectedContact.status}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                  <Phone size={20} />
                </button>
                <button className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                  <User size={20} />
                </button>
                <button className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.sent
                        ? theme === 'dark'
                          ? 'bg-blue-600'
                          : 'bg-blue-500 text-white'
                        : theme === 'dark'
                        ? 'bg-gray-800'
                        : 'bg-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} flex items-center space-x-2`}>
              <button type="button" className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className={`flex-1 p-2 rounded-full ${
                  theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                }`}
              />
              <button
                type="submit"
                className={`p-2 rounded-full ${
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