/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type InputProps = JSX.IntrinsicElements["input"] & {
  placeholder: string;
  postCode?: boolean;
  register: any;
  name: string;
};

export default function InputComponent({
  placeholder,
  postCode,
  register,
  name,
}: InputProps) {
  return (
    <>
      <input
        type="text"
        css={!postCode ? style.input : style.postInput}
        placeholder={placeholder}
        {...register(name)}
      />
    </>
  );
}

const style = {
  input: css`
    width: 100%;
    height: 35px;
    border-radius: 3px;
    border-width: 1px;
  `,
  postInput: css`
    width: 30%;
    height: 35px;
    border-radius: 3px;
    border-width: 1px;
  `,
};
