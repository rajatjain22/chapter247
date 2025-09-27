import { ReactNode } from "react";

interface CardTypes {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardTypes> = ({ children, className = "" }) => {
  return (
    <div
      className={`relative rounded-lg border border-gray-300 shadow p-4 bg-white ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
