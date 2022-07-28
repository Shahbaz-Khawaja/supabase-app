export const style = {
  userDetails: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    margin: "1.2rem auto",
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    "&.MuiCardContent-root:last-child": {
      pb: "16px",
    },
  },
  avatar: {
    height: "10vw",
    width: "10vw",
  },
  editProfileBtn: {
    display: "inline",
    cursor: "pointer",
    textDecoration: "underline",
  },
  link: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    gap: "5px",
    textDecoration: "none",
    fontSize: "13.5px",
    fontWeight: "500",
  },
  profileLink: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  editIconBtn: {
    color: "primary.light",
    borderRadius: "50%",
    backgroundColor: "primary.main",
    "&:hover": {
      backgroundColor: "primary.main",
    },
  },
  profileActions: {
    display: "flex",
    justifyContent: "center",
    gap: "5px",
    mt: "8px",
  },
};
