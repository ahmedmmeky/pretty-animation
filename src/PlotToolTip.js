import React, { useRef, useEffect } from "react";
import { Runtime, Inspector } from "@observablehq/runtime";
import notebook from "@clhenrick/tooltip-component";

function PlotToolTip() {
  const chartRef = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(notebook, (name) => {
      if (name === "chart") return new Inspector(chartRef.current);
    });
    return () => runtime.dispose();
  }, []);

  return (
    <>
      <div ref={chartRef} />
      <p>
        Credit:{" "}
        <a href="https://observablehq.com/@clhenrick/tooltip-component">
          Tooltip by Chris Henrick
        </a>
      </p>
    </>
  );
}

export default PlotToolTip;
