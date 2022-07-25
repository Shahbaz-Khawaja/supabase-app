import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    mainContent: {
      display: "flex",
      flexDirection: "column",
      width: "65%",
      margin: "0px auto",
    },
    inputForm: {
      marginTop: "2rem",
    },
    action: {
      marginTop: "1rem",
      display: "flex",
      justifyContent: "center",
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
