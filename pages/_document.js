import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            src={`https://www.paypal.com/sdk/js?client-id=AXiAocBCcJvq5sGlobUyKNHJO3v9bENGdpExywV2g7n7V1T7n-zxLMafi_CIrQXwapuMn6fjTpqoC3Ck&currency=USD`}></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
