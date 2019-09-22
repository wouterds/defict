import React from 'react';
import Head from 'next/head';
import NextApp, { Container } from 'next/app';
import BaseCSS from 'styles/base';

class App extends NextApp {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>DeFiCT</title>
        </Head>

        <BaseCSS />

        <Container>
          <Component {...pageProps} />
        </Container>
      </>
    );
  }
}

export default App;
