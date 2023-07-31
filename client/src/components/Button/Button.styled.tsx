import styled from "styled-components";

const Button = styled.button<{
  $variant: "primary" | "secondary";
  $disabled: boolean;
}>`
  outline: none;
  border-radius: 5px;
  padding: 0.5em 1em;
  transition: all 0.1s ease;
  border: none;
  opacity: ${({ $disabled }) => ($disabled ? "0.4" : "1")};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "initial")};

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  ${({ $variant }) =>
    $variant === "primary"
      ? `background-color:var(--yellow);color:var(--black)`
      : `background-color:transparent;color:var(--yellow)`}
`;

export const S = { Button };
