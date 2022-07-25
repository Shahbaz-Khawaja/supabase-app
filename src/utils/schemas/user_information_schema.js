import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const userInformationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(5, "Too short - should be 5 characters minimun")
    .max(30, "Too Long - should be 30 characters maximum")
    .matches(/^[a-zA-Z ]+$/, "Invalid Name"),
  permanentAddress: yup
    .string()
    .min(5, "Too short - should be 5 characters minimun")
    .max(100, "Too Long - should be 100 characters maximum"),
  contactNo: yup.string().matches(phoneRegExp, "Contact number is not valid"),
  birthDate: yup.date("Invalid date"),
  qualification: yup
    .string()
    .max(50, "Too Long - should be 50 characters maximum"),
  about: yup.string(),
  jobTitle: yup.string(),
  typicalWorkingHours: yup
    .number()
    .typeError("you must specify a number")
    .min(4, "Too short - should be 4 Hours minimun")
    .max(10, "Too Long - should be 10 Hours maximum"),
  location: yup.string(),
  employmentDate: yup.date("Invalid date"),
  technicalStack: yup.array().of(yup.string()),
  bankAccountName: yup.string().matches(/^[a-zA-Z ]+$/, "Invalid Bank Name"),
  bankAccountNo: yup
    .string()
    .min(14, "Account No have 14 Character only")
    .max(14, "Account No have 14 Character only")
    .matches(/^[0-9]+$/, "Invalid Account Number"),
});
