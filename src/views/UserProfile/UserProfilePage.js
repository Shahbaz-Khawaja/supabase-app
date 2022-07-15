import { Formik, Form } from "formik";
import { getUserDetails } from "store";
import React, { useEffect, useState } from "react";
import { supabase } from "supabase/supabase_client";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "components/ProgressBar/ProgressBar";
import { style } from "views/UserProfile/UserProfilePage.style";
import { locations, jobTitles } from "utils/constants/constants";
import CustomTextField from "components/CustomTextField/CustomTextField";
import { userInformationSchema } from "utils/schemas/user_information_schema";
import { Avatar, Box, Button, Typography, Divider, Grid } from "@mui/material";
import CustomSelectTextField from "components/CustomSelectTextField/CustomSelectTextField";

const UserProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const userDetails = useSelector((state) => state.userReducer.userDetails);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data: userDetails } = await supabase
        .from("Employee")
        .select(
          `full_name, permanent_address, contact_no, birthdate, job_title, typical_working_hours, location, qualification, employment_date`
        )
        .match({ user_id: user.id });
      dispatch(getUserDetails(userDetails[0]));
      setLoading(false);
    };
    fetchUserDetails();
  }, [dispatch, user.id]);

  const submitHandler = async (values) => {
    const { error } = await supabase
      .from("Employee")
      .update({
        full_name: values.fullName,
        permanent_address: values.permanentAddress,
        contact_no: values.contactNo,
        birthdate: values.birthDate,
        job_title: values.jobTitle,
        typical_working_hours: values.typicalWorkingHours,
        location: values.location,
        qualification: values.qualification,
        employment_date: values.employmentDate,
      })
      .match({ user_id: user.id });
    if (error) throw error;
    alert("updated details successfully", 2000);
  };

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <>
      <div style={{ ...style.head }}>
        <Typography variant="h2" color="primary.main">
          Set your Profile
        </Typography>
        <Typography variant="h6">
          Update your Photo and personal details here.
        </Typography>
      </div>
      <div style={{ ...style.mainContent }}>
        <div style={{ ...style.profilePhoto }}>
          <Avatar alt="user-profile" sx={{ ...style.avatar }}></Avatar>
          <Box>
            <Button variant="outlined" type="file">
              Upload Photo
            </Button>
          </Box>
        </div>

        <div style={{ ...style.editProfile }}>
          <Formik
            initialValues={{
              fullName: userDetails.full_name ?? "",
              permanentAddress: userDetails.permanent_address ?? "",
              contactNo: userDetails.contact_no ?? "",
              birthDate: userDetails.birthdate ?? "",
              jobTitle: userDetails.job_title ?? jobTitles[0],
              typicalWorkingHours: userDetails.typical_working_hours ?? "",
              location: userDetails.location ?? locations[0],
              qualification: userDetails.qualification ?? "",
              employmentDate: userDetails.employment_date ?? "",
            }}
            validationSchema={userInformationSchema}
            onSubmit={submitHandler}
          >
            {() => (
              <Form>
                <Box sx={{ ...style.form }}>
                  <Grid container spacing={2}>
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
                      <CustomSelectTextField
                        name="jobTitle"
                        label="Job Title"
                        items={jobTitles}
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
                        items={locations}
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
                        type="date"
                        label="Employment Date"
                        name="employmentDate"
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Divider />

                <Box sx={{ ...style.updateDetails }}>
                  <Button
                    variant="contained"
                    type="submit"
                    size="small"
                    sx={{ ...style.saveBtn }}
                  >
                    Update Profile
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
