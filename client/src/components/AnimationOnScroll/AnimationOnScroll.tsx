import React, { FunctionComponent, useState } from "react";
import { Waypoint } from "react-waypoint";
import { animated, useSpring } from "@react-spring/web";

interface OwnProps {}

type Props = {
  children: React.ReactNode | ((inView: boolean) => React.ReactNode);
};

const AnimationOnScroll: FunctionComponent<Props> = ({ children }) => {
  const [inView, setInView] = useState(false);
  const springs = useSpring({ opacity: inView ? 1 : 0 });
  return (
    <Waypoint onEnter={() => setInView(true)} bottomOffset={250}>
      <animated.div style={springs}>
        {typeof children === "function" ? children(inView) : children}
      </animated.div>
    </Waypoint>
  );
};

export default AnimationOnScroll;
