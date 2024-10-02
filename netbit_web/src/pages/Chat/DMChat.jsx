import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Paperclip, Smile, Plus, Trash2 } from 'lucide-react';
import api, { getUsers, initializeSocket, sendMessage, deleteMessage, markMessageAsRead } from '../../utils/api/api';
import DropdownButton from '../../components/Chat/DMChat/DropDownFileInput';
import ScrollToBottom from 'react-scroll-to-bottom';

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    className={`w-full px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm ${className}`}
    ref={ref}
    {...props}
  />
));

const Button = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-md ${className}`}
    ref={ref}
    {...props}
  >
    {children}
  </button>
));

const ScrollArea = ({ className, children }) => (
  <div className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 ${className}`}>
    {children}
  </div>
);

const Avatar = ({ src, alt, fallback, className }) => (
  <div className={`relative inline-block ${className}`}>
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover rounded-full shadow-md" />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full shadow-md">
        {fallback}
      </div>
    )}
  </div>
);

export default function DMChat() {
  const [userId, setUserId] = useState(0);

  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchContacts();
    fetchUserId();
    const cleanupSocket = initializeSocket(handleNewMessage, handleMessageRead, handleMessageDeleted);
    return () => {
      cleanupSocket();
    };
  }, []);

  useEffect(() => {
    if (selectedContact) fetchMessages(selectedContact.id);
  }, [selectedContact]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleNewMessage = (data) => {
    setMessages(prevMessages => [...prevMessages, data]);
  };

  const handleMessageRead = (data) => {
    setMessages(prevMessages => prevMessages.map(msg => 
      msg.id === data.messageId ? { ...msg, read_at: true } : msg
    ));
  };

  const handleMessageDeleted = (data) => {
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== data.messageId));
  };

  const fetchContacts = async () => {
    const contactsData = await getUsers();
    setContacts(contactsData);
  };

  const fetchUserId = async () => {
    const response = await api.get('/user');
    setUserId(response.data[0].id);
  };

  const fetchMessages = async (contactId) => {
    const response = await api.get(`/messages/${contactId}`);
    setMessages(response.data);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() && selectedContact) {
      const newMessage = {
        text: message.trim(),
        recipientId: selectedContact.id,
      };
      sendMessage(newMessage);
      setMessage('');
    }
  };

  const handleDeleteMessage = (messageId) => {
    deleteMessage(messageId);
    console.log(messageId);
  };
  
  const handleMarkAsRead = (messageId) => {
    markMessageAsRead(messageId);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Contact and Group List */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="p-4">
          <Input
            type="text"
            placeholder="Поиск"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[calc(100vh-180px)]">
          {filteredContacts.map(contact => (
            <div
              key={contact.id}
              className={`flex items-center p-3 cursor-pointer transition hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg ${selectedContact?.id === contact.id ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
              onClick={() => setSelectedContact(contact)}
            >
              <Avatar
                src={contact.avatar}
                alt={contact.username || "без имени"}
                // fallback={contact.name.charAt(0)}
                className="h-12 w-12 mr-3"
              />
              <div>
                <div className="font-semibold text-gray-800 dark:text-white">{contact.username}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{contact.status}</div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 shadow-md">
              <div className="flex items-center">
                <Avatar
                  src={selectedContact?.avatar}
                  alt={selectedContact?.username}
                  fallback={selectedContact?.name?.charAt(0)}
                  className="h-12 w-12 mr-3"
                />
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">
                    {selectedContact?.username}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedContact?.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollToBottom className="messages-container max-h-full overflow-y-auto border-2 border-gray-300 p-4 shadow-md rounded-lg bg-white">
              {messages.map(msg => (
                <div key={msg.id} className={`mb-4 ${msg.sender_id === userId ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-3 rounded-2xl shadow-md transition ${msg.sender_id === userId ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}>
                    {msg.text}
                    {msg.sender_id === userId && !msg.deleted_at && (
                      <button onClick={() => handleDeleteMessage(msg.id)} className="ml-2 text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                    {msg.sender_id !== userId && !msg.read_at && (
                      <button onClick={() => handleMarkAsRead(msg.id)} className="ml-2 text-gray-500 hover:text-gray-700">
                        Прочитано
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </ScrollToBottom>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="flex items-center">
                <DropdownButton />
                <Input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Введите сообщение..."
                  className="flex-1 mx-2"
                />
                <Button type="submit">
                  <Send className="h-6 w-6"/>
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-600">
            Выберите контакт или группу для начала чата
          </div>
        )}
      </div>
    </div>
  );
}