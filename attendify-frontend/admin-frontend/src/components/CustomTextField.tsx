import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const CustomTextField = (props: React.PropsWithChildren<TextFieldProps>) => {
  return (
    <TextField
      {...props}
      sx={{
        ...props.sx,

        borderColor: "#91C8E4",

        "& label": {
          color: "#4682A9",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#91C8E4", // Access theme color
            color: "#91C8E4",
          },
        },
        "& .MuiOutlinedInput-input": {
          color: "#4682A9", // Access theme color
        },
      }}
    />
  );
};

export default CustomTextField;
