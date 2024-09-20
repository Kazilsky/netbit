
import React, { useState, useRef, useEffect } from 'react'
import { Search, Send, Paperclip, Smile, Plus } from 'lucide-react'
import DropdownFileInput from '../../components/Chat/DMChat/DropDownFileInput'
import DropdownButton from '../../components/Chat/DMChat/DropDownFileInput'
import DefaultInput from '../../components/Chat/DMChat/DefaultInput'

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={`w-full px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm ${className}`}
      ref={ref}
      {...props}
    />
  )
})

const Button = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-md ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

const ScrollArea = ({ className, children }) => {
  return (
    <div className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 ${className}`}>
      {children}
    </div>
  )
}

const Avatar = ({ src, alt, fallback, className }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover rounded-full shadow-md" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full shadow-md">
          {fallback}
        </div>
      )}
    </div>
  )
}

export default function DMChat() {
  const [selectedContact, setSelectedContact] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const messagesEndRef = useRef(null)

  const contacts = [
    { id: 1, name: 'Алиса', avatar: '/placeholder.svg?height=40&width=40', status: 'В сети' },
    { id: 2, name: 'Боб', avatar: '/placeholder.svg?height=40&width=40', status: 'Не в сети' },
    { id: 3, name: 'Чарли', avatar: '/placeholder.svg?height=40&width=40', status: 'Отошёл' },
    { id: 4, name: 'Дэвид', avatar: '/placeholder.svg?height=40&width=40', status: 'Не беспокоить' },
  ]

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim() && selectedContact) {
      setMessages([...messages, { id: Date.now(), text: message, sender: 'me' }])
      setMessage('')
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Список контактов */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="p-4">
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="Поиск"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <DefaultInput />
        </div>
        <ScrollArea className="h-[calc(100vh-180px)]">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center p-3 cursor-pointer transition hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg ${
                selectedContact?.id === contact.id ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              onClick={() => setSelectedContact(contact)}
            >
              <Avatar
                src={contact.avatar}
                alt={contact.name}
                fallback={contact.name.charAt(0)}
                className="h-12 w-12 mr-3"
              />
              <div>
                <div className="font-semibold text-gray-800 dark:text-white">{contact.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {contact.status === 'В сети' && <span className="text-green-500">●</span>}
                  {contact.status === 'Не в сети' && <span className="text-gray-500">●</span>}
                  {contact.status === 'Отошёл' && <span className="text-yellow-500">●</span>}
                  {contact.status === 'Не беспокоить' && <span className="text-red-500">●</span>}
                  {' '}{contact.status}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Область чата */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Заголовок чата */}
            <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 shadow-md">
              <div className="flex items-center">
                <Avatar
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                  fallback={selectedContact.name.charAt(0)}
                  className="h-12 w-12 mr-3"
                />
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">{selectedContact.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{selectedContact.status}</div>
                </div>
              </div>
            </div>

            {/* Сообщения */}
            <ScrollArea className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-4 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block p-3 rounded-2xl shadow-md transition ${
                      msg.sender === 'me'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Ввод сообщения */}
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
            Выберите контакт для начала чата
          </div>
        )}
      </div>
    </div>
  )
}
