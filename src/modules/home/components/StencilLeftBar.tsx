import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { dia, ui } from "joinjs-plus";
import { useEffect, useState } from "react";
import { widgetsComponent } from "../elements";

type Property = {
  paper: dia.Paper;
};
const StencilLeftBar = ({ paper }: Property) => {
  const [stencil, setStencil] = useState<ui.Stencil | null>(null);
  useEffect(() => {
    const newStencil = new ui.Stencil({
      paper: paper,
      background: "#000",
      width: 500,
      height: 500,
      layout: true,
      dropAnimation: true,
    });
    newStencil.render();
    document.getElementById("stencil")?.appendChild(newStencil.el);

    setStencil(newStencil);
    return () => {
      newStencil.remove();
    };
  }, []);
  useEffect(() => {
    if (stencil) {
      stencil.load(widgetsComponent);
    }
  }, [stencil]);
  return (
    <Box
      paddingX={"20px"}
      paddingY={"40px"}
      h="100%"
      w="100%"
      borderRadius={"20px"}
      boxShadow={"2xl"}
    >
      <Heading as={"h2"} size={"lg"}>
        Shape
      </Heading>
      <VStack marginTop={"40px"} id="stencil" width={"100%"}></VStack>
    </Box>
  );
};

export default StencilLeftBar;
