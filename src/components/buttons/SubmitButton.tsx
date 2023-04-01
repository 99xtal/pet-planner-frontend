import styles from './SubmitButton.module.scss'

const SubmitButton = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return <button {...props} className={styles.button}/>;
};

export default SubmitButton;