import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400','500', '600', '700'], 
});

export const theme_orange = {
  colors: {
    primary: "#D3624B",
    foreground: "#363433",
    secondary: "#679693",
    tertiary: "#E8A65D", 
    background: "#fffffff",
    lineColor: "#D9D9D9",
    secondaryText: "#928E8D",
    primaryLight: "#F7F1EC",
    secondaryLight: "#E4EFEE",
    main: "#FFFFFF"
  },
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '16px',
    4: '24px',
    5: '32px',
    6: '48px',
    7: '58px',
    6: '68px',
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  }
};
