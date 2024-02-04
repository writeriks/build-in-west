import React from "react";
import Lottie from "react-lottie";

import * as loadingAnimation from "../../../../public/assets/loading-animation.json";
import { defaultAnimationProps } from "../../../utils/lottie-service";

const Loading = () => (
  <>
    <Lottie
      options={defaultAnimationProps(loadingAnimation)}
      isClickToPauseDisabled={true}
      width={100}
      height={100}
    />
    <span className="p-3 text-lg font-bold ">Loading.. Please wait.</span>
  </>
);

export default Loading;
