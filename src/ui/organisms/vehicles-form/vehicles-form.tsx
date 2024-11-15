'usce client';

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ICreateVehicleRequest } from "@/app/core/application/dto/vehicles/post/vehicles-request.dto";
import * as yup from "yup";
import { FormInputField } from "@/ui/molecules/form-input-field/form-input-field";
import { FormFileField } from "@/ui/molecules/form-file-field/form-file-field";
import Button from "@/ui/atoms/button";
import styles from './vehicles-form.module.scss';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IGetVehicleResponse } from "@/app/core/application/dto/vehicles/update/vehicle-response.dto";

interface IVehiclesFormProps {
    vehicleID?: number;
    toggleModal: () => void;
};

const registerSchema = yup.object().shape({
    make: yup
        .string()
        .required('La marca del vehículo es obligatoria.'),
    model: yup
        .string()
        .required('El modelo del vehículo es obligatorio.'),
    year: yup
        .string()
        .required('El año del vehículo es obligatorio.'),
    licensePlate: yup
        .string()
        .required('La placa del vehículo es obligatoria.'),
    file: yup
        .mixed<File>()
        .nullable()
        .required('La imagen del vehículo es obligatoria.'),
});

const VehiclesForm = ({ vehicleID, toggleModal }: IVehiclesFormProps) => {

    const router = useRouter();

    const { control, handleSubmit, setError, formState: { errors }, setValue } = useForm<ICreateVehicleRequest>({ mode: "onChange", reValidateMode: "onChange", resolver: yupResolver(registerSchema) });

    useEffect(() => {

        if (vehicleID) {

            const fetchProjectID = async () => {

                try {
                    const response = await fetch(`/api/vehicles/get/${vehicleID}`);
                    const data: IGetVehicleResponse = await response.json();

                    setValue('make', data.data.make);
                    setValue('model', data.data.model);
                    setValue('year', data.data.year.toString());
                    setValue('licensePlate', data.data.licensePlate);

                } catch (error) {
                    console.log(error);
                }
            };

            fetchProjectID();
        }
    }, [vehicleID]);

    const handleVehicle = async (data: ICreateVehicleRequest) => {

        const formData = new FormData();

        formData.append("make", data.make);
        formData.append("model", data.model);
        formData.append("year", data.year);
        formData.append("licensePlate", data.licensePlate);

        if (data.file instanceof File) {
            formData.append("file", data.file);
        } else {
            console.log("La imagen no es un archivo válido");
        };

        if (vehicleID) {

            try {
                const response = await fetch(`/api/vehicles/update/${vehicleID}`, {
                    method: "PATCH",
                    body: formData
                });

                if (!response.ok) {
                    throw new Error("Error al actualizar el vehículo");
                };

                console.log('Vehículo actualizado exitosamente.');
                router.refresh();
                toggleModal();
                return await response.json();

            } catch (error) {
                console.error("Error al crear el vehículo: ", error);
                throw error;
            }
        } else {

            try {
                const response = await fetch("/api/vehicles/create", {
                    method: "POST",
                    body: formData
                });

                if (!response.ok) {
                    throw new Error("Error al registrar el usuario");
                }
                console.log('Vehículo creado exitosamente.');
                router.refresh();
                toggleModal();
                return await response.json();

            } catch (error) {
                console.error("Error al crear el vehículo: ", error);
                throw error;
            };
        }
    };

    return (
        <form className={styles.registerForm} onSubmit={handleSubmit(handleVehicle)}>


            <FormFileField<ICreateVehicleRequest>
                control={control}
                name="file"
                label="Imagen:"
                error={errors.file}
            />

            <FormInputField<ICreateVehicleRequest>
                control={control}
                type="text"
                name="make"
                label="Marca:"
                error={errors.make}
                placeholder="Ingresa la marca del vehículo"
            />

            <FormInputField<ICreateVehicleRequest>
                control={control}
                type="text"
                name="model"
                label="Modelo:"
                error={errors.model}
                placeholder="Ingresa el modelo del vehículo"
            />

            <FormInputField<ICreateVehicleRequest>
                control={control}
                type="number"
                name="year"
                label="Año:"
                error={errors.year}
                placeholder="Ingresa el año del vehículo"
            />

            <FormInputField<ICreateVehicleRequest>
                control={control}
                type="text"
                name="licensePlate"
                label="Placa:"
                error={errors.licensePlate}
                placeholder="Ingresa la placa del vehículo"
            />

            <Button type="submit" className={styles.button}>{vehicleID ? "Actualizar" : "Agregar"}</Button>
        </form>
    );
};

export default VehiclesForm;