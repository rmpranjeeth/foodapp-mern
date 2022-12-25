import Carousel from 'react-bootstrap/Carousel';

function ImageSlider() {
  return (
    <Carousel>
      <Carousel.Item interval={800}>
        <img
          className="d-block w-100"
          src="https://i.ibb.co/YRzSL4H/family-night-offer-facebook-cover-Made-with-Poster-My-Wall.jpg"
          alt=""
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={800}>
        <img
          className="d-block w-100"
          src="https://i.ibb.co/d2MM8jK/burger-place-facebook-cover-advertisement-des-Made-with-Poster-My-Wall.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.ibb.co/P9Gjk3Q/Restaurant-facebook-advertisement-gourmet-spe-Made-with-Poster-My-Wall.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ImageSlider;