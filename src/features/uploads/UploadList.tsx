import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { useAppSelector } from "../../app/hooks";
import { LinearProgressWithLabel } from "../../components/Progress";
import { selectUploads } from "./UploadSlice";

type Upload = {
  name: string;
  progress: number;
};

type Props = {
  uploads?: Upload[];
};

export const UploadList: React.FC<Props> = () => {
  const uploadList = useAppSelector(selectUploads);

  if (!uploadList || uploadList.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        right: 0,
        zIndex: 9,
        "@media (min-width: 600px)": {
          width: 450,
        },
      }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<GridExpandMoreIcon />}
          aria-controls="upload-content"
        >
          <Typography>Uploads</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {uploadList.map((upload, index) => (
              <Box key={index}>
                <Typography>{upload.field}</Typography>
                <ListItem>
                  <Box sx={{ width: "100%" }}>
                    <LinearProgressWithLabel value={upload.progress} />
                  </Box>
                </ListItem>
              </Box>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
