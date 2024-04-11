import { useRecoilValue } from "recoil";
import { accuracyAtom, wpmAtom } from "../store/score";

export const Scoreboard = () => {
  const wpm = useRecoilValue(wpmAtom);
  const accuracy = useRecoilValue(accuracyAtom);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col justify-center items-center text-2xl">
        <label className="text-Secondary">test type</label>
        <label className="text-Primary">english</label>
        <label className="text-Primary">30s</label>
      </div>
      <div className="flex flex-col justify-center items-center text-2xl gap-2">
        <div className="flex flex-col justify-center items-center">
          <label className="text-Secondary">wpm</label>
          <div className="text-Primary text-8xl">{wpm}</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <label className="text-Secondary">accuracy</label>
          <div className="text-Primary text-8xl">{accuracy}</div>
        </div>
      </div>
    </div>
  );
};
