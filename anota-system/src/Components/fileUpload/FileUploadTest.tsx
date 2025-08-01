import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import FileUpload from "./FileUpload";
import { uploadCompanyLogo } from "../../utils/firebaseStorage";
import { getCompanyData } from "../../utils/generalUtil";

const FileUploadTest = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const companyData = getCompanyData();
      const url = await uploadCompanyLogo(
        selectedFile,
        companyData.companyId || 0
      );
      setUploadedUrl(url);
      console.log("Upload realizado com sucesso:", url);
    } catch (error) {
      console.error("Erro no upload:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Teste de Upload de Logo
      </Typography>

      <FileUpload
        onFileSelect={handleFileSelect}
        onError={(message) => console.error(message)}
        loading={uploading}
        currentImageUrl={previewUrl || uploadedUrl}
        accept="image/*"
        maxSize={5}
      />

      {selectedFile && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2">
            Arquivo selecionado: {selectedFile.name} (
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </Typography>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={uploading}
            sx={{ marginTop: 1 }}
          >
            {uploading ? "Fazendo upload..." : "Fazer Upload"}
          </Button>
        </Box>
      )}

      {uploadedUrl && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" gutterBottom>
            URL do upload:
          </Typography>
          <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
            {uploadedUrl}
          </Typography>
        </Box>
      )}

      {previewUrl && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" gutterBottom>
            Preview (URL temporária):
          </Typography>
          <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
            {previewUrl}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FileUploadTest;
