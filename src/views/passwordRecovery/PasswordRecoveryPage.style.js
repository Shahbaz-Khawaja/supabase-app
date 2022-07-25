import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    mainContent: {
      display: "flex",
      flexDirection: "column",
      width: "65%",
      margin: "0 auto",
    },
    inputForm: {
      marginTop: "3rem",
    },
    center: {
      marginTop: "2rem",
      textAlign: "center",
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

export const style = {
  loginBtn: {
    fontSize: "14px",
    padding: "4px 6px",
  },
};
