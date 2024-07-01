import PowerbiUtils from "../src/PowerbiUtils";

class GridUtils {
  public static getMatrixCellData = (dataView, format) => {
    const { rows: matrixRows, columns: matrixColumns } = dataView.matrix;
    PowerbiUtils.dataView = dataView;
    const rows = matrixRows.root.children;
    const columns = matrixColumns.root.children;

    const columnConfig = [];
    const rowConfig = [];
    const formatValue = this.getFormatValue(format);
    if (rows && (columns.length === 0 || !rows[0].values)) {
      rows.forEach((row, idx) => {
        const rowDim = [];
        rowDim.push({
          id: row.value,
          value: row.value,
          rowIndex: idx,
        });
        rowConfig.push(rowDim);
      });
    }
    if (columns.length > 0) {
      columnConfig.push({
        id: "row_Dimension",
        value: "rows",
        ColumnIndex: 0,
      });
      columns.forEach((column, idx) => {
        columnConfig.push({
          id: column.value,
          value: column?.value,
          ColumnIndex: idx + 1,
        });
      });
    }
    rows.forEach((row, idx) => {
      if (row && row.values) {
        const rowDim = [];
        rowDim.push({
          id: row.value,
          value: row.value,
          rowIndex: idx,
        });
        Object.keys(row.values).forEach((value, rowIndex) => {
          rowDim.push({
            id: `${columns[rowIndex].value}__${row.value}`,
            value: parseFloat(
              `${row.values[value].value / formatValue}`
            ).toFixed(2),
            rowIndex: rowIndex + 1,
          });
        });
        rowConfig.push(rowDim);
      }
    });
    return { rowConfig, columnConfig };
  };

  public static persistProperty(theme, format) {
    PowerbiUtils.persist(theme, format);
  }

  public static formatValue(dataView) {
    const object = dataView?.metadata?.objects;
    if (object) {
      const format = object.manoProps.format ?? "D";
      const theme = object.manoProps.theme ?? "Light";
      return { format, theme };
    }
    return { format: "D", theme: "Light" };
  }
  public static getFormatValue(format) {
    switch (format) {
      case "K":
        return 1000;
      case "L":
        return 100000;
      case "M":
        return 1000000;
      default:
        return 1;
    }
  }
}
export default GridUtils;
