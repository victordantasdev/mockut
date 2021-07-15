import Lottie from 'react-lottie';
import styled from 'styled-components';
import animationData from '../../assets/animations/LoadingAnimation.json';

const AnimationContainer = styled.div`
  margin-left: 20%;
  border: 1px solid red;
  width: 200px;
  height: 200px;
`;

export default function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <AnimationContainer>
      <Lottie options={defaultOptions} isStopped={false} isPaused={false} />
    </AnimationContainer>
  );
}
