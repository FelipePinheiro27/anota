import { useState, useEffect } from "react";
import { getCompanyLogoByUrl } from "../utils/firebaseStorage";

export const useCompanyLogo = (companyId: string | number | undefined) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!companyId) {
      setLogoUrl(null);
      return;
    }

    const fetchLogo = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = await getCompanyLogoByUrl(null, companyId);
        setLogoUrl(url);
      } catch (err) {
        setError("Erro ao buscar logo da empresa");
        console.error("Erro ao buscar logo:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();
  }, [companyId]);

  return { logoUrl, loading, error };
};
