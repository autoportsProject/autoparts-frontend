import { CoordsDto } from "./CoordsDto";

export interface CitySearchDto {
    coords: CoordsDto;
    district: string;
    name: string;
    population: number;
    subject: string;
}