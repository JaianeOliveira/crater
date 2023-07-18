'use client';
import { api } from '@/services/axios';
import Link from 'next/link';
import { FormEvent, useRef, useState } from 'react';

export default function Home() {
	const longURL = useRef<HTMLInputElement>(null);
	const shortURLExample = 'crater.up.railway.app/VHmtto';
	const [shortURL, setShortURL] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const getShortURL = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setIsLoading(true);
			const data = await api.post(
				'/shortener',
				{},
				{ params: { url: longURL?.current?.value } }
			);

			if (data.status === 201) {
				setShortURL(`${window.location.href}${data.data['id']}`);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const copyToClipboard = () => {
		shortURL && navigator.clipboard.writeText(shortURL);

		setShowAlert(true);

		setTimeout(() => setShowAlert(false), 600);
	};

	return (
		<main className="bg-gradient-to-r from-indigo-950 to-zinc-950">
			<section className="px-[8vw] py-8 h-[92vh] flex gap-2 flex-col items-center justify-center">
				<h1 className="text-zinc-100 text-4xl font-light uppercase text-shadow-md shadow-zinc-50">
					Izar
				</h1>
				<h2 className="text-slate-200 font-light text-sm">
					Encurtador de URLs
				</h2>

				<form
					onSubmit={getShortURL}
					id="shortener-form"
					name="shortener-form"
					className="bg-indigo-950 rounded-3xl lg:rounded-full w-full lg:w-[50vw] lg:max-w-[92vw] px-2 py-2 flex gap-2 flex-col justify-between items-center lg:flex-row lg:items-stretch lg:justify-between my-8"
				>
					<input
						autoComplete="off"
						ref={longURL}
						type="url"
						placeholder="Ex.: https://open.spotify.com/playlist/6PzHcrD8tACyQqF5l6RBFK?si=cd30145e559d4e6e"
						name="long-url"
						className="bg-transparent h-full w-full p-2 pl-3 focus:outline-none placeholder:text-indigo-700/30 placeholder:font-semibold placeholder:text-sm text-sm text-indigo-200 font-semibold"
					/>
					<button
						disabled={isLoading}
						type="submit"
						className="text-indigo-100 bg-indigo-700 py-2 px-4 text-sm rounded-full font-medium w-full lg:w-1/6 flex items-center justify-center h-full"
					>
						{isLoading ? (
							<span className="relative flex h-3 w-3">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-300"></span>
							</span>
						) : (
							<span>Encurtar</span>
						)}
					</button>
				</form>
				<div
					onClick={copyToClipboard}
					className={` p-4 opacity-0 translate-y-0 bg-indigo-950/40 rounded-full w-full overflow-hidden lg:w-[20vw] lg:max-w-[92vw] flex items-center justify-center transition-all ease-in-out duration-400   ${
						shortURL &&
						'opacity-100 translate-y-4 cursor-copy hover:scale-105 bg-indigo-300/40 '
					}`}
				>
					<p
						className={`text-center text-sm font-semibold  ${
							shortURL
								? 'select-text text-indigo-100'
								: 'select-none text-indigo-300'
						}`}
					>
						{shortURL ?? shortURLExample}
					</p>
				</div>
				<div
					className={`${
						showAlert ? 'opacity-100 translate-y-3' : 'opacity-0 translate-y-0'
					} bg-transparent text-center p-4 lg:px-4 transition-all ease-out duration-[0.2s] `}
				>
					<div
						className="px-4 py-2 bg-indigo-600/70 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
						role="alert"
					>
						<span className="text-sm font-medium">Copiado</span>
					</div>
				</div>
			</section>
			<footer className="flex items-end justify-center h-[8vh] w-full p-4 text-xs text-indigo-300/30">
				&copy;{' '}
				<Link href="https://github.com/jaianeoliveira">Jaiane Oliveira</Link>,
				2023
			</footer>
		</main>
	);
}
