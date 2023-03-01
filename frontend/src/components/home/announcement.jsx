import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";

const Image = styled.img`
  width: 100%;
`;

const CarouselWrapper = styled.div``;

const Announcement = () => {
  let images = [1, 2, 3];

  return (
    <CarouselWrapper>
      <Carousel className="carousel-dark" interval={3000}>
        {images.map((val, index) => (
          <Carousel.Item key={index}>
            <Image src={`banners/${val}.png`} alt="Banner" />
          </Carousel.Item>
        ))}
      </Carousel>
    </CarouselWrapper>
  );
};

export default Announcement;
