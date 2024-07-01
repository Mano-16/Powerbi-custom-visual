import React from "react";
import Cell from "./Cell";
import GridUtils from "../Utils";
import PowerbiUtils from "../../src/PowerbiUtils";

const Table = ({ columnConfig, rowConfig, theme }) => {
  const styleProps = {
    boxSizing: "border-box",
    display: "inline-block",
    backgroundColor: theme === "Light" ? "#ffffff" : "#dddddd",
    border: "1px solid black",
    paddingLeft: "2px",
    color: "#333333",
    width: "100px",
  };
  return (
    <div>
      <RenderColumn config={columnConfig} style={styleProps} />
      {rowConfig.map((conf) => {
        return <RenderRow config={conf} style={styleProps} />;
      })}
    </div>
  );
};

export default Table;
export const RenderColumn = (props) => {
  const styleConfig = {
    ...props.style,
    height: "30px",
  };
  const onColumnClickHandler = (e) => {
    PowerbiUtils.selectionUpdate(e.target.id, e.ctrlKey, "column");
  };
  return (
    <div style={{ display: "inline-block" }}>
      {props.config.map((conf) => {
        return (
          <Cell
            cellConfig={{ ...conf, clickHandler: onColumnClickHandler }}
            styleConfig={styleConfig}
          />
        );
      })}
    </div>
  );
};

export const RenderRow = (props) => {
  const styleConfig = {
    ...props.style,
    height: "24px",
  };
  const onCellClickHandler = (e) => {
    PowerbiUtils.selectionUpdate(e.target.id, e.ctrlKey, "row");
  };
  return (
    <div style={{ display: "block" }}>
      {props.config.map((conf) => {
        return (
          <Cell
            cellConfig={{ ...conf, clickHandler: onCellClickHandler }}
            styleConfig={styleConfig}
          />
        );
      })}
    </div>
  );
};
