import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { colors } from "../../constants/Colors";
import Logo from "../../images/logo_anota.svg";
import { CardComponent } from "../../Components/card/Card";
import { login } from "../../api/CompanyAPI";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";

const SignIn = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const onChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  const onChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const onSubmitLogin = async () => {
    if (user === "" || pass === "") {
      setErrorMessage("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    try {
      const response = await login(user, pass);

      if (!response) {
        setErrorMessage("Usuário ou senha inválidos.");
        setLoading(false);
        return;
      } else {
        if (!response.success) {
          setErrorMessage(response.message);
          setLoading(false);

          return;
        }
        localStorage.setItem("userSession", JSON.stringify(response));

        navigate("/empresa");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setErrorMessage("Erro ao tentar realizar o login.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: isMobile ? "" : "100vh",
      }}
    >
      <CardComponent variant="elevation">
        <img
          src={Logo}
          alt="Anota Reservas"
          style={{ width: "280px", height: "200px", margin: "0 auto" }}
        />
        <FormControl>
          <FormLabel>Usuário</FormLabel>
          <TextField
            id="user"
            placeholder="Seu usário ou email"
            onChange={onChangeUser}
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Senha</FormLabel>
          <TextField
            id="senha"
            type="password"
            name="senha"
            placeholder="Sua senha aqui"
            onChange={onChangePass}
            required
            fullWidth
            variant="outlined"
            sx={{ ariaLabel: "senha" }}
          />
        </FormControl>

        {errorMessage && (
          <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
        )}

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
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
            }}
            onClick={onSubmitLogin}
          >
            Entrar
          </Button>
        )}

        <Button
          fullWidth
          variant="text"
          sx={{ marginTop: 2, color: colors.blue, fontWeight: 550 }}
          onClick={() => navigate("/cadastro")}
        >
          Cadastrar Empresa
        </Button>
      </CardComponent>
    </div>
  );
};

export default SignIn;
