import styles from "./styles.module.css";

export default function Loading() {
  return (
    <div className="h-full w-full grid place-items-center">
      <div className={styles["loading-loader"]}>
        <div className={styles["loading-loader-ripple"]} />
        <div className={styles["loading-loader-ripple"]} />
      </div>
    </div>
  );
}
