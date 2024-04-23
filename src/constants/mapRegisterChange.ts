import { hookFormType } from "../model/hook_form";

export const mapRegisterChange = (registerName: string): keyof hookFormType => {
  switch (registerName) {
    case "name":
      return "name";
    case "userName":
      return "userName";
    case "mail":
      return "mail";
    case "password":
      return "password";
    case "checkPassword":
      return "checkPassword";
    case "postCode":
      return "postCode";
    case "prefectures":
      return "prefectures";
    case "municipalities":
      return "municipalities";
    case "streetAddress":
      return "streetAddress";
    default:
      throw new Error("そんなregisterNameはないよ！");
  }
};
