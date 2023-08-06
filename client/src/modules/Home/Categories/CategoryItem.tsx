import React, { FunctionComponent } from "react";
import { S } from "@/modules/Home/Categories/Categories.styled";
import { useInView } from "@react-spring/web";
import { useRouter } from "next/navigation";

type Props = {
  name: string;
};

const CategoryItem: FunctionComponent<Props> = ({ name }) => {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        y: 200,
      },
      to: {
        opacity: 1,
        y: 0,
      },
    }),
    {
      rootMargin: "100px",
    },
  );
  const router = useRouter();
  return (
    <S.CategoryContainer
      ref={ref}
      style={springs}
      onClick={() => router.push(`/apps/category/${name}`)}
    >
      <S.CategoryIcon src={`http://localhost:80/icons/${name}.svg`} />
      <S.CategoryName>{name}</S.CategoryName>
    </S.CategoryContainer>
  );
};

export default CategoryItem;
