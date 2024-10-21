import React, { createContext, useState } from "react";

// const [fontOptions, setFontOptions] = useState({
//   fontSize: '12',
//   fontFamily: 'sans-serif',
//   fontColor: 'black',
// });
//
// const toggleFontColor = () => {
//   if (fontOptions.fontColor == 'black') {
//     let newOptions = { ...fontOptions };
//     newOptions.fontColor = 'grey';
//     setFontOptions({ ...newOptions });
//   } else {
//     let newOptions = { ...fontOptions };
//     newOptions.fontColor = 'black';
//     setFontOptions({ ...newOptions });
//   }
// }

export const LightModeContext = createContext();
