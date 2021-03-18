import styles from '../styles/Home.module.css'
import React from 'react';
import Router from 'next/router';
import { addToStorage } from '../utils/localStorage';
import { inGameUrl, loginUrl } from '../utils/consts';
import useUserName from '../hooks/useUserName';
import authPage from '../utils/authPage';
import dynamic from 'next/dynamic';
import { logout } from '../utils/callApi';

const Header = dynamic(() => import('../components/Header'));
const DropDown = dynamic(() => import('../components/DropDown'));
const Logo = dynamic(() => import('../components/Logo'));
const Button = dynamic(() => import('../components/Button'));

export default function Home() {
  const {userName, setUserName, emptyNameError, setEmptyNameError } = useUserName('');

  const startGame = () => {
    if(!userName){
      setEmptyNameError(true);
      return; 
    }else{
      setEmptyNameError(false);
    }
    addToStorage('userName', userName);
    Router.push(inGameUrl);
  }

  const userLogOut = () => {
    logout();
    Router.push(loginUrl);
  }

  return (
    <div className={styles.container}>
        <Header/>
        <Logo 
          logoClass={"logohomeContainer"}
          imgSrc={"/assets/keyboard.png"}
          alt={"Fast Finger Logo"}
          imgClass={"keyImg"}
          textClass={"homeLogo"}
          text={"Fast Fingers"}
          description={"the ultimate typing game"}
        />
        <DropDown/>
        <Button
          styleClass
          clickFunction={startGame}
          imgSrc={'/assets/start.png'}
          altText={"Start Game"}
          imgClass={"startImg"}
          textClass={"startText"}
          ButtonText={"Start Game"}
        />
        <Button
        textClass={"startText"}
        clickFunction={userLogOut}
        ButtonText={"Logout"}
        />
    </div>
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
    props: { },
  }
}