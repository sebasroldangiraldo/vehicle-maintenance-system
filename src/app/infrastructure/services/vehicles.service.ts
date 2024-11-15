import { IGetVehiclesResponse } from "@/app/core/application/dto/vehicles/get/vehicles-response.dto";
import { ClientHttp } from "../utils/client-http";
import { ICreateVehicleResponse } from "@/app/core/application/dto/vehicles/post/vehicles-response.dto";
import { IGetVehicleResponse } from "@/app/core/application/dto/vehicles/update/vehicle-response.dto";

export class vehiclesService {

    private clientHttp : ClientHttp;

    constructor() {
        this.clientHttp = new ClientHttp(); // inyección de dependencias -> el constructor le da valor al atributo que contiene la clase. 
    };

    async find(page : number, size : number) {

        try {
            const data = this.clientHttp.get<IGetVehiclesResponse>(`vehicles?page=${page}&size=${size}`);
            return data;

        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    async findOne(id : number) {

        try {
            const data = this.clientHttp.get<IGetVehicleResponse>(`vehicles/${id}`);
            return data;

        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    async create( body : FormData) {

        try {
            const data = this.clientHttp.register<ICreateVehicleResponse, FormData>("vehicles", body);
            return data;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }; 

    async update( id : number, body : FormData) {

        try {
            const data = this.clientHttp.update<IGetVehiclesResponse, FormData>(`vehicles/${id}`, body);
            return data;

        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    async destroy( id : number ) {

        try {
            const data = this.clientHttp.delete(`vehicles/${id}`);
            return data;

        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}