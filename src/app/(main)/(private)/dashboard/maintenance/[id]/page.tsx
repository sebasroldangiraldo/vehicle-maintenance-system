'use client';

import { IGetVehicleResponse } from "@/app/core/application/dto/vehicles/update/vehicle-response.dto";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MaintenacePage() {

    const { id  } = useParams();
    const [vehicle, setVehicle] = useState<IGetVehicleResponse>();

    useEffect(() => {

        const fetchVehicleID = async () => {

            try {
                const response = await fetch(`/api/vehicles/get/${id}`);

                const data: IGetVehicleResponse = await response.json();

                setVehicle(data);

                console.log(data);

            } catch (error) {
                console.log("Error al obtener el vehículo", error);
            }
        };

        fetchVehicleID();
        
    }, [id]);

    if (vehicle) {

        return (
            <div>
               Maintance Page
               {vehicle.data.id}
               {vehicle.data.make}
               {vehicle.data.licensePlate}
               {vehicle.data.year}
            </div>
        );
    };
};