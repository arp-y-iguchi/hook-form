/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function Title() {
  return (
    <>
      <h2 css={titleStyle}>会員登録</h2>
    </>
  );
}

const titleStyle = css`
  margin: 5px auto;
  width: 80%;
`;
