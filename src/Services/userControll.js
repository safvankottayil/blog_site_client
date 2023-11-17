import { instance } from "../Axios/UserAxios";

export async function POST(url, obj) {
  return (await instance.post(url, obj,{headers:{'Content-Type':'multipart/form-data'}})).data;
}

export async function PATCH(url, obj) {
  return (await instance.patch(url, obj,{headers:{"Content-Type":'multipart/form-data'}})).data;
}
export async function GET(url, obj) {
  return (await instance.get(url+`/${obj?obj:''`},{headers:{'Cache-Control': 'max-age=3600'}})).data;
}
