import NumberFormat from "react-number-format";

export const PhoneField = ({ inputRef, onChange, ...other }: any) => (
  <NumberFormat
    {...other}
    getInputRef={inputRef}
    onValueChange={(values: any) => {
      onChange({
        target: {
          name: other.name,
          value: values.value,
        },
      });
    }}
    format="(###) ###-####"
  />
);
