import React from 'react';
import useStore from '@store/store';
import { generateDefaultChat, DefaultMessages } from '@constants/chat';
import { ChatInterface } from '@type/chat';

const useAddChat = () => {
  const setChats = useStore((state) => state.setChats);
  const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

  // const addChat = (folder?:string) => {
  const addChat = (folder?: string, companionType?: keyof DefaultMessages) => {
    // Add companionType parameter
    const chats = useStore.getState().chats;
    if (chats) {
      const updatedChats: ChatInterface[] = JSON.parse(JSON.stringify(chats));
      let titleIndex = 1;
      let title = `New Chat ${titleIndex}`;

      while (chats.some((chat) => chat.title === title)) {
        titleIndex += 1;
        title = `New Chat ${titleIndex}`;
      }

      // updatedChats.unshift(generateDefaultChat(title, folder));
      // setChats(updatedChats);
      // setCurrentChatIndex(0);
      updatedChats.unshift(generateDefaultChat(title, folder, companionType)); // Pass the companionType to the generateDefaultChat function
      setChats(updatedChats);
      setCurrentChatIndex(0);
    }
  };

  return addChat;
};

export default useAddChat;
