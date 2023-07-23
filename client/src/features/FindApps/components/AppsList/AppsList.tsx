"use client";
import React, { FunctionComponent } from "react";
import { IApp } from "@/ts/interfaces/apps.interfaces";
import { S } from "@/features/FindApps/components/AppsList/AppsList.styled";
import AppItem from "@/features/FindApps/components/AppsList/AppItem/AppItem";

type Props = { apps: IApp[] };

const AppsList: FunctionComponent<Props> = ({ apps }) => {
  return (
    <S.Grid>
      {apps.map((app) => (
        <AppItem app={app} key={app.appId} />
      ))}
    </S.Grid>
  );
};

export default AppsList;
