import React, { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";
import IAlert from "../../models/IAlert";

interface Props {
  alert?: IAlert;
}

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alert }: Props = alertContext;

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
