import React from "react";
import { S } from "@/modules/Home/Headline/Headline.styled";
import HeadlineContent from "@/modules/Home/Headline/Content/HeadlineContent";
import TravellingManImage from "@/../public/travelling_man.png";
import { useSpring } from "@react-spring/web";
import Image from "next/image";

const Headline = () => {
  const [travellingManSprings] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { tension: 120 },
    }),
    [],
  );
  return (
    <S.Container>
      <HeadlineContent />
      <S.TravellingMan style={travellingManSprings}>
        <Image
          priority
          src={TravellingManImage}
          alt={"travelling_man"}
          height={400}
        />
      </S.TravellingMan>
    </S.Container>
  );
};

export default Headline;
