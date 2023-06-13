import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import SitesToolbar from "../../components/sites/SitesToolbar";

import { useAuth } from "../../context/AuthContext";
import AspectGrid from "../../components/general/AspectGrid";

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment'
import "moment/locale/sk"
import Site from "../../components/sites/Site";


export default function Dashboard() {
    const { sites, setActiveItem } = useAuth();


	return (    
		<LocalizationProvider dateAdapter={AdapterMoment} locale="sk">
			<div onClick={() => setActiveItem(-1)}>
				<DashboardLayout scope={"stavby"}>
					
					<SitesToolbar/>

					<AspectGrid className={"mt-8"} ratio={"3/2"}>
						{sites.map((site, ix) => 
							<Site site={site} ix={ix}/>
						)}
					</AspectGrid>

				
				</DashboardLayout>
			</div>
		</LocalizationProvider>
	);
}

