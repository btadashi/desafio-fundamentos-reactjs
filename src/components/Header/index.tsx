import React from 'react';

/** Usamos o Link para criar nossos links do nosso Header, dentro da tag 'nav' */
import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        {/** Link que redireciona para nosso 'Dashboard' */}
        <Link to="/">Listagem</Link>
        {/** Link que redireciona para a página 'import' */}
        <Link to="/import">Importar</Link>
      </nav>
    </header>
  </Container>
);

export default Header;
