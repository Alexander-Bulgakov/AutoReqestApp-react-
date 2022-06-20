import React from "react";
import { IMaskInput } from "react-imask";

const MaskedInput = React.forwardRef(
  function TextMaskCustom(props, ref) {
    const {  ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="0000 000000"
      />
    );
  },
);

export default MaskedInput;