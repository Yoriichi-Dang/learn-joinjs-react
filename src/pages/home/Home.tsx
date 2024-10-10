import React, { useEffect, useRef, useState } from "react";
import { dia, ui, shapes } from "joinjs-plus";
import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import StencilLeftBar from "../../modules/home/components/StencilLeftBar";

const Home: React.FC = () => {
  const canvas = useRef<HTMLDivElement | null>(null);
  const [paper, setPaper] = useState<dia.Paper | null>(null);
  const [paperDimensions, setPaperDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updatePaperDimensions = () => {
      if (canvas.current) {
        const { clientWidth, clientHeight } = canvas.current;
        setPaperDimensions({
          width: clientWidth,
          height: clientHeight,
        });
      }
    };

    // Initial update
    updatePaperDimensions();

    // Set up a window resize listener
    window.addEventListener("resize", updatePaperDimensions);

    return () => {
      window.removeEventListener("resize", updatePaperDimensions);
    };
  }, []);

  useEffect(() => {
    if (paperDimensions.width === 0 || paperDimensions.height === 0) return;

    const graph = new dia.Graph({}, { cellNamespace: shapes });

    const newPaper = new dia.Paper({
      model: graph,
      background: {
        color: "#000",
      },
      width: paperDimensions.width,
      height: paperDimensions.height,
      frozen: true,
      async: true,
      cellViewNamespace: shapes,
    });

    setPaper(newPaper);

    const scroller = new ui.PaperScroller({
      paper: newPaper,
      autoResizePaper: true,
      cursor: "grab",
    });

    if (canvas.current) {
      canvas.current.innerHTML = ""; // Clear previous content
      canvas.current.appendChild(scroller.el);
      scroller.render().center();
    }

    // Center the scroller to match the canvas size
    scroller.center();

    newPaper.unfreeze();

    return () => {
      scroller.remove();
      newPaper.remove();
    };
  }, [paperDimensions]);

  return (
    <Container minWidth="100vw" height="100vh" maxWidth="100vw" padding={0}>
      <Grid templateColumns="repeat(4, 1fr)" gap={0} h="100%">
        <GridItem w="100%" h="100%" padding="20px">
          {paper && <StencilLeftBar paper={paper} />}
        </GridItem>
        <GridItem colSpan={3} w="100%" h="100%">
          <Box ref={canvas} width="100%" height="100%"></Box>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Home;
