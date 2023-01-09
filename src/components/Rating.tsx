import { Box, Typography } from "@mui/material";

const backgroundColors = {
  L: "#39B549",
  "10": "#20A3D4",
  "12": "#E79738",
  "14": "#E35E00",
  "16": "#d00003",
  "18": "#000000",
};

interface RatingProps {
  rating: "L" | "10" | "12" | "14" | "16" | "18";
}

export const Rating: React.FC<RatingProps> = (props) => {
  return (
    <Box
      sx={{
        "& > :first-child": {
          mr: 0,
        },
        width: 40,
        height: 40,
        backgroundColor: backgroundColors[props.rating],
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>{props.rating}</Typography>
    </Box>
  );
};
