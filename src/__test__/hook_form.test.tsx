import { act, render, screen, waitFor } from "@testing-library/react";
import HookFormPage from "../page/hook_form";
import userEvent from "@testing-library/user-event";
import axios from "axios";

const labels = [
  "名前",
  "ユーザーネーム",
  "メールアドレス",
  "パスワード",
  "パスワード確認",
  "郵便番号",
  "都道府県",
  "市区町村",
  "番地",
];

const inputEvent = (label: HTMLElement, value: string) => {
  userEvent.type(label, value);
};

const clickRegisterButton = async () => {
  await userEvent.click(screen.getByRole("button", { name: "登録" }));
};

describe("hookForm", () => {
  test("titleが存在する", () => {
    render(<HookFormPage />);

    expect(screen.getByText("会員登録")).toBeInTheDocument();
  });

  test("各項目が存在する", () => {
    render(<HookFormPage />);

    labels.forEach((text) => {
      expect(screen.getAllByText(text).shift()).toBeInTheDocument();
    });
  });

  test("必須項目未入力時エラーメッセージ", async () => {
    render(<HookFormPage />);
    clickRegisterButton();

    await waitFor(() => {
      expect(screen.getAllByText("入力してください")).toHaveLength(8);
    });
  });

  test("初回レンダリング時はエラーメッセージがでていないこと", () => {
    render(<HookFormPage />);
    expect(screen.queryByText("入力してください")).not.toBeInTheDocument();
  });

  test("メールアドレス 正規表現", async () => {
    render(<HookFormPage />);
    const mailInput = screen.getByPlaceholderText("sample@example.com");
    inputEvent(mailInput, "aaa");
    clickRegisterButton();

    await waitFor(() => {
      expect(
        screen.getByText("正しいメールアドレスを入力してください")
      ).toBeInTheDocument();
    });
  });
  test("パスワード 正規表現", async () => {
    render(<HookFormPage />);
    const passwordInput = screen.getByPlaceholderText("パスワード");
    inputEvent(passwordInput, "123");
    clickRegisterButton();

    await waitFor(() => {
      expect(
        screen.getByText("4文字以上で入力してください")
      ).toBeInTheDocument();
    });
  });

  test("パスワード確認 バリデーション", async () => {
    render(<HookFormPage />);
    const passwordInput = screen.getByPlaceholderText("パスワード");
    const checkPasswordInput = screen.getByPlaceholderText("パスワード確認");
    inputEvent(passwordInput, "1234");
    inputEvent(checkPasswordInput, "5678");
    clickRegisterButton();

    await waitFor(() => {
      expect(screen.getByText("パスワードが一致しません")).toBeInTheDocument();
    });
  });

  test("郵便番号 正規表現", async () => {
    render(<HookFormPage />);
    const postCodeInput = screen.getByPlaceholderText("0123456");
    inputEvent(postCodeInput, "123");
    clickRegisterButton();

    await waitFor(() => {
      expect(
        screen.getByText("ハイフン無しの半角数字7桁を入力してください")
      ).toBeInTheDocument();
    });
  });

  test("郵便番号 初期状態はボタンが非活性", async () => {
    render(<HookFormPage />);
    expect(screen.getByRole("button", { name: "検索" })).toBeDisabled();
  });

  test("郵便番号を押下し、関数が動いている", async () => {
    jest.mock("../hooks/hook_form_service", () => ({
      default: () => ({
        register: jest.fn(),
        onSubmit: jest.fn(),
        errors: {},
        watch: jest.fn(),
        handleSubmit: jest.fn(),
        handleKeyDown: jest.fn(),
        getAddressFromZipCode: jest.fn(),
      }),
    }));

    const results = {
      results: [
        { address1: "北海道", address2: "美唄市", address3: "上美唄町協和" },
      ],
    };

    axios.get = jest.fn().mockResolvedValue({ data: results });

    render(<HookFormPage />);
    const searchButton = screen.getByRole("button", { name: "検索" });
    const postCodeInput = screen.getByPlaceholderText("0123456");
    inputEvent(postCodeInput, "0123456");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      userEvent.click(searchButton);
      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
    });
  });

  test("すべての必須項目を入力し、登録ボタンを押下", async () => {
    global.console.log = jest.fn();
    render(<HookFormPage />);

    const nameInput = screen.getByPlaceholderText("お名前");
    const mailInput = screen.getByPlaceholderText("sample@example.com");
    const passwordInput = screen.getByPlaceholderText("パスワード");
    const checkPasswordInput = screen.getByPlaceholderText("パスワード確認");
    const postCodeInput = screen.getByPlaceholderText("0123456");
    const prefecturesInput = screen.getByPlaceholderText("都道府県");
    const municipalitiesInput = screen.getByPlaceholderText("市区町村");
    const streetAddressInput = screen.getByPlaceholderText("番地");

    inputEvent(nameInput, "お名前");
    inputEvent(mailInput, "sample@example.com");
    inputEvent(passwordInput, "1234");
    inputEvent(checkPasswordInput, "1234");
    inputEvent(postCodeInput, "0123546");
    inputEvent(prefecturesInput, "北海道");
    inputEvent(municipalitiesInput, "美唄市");
    inputEvent(streetAddressInput, "上美唄町協和");
    clickRegisterButton();

    expect(global.console.log).toHaveBeenCalledTimes(1);
  });
});
