import styled from 'styled-components';

const ReviewCardContainer = styled.div`
    width: 100%;
    padding: 1.3rem 1rem;
    border: 1px solid ${(props) => props.theme.colors.lineColor};
    font-size: 1rem;
    background-color: ${(props) => (props.isSelected ? '#e4efee' : props.theme.colors.main)};
    border-radius: 15px;
    position: relative;
`;

const Review = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    margin-bottom: 10px;
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const UserImage = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
`;

const UserInfo = styled.section`
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;
    font-weight: bold;
`;

const CommentContainer = styled.p`
    color: ${(props) => props.theme.colors.secondaryText};
    margin-bottom: 10px;
    font-size: 1rem;
    font-weight: normal;
`;

const DateParagraph = styled.p`
    color: ${(props) => props.theme.colors.secondaryText};
    margin-top: auto;
    font-size: .9rem;
    font-weight: normal;
    position: absolute;
    top: 10px;
    right: 10px; 
`;

const PostParagraph = styled.p`
    color: ${(props) => props.isPosted ? props.theme.colors.primary : props.theme.colors.secondary};
    margin-top: auto;
    font-size: .9rem;
    font-weight: bold;
    position: absolute;
    bottom: 10px;
    right: 10px; 
    align-items: center;
    display: flex;
`;

const StarsContainer = styled.div`
    display: flex;
    gap: 2px;
`;

const Star = styled.img`
    width: 20px;
    height: 20px;
`;

const Icon = styled.img`
    width: 1.2rem;
    height: 1.2rem;
    margin-left: 5px;
`;

export default function ReviewCard({ postUser, coment, comentDate, isPosted, isSelected }) {
    const starsFilled = postUser.stars; // Número de estrellas llenas
    const starsEmpty = 5 - starsFilled; // Número de estrellas vacías

    return (
        <ReviewCardContainer isSelected={isSelected}>
            <Review>
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
                    </UserInfo>
                </UserContainer>
                <CommentContainer>{coment}</CommentContainer>
            </Review>
            <DateParagraph>{comentDate}</DateParagraph>
            {isPosted ? (
                <PostParagraph isPosted={isPosted}>
                    {postUser.name} posteó un mandadito. <Icon src="/icons/post.svg" />
                </PostParagraph>
            ) : (
                <PostParagraph isPosted={isPosted}>
                    {postUser.name} hizo un mandadito <Icon src="/icons/man_walking.svg" />
                </PostParagraph>
            )}
        </ReviewCardContainer>
    );
}
