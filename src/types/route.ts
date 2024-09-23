import { LazyExoticComponent } from "react";

export type RoutePath = string
export type RouteIndex = boolean
export type RouteElement = JSX.Element | LazyExoticComponent<() => JSX.Element>
export type RouteMeta = {
    appLayout?: boolean,
    className?: string,
}