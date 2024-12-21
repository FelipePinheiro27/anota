import React, { useState } from "react";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Logo from "../../images/logo_anota.svg";
import { colors } from "../../constants/Colors";
import { CardComponent } from "../../Components/card/Card";
import { CompanyFormType } from "../../types/generalTypes";
import { createCompany } from "../../api/CompanyAPI";
import ConfirmationModal from "../../Components/confirmationModal/ConfirmationModal";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [companyForm, setCompanyForm] = useState<CompanyFormType>({
    user: "",
    email: "",
    name: "",
    pass: "",
    pathRouteKey: "",
    primaryColor: "",
    secondaryColor: "",
    isPaid: false,
  });
  const [confirmPass, setConfirmPass] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyForm({ ...companyForm, [name]: value });
  };

  const handleConfirmPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPass(e.target.value);
    setPasswordError(companyForm.pass !== e.target.value);
  };

  const handleSubmit = async () => {
    if (companyForm.pass !== confirmPass) {
      setPasswordError(true);
      return;
    }

    const isCompayCreated = await createCompany(companyForm);
    setIsCreated(isCompayCreated);
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
          style={{ width: "170px", height: "170px", margin: "0 auto" }}
        />
        <FormControl>
          <FormLabel>Nome da Empresa</FormLabel>
          <TextField
            id="empresa"
            type="text"
            name="name"
            placeholder="Digite o nome da sua empresa"
            autoFocus
            required
            fullWidth
            variant="outlined"
            value={companyForm.name}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Insira o Login</FormLabel>
          <TextField
            id="empresa"
            type="text"
            name="user"
            placeholder="Digite seu login"
            autoFocus
            required
            fullWidth
            variant="outlined"
            value={companyForm.user}
            onChange={handleInputChange}
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
          />
        </FormControl>
        <FormControl>
          <FormLabel>Senha</FormLabel>
          <TextField
            id="senha"
            type="password"
            name="pass"
            placeholder="Sua senha aqui"
            required
            fullWidth
            variant="outlined"
            value={companyForm.pass}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Confirme a Senha</FormLabel>
          <TextField
            id="confirm-senha"
            type="password"
            placeholder="Confirme sua senha"
            required
            fullWidth
            variant="outlined"
            value={confirmPass}
            onChange={handleConfirmPassChange}
            error={passwordError}
            helperText={passwordError ? "As senhas não coincidem." : ""}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            background: colors.green,
            "&.Mui-disabled": {
              background: colors.green,
              color: "#ffffff",
              opacity: 0.8,
            },
            fontWeight: 550,
          }}
          onClick={handleSubmit}
          disabled={
            passwordError ||
            !companyForm.user ||
            !companyForm.email ||
            !companyForm.pass ||
            !confirmPass
          }
        >
          Criar Empresa
        </Button>
        <Button
          fullWidth
          variant="text"
          sx={{ marginTop: 2, color: colors.green, fontWeight: 550 }}
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
