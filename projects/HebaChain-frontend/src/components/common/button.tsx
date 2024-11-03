import React from 'react';
import { CustomButtonTypes } from '../../types/button';

interface CustomButtonProps extends CustomButtonTypes {}

const CustomButton: React.FC<CustomButtonProps> = ({
  border = 'none',
  onClick,
  background = '#FFFFFF',
  textColor = '#1E1E1E',
  padding = '10px 20px',
  borderRadius = '20px',
  cursor = 'pointer',
  children,
  textSize = '1rem',
  disabled = false,
}) => {
  const buttonStyle = {
    border,
    background,
    padding,
    borderRadius,
    cursor,
    color: textColor,
    fontSize: textSize,
  };

  return (
    <button className="center relative border gap-2 w-full hover:scale-95 transition duration-300" onClick={onClick} style={buttonStyle} disabled={disabled} >
      {children}
    </button>
  );
};

export default CustomButton;
