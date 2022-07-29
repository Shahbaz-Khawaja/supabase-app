import PropTypes from "prop-types";

export const userDetailPropType = PropTypes.shape({
  user_id: PropTypes.string,
  emp_id: PropTypes.number,
  full_name: PropTypes.string,
  birthdate: PropTypes.string,
  contact_no: PropTypes.string,
  permanent_address: PropTypes.string,
  qualification: PropTypes.string,
  about: PropTypes.string,
  job_title: PropTypes.string,
  location: PropTypes.string,
  technical_stack: PropTypes.arrayOf(PropTypes.string),
  employment_date: PropTypes.string,
  typical_working_hours: PropTypes.string,
  bank_account_name: PropTypes.string,
  bank_account_no: PropTypes.string,
});

export const viewedUserPropType = PropTypes.shape({
  id: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
  priority: PropTypes.string,
  previousStatus: PropTypes.string,
  currentStatus: PropTypes.string,
  avatarURL: PropTypes.string,
});
