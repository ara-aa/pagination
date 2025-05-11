import { useState } from 'react'
import { sampleItems, PAGE_SETTING } from './const'

export type ItemType = (typeof sampleItems)[number]
export type Paginator = {
  firstPage: number
  pageNumbers: number[]
  lastPage: number
  previousPage: number
  nextPage: number
}

const isLessThanRangePage = (last: number, first: number) =>
  last - first + 1 < PAGE_SETTING.RANGE_DISPLAYED
const isMoreThanRangePage = (last: number, first: number) =>
  last - first + 1 > PAGE_SETTING.RANGE_DISPLAYED

const paginator = (totalPages: number, currentPage: number): Paginator => {
  let first_page = Math.max(
    PAGE_SETTING.FIRST_PAGE,
    currentPage - Math.floor(PAGE_SETTING.RANGE_DISPLAYED / 2)
  )
  let last_page = Math.min(totalPages, currentPage + Math.floor(PAGE_SETTING.RANGE_DISPLAYED / 2))

  // adjust our bounds accordingly.
  if (isLessThanRangePage(last_page, first_page)) {
    if (currentPage < totalPages / 2) {
      last_page = Math.min(
        totalPages,
        last_page + (PAGE_SETTING.RANGE_DISPLAYED - (last_page - first_page))
      )
    } else {
      first_page = Math.max(
        1,
        first_page - (PAGE_SETTING.RANGE_DISPLAYED - (last_page - first_page))
      )
    }
  }

  // odd number of pages.
  if (isMoreThanRangePage(last_page, first_page)) {
    if (currentPage > totalPages / 2) {
      first_page++
    } else {
      last_page--
    }
  }

  return {
    firstPage: first_page,
    pageNumbers: [...Array(last_page - first_page + 1)].fill(0),
    lastPage: last_page,
    previousPage: currentPage - 1,
    nextPage: currentPage + 1,
  }
}

export const usePagination = () => {
  const [items, setItems] = useState<ItemType>(sampleItems[0])
  const [pageInfo, setPageInfo] = useState<ReturnType<typeof paginator>>(
    paginator(items.totalPages, items.currentPage)
  )

  const onPageChange = (pageNumber: number) => {
    const page = sampleItems[pageNumber - 1]
    setItems(page)
    setPageInfo(paginator(page.totalPages, page.currentPage))
  }

  return {
    items,
    pageInfo,
    isFirstPage: items.currentPage === PAGE_SETTING.FIRST_PAGE,
    isLastPage: items.currentPage === items.totalPages,
    onPageChange,
  }
}
