import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import { style } from "components/UserInformation/UserInformation.style";
import { userDetailPropType } from "utils/constants/prop-types.constant";
import CustomDisplayText from "components/CustomDisplayText/CustomDisplayText";

const UserInformation = ({ userDetails }) => {
  return (
    <Card sx={{ ...style.user }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h3" color={"primary.main"}>
            Personal Details
          </Typography>
        </Grid>
        <CustomDisplayText label={"Full Name"} value={userDetails.full_name} />
        <CustomDisplayText
          label={"Permanent Address"}
          value={userDetails.permanent_address}
        />

        <CustomDisplayText label={"Birthdate"} value={userDetails.birthdate} />
        <CustomDisplayText
          label={"Qualificaton"}
          value={userDetails.qualification}
        />
        <CustomDisplayText label={"About"} value={userDetails.about} />

        <Grid item xs={12} md={12}>
          <Typography variant="h3" color={"primary.main"}>
            Employment Details
          </Typography>
        </Grid>

        <CustomDisplayText label={"Job Title"} value={userDetails.job_title} />
        <CustomDisplayText
          label={"Typical Working Hours"}
          value={userDetails.typical_working_hours}
        />
        <CustomDisplayText label={"Location"} value={userDetails.location} />
        <CustomDisplayText
          label={"Technical Stack"}
          value={userDetails.technical_stack}
        />
        <CustomDisplayText
          label={"Employment Date"}
          value={userDetails.employment_date}
        />

        <Grid item xs={12} md={12}>
          <Typography variant="h3" color={"primary.main"}>
            Banking Details
          </Typography>
        </Grid>

        <CustomDisplayText
          label={"Bank Account Name"}
          value={userDetails.bank_account_name}
        />
        <CustomDisplayText
          label={"Bank Account No"}
          value={userDetails.bank_account_no}
        />
      </Grid>
    </Card>
  );
};

export default UserInformation;

UserInformation.propTypes = {
  userDetails: userDetailPropType,
};
