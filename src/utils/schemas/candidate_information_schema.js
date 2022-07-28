import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SUPPORTEDFORMAT = ["application/pdf"];

export const candidateInformationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(5, "Too short - should be 5 characters minimun")
    .max(30, "Too Long - should be 30 characters maximum")
    .matches(/^[a-zA-Z ]+$/, "Invalid Name"),
  currentCity: yup
    .string()
    .min(5, "Too short - should be 5 characters minimun")
    .max(100, "Too Long - should be 100 characters maximum"),
  contactNo: yup.string().matches(phoneRegExp, "Contact number is not valid"),
  birthDate: yup.date("Invalid date"),
  qualification: yup
    .string()
    .max(50, "Too Long - should be 50 characters maximum"),
  intrests: yup.string(),
  resume: yup
    .mixed()
    .nullable()
    .test(
      "FILE_SIZE",
      "Maximum allowed size is 1MB",
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      "FILE_FORMAT",
      "Uploaded file has unsupported Format.",
      (value) => !value || (value && SUPPORTEDFORMAT.includes(value?.type))
    ),
});
