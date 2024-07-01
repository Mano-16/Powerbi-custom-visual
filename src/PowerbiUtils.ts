import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualHost = powerbiVisualsApi.extensibility.visual.IVisualHost;
import ISelectionManager = powerbiVisualsApi.extensibility.ISelectionManager;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;

class PowerbiUtils {
  public static host: IVisualHost;
  private static selectionHandler: ISelectionManager;
  public static dataView;
  constructor(options: VisualConstructorOptions) {
    PowerbiUtils.host = options.host;
    PowerbiUtils.selectionHandler = options.host.createSelectionManager();
  }
  public static selectionUpdate(selectionId, isMultiSelect, type) {
    const rows = this.dataView.matrix.rows.root.children;
    const columns = this.dataView.matrix.columns.root.children;
    let selectedValue;
    let levels;
    if (type === "row") {
      selectedValue = rows.find((row) => row.value === selectionId);
      levels = this.dataView.matrix.rows.levels;
    } else if (type === "column") {
      selectedValue = columns.find((column) => column.value === selectionId);
      levels = this.dataView.matrix.columns.levels;
    }
    if (selectedValue && levels) {
      const selectionId = this.host
        .createSelectionIdBuilder()
        .withMatrixNode(selectedValue, levels)
        .createSelectionId();
      this.selectionHandler.select(selectionId, isMultiSelect);
    }
  }
  static persist(theme, format) {
    PowerbiUtils.host.persistProperties({
      merge: [
        {
          objectName: "manoProps",
          selector: null,
          properties: {
            theme: theme,
            format: format,
          },
        },
      ],
    });
  }
}
export default PowerbiUtils;
