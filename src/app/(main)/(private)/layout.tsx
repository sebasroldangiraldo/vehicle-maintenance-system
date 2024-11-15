import Sidebar from "@/ui/organisms/sidebar/sidebar";
import AuthGuard from "./dashboard/guard/auth-guard";
import styles from './layout.module.scss';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {

    return (
        <AuthGuard>
            <div className={styles.layout}>
                <aside className={styles.aside}>
                    <Sidebar></Sidebar>
                </aside>
                <div className={styles.container}>
                    {children}
                </div>
            </div>
        </AuthGuard>
    );
};