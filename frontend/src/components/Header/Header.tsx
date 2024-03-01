import React from 'react'

import logoAltacava from '../../assets/icons/logo.png'

export const Header = () => {
	return (
		<div className="container-fluid bg-primary text-white py-4">
			<div className="row align-items-center">
				<div className="col d-flex align-items-center">
					<img src={logoAltacava} className="float-start mx-4 logocm" alt="Logo del centro médico esperanza" />
					<h1 className='h4 text-center' >Altacava <br/>Winebar </h1>
				</div>
				<div className="col text-center">
					<h2>Panel de administración</h2>
				</div>
				<div className="col">
				</div>
			</div>
		</div>
	)
}
