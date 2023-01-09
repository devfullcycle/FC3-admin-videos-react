import { FormControlLabel, FormControlLabelProps, Radio } from "@mui/material";
import { Rating } from "./Rating";

const ratings: FormControlLabelProps[] = [
  {
    value: "L",
    control: <Radio color="primary" />,
    label: <Rating rating="L" />,
    labelPlacement: "top",
  },
  {
    value: "10",
    control: <Radio color="primary" />,
    label: <Rating rating="10" />,
    labelPlacement: "top",
  },
  {
    value: "12",
    control: <Radio color="primary" />,
    label: <Rating rating="12" />,
    labelPlacement: "top",
  },
  {
    value: "14",
    control: <Radio color="primary" />,
    label: <Rating rating="14" />,
    labelPlacement: "top",
  },
  {
    value: "16",
    control: <Radio color="primary" />,
    label: <Rating rating="16" />,
    labelPlacement: "top",
  },
  {
    value: "18",
    control: <Radio color="primary" />,
    label: <Rating rating="18" />,
    labelPlacement: "top",
  },
];

export function RatingsList({ isDisabled }: { isDisabled?: boolean }) {
  return (
    <>
      {ratings.map((rating, index) => (
        <FormControlLabel
          key={index}
          value={rating.value}
          control={rating.control}
          label={rating.label}
          labelPlacement={rating.labelPlacement}
          disabled={isDisabled}
          sx={{
            ...(index === 0 && { ml: 0 }),
            ...(index === ratings.length - 1 && { mr: 0 }),
          }}
        />
      ))}
    </>
  );
}
