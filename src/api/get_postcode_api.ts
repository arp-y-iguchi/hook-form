import axios from "axios";
import { response } from "../types/api";

const Url = "https://zipcloud.ibsnet.co.jp/api/search?zipcode=";

export const getAddress = async (zipCode: string) =>
  await axios.get<response>(Url + zipCode);
