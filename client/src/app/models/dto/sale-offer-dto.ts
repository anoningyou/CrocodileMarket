import { BaseDto } from "./base-dto";

export interface SaleOfferDto extends BaseDto {
    name: string;
    price: number;
    description: string;
}