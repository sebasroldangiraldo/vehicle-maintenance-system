'use client';

import Title from '@/ui/atoms/title';
import styles from './vehicles-template.module.scss';
import VehiclesTable from '@/ui/organisms/vehicles-table/vehicles-table';
import { IGetVehiclesResponse } from '@/app/core/application/dto/vehicles/get/vehicles-response.dto';
import Pagination from '@/ui/organisms/pagination/pagination';
import Button from '@/ui/atoms/button';
import { icons } from '@/ui/atoms/icons';
import { useState } from 'react';
import Modal from '@/ui/organisms/modal/modal';
import VehiclesForm from '@/ui/organisms/vehicles-form/vehicles-form';
import { useRouter } from 'next/navigation';

interface VehiclesTemplateProps {
    data: IGetVehiclesResponse;
};

const VehiclesTemplate: React.FC<VehiclesTemplateProps> = ({ data }) => {

    const router = useRouter();

    const [modal, setModal] = useState<boolean>(false);
    const [vehicleID, setVehicleID] = useState<number>();

    const toggleModal = () => {

        setModal(!modal);

        if (!modal) {
            setVehicleID(undefined);
        };
    };

    const handleEdit = (id: number) => {
        setModal(!modal);
        setVehicleID(id);
    };

    const handleDelete = async (id: number) => {

        const confirmation = confirm('¿deseas eliminar este vehículo?');

        if (!confirmation) return;

        try {
            await fetch(`/api/vehicles/delete/${id}`, {
                method: 'DELETE'
            });

            router.refresh()
            console.log('eliminado');

        } catch (error) {
            console.error('error', error);
        }
    };

    return (
        <div className={styles.container}>

            <Title level={2}>Gestión de Vehículos</Title>

            <div>
                <Button type='button' className={styles.button} onClick={toggleModal}>{icons.add}Agregar Vehículo</Button>
            </div>

            <Modal title={vehicleID ? "Actualizar vehículo" : "Agregar nuevo vehículo"} open={modal} onClose={toggleModal}>
                <VehiclesForm toggleModal={toggleModal} vehicleID={vehicleID}></VehiclesForm>
            </Modal>

            <div className={styles.table}>
                <VehiclesTable data={data} onDelete={handleDelete} onEdit={handleEdit}></VehiclesTable>

                <Pagination data={data}></Pagination>
            </div>
        </div>
    );
};

export default VehiclesTemplate;