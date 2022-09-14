import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Box, IconButton } from "@chakra-ui/react";
import classes from "../../../styles/custom.module.css";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import React  from "react";

const Slider = () => {

  const button = (handler: any, styles: any, icon: any) => {
    return (
      <IconButton
        aria-label="shuffle"
        fontSize="24px"
        color={"white"}
        onClick={handler}
        icon={icon}
        style={{
          ...styles,
          position: "absolute",
          top: "5.3em",
          bottom: "auto",
          padding: ".4em",
          zIndex: 2,
          backgroundColor: "transparent",
        }}
      />
    );
  };

  return (
    <Box marginBottom={"10px"} className={classes.sliderContainer}>
      <Carousel
        autoFocus={true}
        showThumbs={false}
        swipeable={true}
        infiniteLoop={true}
        useKeyboardArrows={true}
        showStatus={false}
        renderArrowPrev={(onClickHandler) => {
          return button(onClickHandler, { left: "0.3em" }, <MdArrowLeft />);
        }}
        renderArrowNext={(onClickHandler) => {
          return button(onClickHandler, { right: "0.3em" }, <MdArrowRight />);
        }}
      >
        <div>
          <img alt="" src="/image/img1.jpg" />
        </div>
        <div>
          <img alt="" src="/image/img2.jpg" />
        </div>
        <div>
          <img alt="" src="/image/img3.jpeg" />
        </div>
        <div>
          <img alt="" src="/image/img4.jpeg" />
        </div>
      </Carousel>
    </Box>
  );
};

export default Slider;
