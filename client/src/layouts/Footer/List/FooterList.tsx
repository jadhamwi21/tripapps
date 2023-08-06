import React, { FunctionComponent } from "react";
import { S } from "@/layouts/Footer/List/FooterList.styled";
import FooterItem from "@/layouts/Footer/Item/FooterItem";

interface IFooterListItem {
  name: string;
  route: string;
}

type Props = { name?: string; list: IFooterListItem[] };

const FooterList: FunctionComponent<Props> = ({ name, list }) => {
  return (
    <S.Container>
      {name && <S.Header>{name}</S.Header>}
      <S.List>
        {list.map((item) => (
          <FooterItem {...item} key={item.name} />
        ))}
      </S.List>
    </S.Container>
  );
};

export default FooterList;
