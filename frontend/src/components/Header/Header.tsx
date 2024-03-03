import React from 'react'
import logoBar from '../../assets/icons/logo.png'

interface HeaderProps {
	title?: string;
  }
  
export const Header = ({ title = "" }: HeaderProps) => {
	return (
		<div className="container-fluid container-header text-white py-4">
			<div className="row align-items-center">
				<div className="col d-flex align-items-center">
					<img src={logoBar} className="float-start mx-4 logobar" alt="Logo del bar" />
					<h1 className='h5 text-center' >Altacava <br/>Winebar </h1>
				</div>
				<div className="col text-center">
					<h2>{title}</h2>
				</div>
				<div className="col"></div>		
			</div>
		</div>
	)
}
