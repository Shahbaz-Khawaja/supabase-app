import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
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
  field: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "1rem",
  },
  form: {
    marginTop: "2rem",
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
  loginBtn: {
    fontSize: "14px",
    padding: "4px 6px",
  },
};
