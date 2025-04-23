import React from "react";
import { useAlert } from "../Context/AlertContext";

function Alert() {
  const {alert} = useAlert()

  if(!alert) return null
  return (
    
      <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
        <strong>{alert.type.toUpperCase()}</strong>: {alert.message} 
        
        
      </div>
    
  );
}

export default Alert;
