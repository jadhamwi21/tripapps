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
  icon?: string;
}

type Props = {
  value: string;
  onChange: (val: any) => void;
  styles?: React.CSSProperties;
  label?: string;
  list: IListItem[];
  disabled?: boolean;
};

const Select: FunctionComponent<Props> = ({
  value,
  onChange,
  label,
  styles,
  list,
  disabled = false,
}) => {
  const [toggled, setToggled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setToggled(false);
  });
  useEffect(() => {
    if (toggled) {
      api.start({
        opacity: 1,
        y: 5,
        pointerEvents: "initial",
        visibility: "visible",
      });
    } else {
      api.start({
        visibility: "hidden",
        opacity: 0,
        y: 10,
        pointerEvents: "none",
      });
    }
  }, [toggled]);

  const [springs, api] = useSpring(() => ({
    opacity: 0,
    y: 10,
    pointerEvents: "none",
    visibility: "hidden",
  }));

  const selectedItem = list.find((listItem) => listItem.value === value);

  return (
    <S.Container style={styles} ref={ref} $disabled={disabled}>
      {label && <S.Label>{label}</S.Label>}
      <S.Field onClick={() => setToggled((prev) => !prev)}>
        {selectedItem && (
          <S.Value>
            {selectedItem.icon && <S.Icon src={selectedItem.icon} />}
            <div>{selectedItem.value}</div>
          </S.Value>
        )}
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
            $selected={listItem.value === value}
            key={listItem.value}
            onClick={() => {
              onChange(listItem.value);
              setToggled(false);
            }}
          >
            {listItem.icon && <S.Icon src={listItem.icon} />}
            <div>{listItem.name}</div>
          </S.ListItem>
        ))}
      </S.List>
    </S.Container>
  );
};

export default Select;
