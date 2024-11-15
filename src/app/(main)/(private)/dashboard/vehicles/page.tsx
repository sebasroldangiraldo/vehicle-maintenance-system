import { vehiclesService } from "@/app/infrastructure/services/vehicles.service";
import VehiclesTemplate from "@/ui/templates/vehicles-template/vehicles-template";

interface VehiclesPageProps {
    searchParams: {
        page: string;
        size: string;
        name: string;
    };
};

const useVehiclesService = new vehiclesService();

export const generateMetadata = async ({ searchParams }: VehiclesPageProps) => {

    const page = searchParams.page ?? 1;

    return {
        title: `Vehicles - Page ${page}`,
        description: 'Vehicle Maintenance System'
    };
};

export default async function VehiclesPage({searchParams} : VehiclesPageProps) {

    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const size = searchParams.size ? parseInt(searchParams.size) : 5;

    const data = await useVehiclesService.find(page, size);
    console.log(data);

    return (
        <div>
            <VehiclesTemplate data={data}></VehiclesTemplate>
        </div>
    );
};