import React, { useState } from "react";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Logo from "../../images/logo_anota.svg";
import { colors } from "../../constants/Colors";
import { CardComponent } from "../../Components/card/Card";
import { CompanyFormType } from "../../types/generalTypes";
import { createCompany } from "../../api/CompanyAPI";
import ConfirmationModal from "../../Components/confirmationModal/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignUp = () => {
  const [companyForm, setCompanyForm] = useState<CompanyFormType>({
    user: "",
    email: "",
    name: "",
    pass: "",
    pathRouteKey: "",
    primaryColor: "",
    secondaryColor: "",
  });
  const [confirmPass, setConfirmPass] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [activeField, setActiveField] = useState<string>("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyForm({ ...companyForm, [name]: value });
    setFieldErrors((prev) => ({
      ...prev,
      [name]: value ? "" : "Campo obrigatório.",
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFieldErrors((prev) => ({
      ...prev,
      [name]: value ? "" : "Campo obrigatório.",
    }));
    setActiveField("");
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setActiveField(e.target.name);
  };

  const handleConfirmPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPass(e.target.value);
    setPasswordError(companyForm.pass !== e.target.value);
    setFieldErrors((prev) => ({
      ...prev,
      confirmPass: e.target.value ? "" : "Campo obrigatório.",
    }));
  };

  const handleSubmit = async () => {
    if (companyForm.pass !== confirmPass) {
      setPasswordError(true);
      return;
    }

    setLoading(true);
    try {
      const isCompanyCreated = await createCompany(companyForm);
      setIsCreated(isCompanyCreated);
    } finally {
      setLoading(false);
    }
  };

  const onCloseConfirmationModal = () => {
    setIsCreated(false);
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardComponent variant="outlined">
        <img
          src={Logo}
          alt="Anota Logo"
          style={{ width: "280px", height: "170px", margin: "0 auto" }}
        />
        <FormControl>
          <FormLabel>Nome da Empresa</FormLabel>
          <TextField
            id="empresa"
            type="text"
            name="name"
            placeholder="Digite o nome da sua empresa"
            required
            fullWidth
            variant="outlined"
            value={companyForm.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            error={!!fieldErrors.name}
            helperText={fieldErrors.name}
            sx={{
              borderColor: activeField === "name" ? colors.blue : undefined,
              boxShadow:
                activeField === "name"
                  ? `0 0 0 2px ${colors.blue}33`
                  : undefined,
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Insira o Login</FormLabel>
          <TextField
            id="user"
            type="text"
            name="user"
            placeholder="Digite seu login"
            required
            fullWidth
            variant="outlined"
            value={companyForm.user}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            error={!!fieldErrors.user}
            helperText={fieldErrors.user}
            sx={{
              borderColor: activeField === "user" ? colors.blue : undefined,
              boxShadow:
                activeField === "user"
                  ? `0 0 0 2px ${colors.blue}33`
                  : undefined,
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <TextField
            id="email"
            type="email"
            name="email"
            placeholder="Digite seu email"
            autoComplete="email"
            required
            fullWidth
            variant="outlined"
            value={companyForm.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
            sx={{
              borderColor: activeField === "email" ? colors.blue : undefined,
              boxShadow:
                activeField === "email"
                  ? `0 0 0 2px ${colors.blue}33`
                  : undefined,
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Senha</FormLabel>
          <TextField
            id="senha"
            type={showPass ? "text" : "password"}
            name="pass"
            placeholder="Sua senha aqui"
            required
            fullWidth
            variant="outlined"
            value={companyForm.pass}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            error={!!fieldErrors.pass}
            helperText={fieldErrors.pass}
            sx={{
              borderColor: activeField === "pass" ? colors.blue : undefined,
              boxShadow:
                activeField === "pass"
                  ? `0 0 0 2px ${colors.blue}33`
                  : undefined,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPass((show) => !show)}
                    edge="end"
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Confirme a Senha</FormLabel>
          <TextField
            id="confirm-senha"
            type={showConfirmPass ? "text" : "password"}
            placeholder="Confirme sua senha"
            required
            fullWidth
            variant="outlined"
            value={confirmPass}
            onChange={handleConfirmPassChange}
            onBlur={handleBlur}
            onFocus={() => setActiveField("confirmPass")}
            error={passwordError || !!fieldErrors.confirmPass}
            helperText={
              passwordError
                ? "As senhas não coincidem."
                : fieldErrors.confirmPass
            }
            sx={{
              borderColor:
                activeField === "confirmPass" ? colors.blue : undefined,
              boxShadow:
                activeField === "confirmPass"
                  ? `0 0 0 2px ${colors.blue}33`
                  : undefined,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPass((show) => !show)}
                    edge="end"
                  >
                    {showConfirmPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            background: colors.blue,
            "&.Mui-disabled": {
              background: colors.blue,
              color: "#ffffff",
              opacity: 0.8,
            },
            fontWeight: 550,
            animation: isCreated ? "pulse 0.5s" : undefined,
          }}
          onClick={handleSubmit}
          disabled={
            loading ||
            passwordError ||
            !companyForm.user ||
            !companyForm.email ||
            !companyForm.pass ||
            !confirmPass ||
            Object.values(fieldErrors).some((v) => !!v)
          }
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Criar Empresa"
          )}
        </Button>
        <Button
          fullWidth
          variant="text"
          sx={{ marginTop: 2, color: colors.blue, fontWeight: 550 }}
          onClick={() => navigate("/login")}
        >
          Voltar para Login
        </Button>
      </CardComponent>
      <ConfirmationModal
        open={isCreated}
        closeModal={onCloseConfirmationModal}
        title="Tudo certo!"
        description="Sua conta foi criada com sucesso!"
      />
    </div>
  );
};

export default SignUp;
