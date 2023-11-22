"use client";
import { IconType } from "react-icons";

interface ButttonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButttonProps> = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-md
    hover:opacity-80
    transition
    w-full
    border-slate-700
    flex items-center justify-center gap-2
    ${outline ? "bg-white" : "bg-slate-700"}
    ${outline ? "text-slate-700" : "text-white"}
    ${small ? "text-sm" : "text-md"}
    ${small ? "py-1 px-2" : "py-3 px-4"}
    ${small ? "font-light" : "font-semibold"}
    ${small ? "border-[1px]" : "border-2"}
    ${custom ? custom : ""}
  `}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
