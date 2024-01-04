import React from "react";

const onLoad = () => {
  console.log('loaded')
}

const page = () => {
  return (<div>
    {process.env.LIVEKIT_URL!}<br/>
    {process.env.LIVEKIT_KEY!}<br/>
    {process.env.LIVEKIT_SECRET!}<br/>
    

</div>);

};

export default page;
