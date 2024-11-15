import { vehiclesService } from "@/app/infrastructure/services/vehicles.service";
import { NextResponse } from "next/server";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: number }> }) {

    const service = new vehiclesService();

    try {
        const id = (await params).id;
        await service.destroy(id);

        return NextResponse.json({ message: 'vehículo eliminado exitosamente' }, { status: 200 });

    } catch (error: unknown) {

        return NextResponse.json({ message: 'error' }, { status: 500 });
    };
};