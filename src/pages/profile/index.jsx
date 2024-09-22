import { useAppStore } from "@/stores";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor, colors } from "@/lib/utils";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { ADD_PROFILE_IMAGE, UPDATE_PROFILE_ROUTE } from "@/utils/containts";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setuserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef(null);
  useEffect(() => {
    setFirstName(userInfo.firstName || "");
    setLastName(userInfo.lastName || "");
    setSelectedColor(userInfo.color || 0);
  }, [userInfo]);

  const validDateprofile = () => {
    if (!firstName) {
      toast.error("FirstName is required");
      return false;
    }
    if (!lastName) {
      toast.error("LastName is required");
      return false;
    }
    return true;
  };
  const saveChanges = async () => {
    try {
      const apiResponse = await apiClient.post(
        UPDATE_PROFILE_ROUTE,
        { firstName, lastName , },
        { withCredentials: true }
      );
      console.log(firstName, lastName);
      console.log(apiResponse);

      if (apiResponse.status === 200 && apiResponse.data) {
        toast.success("Profile updated successfully");
        navigate("/chat",);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };
  const handleImageChange = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log({ file });

      if (file) {
        const formData = new FormData();
        formData.append("profile-image", file);
        console.log(formData);
        const response = await apiClient.post(
          ADD_PROFILE_IMAGE,
          { formData },
          {
            withCredentials: true,
          }
        );
        console.log(response);
        if (response.status === 200 && response.data.image) {
          setuserInfo({ ...userInfo, image: response.data.Image });
          toast.success("Profile Image Uploaded");
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      toast.error("No file selected");
    }
  };

  const handleDeleteImage = async () => {};
  return (
    <>
      <div className="bg-black h-[100vh] flex items-center justify-center flex-col gap-10">
        <div className="flex flex-col gap-10 w-[80vw] md:w-max">
          <div>
            <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
          </div>
          <div className="grid grid-cols-2">
            <div
              className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
                {image ? (
                  <AvatarImage
                    src={image}
                    alt="profile-pic"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[5px] flex items-center justify-center rounded-full ${getColor(
                      selectedColor
                    )} text-white`}
                  >
                    {firstName ? firstName.charAt(0) : userInfo.email.charAt(0)}
                  </div>
                )}
              </Avatar>

              {hovered && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full"
                  onClick={image ? handleDeleteImage : handleFileInputClick}
                >
                  {image ? (
                    <FaTrash className="text-white text-3xl cursor-pointer" />
                  ) : (
                    <FaPlus className="text-white text-3xl cursor-pointer" />
                  )}
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
                name="profile"
                accept=".png, .jpg, .jpeg, .svg, .webp"
              />
            </div>
            <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
              <div className="w-full">
                <Input
                  placeholder="Email"
                  type="email"
                  disabled
                  value={userInfo.email}
                  className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                />
              </div>
              <div className="w-full">
                <Input
                  placeholder="First Name"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName || ""}
                  className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                />
              </div>
              <div className="w-full">
                <Input
                  placeholder="Last Name"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName || ""}
                  className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                />
              </div>
              <div className="flex w-full gap-5">
                {colors.map((color, index) => (
                  <div
                    className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                      selectedColor === index
                        ? "outline outline-white/60 outline-1"
                        : ""
                    }`}
                    key={index}
                    onClick={() => setSelectedColor(index)}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full">
            <Button
              className="h-16 w-full bg-purple-700 hover:bg-purple-950 transition-all duration-300"
              onClick={saveChanges}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
