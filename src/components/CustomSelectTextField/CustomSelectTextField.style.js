import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  field: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "0.5rem",
  },
  textField: {
    color: "green",
    "& .MuiInputBase-root-MuiOutlinedInput-root": {
      color: "red",
    },
  },
});

export const style = {
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    marginRight: "3.5rem",
  },
  textField: {
    width: "267px",
    "& .MuiSelect-select": {
      fontSize: "14px",
      backgroundColor: "white",
      padding: "7.2px 12px",
    },
    "& .MuiSvgIcon-root": {
      //   backgroundColor: "red",
      //   padding: "0px",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      fontSize: "0.75rem",
      textAlign: "right",
      margin: "0px",
    },
  },
  menuItem: {
    fontSize: "14px",
  },
};
