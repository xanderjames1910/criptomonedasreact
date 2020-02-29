import React from 'react';
import styled from '@emotion/styled';

const MsgError = styled.p`
	background-color: #b7322c;
	padding: 1rem;
	color: #fff;
	font-size: 30px;
	text-transform: uppercase;
	font-weight: bold;
	text-align: center;
	font-family: 'Bebas Neue', cursive;
`;

const Error = ({ msg }) => {
	return <MsgError>{msg}</MsgError>;
};

export default Error;
