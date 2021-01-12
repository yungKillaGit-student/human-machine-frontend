import React from "react";
import { Typography } from "@material-ui/core";

interface Props {
  data: string;
  symbol?: string;
  label: string;
}

const MaskedInfoLabel = ({ data, symbol = "*", label }: Props) => {
  return (
    <Typography>
      {
        `${label} ${symbol.repeat(data.length)}`
      }
    </Typography>
  );
};

export default MaskedInfoLabel;
