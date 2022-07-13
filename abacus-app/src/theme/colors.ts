interface IColors {
  buttonLight: string;
  buttonDark: string;
  defaultFont: string;
  gray: string;
  green: string;
  nomineeCard: string;
  pageBackground: string;
  red: string;
  selectedNomineeCard: string;
  yellow: string;
}

export const colors: IColors = {
  buttonLight: '#f5f5f5',
  buttonDark: '#b3b3b3',
  defaultFont: '#121212',
  gray: '#bac8d3',
  green: '#27AE60',
  nomineeCard: '#dae8fc',
  pageBackground: '#FFFFFF',
  red: '#D93131',
  selectedNomineeCard: '#d5e8d4',
  yellow: '#F2C94C',
};

export const buttonGradient = [colors.buttonLight, colors.buttonDark];
