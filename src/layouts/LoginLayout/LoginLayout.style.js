import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    loginPage: {
      display: "flex",
    },

    login: {
      width: "50vw",
      height: "100vh",
      backgroundColor: theme.palette.secondary.main,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    headerLogo: {
      alignSelf: "flex-start",
      width: "100%",
      position: "absolute",
      top: 0,
    },
    slider: {
      width: "50vw",
      height: "100vh",
      backgroundColor: theme.palette.primary.main,
      display: "flex",
      justifyContent: "center",
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: "25%",
    },
  };
});

export const style = {
  loginPage: {
    display: "flex",
  },

  login: {
    width: "50vw",
    height: "100vh",
    backgroundColor: "secondary.main",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headerLogo: {
    alignSelf: "flex-start",
    width: "100%",
    position: "absolute",
    top: 0,
  },
  slider: {
    width: "50vw",
    height: "100vh",
    backgroundColor: "primary.main",
    display: "flex",
    justifyContent: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: "25%",
  },
};
