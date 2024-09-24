// import { lazy } from "react"

// export const DEFAULT_PER_PAGE = 10
// export const DEFAULT_PAGE = 1

// const Pagination = lazy(() => import('../../components/table/PaginationComponent'))
// import {getUniqueParams, updateParams} from "./routeHelper";

// export const paginationComponent = (args) => {
//     return <Pagination {...args} />
// }

// export function getValidPageNumber(page) {
//     page = Number.parseInt(page);
//     if (!Number.isInteger(page) || page < DEFAULT_PAGE) {
//         page = DEFAULT_PAGE;
//     }
//     return page;
// }

// export function getValidPerPage(perPage) {
//     perPage = Number.parseInt(perPage);
//     if (!Number.isInteger(perPage) || (perPage < 5 || perPage > 100)) {
//         perPage = DEFAULT_PER_PAGE;
//     }
//     return perPage;
// }

// export function getCurrentPage() {
//     const page = getUniqueParams().get('page');
//     return getValidPageNumber(page);
// }

// export function getPerPage() {
//     const perPage = getUniqueParams().get('per_page');
//     return getValidPerPage(perPage);
// }

// export function getNextPageNumber() {
//     let currentPage = getCurrentPage();
//     return ++currentPage;
// }

// export function getPreviousPageNumber() {
//     let currentPage = getCurrentPage();
//     if (currentPage <= DEFAULT_PAGE) {
//         return DEFAULT_PAGE;
//     }
//     return --currentPage;
// }

// export function updatePaginationParams(page, perPage) {
//     const updatedParams = new URLSearchParams(window.location.search);

//     updatedParams.set('page', getValidPageNumber(page).toString());
//     updatedParams.set('per_page', getValidPerPage(perPage).toString());

//     updateParams(updatedParams.toString())
// }



// export function generatePaginationParams(page, perPage) {
//     page = getCurrentPage()
//     perPage = getPerPage()

//     return {page, per_page: perPage}
// }