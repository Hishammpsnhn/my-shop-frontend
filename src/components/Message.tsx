import React from 'react';
interface Props {
  children: React.ReactNode;
  type: 'info' | 'error';
}
function Message({ children, type }: Props) {
  const bgColor = type === 'error' ? 'bg-red-100' : 'bg-blue-100';
  const borderColor = type === 'error' ? 'border-red-400' : 'border-blue-400';
  const textColor = type === 'error' ? 'text-red-700' : 'text-blue-700';

  return (
    <div
      className={`${bgColor} border ${borderColor} ${textColor} px-4 py-3 rounded relative`}
      role="alert"
    >
      <span className="block sm:inline">{children}</span>
    </div>
  );
}

export default Message;
