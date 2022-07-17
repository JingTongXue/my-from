import _Form from "./Form";
import Field from "./Field";
import useForm from "./useFrom";
import React from "react";

// const Form = _Form;

const Form = React.forwardRef(_Form);

Form.Field = Field;
Form.useForm = useForm;

export {
  Field, useForm
}
export default Form;