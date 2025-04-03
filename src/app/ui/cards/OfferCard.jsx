import styled from 'styled-components';

const OfferCardContainer = styled.div`
    width: 100%;
    padding: 1.3rem 1rem;
    display: flex;
    justify-content: space-between;
    border: 1px solid ${(props) => props.theme.colors.lineColor};
    font-size: 1rem;
    background-color: ${(props) => (props.isselected ? '#e4efee' : props.theme.colors.main)};
    border-radius: 15px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;    
`;

const UserContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const UserImage = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    object-fit: cover;
`;

const UserInfo = styled.section`
    display: flex;
    flex-direction: column;
    font-size: 1.1rem;
    font-weight: bold;
`;

const UserLocation = styled.p`
    color: ${(props) => props.theme.colors.secondaryText};
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: 100;
`;

const OfferContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
`;

const PriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1px;
`;

const PriceOffered = styled.p`
    color: ${(props) => props.theme.colors.secondaryText};
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.primary};
    font-weight: 500;
`;

const PriceSuggested = styled.p`
    color: ${(props) => props.theme.colors.secondaryText};
`;

const HourContainer = styled.p`
    color: ${(props) => props.theme.colors.secondaryText};
    bottom: 10px;
    right: 10px;
    font-size: .9rem;
`;

const StarsContainer = styled.div`
    display: flex;
    gap: 2px;
`;

const Star = styled.img`
    width: 20px;
    height: 20px;
`;

export default function OfferCard({ postUser, offerInfo, priceSuggested, isSelected, onClick }) {
    const starsFilled = postUser.stars; 
    const starsEmpty = 5 - starsFilled; 

    return (
        <OfferCardContainer isselected={isSelected} onClick={onClick}>
            <UserContainer>
                <UserImage src={postUser.image} alt="User" />
                <UserInfo>
                    <p>{postUser.name}</p>
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
                    <UserLocation>{`Esta en ${postUser.location}`}</UserLocation>
                </UserInfo>
            </UserContainer>
            <OfferContainer>
                <PriceContainer>
                    <PriceOffered>L. {offerInfo.priceOffered}</PriceOffered>
                    <PriceSuggested>L. {priceSuggested}</PriceSuggested>
                </PriceContainer>
                <HourContainer>{offerInfo.hour}</HourContainer>
            </OfferContainer>
        </OfferCardContainer>
    );
}