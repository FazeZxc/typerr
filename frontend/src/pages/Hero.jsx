import { Footer } from "../components/Footer";
import { Keyboard } from "../components/Keyboard";

export const Hero = () => {
  return (
    <div className="flex flex-col justify-center pt-[100px] h-screen w-screen">
      <Keyboard></Keyboard>
      <Footer></Footer>
    </div>
  );
};
