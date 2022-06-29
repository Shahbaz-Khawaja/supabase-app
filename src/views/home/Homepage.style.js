import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  loginPage: {
    display: "flex",
  },
  login: {
    width: "50vw",
    height: "100vh",
    backgroundColor: "rgb(249 249 251)",
  },
  loginContent: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
    margin: "18vh auto",
  },
  textLogin: {
    fontSize: "30px",
    fontWeight: "bold",
    lineHeight: "41px",
    letterSpacing: "0.3px",
  },
  sladder: {
    width: "50vw",
    height: "100vh",
    backgroundColor: "#8D348E",
  },
});
