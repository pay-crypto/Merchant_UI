import React from 'react';

interface AvatarProps {
  name?: string;
  src?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name = 'User', src }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colors = [
    'bg-indigo-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-red-500',
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="w-8 h-8 rounded-full object-cover"
      />
    );
  }

  return (
    <div
      className={`w-8 h-8 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white text-sm font-semibold`}
    >
      {initials}
    </div>
  );
};
