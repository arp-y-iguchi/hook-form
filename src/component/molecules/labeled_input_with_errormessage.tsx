/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import InputComponent from "../atom/input";
import LabelComponent from "../atom/label";

type LabeledInputWithErrorMessageProps = {
  label: string;
  errorMessage?: string;
  placeholder: string;
  register: any;
  registerName: string;
};

export default function LabeledInputWithErrorMessageComponent({
  label,
  errorMessage,
  placeholder,
  register,
  registerName,
}: LabeledInputWithErrorMessageProps) {
  return (
    <>
      <div css={style.flex}>
        <LabelComponent label={label} errorMessage={errorMessage}>
          <InputComponent
            placeholder={placeholder}
            register={register}
            name={registerName}
          />
        </LabelComponent>
      </div>
    </>
  );
}

const style = {
  flex: css`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 80%;
    margin-top: 10px;
  `,
};
