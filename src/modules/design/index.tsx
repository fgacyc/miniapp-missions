import { Formik, Form } from "formik";
import {
  CategoriesInput,
  DateTimeInput,
  FormInput,
} from "@/components/forms/Input";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useDesign } from "@/store/useDesign";
import { useNavigate } from "react-router-dom";

export type DesignFormikForm = {
  theme: string;
  datetime: string;
  venue: string;
  type: string;
  categories: string[];
  kids_friendly: boolean;
};

const DesignTab = () => {
  const { t } = useTranslation();
  const { submit } = useDesign();
  const navigate = useNavigate();
  return (
    <Formik<DesignFormikForm>
      initialValues={{
        categories: [],
        datetime: "",
        kids_friendly: false,
        theme: "",
        type: "",
        venue: "",
      }}
      onSubmit={async (values, action) => {
        submit(values);
        action.resetForm();

        navigate("/design/complete");
      }}
      validationSchema={Yup.object().shape({
        categories: Yup.array().min(1, t("designtab.form.categories.error")),
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
          <FormInput<DesignFormikForm>
            label={t("designtab.form.type.title")}
            name="type"
            placeholder={t("designtab.form.type.placeholder")}
          />
          <CategoriesInput<DesignFormikForm>
            label={t("designtab.form.categories.title")}
            name="categories"
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
