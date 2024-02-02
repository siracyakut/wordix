import Yup from "~/validations/yup";

export const editQuestionSchema = Yup.object().shape({
  question: Yup.string().required(),
  letter: Yup.string().min(1).max(1).required(),
  answer: Yup.string().required(),
});

export const editUserSchema = Yup.object().shape({
  email: Yup.string().email("Geçerli bir e-mail adresi girin.").required(),
  solvedCount: Yup.number()
    .typeError("Sayı olmalı")
    .positive("0'dan yüksek olmalı")
    .integer("0'dan yüksek olmalı")
    .required(),
  trueCount: Yup.number()
    .typeError("Sayı olmalı")
    .positive("0'dan yüksek olmalı")
    .integer("0'dan yüksek olmalı")
    .required(),
  falseCount: Yup.number()
    .typeError("Sayı olmalı")
    .positive("0'dan yüksek olmalı")
    .integer("0'dan yüksek olmalı")
    .required(),
});
