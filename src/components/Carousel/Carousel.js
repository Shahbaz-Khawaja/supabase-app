import React from "react";
import img1 from "assets/img1.png";
import img2 from "assets/img2.png";
import img3 from "assets/img3.png";
import { Typography, Box } from "@mui/material";
import { useStyles, style } from "components/Carousel/Carousel.style";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselSlider = () => {
  const classes = useStyles();
  return (
    <Carousel
      className={classes.carousel}
      autoPlay
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
    >
      <Box>
        <Box sx={{ ...style.imageContainer }}>
          <img height="220px" width="310px" src={img1} alt="img1" />
        </Box>

        <Typography variant="h2" color="white" sx={{ ...style.typoHeading }}>
          Meet the Control Hub
        </Typography>
        <Box sx={{ ...style.imgText }}>
          <Box sx={{ ...style.imgTextPara }}>
            <Typography variant="body2" color="common.white">
              Camel Cloud&apos;s visual Integration builder lets you build
              integration in real time in a beautiful, intuitive way
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box sx={{ ...style.imageContainer }}>
          <img height="220px" width="310px" src={img2} alt="img2" />
        </Box>

        <Typography variant="h2" color="white" sx={{ ...style.typoHeading }}>
          Meet the Exchange Hub
        </Typography>
        <Box sx={{ ...style.imgText }}>
          <Box sx={{ ...style.imgTextPara }}>
            <Typography variant="body2" color="white">
              Camel Cloud&apos;s visual Integration builder lets you build
              integration in real time in a beautiful, intuitive way
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box sx={{ ...style.imageContainer }}>
          <img height="220px" width="310px" src={img3} alt="img3" />
        </Box>
        <Typography variant="h2" color="white" sx={{ ...style.typoHeading }}>
          Meet the Camel Studio
        </Typography>
        <Box sx={{ ...style.imgText }}>
          <Box sx={{ ...style.imgTextPara }}>
            <Typography variant="body2" color="white">
              Camel Cloud&apos;s visual Integration builder lets you build
              integration in real time in a beautiful, intuitive way
            </Typography>
          </Box>
        </Box>
      </Box>
    </Carousel>
  );
};

export default CarouselSlider;
