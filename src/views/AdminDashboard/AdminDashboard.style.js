import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    mainContent: {
      marginTop: "2rem",
      display: "flex",
      justifyContent: "center",
    },
    user: {
      width: "80%",
      display: "flex",
      margin: "1rem 4rem",
      justifyContent: "space-between",
      alignItems: "center",
    },
    usersList: {
      margin: "1rem 4rem",
    },
  };
});
