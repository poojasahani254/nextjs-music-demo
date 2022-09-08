import Document, { Html, NextScript, Main, Head } from "next/document";
// import head from "next/head";

export default class MyDocument extends Document {
  render() {
    return (
      <Html en={"us"}>
        <Head>
          <script
            async
            data-ad-client="9733560809553550"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            crossOrigin="anonymous"
          />
          {/*  <script*/}
          {/*      async*/}
          {/*      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"*/}
          {/*  />*/}
          {/*  <script*/}
          {/*      dangerouslySetInnerHTML={{*/}
          {/*          __html: `*/}
          {/*     (adsbygoogle = window.adsbygoogle || []).push({*/}
          {/*         google_ad_client: "ca-pub-9733560809553550",*/}
          {/*         enable_page_level_ads: true*/}
          {/*    });*/}
          {/*      `*/}
          {/*      }} />*/}
        </Head>
        <body>
          <Main />
          <div className={"overlay"} />
          <NextScript />
        </body>
      </Html>
    );
  }
}
