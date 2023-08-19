"use client";
import React, { FunctionComponent } from "react";
import { IApp } from "@/ts/interfaces/apps.interfaces";
import { S } from "./AppItem.styled";
import { Rating } from "@mui/material";
import * as _ from "lodash";
import { abbreviateNumber } from "js-abbreviation-number";

type Props = { app: IApp; style?: React.CSSProperties };

const AppItem: FunctionComponent<Props> = ({ app, style }) => {
  return (
    <div style={style}>
      <S.Card>
        {!_.isUndefined(app.icon) && (
          <S.AppIcon
            src={app.icon!}
            height={60}
            width={60}
            alt={`${app.name}-icon`}
          />
        )}
        <S.AppName>{app.name}</S.AppName>
        <S.TextContainer>
          {!_.isUndefined(app.score) && (
            <Rating value={app.score} readOnly size={"small"} precision={0.5} />
          )}
          {!_.isUndefined(app.downloads) && (
            <S.Downloads>Downloads : {app.downloads}</S.Downloads>
          )}
          {!_.isUndefined(app.ratings) && (
            <S.Ratings>Ratings : {abbreviateNumber(app.ratings)}</S.Ratings>
          )}
        </S.TextContainer>
      </S.Card>
    </div>
  );
};

export default AppItem;
