import { LinkButton } from "./LinkButton";

type PaginationListType = {
  totalPages: number;
  currentPage: number;
  getLink: (page: number) => string;

  // search: string;
  // orderBy: string;
  // direction: string;
  // offset: number;
  // limit: number;
};



export function PaginationList({ totalPages, currentPage, getLink }: PaginationListType) {
  
  const pageList = Array.from(
    { length: totalPages },
    (item, index) => index + 1
  );
  // console.log('pageList.length');
  // console.log(pageList.length);

  return (
    <div className="flex gap-3 mb-5 justify-center">
      {pageList.map((page) => {
        return (
          <LinkButton
            key={page}
            to={getLink(page)}
            className={currentPage === page ? "bg-blue-700" : ""}
            children={page.toString()}
          ></LinkButton>
        );
      })}
    </div>
  );
}
