import React, { FunctionComponent } from "react";
import { S } from "@/layouts/Footer/Item/FooterItem.styled";
import { IFooterListItem } from "@/ts/interfaces/footer.interfaces";
import { useRouter } from "next/navigation";

const FooterItem: FunctionComponent<IFooterListItem> = ({ name, route }) => {
  const router = useRouter();
  return <S.ListItem onClick={() => router.push(route)}>{name}</S.ListItem>;
};

export default FooterItem;
