import * as yup from 'yup';

export const validationSchema = yup.object().shape({
    email: yup.string().email('Enter a valid Email!').required('Email is required')
})