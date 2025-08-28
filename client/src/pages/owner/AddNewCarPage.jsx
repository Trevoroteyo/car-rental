import { useContext, useState } from "react";
import { assets } from "@/assets/assets";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { addNewCar, uploadCarImages } from "@/services";
import { AuthContext } from "@/context/AuthContext";

const AddNewCarPage = () => {
  const [uploadedImages, setUploadedImages] = useState([]); // store uploaded image URLs
  const [isUploading, setIsUploading] = useState(false);
  const { auth } = useContext(AuthContext);

  async function handleImageUpload(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (let file of files) {
      formData.append("images", file); // multiple images
    }

    try {
      setIsUploading(true);
      const response = await uploadCarImages(formData); // call backend upload
      if (response.success) {
        setUploadedImages((prev) => [...prev, ...response.data]); // store URLs
        toast.success("Images uploaded successfully!");
      } else {
        toast.error(response.message || "Failed to upload images");
      }
    } catch (err) {
      toast.error("Upload error!");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  }

  async function handleAddCarSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Instead of sending raw images, send uploaded URLs
    const payload = {
      owner: auth?.user?.userId,
      brand: formData.get("brand"),
      model: formData.get("model"),
      year: formData.get("year"),
      pricePerDay: formData.get("pricePerDay"),
      category: formData.get("category"),
      transmission: formData.get("transmission"),
      fuel_type: formData.get("fuel_type"),
      seating_capacity: formData.get("seating_capacity"),
      location: formData.get("location"),
      description: formData.get("description"),
      images: uploadedImages, // already uploaded URLs
    };

    console.log(payload, "payload");

    try {
      const response = await addNewCar(payload);
      if (response.success) {
        toast.success(response.message);
        form.reset();
        setUploadedImages([]); // reset
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("Failed to add car.");
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col items-start gap-8 mb-20 px-2 sm:px-4">
      {/* Title */}
      <div className="flex flex-col pl-2 sm:pl-4 w-full">
        <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl">
          Add New Car
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Fill in details to list a new car for booking, including pricing,
          availability, and car specifications.
        </p>
      </div>

      <form
        className="border border-gray-300 rounded-xl w-full max-w-xl sm:max-w-2xl md:max-w-3xl items-start"
        onSubmit={handleAddCarSubmit}
      >
        <div className="flex flex-col gap-3 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <label className="cursor-pointer flex items-center gap-2">
              <img src={assets.upload_icon} alt="upload_icon" className="" />
              <input
                type="file"
                name="images"
                multiple
                required
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
            </label>
            <div className="">
              {isUploading ? (
                <p className="text-blue-500 text-md">Uploading...</p>
              ) : (
                <p className="text-gray-300 text-sm sm:text-base">
                  Upload a picture of your car(max 5)
                </p>
              )}
            </div>

            {/* Preview uploaded images */}
            <div className="flex gap-2 flex-wrap">
              {uploadedImages.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt="preview"
                  className="w-24 h-20 object-cover rounded border-none"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <div className="flex flex-col gap-1 w-full sm:w-1/2">
              <Label>Brand</Label>
              <input
                type="text"
                className="border rounded outline-none border-gray-300 text-gray-800 px-2 py-1 w-full"
                placeholder="e.g, BMW, Mercedes, Audi.."
                name="brand"
              />
            </div>
            <div className="flex flex-col gap-1 w-full sm:w-1/2">
              <Label>Model</Label>
              <input
                type="text"
                className="border rounded outline-none border-gray-300 text-gray-800 px-2 py-1 w-full"
                placeholder="e.g, X5, S-Class, M4..."
                name="model"
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <div className="flex flex-col gap-1 w-full sm:w-1/3">
              <Label>Year</Label>
              <input
                className="border rounded outline-none border-gray-300 text-gray-800 px-2 py-1 w-full"
                type="text"
                placeholder={`${new Date().getFullYear()}`}
                name="year"
                required
              />
            </div>
            <div className="flex flex-col gap-1 w-full sm:w-1/3">
              <Label>Daily Price($)</Label>
              <input
                className="border border-gray-300 text-gray-800 rounded outline-none px-2 py-1 w-full"
                type="text"
                placeholder="100"
                name="pricePerDay"
              />
            </div>
            <div className="flex flex-col gap-1 w-full sm:w-1/3">
              <Label>Category</Label>
              <select
                className="border rounded outline-none border-gray-300 text-gray-800 px-2 py-1 w-full"
                type="text"
                placeholder="Sedan"
                name="category"
              >
                <option value="" disabled selected>
                  Select Category
                </option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Coupe">Coupe</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Truck">Truck</option>
                <option value="Supercar">Supercar</option>
                <option value="HyperCar">HyperCar</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <div className="flex flex-col gap-1 w-full sm:w-1/3">
              <Label>Transmission</Label>
              <select
                className="border rounded outline-none border-gray-300 text-gray-800 px-2 py-1 w-full"
                type="text"
                placeholder="Automatic"
                name="transmission"
              >
                <option value="" disabled selected>
                  Select Transmission type
                </option>

                <option value="Automatic">Manual</option>
                <option value="Manual">Automatic</option>
                <option value="Semi Automatic">Semi Automatic</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 w-full sm:w-1/3">
              <Label>Fuel Type</Label>
              <select
                className="border rounded outline-none border-gray-300 text-gray-800 px-2 py-1 w-full"
                type="text"
                name="fuel_type"
                placeholder="Diesel"
              >
                <option value="" disabled selected>
                  Select Fuel type
                </option>
                <option value="Petrol">Petrol</option>
                <option value="Disesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 w-full sm:w-1/3">
              <Label>Seating capacity</Label>
              <input
                className="border rounded outline-none border-gray-300 text-gray-800 px-2 py-1 w-full"
                type="text"
                placeholder="5 seats"
                name="seating_capacity"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label>Location</Label>
            <input
              className="border rounded outline-none border-gray-300 text-gray-800 px-2 py-1 w-full"
              type="text"
              placeholder="e.g, San Fransisco, CA"
              name="location"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label>Description</Label>
            <textarea
              type="text"
              placeholder="Describe your car, its condition and any notable details..."
              className="border rounded outline-none border-gray-300 text-gray-800 px-2 py-1 h-32 w-full"
              name="description"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full border-none outline-none text-gray-800 px-5 py-2 rounded bg-blue-600 text-white"
            >
              {isUploading ? "Wait..." : "List a Car"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewCarPage;
