import { NextFunction, Request, Response } from "express";
import { LocationType } from "../ts/types/locations.types";
import { getAppsService, GlobalAppsService } from "../services/apps.service";
import { IAppsFilter } from "../ts/interfaces/apps.interfaces";
import { titlize } from "../utils/utils";

interface IGetAppsHandlerRequestParams {
  readonly country: string;
  readonly city: string;
}

const getAppsHandler = async (
  req: Request<
    Partial<IGetAppsHandlerRequestParams>,
    {},
    {},
    Partial<IAppsFilter>
  >,
  res: Response,
  next: NextFunction,
) => {
  const { params, query } = req;
  const { country, city } = params;
  const filter = query;
  const locationType: LocationType = country
    ? "country"
    : city
    ? "city"
    : "global";
  const location =
    country || city ? (titlize(country ?? city ?? "") as string) : undefined;
  try {
    const appsService = getAppsService(locationType);
    let apps: unknown;
    if (appsService instanceof GlobalAppsService) {
      apps = await appsService.findApps(filter);
    } else {
      apps = await appsService.findApps(location, filter);
    }
    return res.status(200).send(apps);
  } catch (e) {
    next(e);
  }
};

export const AppsController = {
  getAppsHandler,
};
