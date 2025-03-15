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

export default function Mandadito() {
    const theme = useTheme();
    const router = useRouter();

    const order = {
        locations: {
            from: "Polideportivo",
            to: "B2",
        },
        details: {
            description: "Necesito que alguien me compre unas papas fritas del CC y me las traiga lo antes posible.",
            suggestedPrice: "50",
        },
        runnerUser: {
            name: "Daniel Ochoa",
            image: "/img/pruebas/odin.svg",
            stars: 4,
            location: "Polideportivo",
        },
        comment: {
            description: "Nunca llegó a entregar el producto.",
            date: "08-03-2025",
        },
        date: "08-03-2025",
    };

    const { locations, details, runnerUser, comment, date } = order;

    return (
        <>
            <Header text="Tu mandadito" router={router} />
            <PageContainer>
                <FlexContainer direction="column" gap="2rem">
                    
                    {/* Detalles de ubicación */}
                    <Section title="Detalles">
                        <FlexContainer direction="column" gap="12px" className="ml-3">
                            <Detail icon={Location} text={locations.from} color={theme.colors.secondaryText} />
                            <Detail icon={Runner} text={locations.to} color={theme.colors.secondaryText} />
                        </FlexContainer>
                    </Section>

                    {/* Descripción del mandadito */}
                    <Section title="Descripción">
                        <Paragraph text={details.description} weight={400} color={theme.colors.secondaryText} className="ml-3" />
                    </Section>

                    {/* Tarifas */}
                    <Section title="Tarifa indicada">
                        <Paragraph text={'L. ' +  details.suggestedPrice} weight={400} color={theme.colors.secondaryText} className="ml-3" />                    
                    </Section>

                    {/* Información del usuario que acepto */}
                    <Section title="Oferta aceptada">
                        <ReviewCard postUser={runnerUser} comentDate={date} />
                    </Section>

                    {/* Comentario sobre la calificación */}
                    <Section title="Calificación">
                        <ReviewCard postUser={runnerUser} coment={comment.description} comentDate={comment.date} />
                    </Section>

                    {/* Botón de acción */}
                    <Button text="Aceptar" width="75%" borderRadius="6px" paddingx="60px" paddingy="8px" className="mx-auto" />
                
                </FlexContainer>
            </PageContainer>
        </>
    );
}

function Section({ title, children }) {
    return (
        <div>
            <Title text={title} size={titleSize} weight={titleWeight} className="mb-2" />
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
