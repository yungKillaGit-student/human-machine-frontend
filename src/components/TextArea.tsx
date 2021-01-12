import React from "react";
import { TextareaAutosize } from "@material-ui/core";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({ value, onChange }: Props) => {
  return (
    <TextareaAutosize
      value={value}
      onChange={onChange}
      rows={6}
      style={{ width: "97%", resize: "none" }}
    />
  );
};

export default TextArea;
