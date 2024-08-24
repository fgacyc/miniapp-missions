import { Formik, Form } from "formik";
import {
  CategoriesInput,
  DateTimeInput,
  FormInput,
} from "../components/forms/Input";

export type DesignFormikForm = {
  theme: string;
  datetime: string;
  venue: string;
  type: string;
  categories: string[];
  kids_friendly: boolean;
};

const DesignTab = () => {
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
      onSubmit={async (values) => {
        console.log(values);
      }}
    >
      {() => (
        <Form className="flex flex-col gap-5">
          <FormInput<DesignFormikForm>
            label="Theme"
            name="theme"
            placeholder="What is the name of your event?"
          />
          <DateTimeInput<DesignFormikForm>
            label="Date & Time"
            name="datetime"
            placeholder="Insert your event date & time"
          />

          <FormInput<DesignFormikForm>
            label="Venue"
            name="venue"
            placeholder="Insert your venue's address"
          />
          <FormInput<DesignFormikForm>
            label="Type"
            name="type"
            placeholder="What type of event is it?"
          />
          <CategoriesInput<DesignFormikForm>
            label="Categories"
            name="categories"
          />
          <div className="w-full px-4">
            <button
              type="submit"
              className="rounded-full w-full bg-[#191D1A] py-2 text-lg text-white"
            >
              Generate Design
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DesignTab;
