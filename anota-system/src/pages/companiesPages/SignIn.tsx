import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, FormControl, FormLabel } from "@mui/material";
import { colors } from "../../constants/Colors";
import Logo from "../../images/logo_anota.svg";
import { CardComponent } from "../../Components/card/Card";
import { login } from "../../api/CompanyAPI";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  const onChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const onSubmitLogin = async () => {
    try {
      const response = await login(user, pass);

      if (response) {
        localStorage.setItem("userSession", JSON.stringify(response));

        navigate("/empresa");
      } else {
        setErrorMessage("Usuário ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setErrorMessage("Erro ao tentar realizar o login.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CardComponent variant="elevation">
        <img
          src={Logo}
          alt="Anota Reservas"
          style={{ width: "170px", height: "170px", margin: "0 auto" }}
        />
        <FormControl>
          <FormLabel>Usuário</FormLabel>
          <TextField
            id="user"
            placeholder="Seu usário ou email"
            onChange={onChangeUser}
            autoFocus
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
          onClick={onSubmitLogin}
        >
          Entrar
        </Button>
      </CardComponent>
    </div>
  );
};

export default SignIn;
