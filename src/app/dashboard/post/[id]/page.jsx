"use client";

import { useRouter } from "next/navigation";
import styled, { useTheme } from "styled-components";
import { API_URL } from "@/app/utils/settings";

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
import SlidingPanel from "@/app/ui/utilities/SlidingPanel";
import Chat from "@/app/ui/utilities/Chat";

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
  const [idUser, setIdUser] = useState(null);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [offers, setOffers] = useState([]);
  const [offerSelected, setOfferSelected] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [mandaditoId, setMandaditoId] = useState(null);

  const theme = useTheme();
  const router = useRouter();

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
      console.log(userData);
      setIdUser(Number(userData.IdUser));
    } catch {
      router.push("/login");
    }
  }, []);

  /* Trae las offers del post */
  useEffect(() => {
    if (!id || !token) return;

    getPost();
    getOffersByPost();
  }, [id, token]);

  function formatTimeToAMPM(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-HN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  const fetchPost = async () => {
    try {
      const res = await fetchWithAuth(
        `${API_URL}/api/posts/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        router
      );

      if (!res) {
        return;
      }

      console.log(res);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchOffersByPost = async () => {
    try {
      const res = await fetchWithAuth(
        `${API_URL}/api/offers/posts/${id}/offers`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        router
      );

      if (!res.success) throw new Error("Error fetching post: " + res.message);

      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getPost = async () => {
    try {
      const data = await fetchPost(id);
      console.log(data);

      setPost({
        id: data.id,
        description: data.description,
        pickupLocation: data.pickUpLocation,
        deliveryLocation: data.deliveryLocation,
        suggestedValue: data.suggestedValue,
        isCompleted: data.completed,
        accepted: data.accepted,
      });
    } catch (error) {
      console.error(error);
      setError("Error fetching mandadito: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getOffersByPost = async () => {
    try {
      const data = await fetchOffersByPost(id);

      if (!data) {
        setOffers([]);
        return;
      }

      const formattedOffers = data.map((offer) => {
        return {
          id: offer.id,
          runner: offer.userCreator
            ? {
                id: offer.userCreator.id,
                name: offer.userCreator.name,
                stars: offer.userCreator.rating,
                image: offer.userCreator.profilePic.link,
                location: offer.userCreator.lastLocation || "no especificado",
              }
            : null,
          info: {
            priceOffered: offer.counterOfferAmount,
            hour: formatTimeToAMPM(offer.createdAt),
          },
        };
      });

      setOffers(formattedOffers);
    } catch (error) {
      console.error(error);
      setError("Error fetching offers: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOffer = async () => {
    console.log("Offer selected: ", offerSelected);
    try {
      const body = {
        PostId: post.id,
        OfferId: offerSelected.id,
        AcceptedRate: offerSelected.info.priceOffered,
      };
      console.log("Body: ", body);

      const res = await fetchWithAuth(
        `${API_URL}/api/mandadito`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
        router
      );

      const res_post = await fetchWithAuth(
        `${API_URL}/api/posts/${id}/accepted`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
        router
      );

      if (!res.success || !res_post.success)
        throw new Error("Error accepting offer: " + data.message);
      console.log(res.data);
      console.log(res_post.data);

      setMandaditoId(res.data.id);
      setShowChat(true);
    } catch (error) {
      console.error(error);
      setError("Error accepting offer: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const {
    pickupLocation,
    deliveryLocation,
    description,
    suggestedValue,
    accepted,
  } = post || {};

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

  useEffect(() => {
    console.log("mandaditoId", mandaditoId);
    console.log("idUser", idUser);
  }, [mandaditoId, idUser]);

  return (
    <>
      <Header text="Tu Oferta" router={router} />

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

              <SlidingPanel
                title={
                  accepted || showChat ? "Ponte en contacto con tu runner" : "Acepta una oferta"
                }
              >
                {(accepted || showChat) && idUser ? (
                  <Chat mandaditoId={mandaditoId} senderUserId={idUser} />
                ) : (
                  <FlexContainer direction="column" gap="20px">
                    {offers.length > 0 ? (
                      offers.map((offer) => (
                        <OfferCard
                          key={offer.id}
                          postUser={offer.runner}
                          offerInfo={offer.info}
                          priceSuggested={suggestedValue}
                          isSelected={offerSelected?.id === offer.id}
                          onClick={() => {
                            setOfferSelected(offer);
                          }}
                        />
                      ))
                    ) : (
                      <Paragraph
                        text="No hay ofertas disponibles"
                        weight={400}
                        color={theme.colors.secondaryText}
                        className="ml-3"
                      />
                    )}

                    {offerSelected && (
                      <Button
                        text="Aceptar"
                        width="75%"
                        borderRadius="6px"
                        paddingx="60px"
                        paddingy="8px"
                        className="mx-auto"
                        onClick={handleAcceptOffer}
                      />
                    )}
                  </FlexContainer>
                )}
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
