import { useEffect, useRef } from "react";
import { dia, shapes, ui } from "joinjs-plus";
import "./App.css";

function App() {
  const canvas = useRef<Element | null>(null);

  useEffect(() => {
    const graph = new dia.Graph({}, { cellNamespace: shapes });

    const paper = new dia.Paper({
      model: graph,
      background: {
        color: "#F8F9FA",
      },
      frozen: true,
      async: true,
      cellViewNamespace: shapes,
    });

    const scroller = new ui.PaperScroller({
      paper,
      autoResizePaper: true,
      cursor: "grab",
    });
    canvas.current?.appendChild(scroller.el);
    scroller.render().center();
    const rect = new shapes.standard.Rectangle({
      position: { x: 100, y: 30 },
      size: { width: 100, height: 40 },
      attrs: {
        label: {
          text: "Hello Nguyen",
        },
      },
    });
    graph.addCell(rect);
    paper.unfreeze();
    return () => {
      scroller.remove();
      paper.remove();
    };
  }, []);

  return <div className="canvas" ref={canvas} />;
}

export default App;
