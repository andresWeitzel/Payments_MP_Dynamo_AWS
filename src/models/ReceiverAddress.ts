//External
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from "class-validator";
//Const-vars
const MIN_VALUE_ZIP_CODE = 5;
const MAX_VALUE_ZIP_CODE = 20;
const MIN_VALUE_STATE_NAME = 5;
const MAX_VALUE_STATE_NAME = 40;
const MIN_VALUE_CITY_NAME = 3;
const MAX_VALUE_CITY_NAME = 20;
const MIN_VALUE_STREET_NAME = 3;
const MAX_VALUE_STREET_NAME = 200;
const MIN_VALUE_STREET_NUMBER = 1;
const MAX_VALUE_STREET_NUMBER = 200000;

/**
 * @description Objeto que comprende la dirección del destinatario de la compra.
 */
export class ReceiverAddress {
  @IsNotEmpty({
    message: "The zip code of the receiver address cannot be empty",
  })
  @IsString({
    message: "The zip code of the receiver address must be of type string",
  })
  @Length(MIN_VALUE_ZIP_CODE, MAX_VALUE_ZIP_CODE, {
    message: `The value of the receiver address zip code must be between ${MIN_VALUE_ZIP_CODE} and ${MAX_VALUE_ZIP_CODE} characters`,
  })
  private zipCode: string;

  @IsNotEmpty({
    message: "The state name of the receiver address cannot be empty",
  })
  @IsString({
    message: "The state name of the receiver address must be of type string",
  })
  @Length(MIN_VALUE_STATE_NAME, MAX_VALUE_STATE_NAME, {
    message: `The value of the receiver address state name must be between ${MIN_VALUE_STATE_NAME} and ${MAX_VALUE_STATE_NAME} characters`,
  })
  private stateName: string;

  @IsNotEmpty({
    message: "The city name of the receiver address cannot be empty",
  })
  @IsString({
    message: "The city name of the receiver address must be of type string",
  })
  @Length(MIN_VALUE_CITY_NAME, MAX_VALUE_CITY_NAME, {
    message: `The value of the receiver address city name must be between ${MIN_VALUE_CITY_NAME} and ${MAX_VALUE_CITY_NAME} characters`,
  })
  private cityName: string;

  @IsNotEmpty({
    message: "The street name of the receiver address cannot be empty",
  })
  @IsString({
    message: "The street name of the receiver address must be of type string",
  })
  @Length(MIN_VALUE_STREET_NAME, MAX_VALUE_STREET_NAME, {
    message: `The value of the receiver street name must be between ${MIN_VALUE_STREET_NAME} and ${MAX_VALUE_STREET_NAME} characters`,
  })
  private streetName: string;

  @IsNotEmpty({
    message: "The street number of the receiver address cannot be empty",
  })
  @IsInt({
    message:
      "The street number of the receiver address must be of type integer",
  })
  @Min(MIN_VALUE_STREET_NUMBER, {
    message: "street number receiver address value must be greater than zero",
  })
  @Max(MAX_VALUE_STREET_NUMBER, {
    message: `street number receiver address value must be less than ${MAX_VALUE_STREET_NUMBER}`,
  })
  private streetNumber: number;

  constructor(
    $zipCode: string,
    $stateName: string,
    $cityName: string,
    $streetName: string,
    $streetNumber: number
  ) {
    this.zipCode = $zipCode;
    this.stateName = $stateName;
    this.cityName = $cityName;
    this.streetName = $streetName;
    this.streetNumber = $streetNumber;
  }

  public getZipCode(): string {
    return this.zipCode;
  }

  public setZipCode(zipCode: string): void {
    this.zipCode = zipCode;
  }

  public getStateName(): string {
    return this.stateName;
  }

  public setStateName(stateName: string): void {
    this.stateName = stateName;
  }

  public getCityName(): string {
    return this.cityName;
  }

  public setCityName(cityName: string): void {
    this.cityName = cityName;
  }

  public getStreetName(): string {
    return this.streetName;
  }

  public setStreetName(streetName: string): void {
    this.streetName = streetName;
  }

  public getStreetNumber(): number {
    return this.streetNumber;
  }

  public setStreetNumber(streetNumber: number): void {
    this.streetNumber = streetNumber;
  }
}
