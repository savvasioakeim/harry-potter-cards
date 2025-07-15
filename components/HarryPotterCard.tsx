type HarryPotterCardType = {
  animal: string;
  commonRoom: string;
  Element: string;
  founder: string;
  ghost: string;
  heads: Array<object>;
  houseColors: Array<string>;
  id: string;
  name: string;
  traits: Array<{ name: string; id: string }>;
  traitSearchTerm?: string;
  onTraitSearch?: (term: string) => void;
  onAddTrait?: (traitName: string) => void;
  onRemoveTrait?: (traitName: string) => void;
};
function isValidColor(color: string): boolean {
  const s = new Option().style;
  s.color = color;
  return s.color !== "";
}
import SearchInput from "./SearchInput";
import { useState, ChangeEvent } from "react";

export default function HarryPotterCard({
  animal,
  name,
  houseColors,
  founder,
  traits,
  traitSearchTerm = "",
  onTraitSearch,
  onAddTrait,
  onRemoveTrait,
}: HarryPotterCardType) {
  const [localInput, setLocalInput] = useState(traitSearchTerm);
  const areValidColors = houseColors.every(isValidColor);

  const filteredTraits = traits.filter((trait) =>
    trait.name.toLowerCase().includes(traitSearchTerm ?? "")
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalInput(e.target.value);
    onTraitSearch?.(e.target.value);
  };
  const handleAddOrRemoveClick = () => {
    const traitName = localInput.trim();
    if (!traitName) return;

    const traitExists = traits.some(
      (trait) => trait.name.toLowerCase() === traitName.toLowerCase()
    );

    if (traitExists) {
      onRemoveTrait?.(traitName);
    } else {
      onAddTrait?.(traitName);
    }

    setLocalInput("");
  };

  const gradientColors = areValidColors
    ? houseColors.join(", ")
    : "white, black";
  return (
    <div className="bg-white max-w-150 h-fit border-1 rounded-lg border-gray-300 p-5">
      <div className="flex justify-between">
        <div className="flex  items-end">
          <h1 className="font-bold text-2xl">{name}</h1>
        </div>
        <div className="flex  items-end">
          <h4 className="font-semibold text-md">{animal}</h4>
        </div>
      </div>

      <div
        className={`h-8  b  my-2 rounded-xl`}
        style={{
          background: `linear-gradient(to right, ${gradientColors})`,
        }}
      ></div>

      <p className="text-lg ">
        Founder: <span className="font-bold">{founder}</span>
      </p>
      <div className="flex items-center gap-2">
        <SearchInput
          height="h-10"
          placeholder="Search house traits"
          onChange={handleInputChange}
        />
        <button
          className="cursor-pointer text-xl w-9 h-9 rounded-full text-white bg-black"
          type="button"
          onClick={handleAddOrRemoveClick}
        >
          +
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {filteredTraits.map((trait) => (
          <span
            key={trait.id}
            className="bg-gray-700 text-white px-2 py-1 rounded"
          >
            {trait.name}
          </span>
        ))}
      </div>
    </div>
  );
}
