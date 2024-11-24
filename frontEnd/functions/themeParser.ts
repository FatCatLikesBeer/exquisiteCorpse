// themeParser.ts
import { Appearance } from 'react-native';

export type themeType = 'light' | 'dark' | 'auto';
type themeMode = 'light' | 'dark';

export default function themeParser(theme_type: themeType): themeMode {
  let result: themeMode = 'light';
  if (theme_type === 'dark') { result = 'dark' };
  if (theme_type === 'auto') { result = Appearance.getColorScheme() as themeMode };
  return result;
}
