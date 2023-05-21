import axios from "axios";
import { ref } from "vue";
import store from "./stores/store.js";
import router from "../router/index.js";
import { get } from "./request.js";
import { SendWarningMessage } from "./message.js";

export function GetNotice() {
  const rs = ref("");
  axios({
    method: "get",
    url: "https://api.locyanfrp.cn/App",
  }).then((res) => {
    rs.value = res.data;
  });
  return rs;
}

export function GetLoginStatus(username, token) {
  const rs = get(
    "https://api.locyanfrp.cn/Account/info?username=" +
      username +
      "&token=" +
      token,
    []
  );
  const return_res = ref("");
  rs.then((res) => {
    if (res.status !== 0) {
      SendWarningMessage("登录过期或未登录，请使用LCF账户登录后台！");
      Logout();
    } else {
      return_res.value = res;
      return return_res;
    }
  });
  return return_res;
}

export function GetProxies(username, token) {
  const rs = get(
    "https://api.locyanfrp.cn/Proxies/GetProxiesList?username=" +
      username +
      "&token=" +
      token,
    []
  );
  rs.then((res) => {
    if (res.status !== 0) {
      return res;
    } else {
      localStorage.setItem("proxies", res.count);
      return res.proxies;
    }
  });
}

export function Logout() {
  store.commit("delToken");
  store.commit("delUserInfo");
  router.push("/login");
}
