import React from "react";
import Button from "./Button";
import GridUtils from "../Utils";

const Header = (props) => {
  const style = {
    width: `${props.width}px`,
    display: "flex",
    justifyContent: "space-between",
    height: "40px",
    border: "1px solid #dddddd",
    marginBottom: "2px",
    minWidth: "300px",
  };
  const formattingHandler = (e) => {
    const value = e.target.value;
    GridUtils.persistProperty(props.theme, value);
  };
  const themeHandler = () => {
    const value = props.theme === "Dark" ? "Light" : "Dark";
    GridUtils.persistProperty(value, props.format);
  };
  const buttonsConfig = {
    name: `${props.theme === "Dark" ? "Light" : "Dark"} Theme`,
    handler: themeHandler,
  };

  return (
    <div style={{ ...style }}>
      <select value={props.format} onChange={formattingHandler}>
        <option value="D">Default</option>
        <option value="K">In Thousands</option>
        <option value="L">In Lakhs</option>
        <option value="M">In Millions</option>
      </select>

      <Button
        id={buttonsConfig.name}
        title={buttonsConfig.name}
        handler={buttonsConfig.handler}
      ></Button>
    </div>
  );
};

export default Header;
