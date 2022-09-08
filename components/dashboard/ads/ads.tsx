import { FC, useEffect } from "react";

const Ads: FC<{ path: string }> = ({ path }) => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // @ts-ignore
        window.adsbygoogle = (window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div key={path} style={{height: "calc(100vh - 69px)"}}>
      <ins
        className="adsbygoogle adsense"
        style={{ display: "block", height: "100vh" }}
        data-ad-client="ca-pub-9733560809553550"
        data-ad-slot="7741269660"
        data-ad-format="auto"
        data-adtest="on"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default Ads;
