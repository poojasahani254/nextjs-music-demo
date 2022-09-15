import { FC, useEffect } from "react";

const Ads: FC<{ path: string }> = ({ path }) => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // @ts-ignore
        if (window.adsbygoogle) {
          // @ts-ignore
          const adsbygoogle = window.adsbygoogle || [];
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
        style={{ display: "block" }}
        data-ad-client="ca-pub-9733560809553550"
        data-ad-slot="6722318571"
        data-ad-format="auto"
        data-full-width-responsive="true"
        className="adsbygoogle"
        data-adtest="on"
      />
    </div>
  );
};

export default Ads;
