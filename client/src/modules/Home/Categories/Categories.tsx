import React, { FunctionComponent } from "react";
import { S } from "@/modules/Home/Categories/Categories.styled";
import Card from "@/components/Card/Card";
import { useRouter } from "next/navigation";
import Section from "@/components/Section/Section";

type Props = {
  categories: string[];
};

const Categories: FunctionComponent<Props> = ({ categories }: Props) => {
  const router = useRouter();
  return (
    <Section title={"Search By Category"}>
      <S.Container>
        {categories.map((category) => (
          <Card
            name={category}
            key={category}
            icon={`http://localhost:80/icons/categories/${category}.svg`}
            onClick={() => router.push(`/apps/category/${category}`)}
            type={"category"}
          />
        ))}
      </S.Container>
    </Section>
  );
};

export default Categories;
