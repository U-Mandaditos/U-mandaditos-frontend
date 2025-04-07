import styled, { keyframes, useTheme } from 'styled-components';
import { FlexContainer } from '../essentials/FlexBox';

const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
`;

const SkeletonBox = styled.div`
  background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%);
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  border-radius: ${(props) => props.radius || '4px'};
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '12px'};
`;

const ContainerGeneral = styled.div`
  width: auto;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.lineColor};
  background-color: transparent;
  display: flex;
  flex-direction: row;
  padding: 8px 10px;
`;

const CardPlaceholder = styled(SkeletonBox)`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 6px;
  width: 70px;
  height: 20px;
`;

const StatusPlaceholder = styled(SkeletonBox)`
  width: 70px;
  height: 16px;
  margin-top: 4px;
`;

const ButtonPlaceholder = styled(SkeletonBox)`
  width: 60px;
  height: 22px;
  border-radius: 4px;
`;

export default function DeliveryCardSkeleton() {
  const theme = useTheme();

  return (
    <ContainerGeneral>
      <FlexContainer width="75%" height="100%" direction="column" gap="6px">
        <FlexContainer height="auto" direction="row" alignitems="center" gap="5px" className='mb-2'>
          <SkeletonBox width="14px" height="14px" radius="50%" />
          <SkeletonBox width="5px" height="5px" radius="50%" />
          <CardPlaceholder />
          <SkeletonBox width="5px" height="5px" radius="50%" />
          <CardPlaceholder />
        </FlexContainer>

        <SkeletonBox width="150px" height="12px" />
        <SkeletonBox width="120px" height="12px" />
        <StatusPlaceholder />
      </FlexContainer>

      <FlexContainer direction="column" alignitems="flex-end" gap="6px">
        <SkeletonBox width="60px" height="16px" />
        <SkeletonBox width="40px" height="12px" />
        <FlexContainer alignitems="flex-end" justifycontent="flex-end" height="100%">
          <ButtonPlaceholder />
        </FlexContainer>
      </FlexContainer>
    </ContainerGeneral>
  );
}
