import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    loginContent: {
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      width: "65%",
      margin: "0 auto",
    },
    inputForm: {
      marginTop: "2.5rem",
    },
    action: {
      marginTop: "2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: "none",
      fontSize: "13.5px",
      fontWeight: "500",
      "&:active": {
        color: theme.palette.primary.main,
      },
    },
  };
});
