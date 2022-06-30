import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
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
});

export const style = {
  label: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  loginBtn: {
    fontSize: "14px",
    padding: "4px 6px",
  },
};
