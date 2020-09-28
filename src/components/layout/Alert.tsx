import React from "react";
import IAlert from "../../models/IAlert";

interface Props {
  alert?: IAlert;
}

const Alert = (props: Props) => {
  const alert = props.alert;
  return (
    <div>
      {alert !== undefined && (
        <div className={`alert alert-${alert.type}`}>
          <i className="fas fa-info-circle" /> {alert.text}
        </div>
      )}
    </div>
  );
};

export default Alert;
