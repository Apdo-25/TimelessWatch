"use client";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import firebaseApp from "@/lib/firebase";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export type Image = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImage = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<Image[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
    },
    mode: "onBlur",
    criteriaMode: "all",
  });

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    //upload image to firebase
    //save to db
    setIsLoading(true);
    let uploadImages: UploadedImage[] = [];
    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected");
    }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("Images are not selected");
    }

    const handleImageUploads = async () => {
      toast("Creating product, please wait...");
      try {
        for(const item of data.image){
          if(item.image){
            const fileName = new Date().getTime() + '-' + item.image.name;
            const storage = getStorage(firebaseApp)
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);
          }
        }
    }
  };

  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: Image) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }

      return [...prev, value];
    });
  }, []);
  const removeImageFromState = useCallback((value: Image) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }

      return prev;
    });
  }, []);

  console.log("imagess", images);

  return (
    <>
      <Heading title="Add a Product" center />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      ></Input>
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      ></Input>
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      ></Input>
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckBox
        id="inStock"
        register={register}
        label="This product is in stock"
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }

            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-semibold">
            Select the available product colors and upload theirs images
          </div>
          <ul className="text-sm">
            You must upload an image for each of the color selected, otherwise
            color selection will not be available
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>
      <Button
        label={isLoading ? "Loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
