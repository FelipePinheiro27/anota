import React, { useState, useRef } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { colors } from "../../constants/Colors";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onError: (message: string) => void;
  loading?: boolean;
  currentImageUrl?: string;
  accept?: string;
  maxSize?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  onError,
  loading = false,
  currentImageUrl,
  accept = "image/*",
  maxSize = 5,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      onError("Por favor, selecione apenas arquivos de imagem.");
      return;
    }

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSize) {
      onError(`O arquivo deve ter no máximo ${maxSize}MB.`);
      return;
    }

    onFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInput}
        style={{ display: "none" }}
      />

      <Box
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          border: `2px dashed ${dragActive ? colors.blue : "#ccc"}`,
          borderRadius: "8px",
          padding: "32px 16px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: dragActive ? "#f0f8ff" : "#fafafa",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: colors.blue,
            backgroundColor: "#f0f8ff",
          },
        }}
      >
        {currentImageUrl ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
              }}
            >
              <img
                src={currentImageUrl}
                alt="Logo da empresa"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  console.error("Erro ao carregar imagem:", e);
                }}
              />
            </Box>
            <Typography variant="body2" color="textSecondary">
              Clique para alterar o logo
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                backgroundColor: colors.blue,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "24px",
              }}
            >
              📁
            </Box>
            <Typography variant="h6" color="textPrimary">
              {loading
                ? "Fazendo upload..."
                : "Clique ou arraste o logo da empresa"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              PNG, JPG ou JPEG (máx. {maxSize}MB)
            </Typography>
            {loading && <CircularProgress size={24} />}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FileUpload;
