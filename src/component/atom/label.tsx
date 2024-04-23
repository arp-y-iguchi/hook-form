/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { ReactNode } from "react";

type LabelProps = {
  label: string;
  children: ReactNode;
  errorMessage?: string;
};

export default function LabelComponent({
  label,
  children,
  errorMessage,
}: LabelProps) {
  return (
    <>
      <label css={style.label}>{label}</label>
      {children}
      {errorMessage && <p css={style.p}>{errorMessage}</p>}
    </>
  );
}

const style = {
  label: css`
    font-weight: bold;
  `,
  p: css`
    margin: 1px;
    color: red;
  `,
};
