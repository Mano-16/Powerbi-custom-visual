import React from "react";
import Header from "./Header/Header";
// import Table from "./Table/Table";
import GridUtils from "./Utils";
import Table from "./Table/Table";

const App = (props) => {
  const { theme, format } = GridUtils.formatValue(props.dataView);
  const { columnConfig, rowConfig } = GridUtils.getMatrixCellData(
    props.dataView,
    format
  );

  return (
    <div>
      <Header width={columnConfig.length * 100} theme={theme} format={format} />
      <Table theme={theme} columnConfig={columnConfig} rowConfig={rowConfig} />
    </div>
  );
};

export default App;
