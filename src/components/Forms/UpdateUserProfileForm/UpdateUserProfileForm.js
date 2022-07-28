import { Formik, Form } from "formik";
import React, { useState } from "react";
import PropTypes from "prop-types";
import DoneIcon from "@mui/icons-material/Done";
import { supabase } from "supabase/supabase_client";
import STATUS from "utils/constants/status.constant";
import { useSelector, useDispatch } from "react-redux";
import LOCATIONS from "utils/constants/locations.constant";
import JOB_TITLES from "utils/constants/jobTitle.constant";
import { updateCurrentUserStatus, getUserDetails } from "store";
import TECHNICAL_STACK from "utils/constants/technicalStack.constant";
import CustomTextField from "components/CustomTextField/CustomTextField";
import { userDetailPropType } from "utils/constants/prop-types.constant";
import { Box, Typography, Divider, Grid, Card } from "@mui/material";
import { userInformationSchema } from "utils/schemas/user_information_schema";
import { style } from "components/Forms/UpdateUserProfileForm/UpdateUserProfileForm.style";
import CustomSelectTextField from "components/CustomSelectTextField/CustomSelectTextField";
import CustomProgressButton from "components/CustomProgressButton/CustomProgressButton";

const UpdateUserProfileForm = ({
  userDetails,
  setMessage,
  handleOpenSnackBar,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.authReducer.user);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data: userDetails } = await supabase
        .from("Employees")
        .update({
          full_name: values.fullName,
          permanent_address: values.permanentAddress,
          contact_no: values.contactNo,
          birthdate: values.birthDate || null,
          job_title: values.jobTitle,
          technical_stack: values.technicalStack,
          typical_working_hours: values.typicalWorkingHours,
          location: values.location,
          qualification: values.qualification,
          employment_date: values.employmentDate || null,
          about: values.about,
        })
        .match({ user_id: user.id });

      const { data: userBankingDetails } = await supabase
        .from("Banking Info")
        .update({
          bank_account_name: values.bankAccountName,
          bank_account_no: values.bankAccountNo,
        })
        .match({ user_id: user.id });

      const { data } = await supabase.auth.update({
        data: {
          currentStatus: STATUS.onBoarded,
          previousStatus: STATUS.onBoarded,
        },
      });
      dispatch(updateCurrentUserStatus(data.user_metadata.currentStatus));
      const userInformation = { ...userDetails[0], ...userBankingDetails[0] };
      dispatch(getUserDetails(userInformation));
      setLoading(false);
      setMessage("Updated User Details Successfully.");
      handleOpenSnackBar();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        fullName: userDetails.full_name ?? "",
        permanentAddress: userDetails.permanent_address ?? "",
        contactNo: userDetails.contact_no ?? "",
        birthDate: userDetails.birthdate ?? "",
        jobTitle: userDetails.job_title ?? JOB_TITLES[0],
        qualification: userDetails.qualification ?? "",
        about: userDetails.about ?? "",
        technicalStack: userDetails.technical_stack ?? [],
        typicalWorkingHours: userDetails.typical_working_hours ?? "",
        location: userDetails.location ?? LOCATIONS[0],
        employmentDate: userDetails.employment_date ?? "",
        bankAccountName: userDetails.bank_account_name ?? "",
        bankAccountNo: userDetails.bank_account_no ?? "",
      }}
      validationSchema={userInformationSchema}
      onSubmit={submitHandler}
    >
      {() => (
        <Form>
          <Card sx={{ ...style.form }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography variant="h3" color={"primary.main"}>
                  Personal Details
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  name="fullName"
                  label="Full Name"
                  placeholder="e.g abc"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  name="permanentAddress"
                  label="Permanent Address"
                  placeholder="e.g House No #, City"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  name="contactNo"
                  label="Contact No"
                  placeholder="e.g 0301-9090290"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  type="date"
                  label="BirthDate"
                  name="birthDate"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  name="qualification"
                  label="Qualification"
                  placeholder="e.g Bs. Computer Science"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  multiline
                  name="about"
                  label="About"
                  placeholder="e.g Bs. about yourself"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="h3" color={"primary.main"}>
                  Employment Details
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelectTextField
                  name="jobTitle"
                  label="Job Title"
                  items={JOB_TITLES}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  type="number"
                  name="typicalWorkingHours"
                  label="Typical Working Hours"
                  placeholder="e.g 4-10"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelectTextField
                  name="location"
                  label="Location"
                  items={LOCATIONS}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <CustomTextField
                  type="date"
                  label="Employment Date"
                  name="employmentDate"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelectTextField
                  multiline
                  multiple
                  label="Technical Stack"
                  name="technicalStack"
                  items={TECHNICAL_STACK}
                  SelectProps={{ multiple: true }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="h3" color={"primary.main"}>
                  Banking Details
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Bank Account Name"
                  name="bankAccountName"
                  placeholder="e.g Askari Bank"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Bank Account No"
                  name="bankAccountNo"
                  placeholder="e.g 14 digit account No"
                />
              </Grid>
            </Grid>
          </Card>
          <Divider />

          <Box sx={{ ...style.updateDetails }}>
            <CustomProgressButton
              type="submit"
              title="Save Profile"
              loading={loading}
              icon={<DoneIcon />}
              style={style.saveBtn}
              size="small"
              variant="contained"
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateUserProfileForm;
UpdateUserProfileForm.propTypes = {
  userDetails: userDetailPropType,
  setMessage: PropTypes.func,
  handleOpenSnackBar: PropTypes.func,
};
