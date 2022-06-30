import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme) => {
  return {
    logoHeader: {
      display: "flex",
      alignItems: "center",
      padding: "0.675rem 1rem",
      backgroundColor: theme.palette.common.white,
    },
  };
});

export const style = {
  height: "25px",
  width: "180px",
};
