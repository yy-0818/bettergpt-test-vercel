import React, { memo } from 'react';

import TickIcon from '@icon/TickIcon';

import BaseButton from './BaseButton';

const HistoryButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <BaseButton
      icon={<TickIcon />}
      buttonProps={{ 'aria-label': 'history message' }}
      onClick={(e) => {
        onClick(e);
      }}
    />
  );
};
export default HistoryButton;
