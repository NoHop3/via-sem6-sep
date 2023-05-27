import Backdrop from "@mui/material/Backdrop";
import { StyledCircularProgress } from "../../../styles";

export const _Backdrop = () => {
  return (
    <div>
      <Backdrop
        open={true}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <StyledCircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
