import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    mainContent: {
      marginTop: "1rem",
      display: "flex",
      justifyContent: "center",
    },
    user: {
      width: "90%",
      display: "flex",
      margin: "0.8rem auto",
      justifyContent: "space-between",
      alignItems: "center",
    },
    usersList: {
      width: "90%",
      margin: "1rem auto",
    },
    statistics: {
      display: "flex",
      gap: "1.5rem",
      width: "90%",
      margin: "0.5rem auto",
    },
  };
});

export const style = {
  statusCard: {
    p: "1rem",
    width: "180px",
    mb: "0.5rem",
  },
  noOfUsers: {
    p: "0.7rem 0rem",
  },
};
