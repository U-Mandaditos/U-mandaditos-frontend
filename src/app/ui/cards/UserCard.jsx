import styled from "styled-components";

const UserContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const UserImage = styled.img`
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
`;

const UserInfo = styled.section`
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;
    font-weight: bold;
`;

const StarsContainer = styled.div`
    display: flex;
    gap: 2px;
`;

const Star = styled.img`
    width: 20px;
    height: 20px;
`;

export default function UserCard({user}){
    const starsFilled = user.stars; // Número de estrellas llenas
    const starsEmpty = 5 - starsFilled; // Número de estrellas vacías
    
    return (<UserContainer>
        <UserImage src={user.image} alt="User" />
        <UserInfo>
            <p>{user.name}</p>
            <StarsContainer>
                    {/* Renderizar estrellas llenas */}
                    {[...Array(starsFilled)].map((_, index) => (
                        <Star key={`filled-${index}`} src='/icons/star_filled.svg' alt="star" />
                    ))}
                    {/* Renderizar estrellas vacías */}
                    {[...Array(starsEmpty)].map((_, index) => (
                        <Star key={`empty-${index}`} src='/icons/star_empty.svg' alt="empty star" />
                    ))}
                </StarsContainer>
        </UserInfo>
    </UserContainer>)
}