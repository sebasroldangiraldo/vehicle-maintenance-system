import Button from '@/ui/atoms/button';
import styles from './vehicles-table.module.scss';
import { IGetVehiclesResponse } from '@/app/core/application/dto/vehicles/get/vehicles-response.dto';
import { icons } from '@/ui/atoms/icons';
import defaultImage from "@/images/car.jpg"
import { useRouter } from 'next/navigation';

interface VehiclesTableProps {
    data: IGetVehiclesResponse;
    onEdit: (id : number) => void;
    onDelete: (id : number) => void;
};

const VehiclesTable: React.FC<VehiclesTableProps> = ({ data, onEdit, onDelete }) => {

    const router = useRouter();

    return (
        <div className={styles.tableContainer}>

            <table className={styles.table}>

                <thead className={styles.thead}>
                    <tr>
                        <th>Foto</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Año</th>
                        <th>Placa</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {data.data.map((vehicle, index) => (
                        <tr key={index}>
                            <td>
                                <div className={styles.imageContainer}>
                                    <img src={vehicle.photo ? vehicle.photo : defaultImage.src} alt="car" className={styles.image} />
                                </div>
                            </td>
                            <td>{vehicle.make}</td>
                            <td>{vehicle.model}</td>
                            <td>{vehicle.year}</td>
                            <td>{vehicle.licensePlate}</td>
                            <td>
                                <div className={styles.actions}>
                                    <Button type="button" className={styles.button} onClick={() => onEdit(vehicle.id)}>{icons.edit}</Button>
                                    <Button type="button" className={styles.button}  onClick={() => router.push(`/dashboard/maintenance/${vehicle.id}`)}>{icons.history}</Button>
                                    <Button type="button" className={styles.button} onClick={() => onDelete(vehicle.id)} >{icons.trash}</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
        </div>
    );
};

export default VehiclesTable;