import styles from "../styles/Home.module.css";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";

export default function Layout({children}) {
    return <div className={styles.container}>
        <Header/>
        <Sidebar/>
        <main className={styles.main}>
            {children}
        </main>

        <Footer/>
    </div>
}