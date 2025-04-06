"use client";

import { useRouter } from "next/navigation";
import styled, { useTheme } from "styled-components";
import { API_URL } from "@/app/utils/settings";

import ReviewCard from "@/app/ui/cards/ReviewCard";
import Button from "@/app/ui/essentials/Button";
import { FlexContainer } from "@/app/ui/essentials/FlexBox";
import Paragraph from "@/app/ui/essentials/Paragraph";
import Header from "@/app/ui/utilities/Header";
import Title from "@/app/ui/essentials/Title";

import Location from "/public/img/location-icon.svg";
import Runner from "/public/img/runner-icon.svg";
import React, { useState, useEffect, use } from "react";
import OfferCard from "@/app/ui/cards/OfferCard";
import LoadingSpinner from "@/app/ui/essentials/Loader";
import { fetchWithAuth } from "@/app/utils/fetchWithAuth";

const PageContainer = styled.div`
  padding: 20px;
  padding-top: 0;
`;

const Icon = styled.svg`
  width: ${(props) => props.width || "14px"};
  height: auto;
  path {
    fill: ${(props) => props.color || props.theme.colors.foreground};
  }
`;

const titleSize = "24px";
const titleWeight = "500";

export default function Mandadito({ params }) {
  const { id } = React.use(params);
  const [mandadito, setMandadito] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const theme = useTheme();
  const router = useRouter();

  /* Trae el token del LS */
  useEffect(() => {
    const tk = localStorage.getItem("token");
    setToken(tk);

    if (!tk) {
      router.push("/login");
    }
  }, []);

  function formatTimeToAMPM(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-HN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
  

  /* Trae el mandadito */
  useEffect(() => {
    if (!id || !token) return;

    const getMandadito = async () => {
      try {
        const data = await fetchMandadito(id);

        const runnerRating = data.ratings?.find(
          (rating) => rating.isRunner === true
        );
        const createdAt = new Date(data.offer.createdAt);
        const datePosted = runnerRating?.datePosted
          ? new Date(runnerRating.datePosted)
          : null;

        setMandadito({
          id: data.id,
          pickupLocation: data.post.pickupLocation,
          deliveryLocation: data.post.deliveryLocation,
          description: data.post.description,
          acceptedAt: createdAt.toISOString().split("T")[0],
          offer: {
            priceOffered: data.offer.counterOfferAmount,
            hour: formatTimeToAMPM(data.offer.createdAt),
          },
          suggestedValue: data.offer.counterOfferAmount,
          runner: data.offer?.userCreator
            ? {
                id: data.offer.userCreator.id,
                name: data.offer.userCreator.name,
                stars: data.offer.userCreator.rating,
                image: data.offer.userCreator.profilePicture,
                location:
                  data.offer.userCreator.lastLocation ||
                  "Ubicación no disponible",
              }
            : null,
          rating: runnerRating
            ? {
                score: runnerRating.rating,
                review: runnerRating.review,
                datePosted: datePosted?.toISOString().split("T")[0] || null,
              }
            : null,
        });
      } catch (error) {
        setError("Error fetching mandadito: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    getMandadito();
  }, [id, token]);

  const fetchMandadito = async () => {
    try {
      const res = await fetchWithAuth(
        `${API_URL}/api/mandadito/${id}`, 
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        router);
      
      if (!res.success)
        throw new Error("Error fetching mandadito: " + data.message);

      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const {
    pickupLocation,
    deliveryLocation,
    description,
    offer,
    suggestedValue,
    runner,
    rating,
  } = mandadito || {};

  if (error) {
    return (
      <Paragraph
        text={
          "Hubo un error al traer la información, lo sentimos intenta mas tarde"
        }
        color={theme.colors.primary}
      />
    );
  }

  return (
    <>
      <Header text="Tu mandadito" router={router} />

      {loading ? (
        <LoadingSpinner offset="20px" />
      ) : (
        <>
          <PageContainer>
            <FlexContainer direction="column" gap="2rem">
              {/* Detalles de ubicación */}
              <Section title="Detalles">
                <FlexContainer direction="column" gap="12px" className="ml-3">
                  <Detail
                    icon={Location}
                    text={pickupLocation}
                    color={theme.colors.secondaryText}
                  />
                  <Detail
                    icon={Runner}
                    text={deliveryLocation}
                    color={theme.colors.secondaryText}
                  />
                </FlexContainer>
              </Section>

              {/* Descripción del mandadito */}
              <Section title="Descripción">
                <Paragraph
                  text={description}
                  weight={400}
                  color={theme.colors.secondaryText}
                  className="ml-3"
                />
              </Section>

              {/* Tarifas */}
              <Section title="Tarifa indicada">
                <Paragraph
                  text={"L. " + suggestedValue}
                  weight={400}
                  color={theme.colors.secondaryText}
                  className="ml-3"
                />
              </Section>

              {/* Información del usuario que acepto */}
              <Section title="Oferta aceptada">
                <OfferCard
                  postUser={runner}
                  offerInfo={offer}
                  priceSuggested={suggestedValue}
                />
              </Section>

              {/* Comentario sobre la calificación */}
              <Section title="Calificación">
                <ReviewCard
                  postUser={runner}
                  coment={rating.review}
                  comentDate={rating.datePosted}
                  score={rating.score}
                />
              </Section>

              {/* Botón de acción */}
              <Button
                text="Aceptar"
                width="75%"
                borderRadius="6px"
                paddingx="60px"
                paddingy="8px"
                className="mx-auto"
                onClick={() => router.push("/dashboard/mandaditos/history")}
              />
            </FlexContainer>
          </PageContainer>
        </>
      )}
    </>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <Title
        text={title}
        size={titleSize}
        weight={titleWeight}
        className="mb-2"
      />
      {children}
    </div>
  );
}

function Detail({ icon, text, color }) {
  return (
    <FlexContainer gap="20px">
      <Icon as={icon} />
      <Paragraph text={text} weight={400} color={color} />
    </FlexContainer>
  );
}
