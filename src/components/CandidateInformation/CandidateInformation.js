import React from "react";
import { supabase } from "supabase/supabase_client";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DownloadIcon from "@mui/icons-material/Download";
import { SUPABASE_STORAGE_URL } from "utils/constants/path.constant";
import { userDetailPropType } from "utils/constants/prop-types.constant";
import {
  Box,
  Card,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomDisplayText from "components/CustomDisplayText/CustomDisplayText";
import { style } from "components/CandidateInformation/CandidateInformation.style";

const CandidateInformation = ({ userDetails }) => {
  const saveFile = async (blob, resume) => {
    const a = document.createElement("a");
    a.download = resume;
    a.href = URL.createObjectURL(blob);
    a.addEventListener("click", (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };

  const handleResumeDownload = async (resume) => {
    const { data, error } = await supabase.storage
      .from("public")
      .download(resume);

    if (error) throw error;
    saveFile(data, resume);
  };

  return (
    <Card sx={{ ...style.user }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h3" color={"primary.main"}>
            Personal Details
          </Typography>
        </Grid>
        <CustomDisplayText label={"Full Name"} value={userDetails?.full_name} />
        <CustomDisplayText
          label={"Current City"}
          value={userDetails?.current_city}
        />

        <CustomDisplayText
          label={"Contact No"}
          value={userDetails?.contact_no}
        />
        <CustomDisplayText label={"Birthdate"} value={userDetails?.birthdate} />
        <CustomDisplayText
          label={"Qualificaton"}
          value={userDetails?.qualification}
        />
        <CustomDisplayText label={"Intrests"} value={userDetails?.intrests} />

        <Grid item xs={12} md={12}>
          <Typography variant="h3" color={"primary.main"}>
            Uploads
          </Typography>
        </Grid>

        <Grid container></Grid>

        <Grid
          item
          xs={3.8}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">Resume</Typography>
        </Grid>
        <Grid item xs={8}>
          {userDetails?.resume_url ? (
            <Box sx={{ display: "flex", gap: "4px" }}>
              <Tooltip title="Download">
                <IconButton
                  size="large"
                  onClick={() => handleResumeDownload(userDetails?.resume_url)}
                >
                  <DownloadIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="View Resume">
                <IconButton
                  onClick={() =>
                    window.open(
                      `${SUPABASE_STORAGE_URL}${userDetails.resume_url}`
                    )
                  }
                >
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Typography variant="body2">Not Uploaded yet</Typography>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default CandidateInformation;

CandidateInformation.propTypes = {
  userDetails: userDetailPropType,
};
