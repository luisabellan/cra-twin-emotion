/** @jsxImportSource @emotion/react */

import React from 'react';
import tw, { styled, css } from 'twin.macro';

const Home = () => {

  return (
    <HomeContainer>
      <div>
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
          <p css={{marginRight:'0.5rem'}}>To get started, edit</p><code css={{marginRight:'0.5rem', marginLeft:'0.5rem'}}>src/pages/Home.js</code> and save to
          reload.
        </Paragraph>

      </Main>
      </div>
      <Footer>
        <a tw='flex flex-row' css={{marginLeft:'1rem'}} href='https://luisabellan.com'>©️ 2021 Luis Abellan</a>
      </Footer>
    </HomeContainer>
  );
};

export default Home;



// Styles

const HomeContainer = styled.div`
  ${tw`flex flex-col  justify-center h-screen`} 
`;

const Main = styled.main`
  ${tw`flex flex-col justify-center`}
`;

const Header = styled.h1`
  ${tw`flex  justify-center  text-3xl font-semibold  mt-6 mb-10  pt-9`}
`;
const List = styled.ul`
  ${tw`flex flex-col justify-center items-center`}
`;

const Item = styled.li`
  ${tw`flex `}
`;

const Link = styled.a`
  ${tw`text-xl py-2`}
`;


const Paragraph = styled.div`
  ${tw`flex flex-row justify-center flex-wrap text-lg md:text-xl mt-40`}
  p {
    margin-right: 0.25rem;
    margin-left: 0.25 rem;
  }
  
  `;

const Footer = styled.footer`
  ${tw`flex flex-row justify-center text-black pt-20`}
  

`;

