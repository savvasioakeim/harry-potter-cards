"use client";

import { useEffect, useState } from "react";
import HarryPotterCard from "../../components/HarryPotterCard";
import SearchInput from "../../components/SearchInput";

type HouseType = {
  id: string;
  name: string;
  animal: string;
  houseColours: string;
  founder: string;
  traits: Array<{ name: string; id: string }>;
};

export default function Home() {
  const [houses, setHouses] = useState<HouseType[]>([]);

  const [houseSearchTerm, setHouseSearchTerm] = useState("");
  const [traitSearchTerms, setTraitSearchTerms] = useState<{
    [houseId: string]: string;
  }>({});
  useEffect(() => {
    fetch("https://wizard-world-api.herokuapp.com/houses")
      .then((res) => res.json())
      .then((data) => {
        console.log("Wizard Houses:", data);
        setHouses(data);
      })
      .catch((err) => {
        console.error("Error fetching houses:", err);
      });
  }, []);

  const handleHouseSearch = (term: string) => {
    setHouseSearchTerm(term.toLowerCase());
  };
  const filteredHouses = houses.filter((house) =>
    house.name.toLowerCase().includes(houseSearchTerm)
  );
  const handleTraitSearch = (houseId: string, term: string) => {
    setTraitSearchTerms((prev) => ({ ...prev, [houseId]: term.toLowerCase() }));
  };

  const handleAddTrait = (houseId: string, traitName: string) => {
    if (!traitName.trim()) return;
    setHouses((prevHouses) =>
      prevHouses.map((house) => {
        if (house.id !== houseId) return house;

        if (
          house.traits.some(
            (trait) => trait.name.toLowerCase() === traitName.toLowerCase()
          )
        ) {
          return house;
        }

        return {
          ...house,
          traits: [
            ...house.traits,
            { name: traitName, id: Date.now().toString() },
          ],
        };
      })
    );
    setTraitSearchTerms((prev) => ({ ...prev, [houseId]: "" }));
  };

  const handleRemoveTrait = (houseId: string, traitName: string) => {
    setHouses((prevHouses) =>
      prevHouses.map((house) => {
        if (house.id !== houseId) return house;
        return {
          ...house,
          traits: house.traits.filter(
            (trait) => trait.name.toLowerCase() !== traitName.toLowerCase()
          ),
        };
      })
    );
  };

  return (
    <div className="p-4 space-y-4 ">
      <div>
        <SearchInput
          onChange={(e) => handleHouseSearch(e.target.value)}
          height="h-14"
          placeholder="Search houses"
        />
      </div>
      {filteredHouses.map((house) => (
        <HarryPotterCard
          key={house.id}
          id={house.id}
          animal={house.animal}
          name={house.name}
          houseColors={house.houseColours
            .split(/ and |, /i)
            .map((color) => color.trim().toLowerCase())}
          founder={house.founder}
          traits={house.traits}
          traitSearchTerm={traitSearchTerms[house.id] || ""}
          onTraitSearch={(term) => handleTraitSearch(house.id, term)}
          onAddTrait={(traitName) => handleAddTrait(house.id, traitName)}
          onRemoveTrait={(traitName) => handleRemoveTrait(house.id, traitName)}
        />
      ))}
    </div>
  );
}
