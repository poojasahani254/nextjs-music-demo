import Document, { Html, NextScript, Main, Head } from "next/document";
// import head from "next/head";
import Script from "next/script";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        {/*<Script*/}
        {/*    async={true}*/}
        {/*    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9733560809553550"*/}
        {/*    // crossOrigin="anonymous"*/}
        {/*    onError={ (e) => { console.error('Script failed to load', e) }}*/}
        {/*    strategy='lazyOnload'*/}
        {/*/>*/}
        {/*<Head>*/}

        {/*  /!*  <script*!/*/}
        {/*  /!*      async*!/*/}
        {/*  /!*      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"*!/*/}
        {/*  /!*  />*!/*/}
        {/*  /!*  <script*!/*/}
        {/*  /!*      dangerouslySetInnerHTML={{*!/*/}
        {/*  /!*          __html: `*!/*/}
        {/*  /!*     (adsbygoogle = window.adsbygoogle || []).push({*!/*/}
        {/*  /!*         google_ad_client: "ca-pub-9733560809553550",*!/*/}
        {/*  /!*         enable_page_level_ads: true*!/*/}
        {/*  /!*    });*!/*/}
        {/*  /!*      `*!/*/}
        {/*  /!*      }} />*!/*/}
        {/*</Head>*/}
        <Head />
        <body>
          <Main />
          <div className={"overlay"} />
          <NextScript />
        </body>
      </Html>
    );
  }
}
