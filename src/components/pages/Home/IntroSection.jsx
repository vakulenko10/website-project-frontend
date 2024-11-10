import React from "react";
import Container from "../../Container";

const IntroSection = () => {
  return (
    <div className="intro_section__wrapper bg-bg1 min-h-screen flex items-center justify-center relative w-full">
      <svg
        className="absolute inset-0 w-full h-full object-cover animate-draw-line z-0"
        viewBox="0 0 1288 683"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 576.53C36.7996 606.945 73.1052 636.134 110.217 662.874C119.161 669.319 134.797 684.78 141.593 676.732C147.679 669.525 144.317 659.276 145.193 650.509C152.509 577.318 141.922 503.096 128.219 430.81C127.376 426.36 125.887 421.188 126.933 416.633C128.643 409.193 161.723 439.722 161.91 439.871C216.059 483.043 274.784 522.099 336.538 557.555C387.482 586.806 441.838 616.924 498.049 639.21C499.531 639.797 503.67 640.961 502.935 639.743C498.957 633.146 493.219 627.377 488.79 620.981C458.06 576.598 432.865 529.386 408.292 482.51C382.017 432.387 360.26 381.345 340.91 329.116C322.86 280.397 304.939 231.31 300.789 180.198C300.202 172.963 298.375 167.527 307.733 172.736C319.202 179.121 333.889 189.207 343.482 195.975C417.776 248.387 490.265 302.675 563.502 356.085C655.603 423.252 746.066 492.798 841.131 557.129C846.86 561.006 863.119 572.068 860.291 566.403C858.385 562.585 855.065 559.366 852.447 555.85C824.996 518.983 824.677 519.387 794.066 473.343C721.814 364.662 649.065 254.365 591.406 139.691C572.439 101.969 547.572 54.6428 548.971 12.1995C549.244 3.91911 554.154 1.35577 561.83 7.08284C574.466 16.5101 596.567 37.9595 604.78 45.8845C657.317 96.5794 707.29 149.094 762.176 198.107C833.24 261.568 911.367 318.645 991.197 374.313C1000.46 380.774 1009.94 387.034 1018.97 393.714C1023.51 397.068 1013.18 384.851 1010.36 380.389C974.925 324.442 948.934 264.802 929.087 203.863C919.735 175.146 910.637 139.643 904.398 109.843C901.903 97.9279 896.274 77.8688 898.997 64.6458C900.271 58.4605 904.974 60.5836 909.027 63.793C955.059 100.244 993.983 145.086 1032.86 186.487C1092.53 250.034 1148.07 316.979 1212.12 377.618C1222.59 387.537 1233.48 397.732 1246.97 405.014C1262.25 413.264 1260.58 398.567 1260.85 389.13C1263.84 287.419 1244.22 184.99 1254.42 83.5137C1256.84 59.4876 1262.13 24.79 1284 6.65645"
          stroke="#5B0101"
          strokeWidth="8"
          strokeLinecap="round"
          className="animate-path"
        />
      </svg>

      <Container>
        
        <div class="angry-grid z-10 w-full p-10">
          <img
            id="item-3"
            src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731174349/frontend/h8aaqo6mbzzwo0rnpqez.png"
            alt="Left Visual"
            className="left-visual rounded-[60px] border-8 border-text3 "
            draggable="false"
          />
          <img
          id="item-1"
            src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731165684/frontend/ppdely8eybqia7ho5ubf.png"
            alt="Right Visual"
            className="right-visual rounded-[60px] border-8   border-text3"
            draggable="false"
          />
          <h1 id="item-0" className="intro-text text-text1 text-2xl lg:text-6xl font-serif font-extrabold text-left flex text-wrap items-end tracking-loose leading-relaxed ">adipiscing elit, sed do adipiscing elit,   </h1>
          <h1 id="item-2" className="intro-text text-text1 text-2xl lg:text-6xl font-serif font-extrabold text-left">lorem ipsum dolor sit sdsa  </h1>
          <h1 id="item-4" className="intro-text text-text1 text-2xl lg:text-6xl font-serif font-extrabold text-left">adipiscing elit,sdd sdasfdgsedssdfssdfsds  </h1>
          <h1 id="item-5" className="intro-text text-text1 text-2xl lg:text-6xl font-serif font-extrabold text-left">lorem ipsum dolor sit sdsa  </h1>
          
        </div>
      </Container>
    </div>
  );
};

export default IntroSection;
