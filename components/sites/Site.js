import React, { useState } from 'react'
import ButtonIcon from '../buttons/ButtonIcon';
import TrashBin from '../../public/assets/editor/TrashBin';
import FullPageLoading from '../loading/FullPageLoading';
import { motion, AnimatePresence } from 'framer-motion';

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { getLastModified } from '../../lib/helpers';
import ButtonPrimary from '../buttons/ButtonPrimary';


function Site({ site, ix, style}){
	const { activeItem, setActiveItem, handleDeleteDocument, deleteSite } = useAuth();
	const [toggleDelete, settoggleDelete] = useState(false);
	const [hovered, sethovered] = useState(false);
	const [loading, setloading] = useState(false);

	const router = useRouter();

	function handleClick() {
		deleteSite(site)
        // handleDeleteDocument("sites", site.id)
		settoggleDelete(false);
	}

	return(<div
			onClick={(e) => {
				if (activeItem === ix) {
					setloading(true);
					router.push(`/stavby/${site.id}`);
					return
				}
				else setActiveItem(ix);
				e.stopPropagation();
			}}

            style={style}

			onMouseEnter={() => sethovered(true)}
			onMouseLeave={() => sethovered(false)}

            key={`site-${ix}`}

			className={`shadow-md flex flex-col flex-grow justify-between cursor-default outline ${activeItem !== ix
				? "outline-gray-200 outline-1 hover:outline-gray-400"
				: "outline-2 outline-blue-500"
				}  rounded-sm transition duration-100 ease-in-out`}>

			<div className='bg-gray-50 flex w-full justify-between flex-col relative' style={{ flexGrow: 1 }}>

				<div className="px-4 py-1" style={{ background: `url(${site.captionImage})`, backgroundSize: "cover", flexGrow: 1, backgroundPosition: "10% 30%" }}>
					<FullPageLoading loading={loading}></FullPageLoading>

					<div className='flex justify-between items-center mt-6 '>
						<div className='text-lg font-medium text-start overflow-hidden'>
								{/* {site.icon}{" "}{site.name} */}
                                {site.name}
						</div>

						<div className='relative'>
							
								<ButtonIcon
									icon={<TrashBin/>}
									tooltip='Zmazať stavbu'
									onClick={(e) => {
										settoggleDelete(!toggleDelete);
										e.stopPropagation();
									}}
									id='del'
								></ButtonIcon>
							

							<AnimatePresence mode='wait'>
								{toggleDelete && (
									<motion.div
										onClick={(e) => e.stopPropagation()}
										key={`delete-${site.id}`}
										initial={{ opacity: 0, y: 10 }}
										exit={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.2 }}
										className='absolute left-0 mt-1 bg-white shadow-hardShadow min-w-[200px] z-20 rounded-md px-3 py-3'
									>
										<div className='text-lg'>Naozaj zmazať?</div>
										<ButtonPrimary
											color={"red"}
											icon={<TrashBin color={"white"} />}
											iconBefore
											className='mt-4'
											onClick={handleClick}
										>
											Potvrdiť zmazanie
										</ButtonPrimary>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>

				</div>

				<div className='bg-white px-2 py-3 relative w-full flex items-center'>
                    <div className="flex flex-col justify-center ml-2 w-[80%] max-h-[34px]">
                        <div className='text-sm overflow-hidden'>
                         {site.location}
                        </div>

                        <div className="text-gray-400" style={{ fontSize: "10px" }}>
                            Vytvorená {getLastModified(site?.created)}
                        </div>
                    </div>
				</div>

			</div>
		</div>)
}

export default Site
