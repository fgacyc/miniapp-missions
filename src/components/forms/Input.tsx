import { Field, useFormikContext } from "formik";
import { FunctionComponent } from "react";

interface FormInputProps<T> {
  name: keyof T;
  label: string;
  placeholder?: string;
}

export const FormInput = <T,>({
  name,
  label,
  placeholder,
}: FormInputProps<T>) => {
  const { errors } = useFormikContext<T>();
  return (
    <div className="flex flex-col gap-3 w-full">
      <label
        htmlFor={String(name)}
        className="capitalize font-extrabold text-xl"
      >
        {label}
      </label>
      <div className="flex flex-col gap-1.5 justify-end w-full">
        <Field
          name={name}
          placeholder={placeholder}
          className={`w-full border rounded-[5px] ${
            errors[name] ? "border-red-600" : "border-black/30"
          } px-6 py-4 placeholder:text-black/30 text-lg text-black bg-transparent`}
        />
        {errors[name] && (
          <p className="text-red-600 italic text-sm pr-2">
            {String(errors[name])}
          </p>
        )}
      </div>
    </div>
  );
};

export const DateTimeInput = <T,>({
  name,
  label,
  placeholder,
}: FormInputProps<T>) => {
  const { errors } = useFormikContext<T>();
  return (
    <div className="flex flex-col gap-3 w-full">
      <label
        htmlFor={String(name)}
        className="capitalize font-extrabold text-xl"
      >
        {label}
      </label>
      <div className="flex flex-col gap-1.5 justify-end w-full">
        <Field
          type="datetime-local"
          name={name}
          placeholder={placeholder}
          className={`w-full border rounded-[5px] ${
            errors[name] ? "border-red-600" : "border-black/30"
          } px-6 py-4 placeholder:text-black/30 text-lg text-black bg-transparent`}
        />
        {errors[name] && (
          <p className="text-red-600 italic text-sm pr-2">
            {String(errors[name])}
          </p>
        )}
      </div>
    </div>
  );
};

export const CategoriesInput = <T,>({
  name,
  label,
}: // placeholder,
FormInputProps<T>) => {
  const { errors, setFieldValue, values } = useFormikContext<T>();
  return (
    <div className="flex flex-col gap-3 w-full">
      <label
        htmlFor={String(name)}
        className="capitalize font-extrabold text-xl"
      >
        {label}
      </label>
      <div className="flex flex-col gap-1.5 justify-end w-full">
        {/* <Field 
          name={name}
          placeholder={placeholder}
          className={`w-full border rounded-[5px] ${
            errors[name] ? "border-red-600" : "border-black/30"
          } px-6 py-4 placeholder:text-black/30 text-lg text-black bg-transparent`}
        /> */}

        <div className="grid grid-rows-2 grid-cols-4 gap-2">
          {[
            "Secondary Students",
            "College / University",
            "Young Adults",
            "Married",
            "Family",
            "Entrepreneur",
          ].map((t) => (
            <FormChip
              key={t}
              label={t}
              selected={(values[name] as string[]).includes(t)}
              onClick={() => {
                if ((values[name] as string[]).includes(t)) {
                  const newValue = (values[name] as string[]).filter(
                    (a) => a !== t
                  );

                  // const newValue = values
                  setFieldValue(String(name), newValue);
                } else
                  setFieldValue(String(name), [
                    ...(values[name] as string[]),
                    t,
                  ]);
              }}
            />
          ))}
        </div>
        {errors[name] && (
          <p className="text-red-600 italic text-sm pr-2">
            {String(errors[name])}
          </p>
        )}
      </div>
    </div>
  );
};

interface FormChipProps {
  label: string;
  selected?: boolean;
  onClick: () => void;
}

const FormChip: FunctionComponent<FormChipProps> = ({
  label,
  selected,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-transparent rounded-full border px-1 py-2 ${
        label.length > 15 ? "col-span-2" : "col-span-1"
      } ${
        selected
          ? "border-green-600 text-green-600"
          : "border-black/30 text-black/30"
      } font-bold text-sm`}
    >
      {label}
    </button>
  );
};
