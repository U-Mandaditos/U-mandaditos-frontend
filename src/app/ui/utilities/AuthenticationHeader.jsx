import Title from "../essentials/Title";
import Paragraph from "../essentials/Paragraph";

export default function AuthenticationHeader({ title, text }) {
    return (
        <header className="mt-5 p-4">
            <Title className={"mb-1"} weight={"600"} size={"36px"} text={title} />
            <Paragraph color={(props) => props.theme.colors.secondaryText} weight={"400"} size={"16px"} text={text}/>
        </header>
    );
}