import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
	max-width: 900px;
	margin: 0 auto;
	@media (min-width: 002px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 2rem;
	}
`;

const Imagen = styled.img`
	max-width: 100%;
	margin-top: 5rem;
`;

const Heading = styled.h1`
	font-family: 'Bebas Neue', cursive;
	color: #fff;
	text-align: left;
	font-weight: 700;
	font-size: 50px;
	margin-bottom: 50px;
	margin-top: 80px;

	&::after {
		content: '';
		width: 100px;
		height: 6px;
		background-color: #66a2fe;
		display: block;
	}
`;

function App() {
	const [moneda, setMoneda] = useState('');
	const [criptomoneda, setCriptomoneda] = useState('');
	const [cotizacion, setCotizacion] = useState({});
	const [cargando, setCargando] = useState(false);

	useEffect(() => {
		const cotizarCriptoMoneda = async () => {
			// Evitamos la ejecución la primera vez
			if (moneda === '') return;

			// Consultar API para obtener la cotización
			const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

			const resultado = await axios.get(url);

			// Mostrar un spinner
			setCargando(true);

			// Ocultar el spinner y mostrar el resultado
			setTimeout(() => {
				// Cambiar el estado de cargando
				setCargando(false);

				// Set Cotizacion
				setCotizacion(resultado.data.DISPLAY[criptomoneda][moneda]);
			}, 1500);
		};

		cotizarCriptoMoneda();
	}, [moneda, criptomoneda]);

	// Mostrar spinner o resultado
	const componente = cargando ? (
		<Spinner />
	) : (
		<Cotizacion cotizacion={cotizacion} />
	);

	return (
		<Contenedor>
			<div>
				<Imagen src='/images/cryptomonedas.png' alt='imagen-crypto' />
			</div>
			<div>
				<Heading>Cotiza Criptomonedas al instante</Heading>
				<Formulario
					setMoneda={setMoneda}
					setCriptomoneda={setCriptomoneda}
				/>
				{componente}
			</div>
		</Contenedor>
	);
}

export default App;
