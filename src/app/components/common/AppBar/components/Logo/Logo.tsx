import React from 'react';
import styled from 'styled-components';
import { getImage } from '~lib/utils/filePath';

const Logo = styled.img`
  vertical-align: center;
  display: flex;
  margin: auto auto auto 0;
`;

const LogoComponent = () => (
  <Logo src={getImage('logo.svg')} alt="SSV" />
);

export default LogoComponent;
