import React from "react";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Logo from "../../images/logo_anota.svg";
import { colors } from "../../constants/Colors";
import { CardComponent } from "../../Components/card/Card";

const SignUp = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CardComponent variant="outlined">
        <img
          src={Logo}
          alt="Test"
          style={{ width: "170px", height: "170px", margin: "0 auto" }}
        />
        <FormControl>
          <FormLabel>Nome da Empresa</FormLabel>
          <TextField
            id="empresa"
            type="text"
            name="empresa"
            placeholder="Digite o nome da sua empresa"
            autoFocus
            required
            fullWidth
            variant="outlined"
            sx={{ ariaLabel: "empresa" }}
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
            autoFocus
            required
            fullWidth
            variant="outlined"
            // color={emailError ? "error" : "primary"}
            sx={{ ariaLabel: "email" }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Senha</FormLabel>
          <TextField
            id="senha"
            type="password"
            name="senha"
            placeholder="sua senha aqui"
            autoFocus
            required
            fullWidth
            variant="outlined"
            // color={emailError ? "error" : "primary"}
            sx={{ ariaLabel: "senha" }}
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
          onClick={() => {}}
        >
          Criar Empresa
        </Button>
      </CardComponent>
    </div>
  );
};

export default SignUp;
