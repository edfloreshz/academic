import axios from "axios";
import Swal from "sweetalert2";

export const APIUri = (process.env.NODE_ENV !== "development") ? "http://45.79.81.186:8080/api" : "https://localhost:5000/api";

export enum RequestType {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
}

export async function send<T>(
    method: RequestType,
    controller: string,
    data?: any | null,
    parameter?: any,
    filters?: string,
    handle?: () => void,
    skipAlert?: boolean
): Promise<T> {
    let response = await axios.request({
        url: `${APIUri}/${controller}${parameter ? `/${parameter}` : ""}${
            filters ? `/${filters}` : ""
        }`,
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*"
        },
        data: data,
    });
    if (!skipAlert) {
      if (method === RequestType.GET) {
        if (response.status !== 200) {
          await Swal.fire({
            title: "Error",
            text: "No se pudieron obtener los datos.",
            icon: "error",
          });
        }
      } else {
        if (
            response.status === 200 ||
            response.status === 201 ||
            response.status === 204
        ) {
          let okay = await Swal.fire({
            title: "Éxito",
            text: "La operación se realizo correctamente.",
            icon: "success",
          });
          if (okay && handle) handle();
        } else if (response.status === 409) {
          await Swal.fire({
            title: "Error",
            text: "El registro ya existe.",
            icon: "error",
          });
        } else {
          let okay = await Swal.fire({
            title: "Error",
            text: "La operación no se realizo correctamente.",
            icon: "error",
          });
          if (okay && handle) handle();
        }
      }
    }
    return response.data;
}
