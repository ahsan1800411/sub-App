import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

const CardsContainer = styled.div`
  display: flex;
  height: 75vh;
  justify-content: center;
  align-items: center;
`;

const CardHeader = styled.div`
  height: 30rem;
  background-color: blue;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PriceCircle = styled.div`
  border: 0.5rem solid white;
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`;
const PriceText = styled.p`
  font-size: 3rem;
  color: white;
`;

const BackgroundColor: any = {
  Basic: 'green',
  Standard: 'tomato',
  Premium: 'gray',
};

const ArticlesPlan = () => {
  const [prices, setPrices] = useState<any[]>([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data } = await axios.get('http://localhost:8000/subs/prices');
    setPrices(data.prices.data);
  };
  return (
    <Container>
      <CardsContainer>
        {prices.map((price) => (
          <Card
            style={{ width: '18rem', height: '25rem', marginRight: '2rem' }}
          >
            <CardHeader
              style={{ backgroundColor: BackgroundColor[price.nickname] }}
            >
              <PriceCircle>
                <PriceText>${price.unit_amount / 100}</PriceText>
              </PriceCircle>
            </CardHeader>
            <Card.Body>
              <Card.Title>{price.nickname}</Card.Title>
              <Button variant='primary'>Buy now</Button>
            </Card.Body>
          </Card>
        ))}
      </CardsContainer>
    </Container>
  );
};

export default ArticlesPlan;
