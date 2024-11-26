import { useParams } from "react-router-dom";
import { ClientReservationContext } from "../context/ClientReservationProvider";
import { useContext, useEffect } from "react";

export const useRetrieveCompany = () => {
  const { fetchCompany, company } = useContext(ClientReservationContext) || {};
  const { dynamicPath } = useParams();

  useEffect(() => {
    if (dynamicPath && !company) fetchCompany && fetchCompany(dynamicPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dynamicPath]);
};
