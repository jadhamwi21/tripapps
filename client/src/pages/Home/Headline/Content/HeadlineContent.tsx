import React from "react";
import { S } from "@/pages/Home/Headline/Content/HeadlineContent.styled";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { useSpring } from "@react-spring/web";

const HeadlineContent = () => {
  const router = useRouter();
  const [contentHeaderSprings] = useSpring(
    () => ({
      from: { opacity: 0, translateX: -100 },
      to: { opacity: 1, translateX: 0 },
      config: { tension: 120 },
    }),
    [],
  );

  const [contentBodySprings] = useSpring(
    () => ({
      from: { opacity: 0, translateY: 100 },
      to: { opacity: 1, translateY: 0 },
      config: { tension: 120 },
    }),
    [],
  );
  return (
    <S.Container>
      <S.Flexbox>
        <S.ContentHeader style={contentHeaderSprings}>
          Pack your <S.YellowText>Apps</S.YellowText> as you travel the world
        </S.ContentHeader>
        <S.ContentBody style={contentBodySprings}>
          with <S.YellowText>TripApps</S.YellowText>, there is no hesitation in
          travelling the world, as you can{" "}
          <S.YellowText>
            discover popular apps used in many aspects
          </S.YellowText>
          , with ease.
          <Button
            variant={"primary"}
            onClick={() => router.push("/find_apps")}
            styles={{ marginTop: "0.75em" }}
          >
            Start Packing
          </Button>
        </S.ContentBody>
      </S.Flexbox>
    </S.Container>
  );
};

export default HeadlineContent;
