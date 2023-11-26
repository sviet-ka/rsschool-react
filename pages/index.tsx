import React from 'react';
import Layout from '../src/components/layout/Layout';

const MainPage: React.FC = () => {
  return <Layout></Layout>;
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default MainPage;
