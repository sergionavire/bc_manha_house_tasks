import { apiHousetasks } from "../api/apiHousetasks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Home() {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const loadingTextStatus = loading ? "Carregando" : "";
  useEffect(() => {
    setLoading(false);
  }, [params]);

  return (
    <div>
      <h2 className="font-bold mb-3 text-2xl ml-2">Selecione a opção:</h2>
      <div>{loadingTextStatus}</div>
    </div>
  );
}
