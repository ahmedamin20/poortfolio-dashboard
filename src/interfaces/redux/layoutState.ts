import {
    LayoutContentWidth,
    LayoutFooterType,
    LayoutMenuCollapsed,
    LayoutMenuHidden,
    LayoutNavbarBackgroundType,
    LayoutNavbarType,
    LayoutPageDirection,
    LayoutSkin,
    LayoutType
} from "../../types/layout.ts";

export default interface LayoutState {
    skin: LayoutSkin;
    isRTL: LayoutPageDirection;
    layout: LayoutType;
    lastLayout: LayoutType;
    menuCollapsed: LayoutMenuCollapsed;
    footerType: LayoutFooterType;
    navbarType: LayoutNavbarType;
    menuHidden: LayoutMenuHidden;
    contentWidth: LayoutContentWidth;
    navbarColor: LayoutNavbarBackgroundType;
}