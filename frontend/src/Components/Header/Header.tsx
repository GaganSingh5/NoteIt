import React, { useContext } from 'react'
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/pixel-art-neutral";
import AuthContext from '../../Context/AuthProvider';
import './Header.less'

const Header = () => {
  const { auth } = useContext(AuthContext);
  const svg = createAvatar(style, {
    seed: auth.username,
    dataUri: true
  });   
  return (
    <div className='header-container'>
      <div className="logo">
        <img src="./logo.png" alt="" />
      </div>
      <div className="avatar">
        <img src={svg} alt="" />
      </div>
    </div>
  )
}

export default Header