import element from "../../../assets/executable_gear-0.png";
import useAuth from "../../../hooks/useAuth";
import Pagination from "../../Pagination/Pagination";
import style from "../File/File.module.css";
import notfound from "../../../assets/notfound.png";

const File = (props) => {
  const fileext = [
    "mp4",
    "pdf",
    "txt",
    "mp3",
    "doc",
    "exe",
    "rar",
    "ppt",
    "gif",
    "xls",
  ];

  const [auth] = useAuth();
  return (
    <div className={`${style.element}`}>
      <div className="container text-center">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <img
              className="img-fluid"
              src={
                fileext.includes(props.shortname.slice(-3))
                  ? notfound
                  : props.src
              }
            />
            <h3 className="mt-2">{props.shortname}</h3>
            <div className="text-center mt-2">
              <button className="mx-1">
                <a href={props.url}>download</a>
                {console.log(props.shortname.slice(-3))}
              </button>
              {props.userId === auth.userId && (
                <button onClick={() => props.delete(props.name)}>delete</button>
              )}
            </div>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </div>
  );
};

export default File;
