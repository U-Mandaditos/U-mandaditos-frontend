"use client";

import { useRouter } from "next/navigation";
import styled, { useTheme } from "styled-components";

import Button from "@/app/ui/essentials/Button";
import { FlexContainer } from "@/app/ui/essentials/FlexBox";
import Paragraph from "@/app/ui/essentials/Paragraph";
import Header from "@/app/ui/utilities/Header";
import Title from "@/app/ui/essentials/Title";

import Location from "/public/img/location-icon.svg";
import Runner from "/public/img/runner-icon.svg";
import React, { useState, useEffect, use } from "react";
import LoadingSpinner from "@/app/ui/essentials/Loader";
import SlidingPanel from "@/app/ui/utilities/SlidingPanel";
import Chat from "@/app/ui/utilities/Chat";
import Modal from "@/app/ui/modals/Modal";
import Textarea from "@/app/ui/utilities/Textarea";
import { useNotification } from "@/app/contexts/NotificationContext";
import { createRating, markPostAsCompleted, fetchPost } from "./services";

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

const StarImg = styled.img`
    width: 22px;
    height: 22px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
`

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const titleSize = "24px";
const titleWeight = "500";

export default function Mandadito({ params }) {
  const { id } = React.use(params);
  const { notify } = useNotification();
  const theme = useTheme();
  const router = useRouter();

  const [idUser, setIdUser] = useState(null);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [descriptionReview, setDescriptionReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
  };

  /* Trae el token del LS */
  useEffect(() => {
    const tk = localStorage.getItem("token");
    setToken(tk);

    if (!tk) {
      router.push("/login");
    }

    /* Desconstruye el token  */
    try {
      const payload = tk.split(".")[1];
      const decodedPayload = atob(payload);
      const userData = JSON.parse(decodedPayload);
      setIdUser(userData.IdUser);
    } catch {
      router.push("/login");
    }
  }, []);

  /* Trae el post */
  useEffect(() => {
    if (!id || !token) return;

    getPost();
  }, [id, token]);

  const getPost = async () => {
    try {
      const data = await fetchPost(token, id, router);
      console.log(data);

      setPost({
        idMandadito: data.id,
        id: data.idPost,
        description: data.description,
        pickupLocation: data.pickUpLocation,
        deliveryLocation: data.deliveryLocation,
        suggestedValue: data.suggestedValue,
        isCompleted: data.completed,
        accepted: data.accepted,
        posterUserName: data.posterUserName,
        posterImage: data.posterImage,
        idUser: data.idUser,
      });
    } catch (error) {
      console.error(error);
      router.back();
      setError("Error fetching mandadito: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsDelivered = async () => {
    if (!post || !idUser) return;

    try {
      const ratingResponse = await createRating(
        token,
        {
          IdMandadito: post.idMandadito,
          IdRatedUser: post.idUser,
          IdRater: Number(idUser),
          RatingNum: rating,
          Review: descriptionReview,
          IsOwner: false,
        },
        router
      );

      const postComplete = await markPostAsCompleted(token, post.id, router);

      setShowModal(false);
      notify("Calificación enviada", "success", 3000);
      router.push("/dashboard/home");
    } catch (error) {
      console.error(error);
      notify("Error al calificar al poster", "error", 3000);
    }
  };

  const { pickupLocation, deliveryLocation, description, suggestedValue } =
    post || {};

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
      <Header text="Tu Entrega" router={router} />

      {showModal && (
        <Modal
          isOpen={showModal}
          title={"Califica a tu poster"}
          subtitle={"Tu opinión mejora la comunidad"}
          showClose={false}
        >
          <FlexContainer direction="column" gap="20px">
            <FlexContainer
              direction="column"
              gap="20px"
              justifycontent="center"
              alignitems="center"
            >
              <FlexContainer direction="column" gap="10px" className="center">
                <ImageContainer>
                  <UserImage
                    src={
                      "https://cdn.pixabay.com/photo/2024/04/10/22/52/autumn-8688876_1280.jpg"
                    }
                    alt="imagen del usuario"
                  />
                </ImageContainer>
                <Paragraph
                  text={post.posterUserName}
                  weight={400}
                  color={theme.colors.secondaryText}
                  size="16px"
                  className={"center"}
                />
              </FlexContainer>

              <FlexContainer direction="row" justifycontent="center" gap="10px">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarButton key={star} onClick={() => handleStarClick(star)}>
                    <StarImg
                      src={
                        star <= rating
                          ? "/icons/star_filled.svg"
                          : "/icons/star_empty.svg"
                      }
                      alt={`Estrella ${star}`}
                    />
                  </StarButton>
                ))}
              </FlexContainer>

              <Textarea
                label={"Comentario"}
                placeholder={""}
                value={descriptionReview}
                onChange={(e) => setDescriptionReview(e.target.value)}
                height={"90px"}
                name={"Description"}
              />

              <Button
                text={"Enviar calificación"}
                paddingy={"10px"}
                onClick={markAsDelivered}
                className={"mt-4 mb-4"}
              />
            </FlexContainer>
          </FlexContainer>
        </Modal>
      )}

      {loading ? (
        <LoadingSpinner offset="20px" />
      ) : (
        <>
          <PageContainer>
            <FlexContainer
              direction="column"
              gap="20px"
              justifycontent="center"
              width="max-content"
              alignitems="center"
              className="center mb-4"
            >
              <Button
                text={"Marcar como entregado"}
                paddingy={"5px"}
                onClick={() => {
                  setShowModal(true);
                }}
              />
            </FlexContainer>
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

              <SlidingPanel title={"Ponte en contacto con tu poster"}>
                <Chat mandaditoId={post.idMandadito} senderUserId={idUser} />
              </SlidingPanel>
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
