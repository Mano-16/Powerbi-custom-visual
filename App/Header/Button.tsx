import React from "react";
const Button = (props: { title: string; id: string; handler: () => void }) => {
  const { title, handler, id } = props;
  return (
    <button style={{ backgroundColor: "#ddddd" }} onClick={handler}>
      {title}
    </button>
  );
};

export default Button;
