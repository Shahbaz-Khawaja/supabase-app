import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    mainContent: {
      marginTop: "2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    user: {
      width: "80%",
      display: "flex",
      justifyContent: "space-between",
    },
  };
});
