// themeParser.ts
import { Appearance } from 'react-native';

type themeType = 'light' | 'dark' | 'auto';
type themeMode = 'light' | 'dark';

export default function themeParser(theme_type: themeType): themeMode {
  let result: themeMode = 'light';
  if (theme_type === 'dark') { result = 'dark' };
  if (theme_type === 'auto') {
    if (Appearance.getColorScheme() == undefined) {
      result = 'light';
    } else if (Appearance.getColorScheme() == 'light') {
      result = 'light';
    } else {
      result = 'dark';
    }
  };
  return result;
}
