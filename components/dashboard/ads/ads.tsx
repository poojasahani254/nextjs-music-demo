import { FC, useEffect } from "react";

const Ads: FC<{ path: string }> = ({ path }) => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // @ts-ignore
        if (window.adsbygoogle) {
          // @ts-ignore
          const adsbygoogle = (window.adsbygoogle || []);
          // @ts-ignore
          window.adsbygoogle = adsbygoogle.push({});
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div key={path} style={{ height: "calc(100vh - 69px)" }}>
      <ins
        className="adsbygoogle adsense"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9733560809553550"
        data-ad-slot="7741269660"
        data-ad-format="auto"
        data-adtest="on"
        data-full-width-responsive="true"
        data-ad-status={"filled"}
      />
    </div>
  );
};

export default Ads;
