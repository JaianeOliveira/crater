'use client';
import Image from 'next/image';
import { redirect, useParams } from 'next/navigation';
import { useEffect } from 'react';
import foguete from '../../../public/assets/foguete.png';
const Redirect = () => {
	const { id } = useParams();

	useEffect(() => {
		redirect(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
	}, [id]);

	return (
		<div className="h-screen flex items-center justify-center bg-zinc-100	">
			<div className="w-[90vw] md:w-[80vw] lg:w-[20vw] aspect-square  rounded-full shadow-neumorphism flex items-center justify-center gap-8 flex-col">
				<Image
					alt="foguete"
					src={foguete}
					height={36}
					className="animate-bounce	"
				/>
				<div className="text-center">
					<p className="text-md font-bold text-indigo-500">Aperte os cintos!</p>
					<p className="font-semibold text-zinc-800/75 text-sm">
						Você está prestes a atravessar
					</p>
				</div>
			</div>
		</div>
	);
};

export default Redirect;
