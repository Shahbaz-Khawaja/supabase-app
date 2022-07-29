import React, { useRef, useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, Grid, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomTextField from "components/CustomTextField/CustomTextField";
import { candidateInformationSchema } from "utils/schemas/candidate_information_schema";
import { style } from "components/Forms/UpdateCadidateProfileForm/UpdateCadidateProfileForm.style";
import { supabase } from "supabase/supabase_client";
import DoneIcon from "@mui/icons-material/Done";
import PropTypes from "prop-types";
import CustomProgressButton from "components/CustomProgressButton/CustomProgressButton";
import { getUserDetails } from "store";

const UpdateCadidateProfileForm = ({ setMessage, handleOpenSnackBar }) => {
  const dispatch = useDispatch();
  const fileRef = useRef();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.authReducer.user);
  const userDetails = useSelector((state) => state.userReducer.userDetails);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("Candidate")
        .update({
          full_name: values.fullName,
          current_city: values.currentCity,
          contact_no: values.contactNo,
          qualification: values.qualification,
          birthdate: values.birthdate || null,
          intrests: values.intrests,
        })
        .match({ user_id: user.id });
      if (error) throw error;
      dispatch(getUserDetails(data[0]));

      if (values.resume) {
        let resumeURL = "";
        if (userDetails.resume_url) {
          const resumeURI = userDetails.resume_url.replace("resumes/", "");
          const { error } = await supabase.storage
            .from("resumes")
            .remove([resumeURI]);
          if (error) throw error;
        }
        const { data, error } = await supabase.storage
          .from("resumes")
          .upload(`${Date.now()}_${values.resume.name}`, values.resume);
        if (error) throw error;
        resumeURL = data.Key;

        const { data: candidate } = await supabase
          .from("Candidate")
          .update({ resume_url: resumeURL })
          .match({ user_id: user.id });
        dispatch(getUserDetails(candidate[0]));
      }
      setLoading(false);
      setMessage("Updated User Details Successfully.");
      handleOpenSnackBar();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={{
        fullName: userDetails.full_name ?? "",
        contactNo: userDetails.contact_no ?? "",
        currentCity: userDetails.current_city ?? "",
        birthdate: userDetails.birthdate ?? "",
        qualification: userDetails.qualification ?? "",
        intrests: userDetails.intrests ?? "",
        resume: userDetails.resume ?? "",
      }}
      validationSchema={candidateInformationSchema}
      onSubmit={submitHandler}
    >
      {({ values, setFieldValue }) => (
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
                  name="currentCity"
                  label="Current City"
                  placeholder="e.g, City"
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
                  name="birthdate"
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
                  name="intrests"
                  label="Intrests"
                  placeholder="e.g your Intrests"
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <Typography variant="h3" color={"primary.main"}>
                  Uploads
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: "1rem",
                    textAlign: "center",
                    border: "2px dashed grey",
                    borderRadius: "4px",
                  }}
                >
                  <Typography variant="h2" color="primary.main">
                    Upload your Resume
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.8rem",
                      mt: "0.8rem",
                      mb: "0.8rem",
                    }}
                  >
                    <Typography variant="body2">
                      {values.resume
                        ? values.resume.name
                        : userDetails.resume_url &&
                          userDetails.resume_url.replace("resumes/", "")}
                    </Typography>

                    <input
                      hidden
                      type="file"
                      ref={fileRef}
                      onChange={(e) => {
                        setFieldValue("resume", e.target.files[0]);
                      }}
                    />
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => fileRef.current.click()}
                    >
                      {values.resume
                        ? "choose File"
                        : userDetails.resume_url
                        ? "choose different File"
                        : "choose File"}
                    </Button>
                  </Box>
                  <ErrorMessage
                    name="resume"
                    render={(msg) => (
                      <Typography variant="body2" color="error">
                        {msg}
                      </Typography>
                    )}
                  />

                  <Typography variant="body2">
                    Accepted file Type: PDF only
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>

          <Box sx={{ ...style.updateDetails }}>
            <CustomProgressButton
              type="submit"
              variant="contained"
              icon={<DoneIcon />}
              size="small"
              title="Save"
              loading={loading}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateCadidateProfileForm;
UpdateCadidateProfileForm.propTypes = {
  setMessage: PropTypes.func,
  handleOpenSnackBar: PropTypes.func,
};
