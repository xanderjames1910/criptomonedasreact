import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';

const Boton = styled.button`
	margin-top: 20px;
	font-weight: bold;
	font-size: 20px;
	padding: 10px;
	background-color: #66a2fe;
	border: none;
	width: 100%;
	border-radius: 10px;
	color: #fff;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #326ac0;
		cursor: pointer;
	}
`;

const Formulario = ({ setMoneda, setCriptomoneda }) => {
	// State del listado de criptomonedas
	const [listaCripto, setListaCripto] = useState([]);
	const [error, setError] = useState(false);

	const MONEDAS = [
		{ codigo: 'USD', nombre: 'Dolar Estadounidense' },
		{ codigo: 'MXN', nombre: 'Peso Mexicano' },
		{ codigo: 'EUR', nombre: 'Euro' },
		{ codigo: 'GBP', nombre: 'Libra Esterlina' },
		{ codigo: 'COP', nombre: 'Peso Colombiano' },
	];

	// Utilizar useMoneda
	const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS);

	// Utilizar useCriptomoneda
	const [criptomoneda, SelectCripto] = useCriptomoneda(
		'Elige tu criptomoneda',
		'',
		listaCripto,
	);

	// Ejecutar llamado a la API
	useEffect(() => {
		const consultarAPI = async () => {
			const url =
				'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

			const resultado = await axios.get(url);

			setListaCripto(resultado.data.Data);
		};
		consultarAPI();
	}, []);

	// Cuando el usuario hace submit
	const cotizarMoneda = e => {
		e.preventDefault();

		// Validar si ambos campos estan llenos
		if (moneda === '' || criptomoneda === '') {
			setError(true);
			return;
		}

		// Pasar los datoa al componente principal
		setError(false);
		setMoneda(moneda);
		setCriptomoneda(criptomoneda);
	};

	return (
		<form onSubmit={cotizarMoneda}>
			{error ? <Error msg='Todos los campos son necesarios' /> : null}
			<SelectMonedas />
			<SelectCripto />
			<Boton type='submit'>Calcular</Boton>
		</form>
	);
};

export default Formulario;
