import { Controller, useForm } from "react-hook-form";
import useManagementSeatMakerStore from "../../../store/management/useManagementSeatMakerStore";

const EventRegisterForm = () => {
  const { setImageUrl } = useManagementSeatMakerStore();
  const { control } = useForm();

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);

    const reader = new FileReader();
    reader.onload = (event) => {
      onChange(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <div className="">
      <div className="flex w-1/2">
        <label className="font-bold w-1/2">좌석 배치도 업로드</label>
        <Controller
          control={control}
          name="svg"
          render={({ field }) => (
            <input
              type="file"
              accept="image/jpeg,.jpg" // JPG 파일만 허용
              className="w-full"
              onChange={(e) => handleImageUpload(e, field.onChange)}
            />
          )}
        />
      </div>
    </div>
  );
};

export default EventRegisterForm;
