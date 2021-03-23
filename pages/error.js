import styles from '../styles/Game.module.css'
import dynamic from 'next/dynamic';
import { homeUrl, loginUrl } from '../utils/consts';
import useUserName from '../hooks/useUserName';
import Router  from 'next/router';
import authPage from '../utils/authPage';
import { addToStorage, getFromStorage } from '../utils/localStorage';

const Header = dynamic(() => import('../components/Header'));
const Logo = dynamic(() => import('../components/Logo'));
const Level = dynamic(() => import('../components/Level'));
const Button = dynamic(() => import('../components/Button')); 

export default function GameOver() {
    const { userName } = useUserName('');
    const quitGame = () => {
        let user = getFromStorage("userName");
        localStorage.clear();
        addToStorage("userName",user);
        Router.push(homeUrl);
    }

    return (
    <>
        <Header/>
        <div className={styles.container}>
            <div className={styles.left}>
                <Logo 
                    logoClass={"logoGameContainer"}
                    imgSrc={"/assets/keyboard.png"}
                    alt={"Fast Finger Logo"}
                    imgClass={"smallLogo"}
                    textClass={"gameLogoText"}
                    text={"Fast Fingers"}
                />
                <Level/>
            </div>
            <div className={styles.middle}>
                <div className={styles.endGame }>
                    <div class={styles.error}>Something went wrong.Please try again sometimes later.</div>
                    <Button 
                        clickFunction={quitGame}
                        styleClass={quitGame}
                        altText={"Quit Game"}
                        imgClass={"quitImg"}
                        textClass={"quitText"}
                        ButtonText={"Quit Game"}
                    />
                </div>             
            </div>
            <div className={styles.right}>
                <Logo 
                        logoClass={"userLogoContainer"}
                        imgSrc={"/assets/userLogo.png"}
                        alt={"User Logo"}
                        imgClass={"smallLogo"}
                        textClass={"userLogoText"}
                        text={userName}
                    />            
            </div>
        </div>
    </ >
    )
}

export const getServerSideProps = async function ({ req, res }) {
    let resp = await authPage(req);
    
    if (!resp) {
      return {
        redirect: {
          destination: loginUrl,
          permanent: false,
        },
      }
    }
  
    return {
      props: {  },
    }
}