import React, { useState } from 'react';
import { MOCK_CHATS } from '../constants';
import { ChatConversation, Message } from '../types';
import { Send, Paperclip, MoreVertical, Search, CheckCheck } from 'lucide-react';

export const Messages: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>(MOCK_CHATS[0].id);
  const [input, setInput] = useState('');
  
  const selectedChat = MOCK_CHATS.find(c => c.id === selectedChatId);

  const handleSend = () => {
    if(!input.trim() || !selectedChat) return;
    // In a real app, this would push to backend. 
    // Here we just visually simulate it by forcing a re-render or just clear input for prototype feel
    // since we can't mutate the const directly effectively in this stateless view without context/state uplift.
    // I'll just clear input.
    setInput('');
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-white flex max-w-7xl mx-auto border-x border-gray-100 shadow-xl my-4 rounded-xl overflow-hidden">
      {/* Chat List */}
      <div className="w-1/3 border-r border-gray-100 flex flex-col bg-gray-50/50">
        <div className="p-4 border-b border-gray-100 bg-white">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Messages</h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-9 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm focus:ring-1 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {MOCK_CHATS.map(chat => (
            <div 
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-white transition-colors border-b border-gray-50 ${selectedChatId === chat.id ? 'bg-white border-l-4 border-l-indigo-600 shadow-sm' : ''}`}
            >
               <div className="relative">
                 <img src={chat.participantAvatar} className="w-12 h-12 rounded-full object-cover" alt="" />
                 {chat.unreadCount > 0 && (
                   <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                     {chat.unreadCount}
                   </div>
                 )}
               </div>
               <div className="flex-1 min-w-0">
                 <div className="flex justify-between items-baseline mb-1">
                   <h3 className={`text-sm truncate ${chat.unreadCount > 0 ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>{chat.participantName}</h3>
                   <span className="text-[10px] text-gray-400">12:30 PM</span>
                 </div>
                 <p className={`text-xs truncate ${chat.unreadCount > 0 ? 'text-slate-800 font-medium' : 'text-gray-500'}`}>{chat.lastMessage}</p>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur">
             <div className="flex items-center gap-3">
               <img src={selectedChat.participantAvatar} className="w-10 h-10 rounded-full" alt="" />
               <div>
                 <h3 className="font-bold text-slate-900">{selectedChat.participantName}</h3>
                 <span className="text-xs text-green-500 flex items-center gap-1">● Online</span>
               </div>
             </div>
             <button className="text-gray-400 hover:text-slate-900"><MoreVertical size={20}/></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
             {selectedChat.messages.map(msg => {
               const isMe = msg.senderId === 'brand'; // Assume current user is brand for prototype
               return (
                 <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[70%] rounded-2xl p-4 ${isMe ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-gray-100 shadow-sm rounded-tl-none'}`}>
                     <p className="text-sm leading-relaxed">{msg.text}</p>
                     <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${isMe ? 'text-slate-400' : 'text-gray-400'}`}>
                       {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                       {isMe && msg.isRead && <CheckCheck size={12} />}
                     </div>
                   </div>
                 </div>
               );
             })}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-400 transition-all">
              <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"><Paperclip size={20}/></button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..." 
                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder-gray-400"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-400">
           Select a conversation to start messaging
        </div>
      )}
    </div>
  );
};
