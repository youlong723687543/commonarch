import axios from "./http";
export function login(loginform) {
  return axios.post("/api/login/", loginform, true);
}
export function capcha() {
  return axios.get("/api/capcha");
}
export function getcode(telephone) {
  return axios.post("/api/getcode", telephone, true);
}
