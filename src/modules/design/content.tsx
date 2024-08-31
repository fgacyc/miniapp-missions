import { DesignCanvas } from "@/components/DesignCanvas";
import { useTranslation } from "react-i18next";

const DesignContent = () => {
  const { t } = useTranslation();
  return (
    <div className="h-full w-full p-5 flex flex-col justify-center">
      <h1 className="font-bold text-4xl text-center w-full">
        {t("designtab.generated.title")}
      </h1>
      <p className="text-[#92969D] text-base mt-1 text-center w-full">
        {t("designtab.generated.subtitle")}
      </p>
      <div
        style={{
          boxShadow: " 0px 4px 8px 0px #00000040",
        }}
        className="shad rounded-xl flex flex-col items-center justify-center w-full mt-7"
      >
        <div
          style={{
            WebkitMaskImage:
              "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)",
          }}
          className="overflow-none relative rounded-xl"
        >
          <DesignCanvas className="w-full h-full" variant={1} />
        </div>
      </div>
    </div>
  );
};

export default DesignContent;
