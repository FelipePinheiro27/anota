import React from "react";
import { Box } from "@mui/material";
import MoreInfo from "../../Components/moreInfo/MoreInfo";
import useIsMobile from "../../hooks/useIsMobile";

const NeedHelp = () => {
  const isMobile = useIsMobile();

  return (
    <section
      aria-label="Seção de Perguntas Frequentes"
      style={{
        padding: isMobile ? "20px 10px" : "50px 120px",
        margin: "0 auto",
        maxWidth: isMobile ? "100%" : "1090px",
        color: "#22303E",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          padding: isMobile ? "0 10px" : "0",
        }}
      >
        <Box width={isMobile ? "100%" : "65%"}>
          <h2
            style={{
              letterSpacing: "0.1px",
              fontWeight: 500,
              lineHeight: 1.1,
              fontSize: isMobile ? "32px" : "60px",
              fontFamily: "sans-serif",
            }}
          >
            Ficou alguma dúvida?
          </h2>
          <p
            style={{
              letterSpacing: "0.1px",
              color: "#6B7280",
              fontWeight: 400,
              lineHeight: 1.3,
              fontSize: isMobile ? "18px" : "26px",
              fontFamily: "sans-serif",
            }}
          >
            Aqui estão as respostas para suas principais perguntas
          </p>
        </Box>
      </Box>
      <Box marginTop={isMobile ? "20px" : "40px"}>
        <MoreInfo
          title="Como funciona?"
          description="Nosso sistema permite que você gerencie reservas de forma simples e eficiente. Cadastre-se, configure suas quadras com horários de funcionamento e valores para cada dia da semana e compartilhe seu link personalizado com seus clientes."
        />
        <br />
        <MoreInfo
          title="Quais as formas de pagamento?"
          description="Aceitamos pagamentos via cartão de crédito e Pix. Você pode escolher a melhor opção para você."
        />
        <br />
        <MoreInfo
          title="Como funciona o agendamento online?"
          description="Os clientes acessam seu link personalizado, escolhem a data e horário disponíveis e confirmam a reserva em poucos cliques. Tudo de forma automatizada e sem complicação."
        />
        <br />
        <MoreInfo
          title="A Anota Reservas é confiável?"
          description="Sim! Utilizamos tecnologia segura para garantir a proteção dos seus dados e das reservas dos seus clientes. Além disso, já ajudamos diversas empresas a simplificar sua gestão."
        />
      </Box>
    </section>
  );
};

export default NeedHelp;
