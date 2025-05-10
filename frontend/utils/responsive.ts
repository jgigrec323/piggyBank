// src/utils/responsive.ts
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const Spacing = {
  xs: wp("2%"),
  sm: wp("4%"),
  md: wp("6%"),
  lg: wp("8%"),
  xl: wp("10%"),
};

export { wp, hp };
