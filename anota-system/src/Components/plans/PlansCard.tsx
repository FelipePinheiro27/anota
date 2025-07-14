import React from "react";
import { Box, Typography } from "@mui/material";
import Right from "../../images/right.svg";
import RightWhite from "../../images/rightWhite.svg";

const messageData = [
  "Olá, gostaria de saber mais sobre o plano básico mensal.",
  "Olá, gostaria de saber mais sobre o plano avançado mensal.",
  "Olá, gostaria de saber mais sobre o plano pro mensal.",
];

const messageDataWithPromo = [
  "Olá, gostaria de saber mais sobre o plano básico mensal utilizei o código MNTV10.",
  "Olá, gostaria de saber mais sobre o plano avançado mensal utilizei o código MNTV10.",
  "Olá, gostaria de saber mais sobre o plano pro mensal utilizei o código MNTV10.",
];

interface PlansCardProps {
  hasPromoCod: boolean;
}

const PlansCard = ({ hasPromoCod }: PlansCardProps) => {
  const applyDiscount = (price: number, discount: number) => {
    return (price * (1 - discount) - 0.01).toFixed(2).replace(".", ",");
  };

  const redirectToWhatsApp = (planType: number) => {
    const phone = "5588992429813";
    const message = hasPromoCod
      ? messageDataWithPromo[planType]
      : messageData[planType];
    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/${phone}?text=${encodedMessage}`;
  };

  const plans = [
    {
      name: "Básico",
      description:
        "Perfeito para quem está começando e quer organizar uma única quadra com profissionalismo, saindo do papel.",
      price: 49.9,
      benefits: ["1 quadra cadastrada", "Plataforma personalizada"],
      bgColor: "#fff",
      textColor: "#22303E",
      isPro: false,
      index: 0,
    },
    {
      name: "Avançado",
      description:
        "Ideal para pequenos complexos que precisam gerenciar múltiplos horários e clientes fixos de forma eficiente.",
      price: 69.9,
      benefits: [
        "3 quadras cadastradas",
        "Plataforma personalizada",
        "Agendamento programado",
      ],
      bgColor: "#fff",
      textColor: "#22303E",
      isPro: false,
      index: 1,
    },
    {
      name: "Pro",
      description:
        "A solução completa para negócios com maior volume, que gerenciam várias quadras e precisam de controle total sobre suas operações.",
      price: 149.9,
      benefits: [
        "8 quadras cadastradas",
        "Plataforma personalizada",
        "Agendamento programado",
      ],
      bgColor: "#226FE2",
      textColor: "#fff",
      isPro: true,
      index: 2,
    },
  ];

  const renderDiscountTag = () =>
    hasPromoCod && (
      <Box
        sx={{
          position: "absolute",
          top: "-10px",
          right: "-10px",
          background: "#FF4F4F",
          color: "#fff",
          fontSize: "12px",
          fontWeight: 700,
          padding: "5px 10px",
          borderRadius: "20px",
          zIndex: 1,
        }}
      >
        10% OFF
      </Box>
    );

  return (
    <>
      {plans.map((plan) => {
        const discountedPrice = hasPromoCod
          ? applyDiscount(plan.price, 0.1)
          : plan.price.toFixed(2).replace(".", ",");

        return (
          <Box
            key={plan.name}
            padding="0px 40px"
            width="220px"
            height="517px"
            borderRadius="19px"
            border="1px solid #BCBCBC"
            sx={{ background: plan.bgColor, position: "relative" }}
            color={plan.textColor}
          >
            {hasPromoCod && renderDiscountTag()}

            <Typography
              fontWeight={600}
              fontSize="34px"
              marginTop="40px"
              fontFamily="sans-serif"
            >
              {plan.name}
            </Typography>

            <Typography
              fontFamily="sans-serif"
              fontWeight={300}
              fontSize="14px"
              marginTop="10px"
            >
              {plan.description}
            </Typography>

            <Box display="flex" alignItems="center" marginTop="25px">
              <Typography
                color={plan.isPro ? "#fff" : "#226FE2"}
                fontFamily="sans-serif"
                fontWeight={400}
                fontSize="22px"
              >
                R$
              </Typography>

              <Typography
                color={plan.isPro ? "#fff" : "#226FE2"}
                fontFamily="sans-serif"
                fontWeight={600}
                marginLeft="8px"
                marginTop="-10px"
                fontSize="46px"
              >
                {discountedPrice}
              </Typography>
            </Box>

            {hasPromoCod && (
              <Typography
                fontSize="14px"
                fontFamily="sans-serif"
                color={plan.textColor}
                style={{ textDecoration: "line-through" }}
              >
                De R$ {plan.price.toFixed(2).replace(".", ",")}
              </Typography>
            )}

            <Typography
              color={plan.textColor}
              fontFamily="sans-serif"
              fontWeight={300}
              fontSize="16px"
              marginTop="10px"
            >
              Com 7 dias de teste <strong>grátis</strong>
            </Typography>

            {plan.benefits.map((benefit) => (
              <Box
                key={benefit}
                display="flex"
                alignItems="center"
                gap="8px"
                marginTop="5px"
              >
                <img
                  src={plan.isPro ? RightWhite : Right}
                  alt="Correto"
                  style={{ width: "22px" }}
                />
                <Typography
                  fontFamily="sans-serif"
                  fontWeight={300}
                  fontSize="14px"
                  width="260px"
                >
                  <strong>{benefit}</strong>
                </Typography>
              </Box>
            ))}

            <Box
              display="flex"
              justifyContent="center"
              gap="8px"
              sx={{
                position: "absolute",
                bottom: "40px",
                width: "100%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Box
                sx={{
                  background: plan.isPro
                    ? "#fff"
                    : "linear-gradient(to right, #226FE2, #0033FF)",
                  color: plan.isPro ? "#226FE2" : "#fff",
                  padding: "7px 60px",
                  borderRadius: "43px",
                  cursor: "pointer",
                }}
                onClick={() => redirectToWhatsApp(plan.index)}
              >
                <Typography
                  fontFamily="sans-serif"
                  fontWeight={600}
                  fontSize="14px"
                >
                  Teste grátis
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default PlansCard;
