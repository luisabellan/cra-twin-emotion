/** @jsxImportSource @emotion/react */

import React from 'react';
import tw, { styled, css } from 'twin.macro';

const Home = () => {

  return (
    <HomeContainer>
      <Main>
        <Header>
          Features
        </Header>
        <List>
          <Item><Link href='https://reactjs.org/docs/create-a-new-react-app.html#create-react-app'>CRA</Link></Item>  
          <Item><Link href='https://tailwindcss.com/'>Taiwind</Link></Item>
          <Item><Link href='https://emotion.sh/docs/introduction'>Emotion</Link></Item>
          <Item><Link href='https://github.com/ben-rogerson/twin.macro'>Twin</Link></Item>
          <Item><Link href='https://sass-lang.com/'>Sass</Link></Item>
          <Item><Link href='https://prettier.io/'>Prettier </Link></Item>
          <Item><Link href='https://eslint.org/docs/user-guide/getting-started'>ESLint</Link></Item>
          <Item><Link href='https://github.com/gsoft-inc/craco'>Craco</Link></Item>
          <Item><Link href='#'>CI</Link></Item>
        </List>
        <Paragraph>
          To get started, edit <code>src/pages/Home.js</code> and save to
          reload.
        </Paragraph>
      </Main>

      <Footer>
        Made with <span tw='text-xl'>❤️</span> and <span tw='text-3xl'>☕</span> by{' '}
        <FooterLink href='https://luisabellan.com'>Luis Abellan</FooterLink>
      </Footer>
   
    </HomeContainer>
  );
};

export default Home;



// Styles

const HomeContainer = styled.div`
  ${tw`flex flex-col items-center justify-center self-center h-screen   `} 
`;

const Main = styled.main`
  ${tw`flex flex-col items-center justify-center self-center  `}
`;

const Header = styled.h1`
  ${tw`text-3xl font-semibold justify-center mt-6 mb-10  pt-9`}
`;
const List = styled.ul`
  ${tw`flex flex-col items-center justify-center self-center  `}
`;

const Item = styled.li`
  ${tw`flex flex-col items-center justify-center self-center  `}
`;

const Link = styled.a`
  ${tw`text-xl justify-center py-2`}
`;
const FooterLink = styled(Link)`

  
`;

const Paragraph = styled.p`
  ${tw`text-xl justify-center my-24`}
`;

const Footer = styled.footer`
  ${tw`text-xl justify-center`}
`;
