import React from 'react';
import useStore from '@store/store';
import { MessageInterface } from '@type/chat';
import { generateDefaultChat } from '@constants/chat';

const useInitialiseNewChat = () => {
  const setChats = useStore((state) => state.setChats);
  const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

  const initialiseNewChat = () => {
    setChats([
      generateDefaultChat(),
      generateDefaultChat('Doctor', '', 'Doctor'),
      generateDefaultChat('Mentor', '', 'Mentor'),
      generateDefaultChat('ChristianGPT', '', 'ChristianGPT'),
    ]);
    setCurrentChatIndex(0);
  };

  return initialiseNewChat;
};

export default useInitialiseNewChat;
