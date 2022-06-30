import { makeStyles } from "@mui/styles";

export const useHelperTextStyles = makeStyles(() => ({
  root: {
    color: "green",
  },
}));

export const useStyles = makeStyles({
  field: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "0.5rem",
  },
});

export const style = {
  textField: {
    fontSize: "14px",
    padding: "7.2px 12px",
    width: "244px",
    backgroundColor: "white",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  helperText: {
    "& .MuiFormHelperText-root.Mui-error": {
      fontSize: "0.75rem",
      textAlign: "right",
      margin: "0px",
    },
  },
};
