import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const userInformationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(5, "Too short - should be 5 characters minimun")
    .max(30, "Too Long - should be 30 characters maximum")
    .required("Full Name is required")
    .matches(/^[a-zA-Z ]+$/, "Invalid Name"),
  permanentAddress: yup
    .string()
    .min(5, "Too short - should be 5 characters minimun")
    .max(100, "Too Long - should be 100 characters maximum")
    .required("Permanent Address is required"),
  contactNo: yup
    .string()
    .required("Contact No is Required")
    .matches(phoneRegExp, "Contact number is not valid"),
  birthDate: yup.date("Invalid date").required("Birthdate is Required"),
  jobTitle: yup.string().required("JobTitle is Required"),
  typicalWorkingHours: yup
    .number()
    .typeError("you must specify a number")
    .min(4, "Too short - should be 4 Hours minimun")
    .max(10, "Too Long - should be 10 Hours maximum")
    .required("Working hours are required"),
  location: yup.string(),
  qualification: yup
    .string()
    .max(50, "Too Long - should be 50 characters maximum")
    .required(),
  employmentDate: yup
    .date("Invalid date")
    .required("Employment Date is Required"),
});
