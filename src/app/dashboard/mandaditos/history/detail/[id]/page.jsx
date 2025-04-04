"use client";

import { useRouter } from "next/navigation";
import styled, { useTheme } from "styled-components";

import ReviewCard from "@/app/ui/cards/ReviewCard";
import Button from "@/app/ui/essentials/Button";
import { FlexContainer } from "@/app/ui/essentials/FlexBox";
import Paragraph from "@/app/ui/essentials/Paragraph";
import Header from "@/app/ui/utilities/Header";
import Title from "@/app/ui/essentials/Title";

import Location from "/public/img/location-icon.svg";
import Runner from "/public/img/runner-icon.svg";
import React, { useState, useEffect } from "react";

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
  const [, setIduser] = useState(null);
  console.log(id);
  const theme = useTheme();
  const router = useRouter();
  const [, setError] = useState(null);
  const [mandadito, setMandadito] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    if (storedId) {
      setIduser(storedId);
    } else {
      console.error("ID not found in localStorage");
    }
  }, []);

  const fetchMandadito = async (id) => {
    console.log("Fetching mandadito with ID:", id); // Debugging log
    try {
      const res = await fetch(`http://localhost:8080/api/mandadito/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imtlbm5ldGhjb250cmVyYXMyMDE3QGdtYWlsLmNvbSIsInVuaXF1ZV9uYW1lIjoiSmVzc2ljYSBIZXJuYW5kZXogUmF1ZGFsZXMiLCJJZFVzZXIiOiIxMSIsIkROSSI6IjA1MDEyMDAxMTY0MDQwMDY4IiwibmJmIjoxNzQzNjk5ODM1LCJleHAiOjE3NDM3MDA3MzUsImlhdCI6MTc0MzY5OTgzNX0.5SVFx0ykrtXyzh63krI-t-sNdyHigIjdVunttVq_Hcw`,
        },
      });

      if (!res.ok) {
        throw new Error("Error fetching mandadito: " + res.statusText);
      }

      const data = await res.json();
      console.log("dt,", data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    console.log("Mandadito ID:", id);
    if (id) {
      const getMandadito = async () => {
        try {
          const data = await fetchMandadito(id);
          console.log("Fetched mandadito data:", data);
          
          setMandadito({
            id: data.id,
            pickupLocation: data.post.pickupLocation,
            deliveryLocation: data.post.deliveryLocation,
            description: data.post.description,
            /* sin horas solo fecha */
            acceptedAt: data.offer.createdAt.split("T")[0],
            suggestedValue: data.offer.counterOfferAmount,
            runner: data.offer?.userCreator ? {
              id: data.offer.userCreator.id,
              name: data.offer.userCreator.name,
              stars: data.offer.userCreator.rating,
              image: data.offer.userCreator.profilePicture,
            } : null,
            rating: data.ratings.length > 0 ? {
              score: data.ratings[0].score,
              review: data.ratings[0].review,
              datePosted: data.ratings[0].datePosted.split("T")[0],
            } : null,
          });
  
        } catch (error) {
          setError("Error fetching mandadito: " + error.message);
        }
      };
  
      getMandadito();
    }
  }, [id]);
  
  useEffect(() => {
    console.log("Mandadito state updated:", mandadito);
  }, [mandadito]);
  

  const order = {
    id: 4,
    securityCode: "JKL012",
    acceptedAt: "2023-04-26T16:30:00",
    acceptedRate: 11,
    offer: {
      id: 4,
      counterOfferAmount: 11,
      idPost: 4,
      userCreator: {
        id: 5,
        name: "Luis Torres",
        rating: 0,
        lastLocation: "Edificio D1",
        profilePicture: "https://example.com/media5",
      },
      createdAt: "2023-04-26T16:30:00",
      isCounterOffer: true,
      accepted: false,
    },
    post: {
      id: 4,
      suggestedValue: 10,
      description: "Ensalada César",
      createdAt: "2023-04-25T11:15:00",
      posterUser: {
        id: 4,
        name: "Ana Lopez",
        rating: 0,
        lastLocation: "Edificio F1",
        profilePicture: "https://example.com/media4",
      },
      pickupLocation: "Edificio D1",
      deliveryLocation: "Edificio I1",
    },
    ratings: [
      {
        id: 7,
        userName: "Ana Lopez",
        profilePic: "https://example.com/media4",
        score: 2,
        review: "El servicio fue lento y no cumplió con lo esperado.",
        datePosted: "2023-04-26T18:30:00",
        isRunner: false,
      },
      {
        id: 8,
        userName: "Luis Torres",
        profilePic: "https://example.com/media5",
        score: 3,
        review: "Cumplió, pero podría mejorar en puntualidad.",
        datePosted: "2023-04-26T18:35:00",
        isRunner: false,
      },
    ],
  };

  const { locations, details, runnerUser, comment, date } = order;

  const dete = {
    id: 4,
    securityCode: "JKL012",
    acceptedAt: "2023-04-26T16:30:00",
    acceptedRate: 11,
    offer: {
      id: 4,
      counterOfferAmount: 11,
      idPost: 4,
      userCreator: {
        id: 5,
        name: "Luis Torres",
        rating: 0,
        lastLocation: "Edificio D1",
        profilePicture: "https://example.com/media5",
      },
      createdAt: "2023-04-26T16:30:00",
      isCounterOffer: true,
      accepted: false,
    },
    post: {
      id: 4,
      suggestedValue: 10,
      description: "Ensalada César",
      createdAt: "2023-04-25T11:15:00",
      posterUser: {
        id: 4,
        name: "Ana Lopez",
        rating: 0,
        lastLocation: "Edificio F1",
        profilePicture: "https://example.com/media4",
      },
      pickupLocation: "Edificio D1",
      deliveryLocation: "Edificio I1",
    },
    ratings: [
      {
        id: 7,
        userName: "Ana Lopez",
        profilePic: "https://example.com/media4",
        score: 2,
        review: "El servicio fue lento y no cumplió con lo esperado.",
        datePosted: "2023-04-26T18:30:00",
        isRunner: false,
      },
      {
        id: 8,
        userName: "Luis Torres",
        profilePic: "https://example.com/media5",
        score: 3,
        review: "Cumplió, pero podría mejorar en puntualidad.",
        datePosted: "2023-04-26T18:35:00",
        isRunner: false,
      },
    ],
  };

  const { pickupLocation, deliveryLocation, description, acceptedAt, suggestedValue, runner, rating } = mandadito || {};

  return (
    <>
      <Header text="Tu mandadito" router={router} />
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
            <ReviewCard
              postUser={runner}
              comentDate={acceptedAt}
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
          />
        </FlexContainer>
      </PageContainer>
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