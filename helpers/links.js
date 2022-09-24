import copy from "copy-to-clipboard";
import * as alerts from "./alerts";

export const getLinks = async (token, setLinks) => {
  const res = await fetch("http://localhost:3001/link", {
    method: "GET",
    headers: { token },
  });
  const data = await res.json();
  setLinks(data);
};

export const deleteLink = async (
  token,
  id,
  setChangeStateLinks,
  changeStateLinks
) => {
  const { isConfirmed } = await alerts.alertDeleteLink();
  if (!isConfirmed) return;

  const res = await fetch(`http://localhost:3001/link/delete/${id}`, {
    method: "DELETE",
    headers: { token },
  });
  const data = await res.json();
  if (data.error) return alerts.alertError(data.msg);
  setChangeStateLinks(!changeStateLinks);
  alerts.tempSuccessAlert(data.msg, 1000);
};

export const handleCopyUrl = (url) => {
  const copied = copy(url);
  if (copied) {
    alerts.tempSuccessAlert(`${url} copied!`, 1000);
  } else {
    alerts.tempErrorAlert("Failed to copy", 1000);
  }
};
