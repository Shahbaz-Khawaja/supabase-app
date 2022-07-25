import React from "react";
import PropTypes from "prop-types";
import { Card, Grid, Typography } from "@mui/material";
import { style } from "components/UserInformation/UserInformation.style";

const UserInformation = ({ userDetails }) => {
  return (
    <Card sx={{ ...style.user }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h3" color={"primary.main"}>
            Personal Details
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3">Full Name</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">
            {userDetails.full_name || "Not Set"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3">Permanent Address</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">
            {userDetails.permanent_address || "Not Set"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3">Contact No</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">
            {userDetails.contact_no || "Not Set"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3">Birthdate</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">
            {userDetails.birthdate || "Not Set"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3">Qualificaton</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">
            {userDetails.qualification || "Not Set"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3">About</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">
            {userDetails.about || "Not Set"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="h3" color={"primary.main"}>
            Employment Details
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3">Job Title</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">
            {userDetails.job_title || "Not Set"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3">Typical Working Hours</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">
            {userDetails.typical_working_hours || "Not Set"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3">Location</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">
            {userDetails.location || "Not Set"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3">Technical Stack</Typography>
        </Grid>
        <Grid item xs={8} sx={{ display: "flex" }}>
          {userDetails.technical_stack?.map((stack) => (
            <Typography variant="body2" key={stack}>
              {stack},
            </Typography>
          ))}
          {/* <Typography variant="body2">
                {userDetails.technical_stack || "Not Set"}
              </Typography> */}
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3">Employment Date</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">
            {userDetails.employment_date || "Not Set"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="h3" color={"primary.main"}>
            Banking Details
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3">Bank Account Name</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">
            {userDetails.bank_account_name || "Not Set"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3">Bank Account No</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">
            {userDetails.bank_account_no || "Not Set"}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserInformation;

UserInformation.propTypes = {
  userDetails: PropTypes.object.isRequired,
};
