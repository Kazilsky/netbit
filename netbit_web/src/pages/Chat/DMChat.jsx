import React, { useState, useContext, useRef, useEffect } from 'react';
import { ThemeContext } from '../../main';
import { Send, Paperclip } from 'lucide-react';
import DropdownButton from '../../components/Chat/DMChat/DropDownFileInput';
import DefaultInput from '../../components/Chat/DMChat/DefaultInput';


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
        <DefaultInput />
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${selectedContact === contact ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200') : ''
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
              <a
                href="javascript:void(0)"
                class="bg-dark dark:bg-dark-2 border-dark dark:border-dark-2 border rounded-md inline-flex items-center justify-center py-3 px-2 text-center text-base font-medium text-white hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
              >
                <span class="pr-[10px]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </span>
              </a>
              <a
                href="javascript:void(0)"
                class="bg-dark dark:bg-dark-2 border-dark dark:border-dark-2 border rounded-md inline-flex items-center justify-center py-3 px-2 text-center text-base font-medium text-white hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
              >
                <span class="pr-[10px]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </span>
              </a>
              <a
                href="javascript:void(0)"
                class="bg-dark dark:bg-dark-2 border-dark dark:border-dark-2 border rounded-md inline-flex items-center justify-center py-3 px-3 text-center text-base font-medium text-white hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
              >
                <span class="pr-[10px]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${message.sent
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
              <DropdownButton />
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className={`flex-1 p-2 rounded-l-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  }`}
              />
              <button
                type="submit"
                className={`p-2 rounded-r-lg ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
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

