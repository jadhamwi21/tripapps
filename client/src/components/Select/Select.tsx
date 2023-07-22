"use client";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { S } from "@/components/Select/Select.styled";
import { useOnClickOutside } from "usehooks-ts";
import { useSpring } from "@react-spring/web";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface OwnProps {}

interface IListItem {
  name: string;
  value: any;
}

type Props = {
  value: string;
  onChange: (val: any) => void;
  styles?: React.CSSProperties;
  label?: string;
  list: IListItem[];
};

const Select: FunctionComponent<Props> = ({
  value,
  onChange,
  label,
  styles,
  list,
}) => {
  const [toggled, setToggled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setToggled(false);
  });
  useEffect(() => {
    if (toggled) {
      api.start({ opacity: 1, y: 2, pointerEvents: "initial" });
    } else {
      api.start({ opacity: 0, y: 5, pointerEvents: "none" });
    }
  }, [toggled]);

  const [springs, api] = useSpring(() => ({
    opacity: 0,
    y: 20,
    pointerEvents: "none",
    config: { tension: 200 },
  }));
  return (
    <S.Container style={styles} ref={ref}>
      {label && <S.Label>{label}</S.Label>}
      <S.Field onClick={() => setToggled((prev) => !prev)}>
        {list.find((listItem) => listItem.value === value)?.name}
        <S.ToggleContainer>
          {toggled ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : (
            <FontAwesomeIcon icon={faCaretDown} />
          )}
        </S.ToggleContainer>
      </S.Field>
      <S.List style={springs as any}>
        {list.map((listItem) => (
          <S.ListItem
            key={listItem.value}
            onClick={() => {
              onChange(listItem.value);
              setToggled(false);
            }}
          >
            {listItem.name}
          </S.ListItem>
        ))}
      </S.List>
    </S.Container>
  );
};

export default Select;
