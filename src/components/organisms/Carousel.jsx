import { styled } from "styled-components";
import CarouselList from "../molecules/CarouselList";

const Container = styled.div`
  width: 100%;
  height: 300px;
  background-color: #eee;
  border-bottom: 1px solid #bbb;
  position: relative;
  top: 80px;
`;

const staticServerUri = process.env.REACT_APP_PATH || "";

const CAROUSEL_IMAGES = [
  `${staticServerUri}../../../assets/carouselItem1.jpeg`,
  `${staticServerUri}../../../assets/carouselItem2.jpeg`,
  `${staticServerUri}../../../assets/carouselItem3.jpeg`,
];

const Carousel = () => {
  return (
    <Container>
      <CarouselList images={CAROUSEL_IMAGES} />
    </Container>
  );
};

export default Carousel;
