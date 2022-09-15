import Document, { Html, NextScript, Main, Head } from "next/document";
// import Head from "next/head";
import Script from "next/script";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
          <Script
              id="Adsense-id"  async
              onError={(e) => { console.error("Script failed to load", e); }}
              strategy="afterInteractive"
              crossOrigin="anonymous"
              // strategy={"afterInteractive"}
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9733560809553550"
          />

         {/*<head>*/}
            {/*    <script async*/}
        {/*            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9733560809553550"*/}
        {/*            crossOrigin="anonymous"></script>*/}
          {/*<script*/}
          {/*  dangerouslySetInnerHTML={{*/}
          {/*    __html: `*/}
          {/*     (adsbygoogle = window.adsbygoogle || []).push({*/}
          {/*         google_ad_client: "ca-pub-9733560809553550",*/}
          {/*         enable_page_level_ads: true*/}
          {/*    });*/}
          {/*      `,*/}
          {/*  }}*/}
          {/*/>*/}
        {/*</head>*/}

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
