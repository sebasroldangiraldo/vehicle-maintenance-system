import styles from './input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder? : string;
    type? : string; 
    name? : string;
    error? : string; 
};

export const Input = ( { placeholder, type = "text", name, error, ...props } : InputProps ) => {
    return (
        <div className={styles.inputContainer}>
            <input type={type} name={name} placeholder={placeholder} className={`${styles.input} ${error && styles.inputError}`} {...props} />
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};