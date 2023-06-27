import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiHousetasks } from "../../api/apiHousetasks";
import { message } from "../../utils/message";
import { NavigationSteps } from "../../components/NavigationSteps";
import type { HouseType } from '../../../../shared/types/house.type'
import { TextField } from "../../components/TextField";


export function HouseUpdate() {
  const params = useParams();
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const [address_number, setAddressNumber] = useState("");
  const [address_complement, setAddressComplement] = useState("");
  const [address_neighborhood, setAddressNeighborhood] = useState("");
  const [address_city, setAddressCity] = useState("");
  const [address_state, setAddressState] = useState("");
  const [address_postal_code, setAddressPostalCode] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    apiHousetasks.get(`/houses/${params.id}`).then(({data}) => {
      const house: HouseType = data[0];
      setNickname(house.nickname);
      setAddress(house.address);
      setAddressNumber(house.address_number);
      setAddressComplement(house.address_complement);
      setAddressNeighborhood(house.address_neighborhood);
      setAddressCity(house.address_city);
      setAddressState(house.address_state);
      setAddressPostalCode(house.address_postal_code);
      setCreatedAt(house.created_at);
    });
  }, []);

  return (
    <div className="w-full md:w-3/5 m-auto flex flex-col gap-3">
      <NavigationSteps
        steps={[
          { to: "/", title: "Home" },
          { to: "/house-update/", title: "Atualizar" },
        ]}
      />
      <form
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          if (nickname.length === 0) {
            alert("O apelido deve ser preenchido");
            return;
          }
          if (address.length === 0) {
            alert("O endereço deve ser preenchido");
            return;
          }
          if (address_number.length === 0) {
            alert("O número do endereço deve ser preenchido");
            return;
          }
          if (address_neighborhood.length === 0) {
            alert("O bairro do endereço deve ser preenchido");
            return;
          }
          if (address_city.length === 0) {
            alert("A cidade do endereço deve ser preenchido");
            return;
          }
          if (address_postal_code.length === 0) {
            alert("O código postal deve ser preenchido");
            return;
          }
          const sendObject = {
            nickname,
            address,
            address_number,
            address_complement,
            address_neighborhood,
            address_city,
            address_state,
            address_postal_code
          };

          const res = await apiHousetasks.put(
            `/houses/${params.id}`,
            sendObject
          );
          const updateHouseResponse = res.data;

          if (updateHouseResponse.success) {
            message("O imóvel foi alterado com sucesso", true);
            navigate(`/house-view/${params.id}`);
          } else {
            message("Houve algum erro na alteração do house", false);
          }
        }}
        className="w-full m-auto flex flex-col gap-3 shadow-2xl p-5"
      >
        <div className="text-slate-500">
          <strong>Id:</strong> {params.id}
        </div>
        <div className="text-slate-500">
          <strong>Criado em:</strong> {createdAt}
        </div>
        <div>
          <label className="text-gray-500 text-sm">
            Apelido
            <TextField
              placeholder="Apelido"
              value={nickname}
              onChange={(nickname) => setNickname(nickname)}
            />
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-sm">
            Endereço
            <TextField
              placeholder="Endereço"
              value={address}
              onChange={(address) => setAddress(address)}
            />
            <TextField
              placeholder="nº"
              value={address_number}
              onChange={(address_number) => setAddressNumber(address_number)}
            />
            <TextField
              placeholder="Complemento"
              value={address_complement}
              onChange={(address_complement) => setAddressComplement(address_complement)}
            />
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-sm">
            Bairro
            <TextField
              placeholder="Bairro"
              value={address_neighborhood}
              onChange={(address_neighborhood) => setAddressNeighborhood(address_neighborhood)}
            />
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-sm">
            Cidade
            <TextField
              placeholder="Cidade"
              value={address_city}
              onChange={(address_city) => setAddressCity(address_city)}
            />
            <TextField
              placeholder="UF"
              value={address_state}
              onChange={(address_state) => setAddressState(address_state)}
            />
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-sm">
            CEP:
            <TextField
              placeholder="CEP"
              value={address_postal_code}
              onChange={(address_postal_code) => setAddressPostalCode(address_postal_code)}
            />
          </label>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-emerald-400 text-white px-4 rounded-xl h-12 my-auto"
          >
            Alterar
          </button>
        </div>
      </form>
    </div>
  );
}
