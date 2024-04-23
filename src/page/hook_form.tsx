/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ButtonComponent from "../component/atom/button";
import Title from "../component/atom/title";
import HookFormService from "../hooks/hook_form_service";
import LabeledInputWithErrorMessageComponent from "../component/molecules/labeled_input_with_errormessage";
import PostCodeComponent from "../component/organisms/post_code";
import { mapRegisterChange } from "../constants/mapRegisterChange";

export default function HookFormPage() {
  const {
    register,
    onSubmit,
    errors,
    watch,
    handleSubmit,
    handleKeyDown,
    getAddressFromZipCode,
  } = HookFormService();

  const firstItem = [
    {
      label: "名前",
      placeholder: "お名前",
      registerName: "name",
      errors: errors.name,
    },
    {
      label: "ユーザーネーム",
      placeholder: "ユーザーネーム(任意)",
      registerName: "userName",
      errors: errors.userName,
    },
    {
      label: "メールアドレス",
      placeholder: "sample@example.com",
      registerName: "mail",
      errors: errors.mail,
    },
    {
      label: "パスワード",
      placeholder: "パスワード",
      registerName: "password",
      errors: errors.password,
    },
    {
      label: "パスワード確認",
      placeholder: "パスワード確認",
      registerName: "checkPassword",
      errors: errors.checkPassword,
    },
  ];

  const secondItem = [
    {
      label: "都道府県",
      placeholder: "都道府県",
      registerName: "prefectures",
      errors: errors.prefectures,
    },
    {
      label: "市区町村",
      placeholder: "市区町村",
      registerName: "municipalities",
      errors: errors.municipalities,
    },
    {
      label: "番地",
      placeholder: "番地",
      registerName: "streetAddress",
      errors: errors.streetAddress,
    },
  ];

  const postCodeValue = String(watch("postCode"));

  return (
    <>
      <Title />
      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
        {firstItem.map((item, index) => (
          <LabeledInputWithErrorMessageComponent
            label={item.label}
            placeholder={item.placeholder}
            key={index}
            errorMessage={
              item.errors &&
              errors[mapRegisterChange(item.registerName)]?.message
            }
            register={register}
            registerName={item.registerName}
          />
        ))}

        <PostCodeComponent
          onClick={getAddressFromZipCode}
          register={register}
          registerName={"postCode"}
          errorMessage={errors.postCode && errors.postCode?.message}
          disabled={
            postCodeValue.length === 9 || errors.postCode !== undefined
              ? true
              : false
          }
        />

        {secondItem.map((item, index) => (
          <LabeledInputWithErrorMessageComponent
            label={item.label}
            placeholder={item.placeholder}
            key={index}
            errorMessage={item.errors && errors.name?.message}
            register={register}
            registerName={item.registerName}
          />
        ))}

        <div css={style.registerButtonContainer}>
          <ButtonComponent onClick={(event) => onSubmit(event as any)} register>
            登録
          </ButtonComponent>
        </div>
      </form>
    </>
  );
}

const style = {
  registerButtonContainer: css`
    width: 80%;
    margin: 0 auto;
    display: flex;
    align-items: center;
  `,
};
