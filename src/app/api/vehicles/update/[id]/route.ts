import { vehiclesService } from "@/app/infrastructure/services/vehicles.service";
import { NextResponse } from "next/server";

export async function PATCH(request : Request, { params }: { params: Promise<{ id: number }>}) {

    const service = new vehiclesService();

    try {
        const formData = await request.formData();  
        const id = (await params).id;
        const response = await service.update(id, formData);

        return NextResponse.json(response, {status : 200});

    } catch (error : unknown) {
        
        return NextResponse.json({message : 'error'}, {status : 500});
    };
};