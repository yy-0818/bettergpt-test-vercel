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
      generateDefaultChat('Doctor', null, 'Doctor'),
      generateDefaultChat('Mentor', null, 'Mentor'),
      generateDefaultChat('ChristianGPT', null, 'ChristianGPT'),
    ]);
    setCurrentChatIndex(0);
  };

  return initialiseNewChat;
};

export default useInitialiseNewChat;
