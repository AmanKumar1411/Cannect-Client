import("https://fonts.googleapis.com/css2?family=Sofadi+One&display=swap");
import Lottie from "react-lottie";
import { animationDefaultOptions } from "@/lib/utils";
const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:bg-[#032221] md:flex-col justify-center items-center flex transition-all duration-300">
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}
      />
      <div className="text-opacity-80 text-white flex-col gap-10 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
        <h1 className="sofadi-one-regular">
          Hi
          <span className="text-green-600">!</span>
        </h1>
        <h3>Welcome to</h3>
        <span className="text-green-600 playpen-sans-medium">Cannect</span>
      </div>
    </div>
  );
};

export default EmptyChatContainer;
