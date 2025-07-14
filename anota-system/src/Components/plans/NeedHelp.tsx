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
              fontWeight: 600,
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
          title="Como eu pago pela assinatura do Anota Reservas?"
          description="Você pode pagar sua mensalidade via Cartão de Crédito ou Pix, com total segurança. A cobrança é recorrente para sua comodidade."
        />
        <br />
        <MoreInfo
          title="Como funciona o agendamento online?"
          description="Os clientes acessam seu link personalizado, escolhem a data e horário disponíveis e confirmam a reserva em poucos cliques. Tudo de forma automatizada e sem complicação."
        />
        <br />
        <MoreInfo
          title="Meu cliente precisa pagar online para fazer a reserva?"
          description="Não. Pensamos em um modelo simples para não criar barreiras. Seu cliente agenda de graça e o acerto é feito diretamente com você no local. Com um clique, você pode marcar a reserva como 'Paga' no sistema para seu controle."
        />
      </Box>
    </section>
  );
};

export default NeedHelp;
