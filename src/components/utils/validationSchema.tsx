// utils/validationSchema.tsx
import * as Yup from 'yup';
import validationMessages from './validationMessages';

const name = Yup.string()
  .required(validationMessages.required)
  .max(50, validationMessages.max(50));

const lastname = Yup.string()
  .required(validationMessages.required)
  .max(50, validationMessages.max(50));

const documentType = Yup.mixed()
  .required(validationMessages.required);

const document = Yup.string()  
  .required(validationMessages.required)
  .min(6, validationMessages.min(6))
  .max(12, validationMessages.max(12))
  .matches(/^\d+$/, validationMessages.onlyNumbers);

const email = Yup.string()
  .required(validationMessages.required)
  .email(validationMessages.email)
  .min(10, validationMessages.min(10))
  .max(50, validationMessages.max(50));

const phone = Yup.string()
  .required(validationMessages.required);

const address = Yup.string()
  .required(validationMessages.required)
  .min(10, validationMessages.min(10));

const locality = Yup.mixed()
  .required(validationMessages.required);

const dateBirth = Yup.date()
  .required(validationMessages.required);

const bloodType = Yup.mixed()
  .required(validationMessages.required);

const gender = Yup.mixed()
  .required(validationMessages.required);

const validationSchema = Yup.object({
  name,
  lastname,
  documentType,
  document,
  email,
  phone,
  address,
  locality,
  dateBirth,
  bloodType,
  gender,
});

export default validationSchema;
