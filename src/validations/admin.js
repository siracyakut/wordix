import Yup from "~/validations/yup";

export const editQuestionSchema = Yup.object().shape({
  question: Yup.string().required(),
  letter: Yup.string().length(1, "Bu alan 1 karakter olmalı.").required(),
  answer: Yup.string().required(),
});

export const editUserSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geçerli bir e-mail adresi girmelisiniz.")
    .required(),
  solvedCount: Yup.number()
    .typeError("Bir sayı girmelisiniz.")
    .positive("Girilen sayı pozitif olmalı.")
    .integer("Bir tamsayı girmelisiniz.")
    .required(),
  trueCount: Yup.number()
    .typeError("Bir sayı girmelisiniz.")
    .positive("Girilen sayı pozitif olmalı.")
    .integer("Bir tamsayı girmelisiniz.")
    .required(),
  falseCount: Yup.number()
    .typeError("Bir sayı girmelisiniz.")
    .positive("Girilen sayı pozitif olmalı.")
    .integer("Bir tamsayı girmelisiniz.")
    .required(),
});
