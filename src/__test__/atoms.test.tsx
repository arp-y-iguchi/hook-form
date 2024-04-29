import { render, screen } from "@testing-library/react";
import ButtonComponent from "../component/atom/button";
import userEvent from "@testing-library/user-event";
import ErrorMessageComponent from "../component/atom/error_message";

describe("atom", () => {
  test("buttonComponent 存在する", () => {
    const onClick = jest.fn();

    render(<ButtonComponent onClick={onClick}>ボタン</ButtonComponent>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("buttonComponent 押せる", () => {
    const onClick = jest.fn();

    render(<ButtonComponent onClick={onClick}>ボタン</ButtonComponent>);
    userEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalled();
  });
  test("errorMessage 存在する", () => {
    render(
      <ErrorMessageComponent errorMessage="エラーメッセージ" id={"error"} />
    );
    expect(screen.getByText("エラーメッセージ")).toBeInTheDocument();
  });
  test("errorMessage 存在しない", () => {
    render(<ErrorMessageComponent id={"error"} />);
    expect(screen.queryByText("エラーメッセージ")).not.toBeInTheDocument();
  });
});
