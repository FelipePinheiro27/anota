import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const uploadFileToFirebase = async (
  file: File,
  path: string
): Promise<string> => {
  try {
    const storageRef = ref(storage, path);

    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Erro ao fazer upload do arquivo:", error);
    throw new Error("Falha ao fazer upload do arquivo");
  }
};

export const uploadCompanyLogo = async (
  file: File,
  companyId: string | number
): Promise<string> => {
  const fileExtension = file.name.split(".").pop();
  const fileName = `${companyId}.${fileExtension}`;
  const path = `logos/${fileName}`;

  return await uploadFileToFirebase(file, path);
};

export const getCompanyLogoUrl = async (
  companyId: string | number,
  fileExtension: string = "png"
): Promise<string | null> => {
  try {
    const fileName = `${companyId}.${fileExtension}`;
    const path = `logos/${fileName}`;
    const storageRef = ref(storage, path);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    const extensions = ["jpg", "jpeg", "gif", "webp"];

    for (const ext of extensions) {
      try {
        const fileName = `${companyId}.${ext}`;
        const path = `logos/${fileName}`;
        const storageRef = ref(storage, path);

        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      } catch (err) {
        continue;
      }
    }

    return null;
  }
};

export const getCompanyLogoByUrl = async (
  logoUrl: string | null,
  companyId: string | number
): Promise<string | null> => {
  if (logoUrl) {
    if (logoUrl.includes("firebase") || logoUrl.includes("googleapis")) {
      return logoUrl;
    }

    try {
      const firebaseUrl = await getCompanyLogoUrl(companyId);
      return firebaseUrl;
    } catch (error) {
      console.log("Erro ao buscar logo do Firebase:", error);
      return logoUrl;
    }
  }

  return await getCompanyLogoUrl(companyId);
};
