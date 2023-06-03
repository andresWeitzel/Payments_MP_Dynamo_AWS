export class ReceiverAddress{


    private zipCode: string;
    private stateName: string;
    private cityName: string;
    private streetName: string;
    private streetNumber: number;

    constructor($zipCode: string, $stateName: string, $cityName: string, $streetName: string, $streetNumber: number) {
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