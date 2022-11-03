import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({children,allowedRoles}) => { 

  const auth = JSON.parse(localStorage.getItem("bayqi_erp_userloaded"));

  return (auth != null) && ((auth.isAuthenticated === true) && (auth.loading === false) && allowedRoles.includes(auth.roles)) ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRouter;