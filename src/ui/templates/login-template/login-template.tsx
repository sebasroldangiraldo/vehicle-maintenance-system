import { LoginForm } from '@/ui/organisms/login-form/login -form';
import styles from './login-template.module.scss';

export const LoginTemplate = () => {
    return (
        <div className={styles.templateContainer}>
            <div className={styles.formContainer}>
                <LoginForm />
            </div>
        </div>

    );
};