'use client';

import { signOut, useSession } from "next-auth/react";
import styles from './sidebar.module.scss';
import Title from "@/ui/atoms/title";
import Button from "@/ui/atoms/button";
import { icons } from "@/ui/atoms/icons";
import Link from "next/link";
import { CustomSession } from "@/app/api/auth/[...nextauth]/route";

const Sidebar : React.FC = () => {
    
    const { data : session } = useSession();
    const userSession = session as CustomSession;

    const handleSignOut = () => {
        signOut();
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                {icons.car}
                <Title level={4} className={styles.title}>TransportSolutions</Title>
            </div>
            <div className={styles.userContainer}>
                {icons.user}
                <p className={styles.text}>{userSession.user.email}</p>
            </div>
            <div className={styles.options}>
                <Link href={"/dashboard/vehicles"} className={styles.link}>{icons.smallCar}Vehículos</Link>
                <Button type="button" className={styles.button} onClick={handleSignOut}>{icons.logout}Cerrar Sesión</Button>
            </div>
        </div>
    );
};

export default Sidebar;