import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const alertDeleteLink = async () => {
  return await MySwal.fire({
    icon: "question",
    text: "Are you sure to remove this link?",
    showCancelButton: true,
    cancelButtonColor: "blue",
    confirmButtonText: "Remove",
    confirmButtonColor: "red",
    focusConfirm: true,
  });
};

export const alertError = async (msg) => {
  return await MySwal.fire({
    icon: "error",
    title: "Error!",
    text: msg,
  });
};

export const tempErrorAlert = async (msg, timer) => {
  return await MySwal.fire({
    icon: "error",
    title: "Error!",
    text: msg,
    showConfirmButton: false,
    timer: timer,
  });
};

export const alertSuccess = async (msg) => {
  return await MySwal.fire({
    icon: "success",
    title: "Success!",
    text: msg,
  });
};

export const tempSuccessAlert = async (msg, timer) => {
  return await MySwal.fire({
    icon: "success",
    title: "Success!",
    text: msg,
    showConfirmButton: false,
    timer: timer,
  });
};
