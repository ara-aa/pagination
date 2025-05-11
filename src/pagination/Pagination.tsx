import { PAGE_SETTING } from './const'
import type { ItemType, Paginator } from './usePagination'

type Props = {
  items: ItemType
  isFirstPage: boolean
  isLastPage: boolean
  pageInfo: Paginator
  onPageChange: (pageNumber: number) => void
}

export const Pagination: React.FC<Props> = ({
  items,
  isFirstPage,
  isLastPage,
  pageInfo,
  onPageChange,
}) => {
  return (
    <nav aria-label="Pagination">
      <ul className="uk-pagination uk-flex-center" uk-margin="true">
        <li {...(isFirstPage && { className: 'uk-disabled' })}>
          <button
            aria-label="Go to first page"
            onClick={() => onPageChange(PAGE_SETTING.FIRST_PAGE)}
            type="button"
          >
            <span uk-icon="chevron-double-left" />
          </button>
        </li>
        <li {...(isFirstPage && { className: 'uk-disabled' })}>
          <button
            aria-label="Go to previous page"
            onClick={() => onPageChange(pageInfo.previousPage)}
            type="button"
          >
            <span uk-pagination-previous="true" />
          </button>
        </li>

        {pageInfo.pageNumbers.map((_, index) => {
          const page = pageInfo.firstPage + index
          if (page === items.currentPage) {
            return (
              <li className="uk-active" key={`page-${page}`}>
                <span aria-current="page" aria-label={`Go to page number ${page}`}>
                  {page}
                </span>
              </li>
            )
          }
          return (
            <li key={`page-${page}`}>
              <button onClick={() => onPageChange(page)} type="button">
                {page}
              </button>
            </li>
          )
        })}

        <li {...(isLastPage && { className: 'uk-disabled' })}>
          <button
            aria-label="Go to next page"
            onClick={() => onPageChange(pageInfo.nextPage)}
            type="button"
          >
            <span uk-pagination-next="true" />
          </button>
        </li>
        <li {...(isLastPage && { className: 'uk-disabled' })}>
          <button
            aria-label="Go to last page"
            onClick={() => onPageChange(items.totalPages)}
            type="button"
          >
            <span uk-icon="chevron-double-right" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
