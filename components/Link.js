import style from "./Link.module.css";
import * as helperLinks from "../helpers/links";
import { AiFillDelete, AiOutlineCopy } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

export default function Link(props) {
  return (
    <div className={style.linksContainer}>
      {props.links.map((e) => (
        <span key={e.id} className={style.link}>
          {e.link}
          <AiOutlineCopy
            title="Copy URL"
            className={style.btnCopy}
            onClick={() => helperLinks.handleCopyUrl(e.link)}
          />
          <BiEdit
            className={style.btnEdit}
            title="Edit URL"
            onClick={() => props.handleShowUpdateLink(e.id)}
          />
          <AiFillDelete
            className={style.btnDelete}
            title="Delete URL"
            onClick={() =>
              helperLinks.deleteLink(
                props.token,
                e.id,
                props.setChangeStateLinks,
                props.changeStateLinks
              )
            }
          />
        </span>
      ))}
    </div>
  );
}
