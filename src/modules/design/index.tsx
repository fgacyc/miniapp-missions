import { Formik, Form } from "formik";
import {
  // CategoriesInput,
  DateTimeInput,
  FormInput,
  TypeInput,
} from "@/components/forms/Input";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useDesign } from "@/store/useDesign";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TypeVariant } from "@/components/DesignCanvas";

export type DesignFormikForm = {
  theme: string;
  datetime: string;
  venue: string;
  type: TypeVariant;
  // kids_friendly: boolean;
};

const DesignTab = () => {
  const { t } = useTranslation();
  const { submit, reset } = useDesign();
  const navigate = useNavigate();

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <Formik<DesignFormikForm>
      initialValues={{
        datetime: "",
        // kids_friendly: false,
        theme: "",
        type: t("designtab.form.type.placeholder"),
        venue: "",
      }}
      onSubmit={async (values, action) => {
        submit(values);
        action.resetForm();
        // console.log(values);
        navigate("/design/complete");
      }}
      validationSchema={Yup.object().shape({
        datetime: Yup.string().required(t("designtab.form.required")),
        theme: Yup.string().required(t("designtab.form.required")),
        venue: Yup.string().required(t("designtab.form.required")),
        type: Yup.string()
          .not(
            [t("designtab.form.type.placeholder")],
            t("designtab.form.type.error")
          )
          .required(t("designtab.form.required")),
      })}
    >
      {() => (
        <Form className="flex flex-col gap-5">
          <FormInput<DesignFormikForm>
            label={t("designtab.form.theme.title")}
            name="theme"
            placeholder={t("designtab.form.theme.placeholder")}
          />
          <DateTimeInput<DesignFormikForm>
            label={t("designtab.form.datetime.title")}
            name="datetime"
            placeholder={t("designtab.form.datetime.placeholder")}
          />

          <FormInput<DesignFormikForm>
            label={t("designtab.form.venue.title")}
            name="venue"
            placeholder={t("designtab.form.venue.placeholder")}
          />
          {/* <FormInput<DesignFormikForm>
            label={t("designtab.form.type.title")}
            name="type"
            placeholder={t("designtab.form.type.placeholder")}
          /> */}
          <TypeInput<DesignFormikForm>
            label={t("designtab.form.type.title")}
            name="type"
            placeholder={t("designtab.form.type.placeholder")}
          />

          <div className="w-full px-4">
            <button
              type="submit"
              className="rounded-full w-full bg-[#191D1A] py-2 text-lg text-white"
            >
              {t("designtab.generate")}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DesignTab;
