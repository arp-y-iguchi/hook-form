/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { ReactNode } from "react";

type buttonProps = {
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  register?: boolean;
  disabled?: boolean;
};

export default function ButtonComponent({
  children,
  onClick,
  register,
  disabled,
}: buttonProps) {
  return (
    <button
      onClick={onClick}
      css={!register ? style.button : style.registerButton}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

const style = {
  button: css`
    background-color: #0095ff;
    height: 35px;
    width: 7%;
    margin-left: 5px;
    color: white;
    font-size: 18px;
    opacity: 0.5;
    border-radius: 3px;
  `,
  registerButton: css`
    background-color: #0095ff;
    height: 40px;
    width: 80%;
    margin: 0 auto;
    color: white;
    font-size: 18px;
    opacity: 0.4;
    border-radius: 3px;
    margin-top: 25px;
  `,
};
