import { SIZES } from "./size";
import { COLOR } from "./color";
export const FONTS = {
    largeTitle: {fontSize: SIZES.largeTitle, lineHeight: 55},
    h1: {fontSize: SIZES.h1, lineHeight: 36},
    h2: {fontSize: SIZES.h2, lineHeight: 30},
    h3: {fontSize: SIZES.h3, lineHeight: 22},
    h4: {fontSize: SIZES.h4, lineHeight: 22},
    body1: {fontSize: SIZES.body1, lineHeight: 36},
    body2: {fontSize: SIZES.body2, lineHeight: 30},
    body3: {fontSize: SIZES.body3, lineHeight: 22},
    body4: {fontSize: SIZES.body4, lineHeight: 22},
    nameItem: {fontSize: 18, color: 'black', fontWeight: '600'},
    tagNameItem: {fontSize: 14, color: 'red', marginLeft: 10},
    titleFont: {
      color: COLOR.BLACK,
      fontSize: 22,
      fontWeight:'800',
      marginLeft: 20,
      marginTop: 10,
      marginBottom:-5
    },
    titleItem: {
      color: COLOR.BLACK,
      fontSize: 26,
      fontWeight:'800',
      marginTop: 10,
    },
  };