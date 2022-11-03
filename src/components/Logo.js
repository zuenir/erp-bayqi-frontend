import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  // const logo = <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />

  const logo = (
    <Box sx={{ width: 100, height: 100, ...sx }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 417 138"
      >
        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">

          <path
            fill="#3D77BB"
            opacity="1.000000"
            stroke="none"
            d="
M186.987869,51.622459 
	C184.853363,54.290787 182.750641,56.566132 180.723297,58.759926 
	C187.183136,62.233788 190.741425,72.613342 188.741562,81.689980 
	C185.413315,96.795677 176.491196,99.838577 165.578415,100.802025 
	C155.358978,101.704262 144.997299,100.995125 134.350128,100.995125 
	C134.350128,72.718620 134.350128,44.697121 134.350128,15.512555 
	C147.297302,16.051912 160.494537,15.327892 173.193970,17.506096 
	C184.785843,19.494326 187.680908,26.435457 188.818405,37.742817 
	C189.260101,42.133621 187.679199,46.727894 186.987869,51.622459 
M161.220306,49.999077 
	C165.803009,49.811481 167.910385,47.371048 168.021774,42.839069 
	C168.202454,35.488052 167.556000,34.338512 161.908142,32.922237 
	C155.282593,31.260792 155.006699,31.478218 155.000320,38.376648 
	C154.998337,40.523510 155.216980,42.697300 154.954575,44.811592 
	C154.420990,49.110943 156.360245,50.555614 161.220306,49.999077 
M157.592331,83.996056 
	C158.258499,83.997360 158.925720,83.974541 159.590637,84.004044 
	C162.806030,84.146721 166.022079,84.361847 167.243637,80.312683 
	C168.476273,76.226753 169.340576,71.518677 165.882584,68.828270 
	C163.353088,66.860260 159.047409,67.175140 155.016205,66.369026 
	C155.016205,72.409393 154.952179,77.213699 155.089844,82.012222 
	C155.109024,82.680557 156.121109,83.320412 157.592331,83.996056 
z"
          />
          <path
            fill="#F9C800"
            opacity="1.000000"
            stroke="none"
            d="
M359.577454,18.231623 
	C366.977112,22.349751 369.649750,29.055826 369.873108,36.437088 
	C370.306122,50.745998 370.082703,65.078163 369.930267,79.398552 
	C369.899536,82.283035 369.500305,85.391663 368.345093,87.984444 
	C366.456451,92.223404 363.110260,96.086136 368.849945,100.391800 
	C363.806152,103.320129 359.720551,106.034523 355.310333,108.032356 
	C354.076752,108.591194 350.979767,107.550003 350.304688,106.356453 
	C348.293060,102.799820 345.636292,101.771713 341.776947,101.911568 
	C338.706482,102.022835 335.576263,101.522621 332.526520,100.986794 
	C319.867950,98.762718 315.717224,90.445496 315.170349,79.549614 
	C314.470032,65.595810 314.567474,51.563042 315.123047,37.596203 
	C315.668671,23.879675 322.367798,15.639626 338.050293,15.054917 
	C345.241058,14.786817 352.589874,14.162549 359.577454,18.231623 
M346.984802,32.529110 
	C338.226715,28.960754 335.915039,33.906937 335.969025,40.204174 
	C336.074554,52.510342 335.977051,64.818123 336.010498,77.125107 
	C336.025360,82.585693 338.062073,84.995644 342.485779,84.999763 
	C346.920593,85.003883 348.974670,82.595413 348.989105,77.153564 
	C349.023071,64.347641 349.057800,51.541016 348.936371,38.736149 
	C348.918549,36.857269 348.048828,34.986469 346.984802,32.529110 
z"
          />
          <path
            fill="#009BDD"
            opacity="1.000000"
            stroke="none"
            d="
M255.000000,80.963173 
	C255.000000,67.175163 255.000000,53.880936 255.000000,40.294708 
	C262.050934,40.294708 268.772278,40.294708 276.000000,40.294708 
	C276.000000,53.018856 275.993744,65.624786 276.002655,78.230698 
	C276.007050,84.439598 279.043274,86.927368 284.813751,84.759003 
	C286.326813,84.190445 287.815491,81.305412 287.860352,79.449036 
	C288.137939,67.964058 288.159027,56.465641 287.914612,44.979149 
	C287.827942,40.908218 289.253571,39.675888 293.131958,39.937176 
	C297.276825,40.216415 301.461182,40.139584 305.616669,39.955383 
	C308.799622,39.814289 310.072632,40.894657 310.052246,44.225121 
	C309.941040,62.377987 310.378204,80.543030 309.844757,98.680885 
	C309.564728,108.200539 308.196320,118.179710 297.302124,122.134941 
	C285.687592,126.351692 274.038513,126.783592 263.003662,119.990181 
	C257.640137,116.688255 256.340851,111.131615 254.786453,105.010010 
	C261.823547,105.010010 268.437012,104.925568 275.043762,105.098351 
	C276.069794,105.125175 277.005280,106.750107 278.086365,106.903145 
	C280.732056,107.277641 283.801422,108.037399 285.994446,107.059387 
	C287.489746,106.392532 287.794373,103.055748 288.508789,101.226616 
	C281.915710,101.504936 276.036865,102.392159 270.295776,101.841873 
	C262.197510,101.065643 254.137619,97.689049 254.987564,85.453133 
	C255.079666,84.127182 255.000000,82.789299 255.000000,80.963173 
z"
          />
          <path
            fill="#3D77BB"
            opacity="1.000000"
            stroke="none"
            d="
M68.166237,97.000023 
	C67.778244,95.632339 67.390251,94.264664 67.446625,92.461143 
	C70.346855,91.970711 72.958336,92.411369 75.209106,91.704102 
	C76.994385,91.143105 78.337799,89.175934 79.877419,87.833138 
	C78.206963,87.222107 76.578873,86.347977 74.854736,86.070251 
	C72.935112,85.761055 70.900757,86.182060 68.972275,85.901207 
	C68.183784,85.786362 67.542023,84.664146 66.902184,83.587250 
	C66.925079,81.782776 66.879288,80.391273 67.035538,78.662979 
	C70.974060,77.902016 74.673256,77.431297 74.928421,72.605492 
	C72.045692,72.033661 69.439850,71.516754 66.902588,70.586891 
	C66.925278,68.782547 66.879395,67.391167 67.076355,65.634369 
	C71.697464,63.859810 76.943657,66.941185 80.796600,62.228638 
	C76.419106,62.228638 72.041618,62.228638 65.953583,62.228638 
	C66.955376,59.276676 67.660942,55.335155 68.397820,55.329296 
	C73.088242,55.291965 77.824646,55.906685 82.466209,56.746887 
	C85.322952,57.264008 87.361855,57.047863 87.921982,53.876369 
	C88.484467,50.691448 86.659576,50.013248 83.831772,49.943146 
	C78.161339,49.802563 72.499039,49.333607 66.833382,49.000198 
	C67.664871,39.685528 75.087616,42.632057 80.613686,41.832954 
	C81.834122,34.715790 84.767563,29.357782 92.694145,27.877560 
	C100.735718,26.375868 108.051109,30.153233 109.788383,38.246590 
	C110.530449,41.703598 112.027946,42.016724 114.790558,42.035320 
	C123.324570,42.092770 123.999748,42.851570 123.999924,51.507607 
	C124.000198,64.978767 124.015900,78.449966 123.991997,91.921082 
	C123.982651,97.186050 122.162758,98.979698 116.852905,98.993515 
	C105.211311,99.023804 93.569633,99.018944 81.097610,99.017815 
	C76.738548,95.293686 72.778290,94.182068 68.166237,97.000023 
M100.496819,38.042500 
	C94.614662,34.559208 92.378090,35.227245 89.135460,41.695179 
	C93.422157,41.695179 97.557831,41.695179 102.035416,41.695179 
	C101.587524,40.486835 101.260643,39.604954 100.496819,38.042500 
z"
          />
          <path
            fill="#DE2920"
            opacity="1.000000"
            stroke="none"
            d="
M238.759613,41.939835 
	C246.317307,47.066551 249.250656,53.994629 249.067612,62.723980 
	C248.803253,75.331108 249.000000,87.947914 249.000000,101.000000 
	C246.280960,101.000000 243.992416,100.939537 241.707947,101.010445 
	C231.753418,101.319443 221.788712,102.077339 211.851730,101.802650 
	C207.740097,101.688995 203.153595,100.197418 199.725082,97.916519 
	C193.239243,93.601631 193.638779,86.261078 194.342743,79.603378 
	C194.849487,74.811005 195.053207,69.145889 200.744400,66.867958 
	C203.992050,65.568069 207.462326,64.408157 210.910355,64.120781 
	C216.354614,63.667030 221.864471,64.000023 227.591736,64.000023 
	C228.365021,60.805321 228.539154,58.060375 225.426193,56.122555 
	C222.239532,54.138832 219.621201,55.081814 217.004807,57.403496 
	C216.016052,58.280872 214.443222,58.892506 213.117203,58.929565 
	C207.305481,59.092018 201.486633,58.999561 195.724792,58.999561 
	C193.630829,50.463291 201.033936,42.155926 209.015091,40.239098 
	C218.749634,37.901154 228.800568,37.650909 238.759613,41.939835 
M222.695496,77.000046 
	C219.230484,77.044777 215.384705,77.252342 216.139053,82.025894 
	C216.835449,86.432785 220.980286,85.017166 223.749756,84.900703 
	C229.114059,84.675125 227.952087,80.715805 227.860107,77.000008 
	C226.195114,77.000008 224.893341,77.000008 222.695496,77.000046 
z"
          />
          <path
            fill="#F9C802"
            opacity="1.000000"
            stroke="none"
            d="
M66.834015,70.999847 
	C69.439850,71.516754 72.045692,72.033661 74.928421,72.605492 
	C74.673256,77.431297 70.974060,77.902016 66.578568,78.662994 
	C60.626408,79.000061 55.333244,78.998741 50.040081,79.001091 
	C46.841145,79.002518 44.474022,79.973122 44.252567,83.696770 
	C44.854473,83.828873 45.175049,83.959801 45.496025,83.960785 
	C52.608494,83.982590 59.721001,83.990036 66.833504,84.000221 
	C67.542023,84.664146 68.183784,85.786362 68.972275,85.901207 
	C70.900757,86.182060 72.935112,85.761055 74.854736,86.070251 
	C76.578873,86.347977 78.206963,87.222107 79.877419,87.833138 
	C78.337799,89.175934 76.994385,91.143105 75.209106,91.704102 
	C72.958336,92.411369 70.346855,91.970711 67.445557,92.095917 
	C59.004848,92.111000 51.009460,92.068275 43.014336,91.996109 
	C35.948853,91.932335 32.476532,86.847580 36.229469,80.862289 
	C39.658867,75.393005 39.187458,71.026672 36.077953,65.812820 
	C33.168861,60.935009 31.123743,55.541935 28.598557,50.162991 
	C27.556023,50.099785 26.118559,50.436695 25.332890,49.869980 
	C24.009001,48.915051 22.493708,47.498711 22.227711,46.060299 
	C22.051384,45.106796 23.680958,43.310375 24.905373,42.699223 
	C29.110624,40.600216 32.939419,41.930992 34.979744,46.199028 
	C36.070343,48.480381 37.475986,49.108814 39.923695,49.063053 
	C48.586105,48.901115 57.253399,49.000088 66.376114,49.000183 
	C72.499039,49.333607 78.161339,49.802563 83.831772,49.943146 
	C86.659576,50.013248 88.484467,50.691448 87.921982,53.876369 
	C87.361855,57.047863 85.322952,57.264008 82.466209,56.746887 
	C77.824646,55.906685 73.088242,55.291965 68.397820,55.329296 
	C67.660942,55.335155 66.955376,59.276676 65.953583,62.228638 
	C72.041618,62.228638 76.419106,62.228638 80.796600,62.228638 
	C76.943657,66.941185 71.697464,63.859810 66.630058,65.634392 
	C63.316177,66.001930 60.659229,65.767075 58.081879,66.117569 
	C56.981586,66.267197 56.047424,67.638451 55.037769,68.454590 
	C56.017036,69.300789 56.925659,70.752884 57.989132,70.876877 
	C60.902599,71.216576 63.881199,70.997627 66.834015,70.999847 
z"
          />
          <path
            fill="#3D77BB"
            opacity="1.000000"
            stroke="none"
            d="
M376.000000,65.000000 
	C376.000000,56.536705 376.000000,48.573399 376.000000,40.306671 
	C383.061646,40.306671 389.777191,40.306671 397.000000,40.306671 
	C397.000000,48.726822 397.000031,57.003563 397.000000,65.280304 
	C396.999939,75.604050 396.864532,85.930504 397.070648,96.250130 
	C397.146301,100.038742 395.771545,101.229813 392.122223,101.060165 
	C386.989624,100.821571 381.837646,100.999847 376.000000,100.999847 
	C376.000000,88.997604 376.000000,77.248802 376.000000,65.000000 
z"
          />
          <path
            fill="#3D77BB"
            opacity="1.000000"
            stroke="none"
            d="
M392.833130,34.999790 
	C387.069672,34.999958 381.787201,34.999958 376.258179,34.999958 
	C376.258179,29.299778 376.258179,24.037371 376.258179,18.385693 
	C382.889008,18.385693 389.600891,18.385693 396.981812,18.385693 
	C396.981812,23.188038 397.133453,28.115917 396.818207,33.013748 
	C396.770966,33.747837 394.536652,34.341171 392.833130,34.999790 
z"
          />
          <path
            fill="#F9C906"
            opacity="1.000000"
            stroke="none"
            d="
M38.082733,107.010498 
	C34.680683,104.313995 33.806774,100.969681 35.942806,97.732567 
	C37.085487,96.000862 39.918480,93.964203 41.533382,94.294060 
	C44.016644,94.801277 46.805054,96.805901 48.121735,98.985886 
	C49.005688,100.449417 48.297997,104.506584 47.012184,105.292572 
	C44.673725,106.722031 41.375038,106.580650 38.082733,107.010498 
z"
          />
          <path
            fill="#F9C906"
            opacity="1.000000"
            stroke="none"
            d="
M68.085953,97.386017 
	C72.778290,94.182068 76.738548,95.293686 80.633522,99.086823 
	C81.000259,103.061111 81.173660,107.198723 75.580498,107.123993 
	C73.390381,107.094727 70.035492,107.061790 69.285973,105.798996 
	C68.000404,103.633064 68.345306,100.499390 68.085953,97.386017 
z"
          />
          <path
            fill="#FFFFFF"
            opacity="1.000000"
            stroke="none"
            d="
M160.787674,49.999474 
	C156.360245,50.555614 154.420990,49.110943 154.954575,44.811592 
	C155.216980,42.697300 154.998337,40.523510 155.000320,38.376648 
	C155.006699,31.478218 155.282593,31.260792 161.908142,32.922237 
	C167.556000,34.338512 168.202454,35.488052 168.021774,42.839069 
	C167.910385,47.371048 165.803009,49.811481 160.787674,49.999474 
z"
          />
          <path
            fill="#FFFFFF"
            opacity="1.000000"
            stroke="none"
            d="
M157.132935,83.984756 
	C156.121109,83.320412 155.109024,82.680557 155.089844,82.012222 
	C154.952179,77.213699 155.016205,72.409393 155.016205,66.369026 
	C159.047409,67.175140 163.353088,66.860260 165.882584,68.828270 
	C169.340576,71.518677 168.476273,76.226753 167.243637,80.312683 
	C166.022079,84.361847 162.806030,84.146721 159.590637,84.004044 
	C158.925720,83.974541 158.258499,83.997360 157.132935,83.984756 
z"
          />
          <path
            fill="#FFFFFF"
            opacity="1.000000"
            stroke="none"
            d="
M347.279053,32.820522 
	C348.048828,34.986469 348.918549,36.857269 348.936371,38.736149 
	C349.057800,51.541016 349.023071,64.347641 348.989105,77.153564 
	C348.974670,82.595413 346.920593,85.003883 342.485779,84.999763 
	C338.062073,84.995644 336.025360,82.585693 336.010498,77.125107 
	C335.977051,64.818123 336.074554,52.510342 335.969025,40.204174 
	C335.915039,33.906937 338.226715,28.960754 347.279053,32.820522 
z"
          />
          <path
            fill="#FFFFFF"
            opacity="1.000000"
            stroke="none"
            d="
M66.902184,83.587250 
	C59.721001,83.990036 52.608494,83.982590 45.496025,83.960785 
	C45.175049,83.959801 44.854473,83.828873 44.252567,83.696770 
	C44.474022,79.973122 46.841145,79.002518 50.040081,79.001091 
	C55.333244,78.998741 60.626408,79.000061 66.376541,78.999802 
	C66.879288,80.391273 66.925079,81.782776 66.902184,83.587250 
z"
          />
          <path
            fill="#FFFFFF"
            opacity="1.000000"
            stroke="none"
            d="
M100.715286,38.382790 
	C101.260643,39.604954 101.587524,40.486835 102.035416,41.695179 
	C97.557831,41.695179 93.422157,41.695179 89.135460,41.695179 
	C92.378090,35.227245 94.614662,34.559208 100.715286,38.382790 
z"
          />
          <path
            fill="#FFFFFF"
            opacity="1.000000"
            stroke="none"
            d="
M66.902588,70.586899 
	C63.881199,70.997627 60.902599,71.216576 57.989132,70.876877 
	C56.925659,70.752884 56.017036,69.300789 55.037769,68.454590 
	C56.047424,67.638451 56.981586,66.267197 58.081879,66.117569 
	C60.659229,65.767075 63.316177,66.001930 66.387207,65.999802 
	C66.879395,67.391167 66.925278,68.782547 66.902588,70.586899 
z"
          />
          <path
            fill="#FFFFFF"
            opacity="1.000000"
            stroke="none"
            d="
M223.143524,77.000031 
	C224.893341,77.000008 226.195114,77.000008 227.860107,77.000008 
	C227.952087,80.715805 229.114059,84.675125 223.749756,84.900703 
	C220.980286,85.017166 216.835449,86.432785 216.139053,82.025894 
	C215.384705,77.252342 219.230484,77.044777 223.143524,77.000031 
z"
          />
        </g>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}