import React from 'react'
import DashboardSidebar from '../../UI/DashboardSidebar';
import Header from '../../Shared/Header/Header';
import DashboardHeader from '../../Shared/DashboardHeader/DashboardHeader';


const DashboardLayout = ({ children }) => {
	return (
		<>
			<div className="container-fluid" style={{marginTop:20, marginBottom:200}}>
				<div className="row">
					<div className="col-md-2 col-lg-3 col-xl-2">
						<DashboardSidebar />
					</div>
					<div className="col-md-10 col-lg-9 col-xl-10">
						{children}
					</div>
				</div>
			</div>
		</>
	)
}

export default DashboardLayout