import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import ModalComponent from '../Modal/Modal';

const HeroComponent = styled.header`
  padding: 5rem 0;
  height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
  background-size: cover;
  background-position: center;
`;

const HeaderContainer = styled.div`
  background-color: rgb(5, 148, 112);
  padding: 3rem;
  color: white;
  width: 32.5rem;
`;

const Heading = styled.h1`
  font-size: 5rem;
`;
const SubHeading = styled.h3`
  font-weight: 400;
  margin: 1rem 0;
`;

const Hero = () => {
  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading>Feed Your mind with the best articles out there</Heading>
          <SubHeading>
            Grow, learn and become more successful by reading some of the good
            articles by top reputable individuals.
          </SubHeading>
          <ModalComponent title='Signup' variant='primary' />
          <ModalComponent title='Login' variant='danger' />
        </HeaderContainer>
      </Container>
    </HeroComponent>
  );
};

export default Hero;
