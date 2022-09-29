import * as yup from "yup";

const schema = yup.object().shape({
  login: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default schema;
