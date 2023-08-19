"use client";
import React, { FunctionComponent, useMemo, useRef } from "react";
import { IApp } from "@/ts/interfaces/apps.interfaces";
import { S } from "@/features/FindApps/components/AppsList/AppsList.styled";
import AppItem from "@/features/FindApps/components/AppsList/AppItem/AppItem";
import { FixedSizeList as List } from "react-window";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

type Props = { apps: IApp[]; isPortfolio?: boolean; category?: string };

const ITEM_SIZE = 300;

const AppsList: FunctionComponent<Props> = ({
  apps,
  isPortfolio = false,
  category,
}) => {
  const allKeywords = useMemo(() => {
    const keywords = Array.from(
      new Set(apps.map((app) => app.keywords).flat()),
    );
    if (category) {
      keywords.splice(keywords.indexOf(category), 1);
      keywords.unshift(category);
      return keywords;
    }
    return keywords;
  }, []);
  return (
    <S.Container>
      {isPortfolio ? (
        allKeywords.map((keyword) => {
          const list = apps.filter((app) => app.keywords.includes(keyword));
          const listRef = useRef<HTMLDivElement>(null);
          return (
            <React.Fragment key={keyword}>
              <S.Keyword>{keyword}</S.Keyword>
              <S.KeywordFlexbox>
                <S.IconContainer>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    size={"xl"}
                    onClick={() => {
                      if (listRef.current) {
                        listRef.current.scrollTo({
                          left: listRef.current.scrollLeft - ITEM_SIZE,
                        });
                      }
                    }}
                  />
                </S.IconContainer>
                <List
                  height={325}
                  itemSize={ITEM_SIZE}
                  itemCount={list.length}
                  layout={"horizontal"}
                  width={800}
                  outerRef={listRef}
                >
                  {({ index, style }) => (
                    <AppItem
                      app={list[index]}
                      key={list[index].appId}
                      style={style}
                    />
                  )}
                </List>
                <S.IconContainer>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    size={"xl"}
                    onClick={() => {
                      if (listRef.current) {
                        listRef.current.scrollTo({
                          left: listRef.current.scrollLeft + ITEM_SIZE,
                        });
                      }
                    }}
                  />
                </S.IconContainer>
              </S.KeywordFlexbox>
            </React.Fragment>
          );
        })
      ) : (
        <S.Grid>
          {apps.map((app) => (
            <AppItem app={app} key={app.appId} />
          ))}
        </S.Grid>
      )}
    </S.Container>
  );
};

export default AppsList;
