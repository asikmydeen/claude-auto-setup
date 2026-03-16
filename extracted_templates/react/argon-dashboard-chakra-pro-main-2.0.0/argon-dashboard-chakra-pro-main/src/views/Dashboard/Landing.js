/*!

=========================================================
* Argon Dashboard Chakra PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-chakra-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com/)

* Designed and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, Image, Link } from "@chakra-ui/react";
import Landing1 from "assets/img/Landing1.png";
import Landing2 from "assets/img/Landing2.png";
import Landing3 from "assets/img/Landing3.png";
import React from "react";

export default function Default() {
  return (
    <Box
      flexDirection='column'
      pt={{ base: "0px", lg: "0px", xl: "70px", "2xl": "0px" }}
      m='auto'>
      <Box
        bg='linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.25) 100%)'
        backdropFilter='blur(20px)'
        borderRadius={{ base: "12px", lg: "24px" }}
        p={{ base: "15px", lg: "20px" }}
        mx='auto'
        mb={{ base: "20px", lg: "20px" }}
        width={{
          base: "95% !important",
          xl: "80% !important",
          "2xl": "92% !important",
        }}
        zIndex='3'
        position={{ lg: "absolute" }}
        transform={{
          lg:
            "scale(0.8) perspective(2000px) rotateY(-35deg) rotateX(2deg) rotate(0deg)",
          xl:
            "scale(0.9) perspective(2000px) rotateY(-35deg) rotateX(2deg) rotate(0deg)",
          "2xl":
            "scale(0.8) perspective(2000px) rotateY(-35deg) rotateX(2deg) rotate(0deg)",
        }}
        right={{ lg: "125px", xl: "290px", "2xl": "250px" }}
        _hover={{
          transform: "scale(0.85) rotateY(-25deg) ",
          right: "225px",
        }}
        transition='0.3s linear'>
        <Link href='#'>
          <Image src={Landing1} borderRadius={{ base: "12px", lg: "24px" }} />
        </Link>
      </Box>
      <Box
        bg='linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.25) 100%)'
        backdropFilter='blur(20px)'
        borderRadius={{ base: "12px", lg: "24px" }}
        p={{ base: "15px", lg: "20px" }}
        mx='auto'
        mb={{ base: "20px", lg: "20px" }}
        width={{
          base: "95% !important",
          xl: "80% !important",
          "2xl": "92% !important",
        }}
        zIndex='2'
        position={{ lg: "absolute" }}
        transform={{
          lg:
            "scale(.75) perspective(2000px) rotateY(-32deg) rotateX(2deg) rotate(0deg)",
          xl:
            "scale(.85) perspective(2000px) rotateY(-32deg) rotateX(2deg) rotate(0deg)",
          "2xl":
            "scale(.75) perspective(2000px) rotateY(-32deg) rotateX(2deg) rotate(0deg)",
        }}
        right={{ lg: "55px", xl: "120px", "2xl": "80px" }}>
        <Image src={Landing2} borderRadius={{ base: "12px", lg: "24px" }} />
      </Box>
      <Box
        bg='linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.25) 100%)'
        backdropFilter='blur(20px)'
        borderRadius={{ base: "12px", lg: "24px" }}
        p={{ base: "15px", lg: "20px" }}
        mx='auto'
        mb={{ base: "20px", lg: "20px" }}
        width={{
          base: "95% !important",
          xl: "80% !important",
          "2xl": "92% !important",
        }}
        zIndex='1'
        position={{ lg: "absolute" }}
        transform={{
          lg:
            "scale(.7) perspective(2000px) rotateY(-30deg) rotateX(2deg) rotate(0deg)",
          xl:
            "scale(.8) perspective(2000px) rotateY(-30deg) rotateX(2deg) rotate(0deg)",
          "2xl":
            "scale(.7) perspective(2000px) rotateY(-30deg) rotateX(2deg) rotate(0deg)",
        }}
        right={{ lg: "-25px", xl: "-10px", "2xl": "-90px" }}>
        <Image src={Landing3} borderRadius={{ base: "12px", lg: "24px" }} />
      </Box>
    </Box>
  );
}
