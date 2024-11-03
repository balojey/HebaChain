export interface CustomButtonTypes {
  border?: string;
  background?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  textColor?: string;
  padding?: string;
  borderRadius?: string;
  cursor?: string;
  children: React.ReactNode;
  textSize?: string;
  disabled?: boolean;
}
