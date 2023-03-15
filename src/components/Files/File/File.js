import element from "../../../assets/executable_gear-0.png";
import useAuth from "../../../hooks/useAuth";
import style from "../File/File.module.css";



const File = (props) => {
 
  const [auth] = useAuth()
  return (
    <div className={`${style.element}`}>
      <div className="container text-center">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <img className="img-fluid" src={props.src} alt={props.shortname} />
            <div className="text-center mt-2">
              <button>
                <a href={props.src}>download</a>
              </button>
              {props.userId === auth.userId && (
  <button onClick={() => props.delete(props.name)}>delete</button>
)}
            {console.log(auth.userId)}
            {console.log(props.id)}

            </div>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </div>
  );
};

export default File;
