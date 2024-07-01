import React from "react";

interface styleProps {
  width: string;
  height: string;
  backgroundColor: string;
}
interface cellConfig {
  id: string;
  value: string | number;
  rowIndex?: number;
  columnIndex?: number;
  clickHandler?: (e) => void;
}

const Cell = ({
  cellConfig,
  styleConfig,
}: {
  cellConfig: cellConfig;
  styleConfig: styleProps;
}) => {
  return (
    <div
      style={{
        ...styleConfig,
      }}
    >
      <div id={cellConfig.id} onClick={cellConfig.clickHandler}>
        {cellConfig.value}
      </div>
    </div>
  );
};

export default Cell;
