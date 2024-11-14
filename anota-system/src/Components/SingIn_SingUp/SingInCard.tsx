import React from "react";
import TextField from "@mui/material/TextField";
import { Button, FormControl, FormLabel } from "@mui/material";
import { colors } from "../../constants/Colors";
import Logo from "../../images/logo_anota.svg";
import { CardComponent } from "../card/Card";

const SignIn = (props: { disableCustomTheme?: boolean }) => {
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
          Entrar
        </Button>
      </CardComponent>
    </div>
  );
};

export default SignIn;
