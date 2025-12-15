import React from 'react';
import ChatList from '../components/Message/ChatList';
import ChatWindow from '../components/Message/ChatWindow';

const Message = () => {
  return (
    <div className="flex h-full bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 transition-colors">
        <ChatList />
        <ChatWindow />
    </div>
  );
};

export default Message;