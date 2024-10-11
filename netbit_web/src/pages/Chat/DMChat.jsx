import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, Paperclip, Trash2, Check, Pencil, ArrowLeft } from 'lucide-react';
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

export default function DMChat() {
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
    }
  }, [selectedContact, isMobile]);

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

  const handleBackToContacts = () => {
    setShowContactList(true);
    setSelectedContact(null);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex w-full h-full bg-gray-900 overflow-hidden">
      {/* Contact List */}
      <motion.div
        initial={false}
        animate={{ width: isMobile && selectedContact ? '0%' : '100%' }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800 h-full overflow-hidden"
        style={{ flex: isMobile ? 'none' : '0 0 25%' }}
      >
        <div className="p-4 h-full overflow-y-auto">
          <Input
            type="text"
            placeholder="Search contacts..."
            className="mb-4"
          />
          {contacts.map(contact => (
            <div
              key={contact.user_id}
              className="flex items-center p-3 hover:bg-gray-700 rounded-lg cursor-pointer"
              onClick={() => setSelectedContact(contact)}
            >
              <Avatar
                src={contact.avatar}
                alt={contact.username}
                fallback={contact.username.charAt(0)}
                className="w-10 h-10 mr-3"
              />
              <div>
                <div className="font-semibold text-white">{contact.username}</div>
                <div className="text-sm text-gray-400">{contact.status}</div>
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
            className="flex flex-col bg-gray-900 h-full relative"
            style={{ flex: isMobile ? '1 0 100%' : '1 0 75%' }}
          >
            {/* Header */}
            <div className="bg-gray-800/40 p-4 border-b border-gray-700/30 flex items-center">
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
                <div className="font-semibold text-white">
                  {selectedContact?.username}
                </div>
                <div className="text-sm text-gray-400">
                  {selectedContact?.status}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-hidden">
              <div 
                className="h-full overflow-y-auto p-4"
                style={{ 
                  scrollbarWidth: 'thin', 
                  scrollbarColor: '#4B5563 #1F2937',
                  height: 'calc(100vh - 144px)' // Adjust based on header and input heights
                }}
              >
                <AnimatePresence>
                  {messages.map(msg => (
                    <motion.div 
                      key={msg.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`mb-4 flex ${msg.sender_id === userId ? 'justify-end' : 'justify-start'}`}
                    >
                    {msg.sender_id !== userId && (
                      <Avatar
                        src={selectedContact?.avatar}
                        alt={selectedContact?.username}
                        fallback={selectedContact?.name?.charAt(0)}
                        className="h-8 w-8 mr-2 self-end"
                      />
                    )}
                    
                    <div className={`relative group max-w-[70%] p-3 rounded-2xl shadow-lg ${
                      msg.sender_id === userId ? 'bg-blue-600/40 text-white' : 'bg-gray-700/40 text-gray-200'
                    }`}>
                      <p>{msg.text}</p>
                      
                      <div className="flex items-center justify-end mt-1 space-x-2 text-xs text-gray-300/70">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>

                      {/* ... (действия с сообщениями остаются без изменений) */}
                    </div>
                    
                    {msg.sender_id === userId && (
                      <Avatar
                        src="/path/to/user/avatar.jpg"
                        alt="You"
                        fallback="У"
                        className="h-8 w-8 ml-2 self-end"
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-gray-800/40 p-4 border-t border-gray-700/30 absolute bottom-0 left-0 right-0">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <Button className="mr-2">
                  <Paperclip className="h-5 w-5" />
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
