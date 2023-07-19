import React, { FunctionComponent } from "react";
import { S } from "@/components/Button/Button.styled";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant: "primary" | "secondary";
  styles?: React.CSSProperties;
};

const Button: FunctionComponent<Props> = ({
  styles,
  variant,
  children,
  onClick,
}) => {
  return (
    <S.Button onClick={onClick} $variant={variant} style={styles}>
      {children}
    </S.Button>
  );
};

export default Button;
