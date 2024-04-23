import { useForm } from "react-hook-form";
import { hookFormType } from "../model/hook_form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAddress } from "../api/get_postcode_api";
import { response } from "../types/api";

const mailRegex = new RegExp(
  "^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*.)+[a-zA-Z]{2,}$"
);
const postCodeRegex = /^\d{7}$/;

const hookFormSchema = z
  .object({
    name: z.string().min(1, { message: "入力してください" }),
    userName: z.string(),
    mail: z
      .string()
      .min(1, { message: "入力してください" })
      .regex(mailRegex, "正しいメールアドレスを入力してください"),
    password: z
      .string()
      .min(1, { message: "入力してください" })
      .min(4, { message: "4文字以上で入力してください" }),
    checkPassword: z.string().min(1, { message: "入力してください" }),
    postCode: z
      .string()
      .min(1, { message: "入力してください" })
      .regex(postCodeRegex, "ハイフン無しの半角数字7桁を入力してください"),

    prefectures: z.string().min(1, { message: "入力してください" }),
    municipalities: z.string().min(1, { message: "入力してください" }),
    streetAddress: z.string().min(1, { message: "入力してください" }),
  })
  .refine((data) => data.password === data.checkPassword, {
    message: "パスワードが一致しません",
    path: ["checkPassword"],
  });

export default function HookFormService() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    setError,
    setValue,
  } = useForm<hookFormType>({
    resolver: zodResolver(hookFormSchema),
    // reValidateMode: "onChange",
  });

  const onSubmit = (data: hookFormType) => {
    console.log(`登録完了${data}`);
  };

  const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const resetErrorMessage = () => {
    clearErrors("postCode");
    clearErrors("prefectures");
    clearErrors("municipalities");
    clearErrors("streetAddress");
  };

  const getAddressFromZipCode = async (): Promise<response> => {
    const zipCode = String(watch("postCode"));
    try {
      const res = await getAddress(zipCode);
      console.log(res);
      if (!zipCode) {
        setError("postCode", { message: "入力してください" });
        return { status: 200, message: res.data.message, results: null };
      } else if (res.status === 400) {
        setError("postCode", { message: res.data.message });
        return { status: 400, message: res.data.message, results: null };
      } else {
        resetErrorMessage();
        res.data.results &&
          setValue("prefectures", res.data.results[0].address1);
        res.data.results &&
          setValue("municipalities", res.data.results[0].address2);
        res.data.results &&
          setValue("streetAddress", res.data.results[0].address3);

        return res.data;
      }
    } catch (error) {
      setError("postCode", { message: "エラーが発生しました" });
      return { status: 500, message: "エラーが発生しました", results: null };
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    watch,
    onSubmit,
    handleKeyDown,
    getAddressFromZipCode,
  };
}
