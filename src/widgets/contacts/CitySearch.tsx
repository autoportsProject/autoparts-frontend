"use client";

import { CitySearchDto } from "@/domain/dto/CitySearch/CitySearchDto";
import { CoordsDto } from "@/domain/dto/CitySearch/CoordsDto";
import { Autocomplete } from "@mantine/core";
import { useState } from "react";

interface SearchProps {
    onCitySelect?: (coords: CoordsDto) => void;
}

export const CitySearch = ({onCitySelect}: SearchProps) => {
    const [query, setQuery] = useState("");
    const [sugs, setSugs] = useState<string[]>([]);
    const [cityMap, setCityMap] = useState<Record<string, CoordsDto>>({});

    const getCities = async (value: string) => {
        if (value.length < 2) {
            setSugs([]);
            return;
        }

        const res = await fetch(process.env.NEXT_PUBLIC_CITIES_API as string);
        const data: CitySearchDto[] = await res.json();

        const map: Record<string, CoordsDto> = {};

        const cities = data.filter(x => x.name.toLowerCase().startsWith(value.toLowerCase())).map(x => {
            const label = `${x.name}, ${x.subject}`;
            map[label] = x.coords;
            return label;
        });
        setCityMap(map);
        setSugs([...new Set(cities)]);
    }

    const onChange = (value: string) => {
        setQuery(value);
        getCities(value);
    }

    const onOptionSubmit = (value: string) => {
        const coords = cityMap[value];
        if (coords && onCitySelect)
            onCitySelect(coords);
    }

    return (
        <Autocomplete placeholder="Введите город" data={sugs} value={query} onChange={onChange} onOptionSubmit={onOptionSubmit}></Autocomplete>
    )
}