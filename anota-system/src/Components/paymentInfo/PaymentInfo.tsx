import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface PaymentInfoProps {
  value: number;
  onPaymentDeclared?: (declared: boolean) => void;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
  value,
  onPaymentDeclared,
}) => {
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [paymentDeclared, setPaymentDeclared] = useState(false);

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText("85982224519");
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 3000);
    } catch (err) {
      console.error("Erro ao copiar: ", err);
    }
  };

  const handlePaymentDeclaration = () => {
    setPaymentDeclared(true);
    onPaymentDeclared?.(true);
  };

  return (
    <>
      <Box
        sx={{
          margin: { xs: "15px 0", md: "20px 0" },
          padding: { xs: "15px", md: "20px" },
          border: "2px solid #e0e0e0",
          borderRadius: "8px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            letterSpacing: "0.2",
            marginBottom: { xs: "10px", md: "12px" },
            color: "#d32f2f",
          }}
          fontSize={{ xs: "15px", md: "16px" }}
        >
          ⚠️ Informações de Pagamento
        </Typography>

        <Typography
          sx={{
            letterSpacing: "0.2",
            marginBottom: { xs: "6px", md: "8px" },
            lineHeight: 1.5,
          }}
          fontSize={{ xs: "13px", md: "14px" }}
          color="#22303E"
        >
          <strong>Importante:</strong> O seu horário só será confirmado após o
          pagamento de <strong>50% do valor total</strong>.
        </Typography>

        <Box sx={{ marginTop: { xs: "12px", md: "15px" } }}>
          <Typography
            sx={{
              fontWeight: 600,
              letterSpacing: "0.2",
              marginBottom: { xs: "6px", md: "8px" },
              color: "#1976d2",
            }}
            fontSize={{ xs: "14px", md: "15px" }}
          >
            💳 Chave PIX:
          </Typography>
          <TextField
            value="85 98222-4519"
            fullWidth
            variant="outlined"
            InputProps={{
              readOnly: true,
              style: {
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "16px",
                color: "#22303E",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copiar chave PIX">
                    <IconButton
                      onClick={copyPixKey}
                      sx={{
                        color: "#1976d2",
                        "&:hover": {
                          backgroundColor: "rgba(25, 118, 210, 0.1)",
                        },
                      }}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fff",
                fontSize: { xs: "14px", md: "16px" },
                "& fieldset": {
                  borderColor: "#ddd",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                },
              },
            }}
          />
          <Typography
            sx={{
              fontWeight: 500,
              letterSpacing: "0.2",
              marginTop: { xs: "3px", md: "4px" },
              fontSize: { xs: "12px", md: "13px" },
              color: "#666",
            }}
          >
            Pedro Ícaro Lima da Fontoura - Mercado Pago
          </Typography>
        </Box>

        <Typography
          sx={{
            letterSpacing: "0.2",
            marginTop: { xs: "10px", md: "12px" },
            fontSize: { xs: "12px", md: "13px" },
            color: "#666",
            fontStyle: "italic",
          }}
        >
          Após o pagamento, sua reserva será confirmada.
        </Typography>

        <Box
          sx={{ marginTop: { xs: "15px", md: "20px" }, textAlign: "center" }}
        >
          {!paymentDeclared ? (
            <Button
              variant="contained"
              onClick={handlePaymentDeclaration}
              startIcon={<CheckCircleIcon />}
              sx={{
                backgroundColor: "#4caf50",
                color: "white",
                fontWeight: 600,
                padding: { xs: "8px 16px", md: "10px 24px" },
                fontSize: { xs: "13px", md: "14px" },
                "&:hover": {
                  backgroundColor: "#45a049",
                },
              }}
            >
              Declarar Pagamento Realizado
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 0.5, md: 1 },
                padding: { xs: "8px", md: "10px" },
                backgroundColor: "#e8f5e8",
                borderRadius: "8px",
                border: "1px solid #4caf50",
              }}
            >
              <CheckCircleIcon
                sx={{ color: "#4caf50", fontSize: { xs: "20px", md: "24px" } }}
              />
              <Typography
                sx={{
                  color: "#4caf50",
                  fontWeight: 600,
                  fontSize: { xs: "13px", md: "14px" },
                }}
              >
                Pagamento Declarado ✓
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Snackbar
        open={showCopySuccess}
        autoHideDuration={3000}
        onClose={() => setShowCopySuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowCopySuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Chave PIX copiada com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
};

export default PaymentInfo;
