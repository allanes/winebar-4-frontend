import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { categoriesList_sidebar } from '../../types/categoriesList_sidebar'


interface NavLink {
  title: string;
  link: string;
  icon: string;
}

interface SidebarState {
  navList: NavLink[]
}

export const SideBar = () => {

  const [navList, setNavList] = useState<SidebarState["navList"]>([])
  const location = useLocation();


  useEffect(() => {
    setNavList(categoriesList_sidebar)
  }, [])

  return (
    <div className='sideBar-content'>
      {navList.map((navItems, index) => {
        const isActive = location.pathname === navItems.link;
        
        return (
          <Link 
            className={`link-underline ${isActive && 'link-isActive' }`} 
            key={index} 
            to={navItems.link}
          >
            <div className={`link-container ${isActive && 'link-container-isActive' }`}>
              <img className='icon-link--size' src={navItems.icon} alt="" />
              <p className={`link-p ${isActive && 'link-text-isActive' }`}>{navItems.title}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
