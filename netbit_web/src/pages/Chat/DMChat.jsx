import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, Paperclip, Trash2, Check, Pencil, ArrowLeft, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api, { getUsers, initializeSocket, sendMessage, deleteMessage, markMessageAsRead } from '../../utils/api/api';

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    className={`w-full px-4 py-2 text-sm bg-gray-800/20 border border-gray-700/30 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition shadow-sm text-white placeholder-gray-400 ${className}`}
    ref={ref}
    {...props}
  />
));

const Button = React.forwardRef(({ className, children, ...props }, ref) => (
  <motion.button
    whileHover={{ scale: 1.05, backgroundColor: '#1e293b' }}
    whileTap={{ scale: 0.95 }}
    className={`p-2 text-sm font-medium text-gray-300 bg-gray-700/30 border-none rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${className}`}
    ref={ref}
    {...props}
  >
    {children}
  </motion.button>
));

const Avatar = ({ src, alt, fallback, className }) => (
  <div className={`relative inline-block ${className}`}>
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover rounded-full shadow-sm" />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-700/50 text-gray-300 rounded-full shadow-sm">
        {fallback}
      </div>
    )}
  </div>
);

const BottomNavItem = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full py-2 ${
      isActive ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'
    }`}
  >
    <Icon className="h-6 w-6 mb-1" />
    <span className="text-xs">{label}</span>
  </button>
);

export default function DMChat({ onContactSelect }) {
  const [userId, setUserId] = useState(0);
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showContactList, setShowContactList] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const messagesEndRef = useRef(null);
  const [textScale, setTextScale] = useState(100);

  useEffect(() => {
    // Получаем текущий масштаб текста из localStorage
    const storedScale = localStorage.getItem('NetBitProgramm_448673_Size');
    if (storedScale) {
      setTextScale(Number(storedScale));
    }

    // Слушаем изменения масштаба текста
    const handleStorageChange = (e) => {
      if (e.key === 'NetBitProgramm_448673_Size') {
        setTextScale(Number(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Функция для расчета высоты области сообщений
  const calculateMessagesHeight = () => {
      const baseHeight = isMobile ? 147 : 214;
      const scaledHeight = baseHeight * (textScale / 100);
      return `calc(100vh - ${scaledHeight}px)`;
  };
  
  useEffect(() => {
    fetchContacts();
    fetchUserId();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    const cleanupSocket = initializeSocket(handleNewMessage, handleMessageRead, handleMessageDeleted);
    
    return () => {
      cleanupSocket();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (selectedContact) {
      fetchMessages(selectedContact.user_id);
      if (isMobile) setShowContactList(false);
      onContactSelect(selectedContact);
    } else {
      onContactSelect(null);
    }
  }, [selectedContact, isMobile, onContactSelect]);

  const handleBackToContacts = () => {
    setShowContactList(true);
    setSelectedContact(null);
  };

  const handleEditMessage = (messageId, newText) => {
    setMessages(prevMessages => prevMessages.map(msg => 
      msg.id === messageId ? { ...msg, text: newText } : msg
    ));
    setEditingMessage(null);
  };
  
  const handleSelectMessage = (messageId) => {
    setSelectedMessage(messageId === selectedMessage ? null : messageId);
  };

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
    setUserId(response.data[0].user_id);
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
        recipientId: selectedContact.user_id,
      };
      sendMessage(newMessage);
      setMessage('');
    }
  };

  const handleDeleteMessage = (messageId) => {
    deleteMessage(messageId);
  };
  
  const handleMarkAsRead = (messageId) => {
    markMessageAsRead(messageId);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex w-full h-full bg-white dark:bg-gray-900">
      {/* Contact List */}
      <motion.div
        initial={false}
        animate={{ width: isMobile && selectedContact ? '0%' : '100%' }}
        transition={{ duration: 0.3 }}
        className="bg-gray-100 dark:bg-gray-800 h-full overflow-hidden"
        style={{ flex: isMobile ? 'none' : '0 0 25%' }}
      >
        <div className="p-4 h-full overflow-y-auto">
          <Input
            type="text"
            placeholder="Поиск контактов..."
            className="mb-4"
          />
          {contacts.map(contact => (
            <div
              key={contact.user_id}
              className={`flex items-center p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer ${
                selectedContact?.user_id === contact.user_id ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              onClick={() => setSelectedContact(contact)}
            >
              <Avatar
                src={contact.avatar}
                alt={contact.username}
                fallback={contact.username.charAt(0)}
                className="w-10 h-10 mr-3"
              />
              <div>
                <div className="font-semibold text-gray-800 dark:text-white">{contact.username}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{contact.status}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Chat Area */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div 
            key="chat-area"
            initial={isMobile ? { x: '100%' } : { opacity: 0 }}
            animate={isMobile ? { x: 0 } : { opacity: 1 }}
            exit={isMobile ? { x: '100%' } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col bg-white dark:bg-gray-900 h-full relative"
            style={{ flex: isMobile ? '1 0 100%' : '1 0 75%' }}
          >
            {/* Header */}
            <div className="bg-gray-200/40 dark:bg-gray-800/40 p-4 border-b border-gray-300 dark:border-gray-700/30 flex items-center">
              {isMobile && (
                <Button onClick={() => setSelectedContact(null)} className="mr-2">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <Avatar
                src={selectedContact?.avatar}
                alt={selectedContact?.username}
                fallback={selectedContact?.name?.charAt(0)}
                className="h-10 w-10 mr-3"
              />
              <div>
                <div className="font-semibold text-gray-800 dark:text-white">
                  {selectedContact?.username}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedContact?.status}
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full h-full">
              {/* Messages */}
              <div className="flex-grow overflow-y-auto p-4" style={{ maxHeight: calculateMessagesHeight()}}>
              {messages.map((msg) => (
                <div key={msg.id} className={`mb-4 flex ${msg.sender_id === userId ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex flex-col items-end max-w-[80%] relative group">
                    {selectedMessage === msg.id && (
                      <div className="absolute -top-8 right-0 flex bg-gray-200 dark:bg-gray-800 rounded-full shadow-lg z-10 p-1">
                        <button onClick={() => handleMarkAsRead(msg.id)} className="p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full">
                          <Check className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </button>
                        <button onClick={() => setEditingMessage(msg.id)} className="p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full">
                          <Pencil className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </button>
                        <button onClick={() => handleDeleteMessage(msg.id)} className="p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full">
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </button>
                      </div>
                    )}
                    <div className="flex items-end">
                      {msg.sender_id !== userId && (
                        <Avatar
                          src={contacts.find(c => c.user_id === msg.sender_id)?.avatar}
                          alt={contacts.find(c => c.user_id === msg.sender_id)?.username}
                          fallback={contacts.find(c => c.user_id === msg.sender_id)?.username.charAt(0)}
                          className="w-8 h-8 mr-2 flex-shrink-0"
                        />
                      )}
                      <div className={`relative p-3 rounded-2xl shadow-lg ${
                        msg.sender_id === userId ? 'bg-blue-100 dark:bg-blue-600/40 text-blue-800 dark:text-white' : 'bg-gray-200 dark:bg-gray-700/40 text-gray-800 dark:text-gray-200'
                      }`}>
                        {msg.sender_id !== userId && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {contacts.find(c => c.user_id === msg.sender_id)?.username}
                          </div>
                        )}
                        <p className="break-words whitespace-pre-wrap">{msg.text}</p>
                        <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      {msg.sender_id === userId && (
                        <Avatar
                          src={contacts.find(c => c.user_id === msg.sender_id)?.avatar}
                          alt={contacts.find(c => c.user_id === msg.sender_id)?.username}
                          fallback={contacts.find(c => c.user_id === msg.sender_id)?.username.charAt(0)}
                          className="w-8 h-8 ml-2 flex-shrink-0"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-gray-100 dark:bg-gray-800 p-4 border-t border-gray-300 dark:border-gray-700">
                <form onSubmit={handleSendMessage} className="flex items-center">
                  <Button type="submit" className="mr-2">
                    <Paperclip className='h-5 w-5'/>
                  </Button>
                  <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Введите сообщение..."
                    className="flex-1"
                  />
                  <Button type="submit" className="ml-2">
                    <Send className="h-5 w-5"/>
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
