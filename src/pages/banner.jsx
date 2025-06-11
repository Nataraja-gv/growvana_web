import React from 'react';

const BannerPage = () => {
  return (
    <div className="w-full h-[500px] overflow-hidden rounded-xl shadow-lg">
      <img
        src="https://freshcartdev.s3.eu-north-1.amazonaws.com/growvana_banner.webp"
        alt="Growvana Banner"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default BannerPage;
