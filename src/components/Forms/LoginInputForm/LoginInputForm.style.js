import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    field: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: "1rem",
    },
    form: {
      marginTop: "2rem",
      backgroundColor: "#F8F8F8",
    },
    forgotPassword: {
      textAlign: "right",
      paddingBottom: "2rem",
    },
    loginActions: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "1rem",
    },
    link: {
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