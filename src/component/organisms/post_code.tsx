/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import InputComponent from "../atom/input";
import LabelComponent from "../atom/label";
import ButtonComponent from "../atom/button";
import { response } from "../../types/api";

type postCodeProps = {
  errorMessage?: string;
  onClick: () => Promise<response>;
  register: any;
  registerName: string;
  disabled?: boolean;
};

export default function PostCodeComponent({
  errorMessage,
  onClick,
  register,
  registerName,
  disabled,
}: postCodeProps) {
  return (
    <>
      <div css={style.postCodeContainer}>
        <LabelComponent label={"郵便番号"} errorMessage={errorMessage}>
          <div>
            <InputComponent
              placeholder={"0123456"}
              postCode
              register={register}
              name={registerName}
            />
            <ButtonComponent onClick={onClick} disabled={disabled}>
              検索
            </ButtonComponent>
          </div>
        </LabelComponent>
      </div>
    </>
  );
}

const style = {
  postCodeContainer: css`
    margin: 0 auto;
    width: 80%;
    margin-top: 10px;
  `,
};
