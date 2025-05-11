import { Pagination } from './Pagination.tsx'
import { usePagination } from './usePagination'

export const Page = () => {
  const { items, isFirstPage, isLastPage, pageInfo, onPageChange } = usePagination()

  return (
    <>
      <p>page number: {items.currentPage}</p>
      <Pagination items={items} isFirstPage={isFirstPage} isLastPage={isLastPage} pageInfo={pageInfo} onPageChange={onPageChange} />
    </>)

}
