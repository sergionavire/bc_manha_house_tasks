import { apiHousetasks } from "../../api/apiHousetasks";
import { Navigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { HouseType } from '../../../../shared/types/house.type'
import { useParams } from "react-router-dom";
import { HouseList } from '../../components/HouseList';
import { LinkButton } from "../../components/LinkButton";
import { PaginationList } from "../../components/PaginationList";
import { message } from "../../utils/message";

async function getHouseList() {
  const res = await apiHousetasks.get(`/houses`);
  const data = await res.data;
  return data;
}

async function getHouseCount() {
  const res = await apiHousetasks.get(`/houses/count`);
  const count = await res.data[0].count;
  
  return Number(count);
}


export function HouseHome() {

  const houseListInitial: HouseType[] = [];
  const [loading, setLoading] = useState(true);
  const loadingTextStatus = loading ? "Carregando" : "";
  const [houseList, setHouseList] = useState(houseListInitial);

  const [houseCount, setHouseCount] = useState(0);
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || undefined;
  
  const [search, setSearch] = useState(initialSearch ?? "");
  const [orderBy, setOrderBy] = useState("created_at");
  const [direction, setDirection] = useState("desc");
  const [pageTotal, setPageTotal] = useState(0);
  const pageSize = 10;
  const limit = pageSize;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  const pageCount = Math.ceil(houseList.length / pageSize);

  // const pageParams = createUrlParams({ search, direction, order_by: orderBy });
  const getPostsParams = {
    offset: 0,
    limit: pageSize,
    search: search.length > 0 ? search : "",
    direction,
    order_by: orderBy,
  };

  useEffect(() => {
    setLoading(true);
    getHouseList().then((houses: HouseType[]) => {
      setHouseList(houses);
      setLoading(false);
    });
    getHouseCount().then((houseCount: number) => {
      setHouseCount(houseCount);
      const pageCount = Math.ceil(houseCount / pageSize);
      setPageTotal(pageCount);
      
    });
  }, []);

  const pageList = Array.from(
    { length: pageTotal },
    (item, index) => index + 1
  );

  return (
    <div>
      <div className="shadow-md mb-10">
        <form
          className="flex"
          noValidate
          onSubmit={async (event) => {
            event.preventDefault();
            const sendObject = {
              offset: 0,
              limit: pageSize,
              search: search.length > 0 ? search : "",
              direction,
              order_by: orderBy,
            };
            setSearch(sendObject.search ? sendObject.search : "");
            setOrderBy(sendObject.order_by ? sendObject.order_by : orderBy);
            setDirection(sendObject.direction ? sendObject.direction : direction);
            setOffset(sendObject.offset ? sendObject.offset : offset);
            
            const urlParams = `?search=${sendObject.search}&order_by=${sendObject.order_by}&direction=${sendObject.direction}&offset=${sendObject.offset}&limit=${sendObject.limit}`;

            const res = await apiHousetasks.get(
              `/houses${urlParams}`
            );
            const getHousesFiltered = res.data;
            setHouseList(getHousesFiltered)

            const urlParamsPages = `?search=${sendObject.search}`;
            const resPages = await apiHousetasks.get(
              `/houses/count${urlParamsPages}`
            );
            const getHousesCountFiltered = resPages.data;
            setPageTotal(getHousesCountFiltered);

        }}
        >
        <div className="flex-1 flex">
          <span className="pr-4 pt-2 font-bold">Pesquisar:</span>
          <input
            className="flex-1 outline outline-1 outline-gray-300 h-10 px-3 mr-3 rounded-full"
            type="search"
            value={search}
            placeholder='Digite aqui'
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <select
          value={orderBy}
          className="bg-white py-2 px-4 border rounded-md"
          onChange={(event) => setOrderBy(event.target.value)}
        >
          <option value="id">ID</option>
          <option value="nickname">Apelido</option>
          <option value="address">Endereço</option>
          <option value="address_neighborhood">Bairro</option>
          <option value="address_city">Cidade</option>
          <option value="address_state">Estado</option>
          <option value="created_at">Data de criação</option>
        </select>
        <select
          value={direction}
          onChange={(event) => setDirection(event.target.value)}
          className="bg-white py-2 px-4 border rounded-md min-w-[128px] md:min-w-[256px]"
        >
          <option value="ASC">Crescente</option>
          <option value="DESC">Decrescente</option>
        </select>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-emerald-300 text-white px-4 rounded-xl h-12 my-auto"
          >
            Buscar
          </button>
        </div>
        </form>
      </div>
      <div className="flex justify-between pr-6">
        <h2 className="font-bold mb-3 text-2xl ml-2">Lista de imóvel:</h2>
        <LinkButton to={"/house-new/"}>Novo Imóvel</LinkButton>
      </div>
      <div>{loadingTextStatus}</div>
      <HouseList
        house_list={houseList}
        onDelete={(id) => {
          const newHouse = houseList.filter(
            (house) => house.id !== id
          );
          setHouseList(newHouse);
        }}
      />
      <div className="flex gap-3 mb-5 justify-center">
        {pageList.map((page) => {
          const classCurrentPage = currentPage === page ? "bg-blue-700" : "bg-emerald-400";
          const currentOffset = (page - 1) * limit;
          
          return (
            <button
              key={page}
              onClick={async() => {
                const urlParams = `?search=${search}&order_by=${orderBy}&direction=${direction}&offset=${currentOffset}&limit=${limit}`;
    
                const res = await apiHousetasks.get(
                  `/houses${urlParams}`
                );
                const getHousesFilteredPages = res.data;
                setHouseList(getHousesFilteredPages)
                setCurrentPage(page);
              }}
              className={` text-white px-4 rounded-xl my-auto p-3 hover:bg-emerald-600 ${classCurrentPage}`}
            >
              {page.toString()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
