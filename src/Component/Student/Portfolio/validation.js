import * as yup from "yup";

const schema = yup.object().shape({
    Name: yup.string().required(),
    Description: yup.string().required(),
    categoryName: yup.string().email().required(),
    password: yup.string().min(6).required(),
});

export default schema;
