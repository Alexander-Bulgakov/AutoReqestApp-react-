import React from "react";
import { IMaskInput } from "react-imask";

  // interface CustomProps {
  //   onChange: (event: { target: { name: string; value: string } }) => void;
  //   name: string;
  // }

const MaskedInput = React.forwardRef(
  function TextMaskCustom(props, ref) {
    const {  ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="0000 000000"
        // definitions={{
        //   '#': /[1-9]/,
        // }}
        // inputRef={ref}
        // overwrite
      />
    );
  },
);

export default MaskedInput;