import Title from "../essentials/Title";
import Paragraph from "../essentials/Paragraph";
import styled from "styled-components";
import { FlexContainer } from "../essentials/FlexBox";
import { useTheme } from "styled-components";
import { useRouter } from "next/navigation";

const StyledHeader = styled.header`
    margin-top: 32px;
    padding: 24px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function TitleHeader({ title, text }) {
    const theme = useTheme();
    const router = useRouter();
    return (
        <StyledHeader>
            <FlexContainer direction={"column"} alingnitems={"start"} justifycontent={"center"}>
                <Title className={"mb-1"} weight={"600"} size={"36px"} text={title} />
                <Paragraph color={theme.colors.secondaryText} weight={"400"} size={"16px"} text={text}/>
            </FlexContainer>
        </StyledHeader>
    );
}