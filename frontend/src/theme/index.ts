import { createElement, type ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components';

export const tokens = {
  colors: {
  'primary': '#00000000',
  'secondary': '#ffffff',
  'accent': '#c8a47e',
  'background': '#637381',
  'surface': '#b71d18',
  'text-primary': '#000000',
  'text-secondary': '#828282',
  'border': '#ff5630',
  'error': '#ff563028',
  'success': '#ffffff0c',
  'warning': '#e0e0e0',
  'info': '#c8a47e19',
  'color-13': '#919eab',
  'color-14': '#959595',
  'color-15': '#1877f2',
  'color-16': '#0b0b0b',
  'color-17': '#22c55e',
  'color-18': '#bdbdbd',
  'color-19': '#333333',
  'color-20': '#14100d',
  'color-21': '#f2f2f2',
  'color-22': '#ffffff19',
  'color-23': '#0e0d0d',
  'color-24': '#d9d9d9',
  'color-25': '#212b36',
  'color-26': '#c8a47e33',
  'color-27': '#f332f6',
  'color-28': '#c8a47e7f',
  'color-29': '#f7f2ec',
  'color-30': '#0f0f0f',
  'color-31': '#2e00ff',
  'color-32': '#7200ff',
  'color-33': '#1a1919',
  'color-34': '#0072ce',
  'color-35': '#00000001',
  'color-36': '#51ca7e',
  'color-37': '#22c55e33',
  'color-38': '#ebebeb',
  'color-39': '#232323',
  'color-40': '#ffb032',
  'color-41': '#616161',
  'color-42': '#3a3541',
  'color-43': '#f1f1ef',
  'color-44': '#383838',
  'color-45': '#2f271f',
  'color-46': '#eaeaea',
  'color-47': '#ffffff4c',
  'color-48': '#efe4d9',
  'color-49': '#c8a47e4c',
  'color-50': '#32f680',
  'color-51': '#473e33',
  'color-52': '#858585',
  'color-53': '#ff2f2f',
  'color-54': '#030303',
  'color-55': '#666666',
  'color-56': '#c2c2c2',
  'color-57': '#07295d',
  'color-58': '#44413e',
  'color-59': '#0000003f',
  'color-60': '#a732f6',
  'color-61': '#1c1916',
  'color-62': '#1e1e1e',
  'color-63': '#191919',
  'color-64': '#3b6c4f',
  'color-65': '#6c5082',
  'color-66': '#376292',
  'color-67': '#1a1a19',
  'color-68': '#1a1a197f',
  'color-69': '#1a1a1a',
  'color-70': '#c5a3a3',
  'color-71': '#fdfdfd',
  'color-72': '#fefffc',
  'color-73': '#919eab28',
  'color-74': '#4e4b4b',
  'color-75': '#ff004f',
  'color-76': '#00f7ef',
  'color-77': '#4285f4',
  'color-78': '#34a853',
  'color-79': '#ea4335',
  'color-80': '#fbbc04',
  'color-81': '#c5221f',
  'color-82': '#00e510',
  'color-83': '#007ebb',
  'color-84': '#e53a71',
  'color-85': '#d8d8d8',
  'color-86': '#090014',
  'color-87': '#872bff',
  'color-88': '#301916',
  'color-89': '#00000019',
  'color-90': '#d9d9d8',
  'color-91': '#ffffff14',
  'color-92': '#302c29',
  'color-93': '#bebbb9',
  'color-94': '#646261',
  'color-95': '#272727',
  },
  spacing: {
    'padding-8': '8px',
    'padding-6': '6px',
    'padding-20': '20px',
    'padding-16': '16px',
    'padding-7': '7px',
    'padding-10': '10px',
    'padding-3': '3px',
    'padding-24': '24px',
    'padding-12': '12px',
    'padding-2': '2px',
    'padding-4': '4px',
    'padding-9': '9px',
    'padding-11': '11px',
    'padding-14': '14px',
    'padding-5': '5px',
    'padding-30': '30px',
    'padding-15': '15px',
    'padding-40': '40px',
    'padding-13': '13px',
    'padding-0': '0px',
    'padding-50': '50px',
    'padding-36': '36px',
    'padding-1': '1px',
    'padding-32': '32px',
    'padding-60': '60px',
    'padding-17': '17px',
    'padding-22': '22px',
    'gap-10': '10px',
    'gap-6': '6px',
    'gap-4': '4px',
    'gap-8': '8px',
    'gap-16': '16px',
    'gap-20': '20px',
    'gap-2': '2px',
    'gap-7': '7px',
    'gap-5': '5px',
    'gap-3': '3px',
    'gap-14': '14px',
    'gap-12': '12px',
    'gap-9': '9px',
    'gap-30': '30px',
    'gap-1': '1px',
    'gap-24': '24px',
    'gap-40': '40px',
    'gap-11': '11px',
    'gap--2': '-2px',
    'gap-26': '26px',
    'gap-48': '48px',
    'gap-32': '32px',
    'gap-815': '815px',
    'gap-36': '36px',
    'gap--6': '-6px',
    'gap-15': '15px',
    'gap-52': '52px',
    'gap-71': '71px',
    'gap-18': '18px',
    'gap-44': '44px',
    'gap-75': '75px',
    'gap-624': '624px',
    'gap-50': '50px',
    'gap-465': '465px',
    'gap-303': '303px',
    'gap-17': '17px',
    'gap-42': '42px',
    'gap-113': '113px',
    'gap-125': '125px',
    'gap--10': '-10px',
    'gap-60': '60px',
    'gap-13': '13px',
    'gap-102': '102px',
    'gap-43': '43px',
    'gap-101': '101px',
    'gap-832': '832px',
  },
  radii: {
    'radius-6': '6px',
    'radius-10': '10px',
    'radius-3': '3px',
    'radius-2': '2px',
    'radius-10000': '10000px',
    'radius-4': '4px',
    'radius-8': '8px',
    'radius-1000': '1000px',
    'radius-500': '500px',
    'radius-60709': '60709px',
    'radius-16': '16px',
    'radius-20': '20px',
    'radius-5': '5px',
    'radius-100000': '100000px',
    'radius-27': '27px',
    'radius-1': '1px',
    'radius-29511': '29511px',
    'radius-50': '50px',
    'radius-24': '24px',
    'radius-243': '243px',
    'radius-240': '240px',
    'radius-4861': '4861px',
    'radius-9': '9px',
    'radius-480': '480px',
    'radius-30': '30px',
    'radius-486': '486px',
    'radius-25': '25px',
    'radius-64': '64px',
    'radius-4806': '4806px',
    'radius-7': '7px',
    'radius-286': '286px',
    'radius-4680': '4680px',
    'radius-60': '60px',
    'radius-572': '572px',
    'radius-300': '300px',
    'radius-12': '12px',
    'radius-100': '100px',
    'radius-40972': '40972px',
    'radius-15000': '15000px',
    'radius-5720': '5720px',
    'radius-571': '571px',
    'radius-649': '649px',
    'radius-11': '11px',
    'radius-5716': '5716px',
    'radius-28': '28px',
    'radius-535': '535px',
    'radius-4666': '4666px',
    'radius-69': '69px',
  },
  shadows: {
    glass: 'none',
    'layer-blur-2': '0 0 394px transparent',
    'layer-blur-3': '0 0 514px transparent',
    'drop-shadow-4': '-3px 0 25px #00000019',
    'layer-blur-5': '0 0 276.1745910644531px transparent',
    'layer-blur-6': '0 0 211.69802856445312px transparent',
    'layer-blur-7': '0 0 191.4674072265625px transparent',
    'layer-blur-8': '0 0 121.02381896972656px transparent',
    'layer-blur-9': '0 0 157.8838653564453px transparent',
    'background-blur-10': '0 0 15px transparent',
    'drop-shadow-11': '0 4px 4px #0000003f',
    'drop-shadow-12': '-1.4418549537658691px 0 12.015458106994629px #00000019',
    'layer-blur-13': '0 0 320px transparent',
    'drop-shadow-14':
      '0 2.8704702854156494px 3.588087797164917px -2.201871156692505px #16181d19',
    'drop-shadow-15':
      '0 0 7.176175594329834px -1.651403546333313px #16181d19',
    'drop-shadow-16': '-1.4583332538604736px 0 12.152777671813965px #00000019',
    'layer-blur-17': '0 0 94px transparent',
    'drop-shadow-18': '0 44px 54px #3b3b3b72',
    'drop-shadow-19': '10px 10px 20px #0000007f',
    'drop-shadow-20': '0 34px 44px #00000072',
    'background-blur-21': '0 0 6.458558082580566px transparent',
    'drop-shadow-22': '-1.4041666984558105px 0 11.701388359069824px #00000019',
    'drop-shadow-23': '0 1.8722221851348877px 18.72222137451172px #00000019',
    'layer-blur-24': '0 0 339.35546875px transparent',
    'background-blur-25': '0 0 4px transparent',
    'layer-blur-26': '0 0 224px transparent',
    'drop-shadow-27': '0 1.8666666746139526px 18.66666603088379px #00000019',
    'background-blur-28': '0 0 1.9444444179534912px transparent',
    'drop-shadow-29': '0 1.9444444179534912px 1.9444444179534912px #0000003f',
    'drop-shadow-30': '-10px -20px 34px #000000f2',
    'drop-shadow-31': '0 0 2px #ffffff14',
    'drop-shadow-32': '-1.7161717414855957px 0 14.301431655883789px #00000019',
    'layer-blur-33': '0 0 28.584068298339844px transparent',
    'background-blur-34': '0 0 7.176175594329834px transparent',
    'drop-shadow-35': '20px -10px 34px #000000f2',
    'layer-blur-36': '0 0 1954.410888671875px transparent',
    'drop-shadow-37': '0 4px 34px #c8a47e33',
    'layer-blur-38': '0 0 50px transparent',
    'drop-shadow-39': '0 4px 40px #00000019',
    'drop-shadow-40': '0 8px 16px #919eab28',
  },
} as const;

export const colors = tokens.colors;
export const spacing = tokens.spacing;
export const radii = tokens.radii;
export const shadows = tokens.shadows;

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #00000000;
    --secondary: #ffffff;
    --accent: #c8a47e;
    --background: #637381;
    --surface: #b71d18;
    --text-primary: #000000;
    --text-secondary: #828282;
    --border: #ff5630;
    --error: #ff563028;
    --success: #ffffff0c;
    --warning: #e0e0e0;
    --info: #c8a47e19;
    --color-13: #919eab;
    --color-14: #959595;
    --color-15: #1877f2;
    --color-16: #0b0b0b;
    --color-17: #22c55e;
    --color-18: #bdbdbd;
    --color-19: #333333;
    --color-20: #14100d;
    --color-21: #f2f2f2;
    --color-22: #ffffff19;
    --color-23: #0e0d0d;
    --color-24: #d9d9d9;
    --color-25: #212b36;
    --color-26: #c8a47e33;
    --color-27: #f332f6;
    --color-28: #c8a47e7f;
    --color-29: #f7f2ec;
    --color-30: #0f0f0f;
    --color-31: #2e00ff;
    --color-32: #7200ff;
    --color-33: #1a1919;
    --color-34: #0072ce;
    --color-35: #00000001;
    --color-36: #51ca7e;
    --color-37: #22c55e33;
    --color-38: #ebebeb;
    --color-39: #232323;
    --color-40: #ffb032;
    --color-41: #616161;
    --color-42: #3a3541;
    --color-43: #f1f1ef;
    --color-44: #383838;
    --color-45: #2f271f;
    --color-46: #eaeaea;
    --color-47: #ffffff4c;
    --color-48: #efe4d9;
    --color-49: #c8a47e4c;
    --color-50: #32f680;
    --color-51: #473e33;
    --color-52: #858585;
    --color-53: #ff2f2f;
    --color-54: #030303;
    --color-55: #666666;
    --color-56: #c2c2c2;
    --color-57: #07295d;
    --color-58: #44413e;
    --color-59: #0000003f;
    --color-60: #a732f6;
    --color-61: #1c1916;
    --color-62: #1e1e1e;
    --color-63: #191919;
    --color-64: #3b6c4f;
    --color-65: #6c5082;
    --color-66: #376292;
    --color-67: #1a1a19;
    --color-68: #1a1a197f;
    --color-69: #1a1a1a;
    --color-70: #c5a3a3;
    --color-71: #fdfdfd;
    --color-72: #fefffc;
    --color-73: #919eab28;
    --color-74: #4e4b4b;
    --color-75: #ff004f;
    --color-76: #00f7ef;
    --color-77: #4285f4;
    --color-78: #34a853;
    --color-79: #ea4335;
    --color-80: #fbbc04;
    --color-81: #c5221f;
    --color-82: #00e510;
    --color-83: #007ebb;
    --color-84: #e53a71;
    --color-85: #d8d8d8;
    --color-86: #090014;
    --color-87: #872bff;
    --color-88: #301916;
    --color-89: #00000019;
    --color-90: #d9d9d8;
    --color-91: #ffffff14;
    --color-92: #302c29;
    --color-93: #bebbb9;
    --color-94: #646261;
    --color-95: #272727;
    --font-body-family: 'Almarai', sans-serif;
    --font-body-size: 16.0px;
    --font-body-weight: 400;
    --font-body-line-height: 17.856000900268555px;
    --font-body-sm-2-family: 'Almarai', sans-serif;
    --font-body-sm-2-size: 14.0px;
    --font-body-sm-2-weight: 400;
    --font-body-sm-2-line-height: 15.624000549316406px;
    --font-body-3-family: 'Almarai', sans-serif;
    --font-body-3-size: 18.0px;
    --font-body-3-weight: 400;
    --font-body-3-line-height: 28.0px;
    --font-caption-4-family: 'Public Sans', sans-serif;
    --font-caption-4-size: 12.0px;
    --font-caption-4-weight: 400;
    --font-caption-4-line-height: 18.0px;
    --font-caption-5-family: 'Public Sans', sans-serif;
    --font-caption-5-size: 12.0px;
    --font-caption-5-weight: 700;
    --font-caption-5-line-height: 20.0px;
    --font-body-6-family: 'Almarai', sans-serif;
    --font-body-6-size: 18.0px;
    --font-body-6-weight: 400;
    --font-body-6-line-height: 20.088001251220703px;
    --font-caption-7-family: 'Almarai', sans-serif;
    --font-caption-7-size: 13.999999046325684px;
    --font-caption-7-weight: 400;
    --font-caption-7-line-height: 15.62399959564209px;
    --font-caption-8-family: 'Almarai', sans-serif;
    --font-caption-8-size: 10.000000953674316px;
    --font-caption-8-weight: 300;
    --font-caption-8-line-height: 11.160001754760742px;
    --font-caption-9-family: 'Almarai', sans-serif;
    --font-caption-9-size: 7.777777671813965px;
    --font-caption-9-weight: 400;
    --font-caption-9-line-height: 8.680000305175781px;
    --font-heading-md-10-family: 'Almarai', sans-serif;
    --font-heading-md-10-size: 22.0px;
    --font-heading-md-10-weight: 400;
    --font-heading-md-10-line-height: 24.552001953125px;
    --font-caption-11-family: 'Almarai', sans-serif;
    --font-caption-11-size: 6.80555534362793px;
    --font-caption-11-weight: 400;
    --font-caption-11-line-height: 7.595000267028809px;
    --font-caption-12-family: 'Almarai', sans-serif;
    --font-caption-12-size: 12.0px;
    --font-caption-12-weight: 400;
    --font-caption-12-line-height: 13.392000198364258px;
    --font-caption-13-family: 'Almarai', sans-serif;
    --font-caption-13-size: 4.861111640930176px;
    --font-caption-13-weight: 300;
    --font-caption-13-line-height: 5.4250006675720215px;
    --font-caption-14-family: 'Almarai', sans-serif;
    --font-caption-14-size: 7.909605026245117px;
    --font-caption-14-weight: 400;
    --font-caption-14-line-height: 8.827119827270508px;
    --font-caption-15-family: 'Public Sans', sans-serif;
    --font-caption-15-size: 5.767419815063477px;
    --font-caption-15-weight: 400;
    --font-caption-15-line-height: 8.651129722595215px;
    --font-caption-16-family: 'Public Sans', sans-serif;
    --font-caption-16-size: 5.767419815063477px;
    --font-caption-16-weight: 700;
    --font-caption-16-line-height: 9.612366676330566px;
    --font-caption-17-family: 'Public Sans', sans-serif;
    --font-caption-17-size: 5.8333330154418945px;
    --font-caption-17-weight: 400;
    --font-caption-17-line-height: 8.75px;
    --font-caption-18-family: 'Public Sans', sans-serif;
    --font-caption-18-size: 5.8333330154418945px;
    --font-caption-18-weight: 700;
    --font-caption-18-line-height: 9.722222328186035px;
    --font-caption-19-family: 'Almarai', sans-serif;
    --font-caption-19-size: 6.920904159545898px;
    --font-caption-19-weight: 400;
    --font-caption-19-line-height: 7.723729610443115px;
    --font-body-20-family: 'Almarai', sans-serif;
    --font-body-20-size: 16.0px;
    --font-body-20-weight: 400;
    --font-body-20-line-height: 26.0px;
    --font-heading-md-21-family: 'Almarai', sans-serif;
    --font-heading-md-21-size: 20.0px;
    --font-heading-md-21-weight: 400;
    --font-heading-md-21-line-height: 22.32000160217285px;
    --font-body-22-family: 'Almarai', sans-serif;
    --font-body-22-size: 18.0px;
    --font-body-22-weight: 700;
    --font-body-22-line-height: 20.088001251220703px;
    --font-body-sm-23-family: 'Almarai', sans-serif;
    --font-body-sm-23-size: 14.0px;
    --font-body-sm-23-weight: 300;
    --font-body-sm-23-line-height: 15.624000549316406px;
    --font-caption-24-family: 'Almarai', sans-serif;
    --font-caption-24-size: 8.0px;
    --font-caption-24-weight: 400;
    --font-caption-24-line-height: 8.928000450134277px;
    --font-caption-25-family: 'Almarai', sans-serif;
    --font-caption-25-size: 9.146902084350586px;
    --font-caption-25-weight: 400;
    --font-caption-25-line-height: 10.207942962646484px;
    --font-caption-26-family: 'Public Sans', sans-serif;
    --font-caption-26-size: 6.864686965942383px;
    --font-caption-26-weight: 400;
    --font-caption-26-line-height: 10.297030448913574px;
    --font-caption-27-family: 'Public Sans', sans-serif;
    --font-caption-27-size: 6.864686965942383px;
    --font-caption-27-weight: 700;
    --font-caption-27-line-height: 11.441144943237305px;
    --font-heading-lg-28-family: 'EB Garamond', sans-serif;
    --font-heading-lg-28-size: 30.0px;
    --font-heading-lg-28-weight: 500;
    --font-heading-lg-28-line-height: 39.14999771118164px;
    --font-body-sm-29-family: 'Almarai', sans-serif;
    --font-body-sm-29-size: 14.0px;
    --font-body-sm-29-weight: 700;
    --font-body-sm-29-line-height: 15.624000549316406px;
    --font-body-30-family: 'Almarai', sans-serif;
    --font-body-30-size: 16.0px;
    --font-body-30-weight: 300;
    --font-body-30-line-height: 17.856000900268555px;
    --font-heading-xl-31-family: 'EB Garamond', sans-serif;
    --font-heading-xl-31-size: 32.0px;
    --font-heading-xl-31-weight: 500;
    --font-heading-xl-31-line-height: 41.7599983215332px;
    --font-caption-32-family: 'Almarai', sans-serif;
    --font-caption-32-size: 8.75px;
    --font-caption-32-weight: 400;
    --font-caption-32-line-height: 13.61111068725586px;
    --font-body-33-family: 'Public Sans', sans-serif;
    --font-body-33-size: 19.69230842590332px;
    --font-body-33-weight: 600;
    --font-body-33-line-height: 29.538463592529297px;
    --font-caption-34-family: 'Almarai', sans-serif;
    --font-caption-34-size: 8.008801460266113px;
    --font-caption-34-weight: 400;
    --font-caption-34-line-height: 8.937823295593262px;
    --font-body-sm-35-family: 'Public Sans', sans-serif;
    --font-body-sm-35-size: 14.0px;
    --font-body-sm-35-weight: 600;
    --font-body-sm-35-line-height: 22.0px;
    --font-caption-36-family: 'Public Sans', sans-serif;
    --font-caption-36-size: 12.0px;
    --font-caption-36-weight: 600;
    --font-caption-36-line-height: 14.09999942779541px;
    --font-body-sm-37-family: 'Almarai', sans-serif;
    --font-body-sm-37-size: 14.0px;
    --font-body-sm-37-weight: 400;
    --font-body-sm-37-line-height: 22.0px;
    --font-caption-38-family: 'Almarai', sans-serif;
    --font-caption-38-size: 7.0px;
    --font-caption-38-weight: 400;
    --font-caption-38-line-height: 7.812000274658203px;
    --font-body-sm-39-family: 'Fellix', sans-serif;
    --font-body-sm-39-size: 15.0px;
    --font-body-sm-39-weight: 600;
    --font-body-sm-39-line-height: 20.0px;
    --font-body-sm-39-letter-spacing: 0.22499999999999998px;
    --font-body-40-family: 'Almarai', sans-serif;
    --font-body-40-size: 16.0px;
    --font-body-40-weight: 400;
    --font-body-40-line-height: 16.0px;
    --font-caption-41-family: 'Almarai', sans-serif;
    --font-caption-41-size: 10.0px;
    --font-caption-41-weight: 400;
    --font-caption-41-line-height: 11.160000801086426px;
    --font-heading-xl-42-family: 'EB Garamond', sans-serif;
    --font-heading-xl-42-size: 50.0px;
    --font-heading-xl-42-weight: 500;
    --font-heading-xl-42-line-height: 65.25px;
    --font-heading-xl-43-family: 'EB Garamond', sans-serif;
    --font-heading-xl-43-size: 42.0px;
    --font-heading-xl-43-weight: 500;
    --font-heading-xl-43-line-height: 54.80999755859375px;
    --font-heading-lg-44-family: 'Almarai', sans-serif;
    --font-heading-lg-44-size: 24.0px;
    --font-heading-lg-44-weight: 700;
    --font-heading-lg-44-line-height: 26.784000396728516px;
    --font-caption-45-family: 'Almarai', sans-serif;
    --font-caption-45-size: 8.003539085388184px;
    --font-caption-45-weight: 400;
    --font-caption-45-line-height: 8.931949615478516px;
    --font-heading-lg-46-family: 'EB Garamond', sans-serif;
    --font-heading-lg-46-size: 30.0px;
    --font-heading-lg-46-weight: 600;
    --font-heading-lg-46-line-height: 39.14999771118164px;
    --font-heading-lg-47-family: 'EB Garamond', sans-serif;
    --font-heading-lg-47-size: 24.0px;
    --font-heading-lg-47-weight: 600;
    --font-heading-lg-47-line-height: 31.31999969482422px;
    --font-caption-48-family: 'Almarai', sans-serif;
    --font-caption-48-size: 9.152915954589844px;
    --font-caption-48-weight: 400;
    --font-caption-48-line-height: 10.214654922485352px;
    --font-caption-49-family: 'Almarai', sans-serif;
    --font-caption-49-size: 7.488888740539551px;
    --font-caption-49-weight: 400;
    --font-caption-49-line-height: 8.357600212097168px;
    --font-heading-lg-50-family: 'Almarai', sans-serif;
    --font-heading-lg-50-size: 24.0px;
    --font-heading-lg-50-weight: 400;
    --font-heading-lg-50-line-height: 26.784000396728516px;
    --font-caption-51-family: 'Almarai', sans-serif;
    --font-caption-51-size: 6.728656768798828px;
    --font-caption-51-weight: 400;
    --font-caption-51-line-height: 7.509181499481201px;
    --font-body-52-family: 'Almarai', sans-serif;
    --font-body-52-size: 16.0px;
    --font-body-52-weight: 400;
    --font-body-52-line-height: 28.0px;
    --font-caption-53-family: 'Inter', sans-serif;
    --font-caption-53-size: 12.0px;
    --font-caption-53-weight: 400;
    --font-caption-53-line-height: 14.0px;
    --font-caption-53-letter-spacing: 0.4000000059604645px;
    --font-caption-54-family: 'Almarai', sans-serif;
    --font-caption-54-size: 12.0px;
    --font-caption-54-weight: 400;
    --font-caption-54-line-height: 18.0px;
    --font-body-55-family: 'Public Sans', sans-serif;
    --font-body-55-size: 17.6842098236084px;
    --font-body-55-weight: 400;
    --font-body-55-line-height: 27.789472579956055px;
    --font-heading-xl-56-family: 'EB Garamond', sans-serif;
    --font-heading-xl-56-size: 84.0px;
    --font-heading-xl-56-weight: 400;
    --font-heading-xl-56-line-height: 109.6199951171875px;
    --font-heading-lg-57-family: 'EB Garamond', sans-serif;
    --font-heading-lg-57-size: 26.0px;
    --font-heading-lg-57-weight: 500;
    --font-heading-lg-57-line-height: 33.93000030517578px;
    --font-caption-58-family: 'Almarai', sans-serif;
    --font-caption-58-size: 6.80555534362793px;
    --font-caption-58-weight: 400;
    --font-caption-58-line-height: 10.69444465637207px;
    --font-body-59-family: 'Almarai', sans-serif;
    --font-body-59-size: 16.0px;
    --font-body-59-weight: 700;
    --font-body-59-line-height: 17.856000900268555px;
    --font-heading-xl-60-family: 'EB Garamond', sans-serif;
    --font-heading-xl-60-size: 36.0px;
    --font-heading-xl-60-weight: 600;
    --font-heading-xl-60-line-height: 46.97999954223633px;
    --font-heading-lg-61-family: 'EB Garamond', sans-serif;
    --font-heading-lg-61-size: 26.0px;
    --font-heading-lg-61-weight: 600;
    --font-heading-lg-61-line-height: 33.93000030517578px;
    --font-caption-62-family: 'Almarai', sans-serif;
    --font-caption-62-size: 9.448482513427734px;
    --font-caption-62-weight: 400;
    --font-caption-62-line-height: 10.544507026672363px;
    --font-caption-63-family: 'Almarai', sans-serif;
    --font-caption-63-size: 6.7489166259765625px;
    --font-caption-63-weight: 300;
    --font-caption-63-line-height: 7.5317912101745605px;
    --font-body-64-family: 'Almarai', sans-serif;
    --font-body-64-size: 16.0px;
    --font-body-64-weight: 400;
    --font-body-64-line-height: 22.0px;
    --font-heading-md-65-family: 'Almarai', sans-serif;
    --font-heading-md-65-size: 20.0px;
    --font-heading-md-65-weight: 400;
    --font-heading-md-65-line-height: 28.0px;
    --font-caption-66-family: 'Public Sans', sans-serif;
    --font-caption-66-size: 5.93220329284668px;
    --font-caption-66-weight: 600;
    --font-caption-66-line-height: 6.970338821411133px;
    --font-heading-xl-67-family: 'EB Garamond', sans-serif;
    --font-heading-xl-67-size: 80.0px;
    --font-heading-xl-67-weight: 400;
    --font-heading-xl-67-line-height: 104.39999389648438px;
    --font-caption-68-family: 'Almarai', sans-serif;
    --font-caption-68-size: 7.488888740539551px;
    --font-caption-68-weight: 400;
    --font-caption-68-line-height: 9.36111068725586px;
    --font-heading-md-69-family: 'Almarai', sans-serif;
    --font-heading-md-69-size: 20.0px;
    --font-heading-md-69-weight: 400;
    --font-heading-md-69-line-height: 30.0px;
    --font-heading-md-70-family: 'Almarai', sans-serif;
    --font-heading-md-70-size: 20.0px;
    --font-heading-md-70-weight: 700;
    --font-heading-md-70-line-height: 24.0px;
    --font-heading-xl-71-family: 'EB Garamond', sans-serif;
    --font-heading-xl-71-size: 34.0px;
    --font-heading-xl-71-weight: 600;
    --font-heading-xl-71-line-height: 44.369998931884766px;
    --font-body-72-family: 'Almarai', sans-serif;
    --font-body-72-size: 18.0px;
    --font-body-72-weight: 400;
    --font-body-72-line-height: 24.0px;
    --font-heading-xl-73-family: 'Almarai', sans-serif;
    --font-heading-xl-73-size: 41.389190673828125px;
    --font-heading-xl-73-weight: 800;
    --font-heading-xl-73-line-height: 46.190338134765625px;
    --font-heading-lg-74-family: 'EB Garamond', sans-serif;
    --font-heading-lg-74-size: 24.0px;
    --font-heading-lg-74-weight: 500;
    --font-heading-lg-74-line-height: 31.31999969482422px;
    --font-body-75-family: 'Almarai', sans-serif;
    --font-body-75-size: 16.0px;
    --font-body-75-weight: 400;
    --font-body-75-line-height: 20.0px;
    --font-heading-xl-76-family: 'EB Garamond', sans-serif;
    --font-heading-xl-76-size: 32.0px;
    --font-heading-xl-76-weight: 500;
    --font-heading-xl-76-line-height: 32.0px;
    --font-heading-lg-77-family: 'Almarai', sans-serif;
    --font-heading-lg-77-size: 28.0px;
    --font-heading-lg-77-weight: 400;
    --font-heading-lg-77-line-height: 31.248001098632812px;
    --font-caption-78-family: 'Public Sans', sans-serif;
    --font-caption-78-size: 6.80555534362793px;
    --font-caption-78-weight: 600;
    --font-caption-78-line-height: 10.69444465637207px;
    --font-caption-79-family: 'Almarai', sans-serif;
    --font-caption-79-size: 7.6898932456970215px;
    --font-caption-79-weight: 400;
    --font-caption-79-line-height: 8.581921577453613px;
    --font-caption-80-family: 'EB Garamond', sans-serif;
    --font-caption-80-size: 12.638888359069824px;
    --font-caption-80-weight: 600;
    --font-caption-80-line-height: 16.49374771118164px;
    --font-body-81-family: 'EB Garamond', sans-serif;
    --font-body-81-size: 17.150442123413086px;
    --font-body-81-weight: 500;
    --font-body-81-line-height: 22.38132667541504px;
    --font-caption-82-family: 'Public Sans', sans-serif;
    --font-caption-82-size: 6.728656768798828px;
    --font-caption-82-weight: 600;
    --font-caption-82-line-height: 10.573603630065918px;
    --font-heading-lg-83-family: 'EB Garamond', sans-serif;
    --font-heading-lg-83-size: 30.0px;
    --font-heading-lg-83-weight: 400;
    --font-heading-lg-83-line-height: 39.14999771118164px;
    --font-heading-md-84-family: 'EB Garamond', sans-serif;
    --font-heading-md-84-size: 20.0px;
    --font-heading-md-84-weight: 500;
    --font-heading-md-84-line-height: 26.099998474121094px;
    --font-heading-xl-85-family: 'EB Garamond', sans-serif;
    --font-heading-xl-85-size: 38.0px;
    --font-heading-xl-85-weight: 500;
    --font-heading-xl-85-line-height: 49.589996337890625px;
    --font-body-86-family: 'Almarai', sans-serif;
    --font-body-86-size: 16.0px;
    --font-body-86-weight: 400;
    --font-body-86-line-height: 24.0px;
    --font-body-sm-87-family: 'EB Garamond', sans-serif;
    --font-body-sm-87-size: 14.583333015441895px;
    --font-body-sm-87-weight: 500;
    --font-body-sm-87-line-height: 19.031248092651367px;
    --font-caption-88-family: 'Public Sans', sans-serif;
    --font-caption-88-size: 6.0px;
    --font-caption-88-weight: 600;
    --font-caption-88-line-height: 7.049999713897705px;
    --font-heading-xl-89-family: 'EB Garamond', sans-serif;
    --font-heading-xl-89-size: 60.0px;
    --font-heading-xl-89-weight: 400;
    --font-heading-xl-89-line-height: 78.29999542236328px;
    --font-caption-90-family: 'Almarai', sans-serif;
    --font-caption-90-size: 7.4666666984558105px;
    --font-caption-90-weight: 400;
    --font-caption-90-line-height: 8.33280086517334px;
    --font-heading-md-91-family: 'EB Garamond', sans-serif;
    --font-heading-md-91-size: 20.580530166625977px;
    --font-heading-md-91-weight: 600;
    --font-heading-md-91-line-height: 26.85759162902832px;
    --font-caption-92-family: 'Public Sans', sans-serif;
    --font-caption-92-size: 6.864686965942383px;
    --font-caption-92-weight: 600;
    --font-caption-92-line-height: 8.066006660461426px;
    --font-caption-93-family: 'Public Sans', sans-serif;
    --font-caption-93-size: 8.008801460266113px;
    --font-caption-93-weight: 600;
    --font-caption-93-line-height: 12.585259437561035px;
    --font-body-sm-94-family: 'Almarai', sans-serif;
    --font-body-sm-94-size: 14.0px;
    --font-body-sm-94-weight: 400;
    --font-body-sm-94-line-height: 20.0px;
    --font-body-sm-95-family: 'EB Garamond', sans-serif;
    --font-body-sm-95-size: 14.041666030883789px;
    --font-body-sm-95-weight: 500;
    --font-body-sm-95-line-height: 18.324373245239258px;
    --font-caption-96-family: 'Almarai', sans-serif;
    --font-caption-96-size: 5.616666793823242px;
    --font-caption-96-weight: 400;
    --font-caption-96-line-height: 6.268200397491455px;
    --font-heading-md-97-family: 'EB Garamond', sans-serif;
    --font-heading-md-97-size: 22.0px;
    --font-heading-md-97-weight: 600;
    --font-heading-md-97-line-height: 28.709999084472656px;
    --font-heading-lg-98-family: 'Almarai', sans-serif;
    --font-heading-lg-98-size: 30.0px;
    --font-heading-lg-98-weight: 400;
    --font-heading-lg-98-line-height: 33.480003356933594px;
    --font-caption-99-family: 'Almarai', sans-serif;
    --font-caption-99-size: 12.0px;
    --font-caption-99-weight: 300;
    --font-caption-99-line-height: 13.392000198364258px;
    --font-body-100-family: 'Almarai', sans-serif;
    --font-body-100-size: 18.0px;
    --font-body-100-weight: 700;
    --font-body-100-line-height: 26.0px;
    --font-heading-xl-101-family: 'EB Garamond', sans-serif;
    --font-heading-xl-101-size: 84.0px;
    --font-heading-xl-101-weight: 500;
    --font-heading-xl-101-line-height: 90.0px;
    --font-caption-102-family: 'EB Garamond', sans-serif;
    --font-caption-102-size: 13.999999046325684px;
    --font-caption-102-weight: 500;
    --font-caption-102-line-height: 18.26999855041504px;
    --font-caption-103-family: 'Almarai', sans-serif;
    --font-caption-103-size: 5.599999904632568px;
    --font-caption-103-weight: 400;
    --font-caption-103-line-height: 6.249600410461426px;
    --font-caption-104-family: 'Almarai', sans-serif;
    --font-caption-104-size: 7.777777671813965px;
    --font-caption-104-weight: 400;
    --font-caption-104-line-height: 10.69444465637207px;
    --font-caption-105-family: 'EB Garamond', sans-serif;
    --font-caption-105-size: 10.69444465637207px;
    --font-caption-105-weight: 600;
    --font-caption-105-line-height: 13.956250190734863px;
    --font-body-sm-106-family: 'Almarai', sans-serif;
    --font-body-sm-106-size: 14.583333015441895px;
    --font-body-sm-106-weight: 400;
    --font-body-sm-106-line-height: 16.274999618530273px;
    --font-caption-107-family: 'Almarai', sans-serif;
    --font-caption-107-size: 5.8333330154418945px;
    --font-caption-107-weight: 300;
    --font-caption-107-line-height: 6.509999752044678px;
    --font-caption-108-family: 'Public Sans', sans-serif;
    --font-caption-108-size: 5.8333330154418945px;
    --font-caption-108-weight: 600;
    --font-caption-108-line-height: 6.854166030883789px;
    --font-heading-lg-109-family: 'Kalam', sans-serif;
    --font-heading-lg-109-size: 28.049240112304688px;
    --font-heading-lg-109-weight: 700;
    --font-heading-lg-109-line-height: 38.80799865722656px;
    --font-heading-lg-110-family: 'EB Garamond', sans-serif;
    --font-heading-lg-110-size: 24.010618209838867px;
    --font-heading-lg-110-weight: 500;
    --font-heading-lg-110-line-height: 31.33385467529297px;
    --font-body-sm-111-family: 'Almarai', sans-serif;
    --font-body-sm-111-size: 14.0px;
    --font-body-sm-111-weight: 400;
    --font-body-sm-111-line-height: 18.0px;
    --font-caption-112-family: 'Almarai', sans-serif;
    --font-caption-112-size: 6.5527777671813965px;
    --font-caption-112-weight: 400;
    --font-caption-112-line-height: 7.312900543212891px;
    --font-heading-xl-113-family: 'EB Garamond', sans-serif;
    --font-heading-xl-113-size: 120.0px;
    --font-heading-xl-113-weight: 400;
    --font-heading-xl-113-line-height: 156.59999084472656px;
    --font-heading-xl-114-family: 'EB Garamond', sans-serif;
    --font-heading-xl-114-size: 55.0px;
    --font-heading-xl-114-weight: 500;
    --font-heading-xl-114-line-height: 71.77499389648438px;
    --font-heading-lg-115-family: 'EB Garamond', sans-serif;
    --font-heading-lg-115-size: 28.0px;
    --font-heading-lg-115-weight: 400;
    --font-heading-lg-115-line-height: 36.53999710083008px;
    --font-heading-xl-116-family: 'EB Garamond', sans-serif;
    --font-heading-xl-116-size: 34.0px;
    --font-heading-xl-116-weight: 500;
    --font-heading-xl-116-line-height: 44.369998931884766px;
    --font-heading-lg-117-family: 'EB Garamond', sans-serif;
    --font-heading-lg-117-size: 24.0px;
    --font-heading-lg-117-weight: 500;
    --font-heading-lg-117-line-height: 30.0px;
    --font-body-118-family: 'Public Sans', sans-serif;
    --font-body-118-size: 16.0px;
    --font-body-118-weight: 600;
    --font-body-118-line-height: 18.799999237060547px;
    --font-body-sm-119-family: 'Space Grotesk', sans-serif;
    --font-body-sm-119-size: 14.0px;
    --font-body-sm-119-weight: 500;
    --font-body-sm-119-line-height: 17.86400032043457px;
    --font-body-120-family: 'Almarai', sans-serif;
    --font-body-120-size: 18.0px;
    --font-body-120-weight: 400;
    --font-body-120-line-height: 48.0px;
    --padding-8: 8px;
    --padding-6: 6px;
    --padding-20: 20px;
    --padding-16: 16px;
    --padding-7: 7px;
    --padding-10: 10px;
    --padding-3: 3px;
    --padding-24: 24px;
    --padding-12: 12px;
    --padding-2: 2px;
    --padding-4: 4px;
    --padding-9: 9px;
    --padding-11: 11px;
    --padding-14: 14px;
    --padding-5: 5px;
    --padding-30: 30px;
    --padding-15: 15px;
    --padding-40: 40px;
    --padding-13: 13px;
    --padding-0: 0px;
    --padding-50: 50px;
    --padding-36: 36px;
    --padding-1: 1px;
    --padding-32: 32px;
    --padding-60: 60px;
    --padding-17: 17px;
    --padding-22: 22px;
    --gap-10: 10px;
    --gap-6: 6px;
    --gap-4: 4px;
    --gap-8: 8px;
    --gap-16: 16px;
    --gap-20: 20px;
    --gap-2: 2px;
    --gap-7: 7px;
    --gap-5: 5px;
    --gap-3: 3px;
    --gap-14: 14px;
    --gap-12: 12px;
    --gap-9: 9px;
    --gap-30: 30px;
    --gap-1: 1px;
    --gap-24: 24px;
    --gap-40: 40px;
    --gap-11: 11px;
    --gap--2: -2px;
    --gap-26: 26px;
    --gap-48: 48px;
    --gap-32: 32px;
    --gap-815: 815px;
    --gap-36: 36px;
    --gap--6: -6px;
    --gap-15: 15px;
    --gap-52: 52px;
    --gap-71: 71px;
    --gap-18: 18px;
    --gap-44: 44px;
    --gap-75: 75px;
    --gap-624: 624px;
    --gap-50: 50px;
    --gap-465: 465px;
    --gap-303: 303px;
    --gap-17: 17px;
    --gap-42: 42px;
    --gap-113: 113px;
    --gap-125: 125px;
    --gap--10: -10px;
    --gap-60: 60px;
    --gap-13: 13px;
    --gap-102: 102px;
    --gap-43: 43px;
    --gap-101: 101px;
    --gap-832: 832px;
    --radius-6: 6px;
    --radius-10: 10px;
    --radius-3: 3px;
    --radius-2: 2px;
    --radius-10000: 10000px;
    --radius-4: 4px;
    --radius-8: 8px;
    --radius-1000: 1000px;
    --radius-500: 500px;
    --radius-60709: 60709px;
    --radius-16: 16px;
    --radius-20: 20px;
    --radius-5: 5px;
    --radius-100000: 100000px;
    --radius-27: 27px;
    --radius-1: 1px;
    --radius-29511: 29511px;
    --radius-50: 50px;
    --radius-24: 24px;
    --radius-243: 243px;
    --radius-240: 240px;
    --radius-4861: 4861px;
    --radius-9: 9px;
    --radius-480: 480px;
    --radius-30: 30px;
    --radius-486: 486px;
    --radius-25: 25px;
    --radius-64: 64px;
    --radius-4806: 4806px;
    --radius-7: 7px;
    --radius-286: 286px;
    --radius-4680: 4680px;
    --radius-60: 60px;
    --radius-572: 572px;
    --radius-300: 300px;
    --radius-12: 12px;
    --radius-100: 100px;
    --radius-40972: 40972px;
    --radius-15000: 15000px;
    --radius-5720: 5720px;
    --radius-571: 571px;
    --radius-649: 649px;
    --radius-11: 11px;
    --radius-5716: 5716px;
    --radius-28: 28px;
    --radius-535: 535px;
    --radius-4666: 4666px;
    --radius-69: 69px;
    --glass: none;
    --layer-blur-2: 0 0 394px transparent;
    --layer-blur-3: 0 0 514px transparent;
    --drop-shadow-4: -3px 0 25px #00000019;
    --layer-blur-5: 0 0 276.1745910644531px transparent;
    --layer-blur-6: 0 0 211.69802856445312px transparent;
    --layer-blur-7: 0 0 191.4674072265625px transparent;
    --layer-blur-8: 0 0 121.02381896972656px transparent;
    --layer-blur-9: 0 0 157.8838653564453px transparent;
    --background-blur-10: 0 0 15px transparent;
    --drop-shadow-11: 0 4px 4px #0000003f;
    --drop-shadow-12: -1.4418549537658691px 0 12.015458106994629px #00000019;
    --layer-blur-13: 0 0 320px transparent;
    --drop-shadow-14: 0 2.8704702854156494px 3.588087797164917px -2.201871156692505px #16181d19;
    --drop-shadow-15: 0 0 7.176175594329834px -1.651403546333313px #16181d19;
    --drop-shadow-16: -1.4583332538604736px 0 12.152777671813965px #00000019;
    --layer-blur-17: 0 0 94px transparent;
    --drop-shadow-18: 0 44px 54px #3b3b3b72;
    --drop-shadow-19: 10px 10px 20px #0000007f;
    --drop-shadow-20: 0 34px 44px #00000072;
    --background-blur-21: 0 0 6.458558082580566px transparent;
    --drop-shadow-22: -1.4041666984558105px 0 11.701388359069824px #00000019;
    --drop-shadow-23: 0 1.8722221851348877px 18.72222137451172px #00000019;
    --layer-blur-24: 0 0 339.35546875px transparent;
    --background-blur-25: 0 0 4px transparent;
    --layer-blur-26: 0 0 224px transparent;
    --drop-shadow-27: 0 1.8666666746139526px 18.66666603088379px #00000019;
    --background-blur-28: 0 0 1.9444444179534912px transparent;
    --drop-shadow-29: 0 1.9444444179534912px 1.9444444179534912px #0000003f;
    --drop-shadow-30: -10px -20px 34px #000000f2;
    --drop-shadow-31: 0 0 2px #ffffff14;
    --drop-shadow-32: -1.7161717414855957px 0 14.301431655883789px #00000019;
    --layer-blur-33: 0 0 28.584068298339844px transparent;
    --background-blur-34: 0 0 7.176175594329834px transparent;
    --drop-shadow-35: 20px -10px 34px #000000f2;
    --layer-blur-36: 0 0 1954.410888671875px transparent;
    --drop-shadow-37: 0 4px 34px #c8a47e33;
    --layer-blur-38: 0 0 50px transparent;
    --drop-shadow-39: 0 4px 40px #00000019;
    --drop-shadow-40: 0 8px 16px #919eab28;
    --filter-glass: none;
    --filter-layer-blur-2: blur(394px);
    --filter-layer-blur-3: blur(514px);
    --filter-layer-blur-5: blur(276.1745910644531px);
    --filter-layer-blur-6: blur(211.69802856445312px);
    --filter-layer-blur-7: blur(191.4674072265625px);
    --filter-layer-blur-8: blur(121.02381896972656px);
    --filter-layer-blur-9: blur(157.8838653564453px);
    --filter-background-blur-10: blur(15px);
    --filter-layer-blur-13: blur(320px);
    --filter-layer-blur-17: blur(94px);
    --filter-background-blur-21: blur(6.458558082580566px);
    --filter-layer-blur-24: blur(339.35546875px);
    --filter-background-blur-25: blur(4px);
    --filter-layer-blur-26: blur(224px);
    --filter-background-blur-28: blur(1.9444444179534912px);
    --filter-layer-blur-33: blur(28.584068298339844px);
    --filter-background-blur-34: blur(7.176175594329834px);
    --filter-layer-blur-36: blur(1954.410888671875px);
    --filter-layer-blur-38: blur(50px);
    --breakpoint-mobile: 768px;
    --breakpoint-tablet: 1024px;
    --breakpoint-desktop: 1280px;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: var(--font-body-family);
    font-size: var(--font-body-size);
    font-weight: var(--font-body-weight);
    line-height: var(--font-body-line-height);
    color: var(--text-primary);
    background-color: var(--color-29);
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  .text-body {
    font-family: var(--font-body-family);
    font-size: var(--font-body-size);
    font-weight: var(--font-body-weight);
    line-height: var(--font-body-line-height);
  }
  .text-body-sm-2 {
    font-family: var(--font-body-sm-2-family);
    font-size: var(--font-body-sm-2-size);
    font-weight: var(--font-body-sm-2-weight);
    line-height: var(--font-body-sm-2-line-height);
  }
  .text-body-3 {
    font-family: var(--font-body-3-family);
    font-size: var(--font-body-3-size);
    font-weight: var(--font-body-3-weight);
    line-height: var(--font-body-3-line-height);
  }
  .text-caption-4 {
    font-family: var(--font-caption-4-family);
    font-size: var(--font-caption-4-size);
    font-weight: var(--font-caption-4-weight);
    line-height: var(--font-caption-4-line-height);
  }
  .text-caption-5 {
    font-family: var(--font-caption-5-family);
    font-size: var(--font-caption-5-size);
    font-weight: var(--font-caption-5-weight);
    line-height: var(--font-caption-5-line-height);
  }
  .text-body-6 {
    font-family: var(--font-body-6-family);
    font-size: var(--font-body-6-size);
    font-weight: var(--font-body-6-weight);
    line-height: var(--font-body-6-line-height);
  }
  .text-caption-7 {
    font-family: var(--font-caption-7-family);
    font-size: var(--font-caption-7-size);
    font-weight: var(--font-caption-7-weight);
    line-height: var(--font-caption-7-line-height);
  }
  .text-caption-8 {
    font-family: var(--font-caption-8-family);
    font-size: var(--font-caption-8-size);
    font-weight: var(--font-caption-8-weight);
    line-height: var(--font-caption-8-line-height);
  }
  .text-caption-9 {
    font-family: var(--font-caption-9-family);
    font-size: var(--font-caption-9-size);
    font-weight: var(--font-caption-9-weight);
    line-height: var(--font-caption-9-line-height);
  }
  .text-heading-md-10 {
    font-family: var(--font-heading-md-10-family);
    font-size: var(--font-heading-md-10-size);
    font-weight: var(--font-heading-md-10-weight);
    line-height: var(--font-heading-md-10-line-height);
  }
  .text-caption-11 {
    font-family: var(--font-caption-11-family);
    font-size: var(--font-caption-11-size);
    font-weight: var(--font-caption-11-weight);
    line-height: var(--font-caption-11-line-height);
  }
  .text-caption-12 {
    font-family: var(--font-caption-12-family);
    font-size: var(--font-caption-12-size);
    font-weight: var(--font-caption-12-weight);
    line-height: var(--font-caption-12-line-height);
  }
  .text-caption-13 {
    font-family: var(--font-caption-13-family);
    font-size: var(--font-caption-13-size);
    font-weight: var(--font-caption-13-weight);
    line-height: var(--font-caption-13-line-height);
  }
  .text-caption-14 {
    font-family: var(--font-caption-14-family);
    font-size: var(--font-caption-14-size);
    font-weight: var(--font-caption-14-weight);
    line-height: var(--font-caption-14-line-height);
  }
  .text-caption-15 {
    font-family: var(--font-caption-15-family);
    font-size: var(--font-caption-15-size);
    font-weight: var(--font-caption-15-weight);
    line-height: var(--font-caption-15-line-height);
  }
  .text-caption-16 {
    font-family: var(--font-caption-16-family);
    font-size: var(--font-caption-16-size);
    font-weight: var(--font-caption-16-weight);
    line-height: var(--font-caption-16-line-height);
  }
  .text-caption-17 {
    font-family: var(--font-caption-17-family);
    font-size: var(--font-caption-17-size);
    font-weight: var(--font-caption-17-weight);
    line-height: var(--font-caption-17-line-height);
  }
  .text-caption-18 {
    font-family: var(--font-caption-18-family);
    font-size: var(--font-caption-18-size);
    font-weight: var(--font-caption-18-weight);
    line-height: var(--font-caption-18-line-height);
  }
  .text-caption-19 {
    font-family: var(--font-caption-19-family);
    font-size: var(--font-caption-19-size);
    font-weight: var(--font-caption-19-weight);
    line-height: var(--font-caption-19-line-height);
  }
  .text-body-20 {
    font-family: var(--font-body-20-family);
    font-size: var(--font-body-20-size);
    font-weight: var(--font-body-20-weight);
    line-height: var(--font-body-20-line-height);
  }
  .text-heading-md-21 {
    font-family: var(--font-heading-md-21-family);
    font-size: var(--font-heading-md-21-size);
    font-weight: var(--font-heading-md-21-weight);
    line-height: var(--font-heading-md-21-line-height);
  }
  .text-body-22 {
    font-family: var(--font-body-22-family);
    font-size: var(--font-body-22-size);
    font-weight: var(--font-body-22-weight);
    line-height: var(--font-body-22-line-height);
  }
  .text-body-sm-23 {
    font-family: var(--font-body-sm-23-family);
    font-size: var(--font-body-sm-23-size);
    font-weight: var(--font-body-sm-23-weight);
    line-height: var(--font-body-sm-23-line-height);
  }
  .text-caption-24 {
    font-family: var(--font-caption-24-family);
    font-size: var(--font-caption-24-size);
    font-weight: var(--font-caption-24-weight);
    line-height: var(--font-caption-24-line-height);
  }
  .text-caption-25 {
    font-family: var(--font-caption-25-family);
    font-size: var(--font-caption-25-size);
    font-weight: var(--font-caption-25-weight);
    line-height: var(--font-caption-25-line-height);
  }
  .text-caption-26 {
    font-family: var(--font-caption-26-family);
    font-size: var(--font-caption-26-size);
    font-weight: var(--font-caption-26-weight);
    line-height: var(--font-caption-26-line-height);
  }
  .text-caption-27 {
    font-family: var(--font-caption-27-family);
    font-size: var(--font-caption-27-size);
    font-weight: var(--font-caption-27-weight);
    line-height: var(--font-caption-27-line-height);
  }
  .text-heading-lg-28 {
    font-family: var(--font-heading-lg-28-family);
    font-size: var(--font-heading-lg-28-size);
    font-weight: var(--font-heading-lg-28-weight);
    line-height: var(--font-heading-lg-28-line-height);
  }
  .text-body-sm-29 {
    font-family: var(--font-body-sm-29-family);
    font-size: var(--font-body-sm-29-size);
    font-weight: var(--font-body-sm-29-weight);
    line-height: var(--font-body-sm-29-line-height);
  }
  .text-body-30 {
    font-family: var(--font-body-30-family);
    font-size: var(--font-body-30-size);
    font-weight: var(--font-body-30-weight);
    line-height: var(--font-body-30-line-height);
  }
  .text-heading-xl-31 {
    font-family: var(--font-heading-xl-31-family);
    font-size: var(--font-heading-xl-31-size);
    font-weight: var(--font-heading-xl-31-weight);
    line-height: var(--font-heading-xl-31-line-height);
  }
  .text-caption-32 {
    font-family: var(--font-caption-32-family);
    font-size: var(--font-caption-32-size);
    font-weight: var(--font-caption-32-weight);
    line-height: var(--font-caption-32-line-height);
  }
  .text-body-33 {
    font-family: var(--font-body-33-family);
    font-size: var(--font-body-33-size);
    font-weight: var(--font-body-33-weight);
    line-height: var(--font-body-33-line-height);
  }
  .text-caption-34 {
    font-family: var(--font-caption-34-family);
    font-size: var(--font-caption-34-size);
    font-weight: var(--font-caption-34-weight);
    line-height: var(--font-caption-34-line-height);
  }
  .text-body-sm-35 {
    font-family: var(--font-body-sm-35-family);
    font-size: var(--font-body-sm-35-size);
    font-weight: var(--font-body-sm-35-weight);
    line-height: var(--font-body-sm-35-line-height);
  }
  .text-caption-36 {
    font-family: var(--font-caption-36-family);
    font-size: var(--font-caption-36-size);
    font-weight: var(--font-caption-36-weight);
    line-height: var(--font-caption-36-line-height);
  }
  .text-body-sm-37 {
    font-family: var(--font-body-sm-37-family);
    font-size: var(--font-body-sm-37-size);
    font-weight: var(--font-body-sm-37-weight);
    line-height: var(--font-body-sm-37-line-height);
  }
  .text-caption-38 {
    font-family: var(--font-caption-38-family);
    font-size: var(--font-caption-38-size);
    font-weight: var(--font-caption-38-weight);
    line-height: var(--font-caption-38-line-height);
  }
  .text-body-sm-39 {
    font-family: var(--font-body-sm-39-family);
    font-size: var(--font-body-sm-39-size);
    font-weight: var(--font-body-sm-39-weight);
    line-height: var(--font-body-sm-39-line-height);
    letter-spacing: var(--font-body-sm-39-letter-spacing);
  }
  .text-body-40 {
    font-family: var(--font-body-40-family);
    font-size: var(--font-body-40-size);
    font-weight: var(--font-body-40-weight);
    line-height: var(--font-body-40-line-height);
  }
  .text-caption-41 {
    font-family: var(--font-caption-41-family);
    font-size: var(--font-caption-41-size);
    font-weight: var(--font-caption-41-weight);
    line-height: var(--font-caption-41-line-height);
  }
  .text-heading-xl-42 {
    font-family: var(--font-heading-xl-42-family);
    font-size: var(--font-heading-xl-42-size);
    font-weight: var(--font-heading-xl-42-weight);
    line-height: var(--font-heading-xl-42-line-height);
  }
  .text-heading-xl-43 {
    font-family: var(--font-heading-xl-43-family);
    font-size: var(--font-heading-xl-43-size);
    font-weight: var(--font-heading-xl-43-weight);
    line-height: var(--font-heading-xl-43-line-height);
  }
  .text-heading-lg-44 {
    font-family: var(--font-heading-lg-44-family);
    font-size: var(--font-heading-lg-44-size);
    font-weight: var(--font-heading-lg-44-weight);
    line-height: var(--font-heading-lg-44-line-height);
  }
  .text-caption-45 {
    font-family: var(--font-caption-45-family);
    font-size: var(--font-caption-45-size);
    font-weight: var(--font-caption-45-weight);
    line-height: var(--font-caption-45-line-height);
  }
  .text-heading-lg-46 {
    font-family: var(--font-heading-lg-46-family);
    font-size: var(--font-heading-lg-46-size);
    font-weight: var(--font-heading-lg-46-weight);
    line-height: var(--font-heading-lg-46-line-height);
  }
  .text-heading-lg-47 {
    font-family: var(--font-heading-lg-47-family);
    font-size: var(--font-heading-lg-47-size);
    font-weight: var(--font-heading-lg-47-weight);
    line-height: var(--font-heading-lg-47-line-height);
  }
  .text-caption-48 {
    font-family: var(--font-caption-48-family);
    font-size: var(--font-caption-48-size);
    font-weight: var(--font-caption-48-weight);
    line-height: var(--font-caption-48-line-height);
  }
  .text-caption-49 {
    font-family: var(--font-caption-49-family);
    font-size: var(--font-caption-49-size);
    font-weight: var(--font-caption-49-weight);
    line-height: var(--font-caption-49-line-height);
  }
  .text-heading-lg-50 {
    font-family: var(--font-heading-lg-50-family);
    font-size: var(--font-heading-lg-50-size);
    font-weight: var(--font-heading-lg-50-weight);
    line-height: var(--font-heading-lg-50-line-height);
  }
  .text-caption-51 {
    font-family: var(--font-caption-51-family);
    font-size: var(--font-caption-51-size);
    font-weight: var(--font-caption-51-weight);
    line-height: var(--font-caption-51-line-height);
  }
  .text-body-52 {
    font-family: var(--font-body-52-family);
    font-size: var(--font-body-52-size);
    font-weight: var(--font-body-52-weight);
    line-height: var(--font-body-52-line-height);
  }
  .text-caption-53 {
    font-family: var(--font-caption-53-family);
    font-size: var(--font-caption-53-size);
    font-weight: var(--font-caption-53-weight);
    line-height: var(--font-caption-53-line-height);
    letter-spacing: var(--font-caption-53-letter-spacing);
  }
  .text-caption-54 {
    font-family: var(--font-caption-54-family);
    font-size: var(--font-caption-54-size);
    font-weight: var(--font-caption-54-weight);
    line-height: var(--font-caption-54-line-height);
  }
  .text-body-55 {
    font-family: var(--font-body-55-family);
    font-size: var(--font-body-55-size);
    font-weight: var(--font-body-55-weight);
    line-height: var(--font-body-55-line-height);
  }
  .text-heading-xl-56 {
    font-family: var(--font-heading-xl-56-family);
    font-size: var(--font-heading-xl-56-size);
    font-weight: var(--font-heading-xl-56-weight);
    line-height: var(--font-heading-xl-56-line-height);
  }
  .text-heading-lg-57 {
    font-family: var(--font-heading-lg-57-family);
    font-size: var(--font-heading-lg-57-size);
    font-weight: var(--font-heading-lg-57-weight);
    line-height: var(--font-heading-lg-57-line-height);
  }
  .text-caption-58 {
    font-family: var(--font-caption-58-family);
    font-size: var(--font-caption-58-size);
    font-weight: var(--font-caption-58-weight);
    line-height: var(--font-caption-58-line-height);
  }
  .text-body-59 {
    font-family: var(--font-body-59-family);
    font-size: var(--font-body-59-size);
    font-weight: var(--font-body-59-weight);
    line-height: var(--font-body-59-line-height);
  }
  .text-heading-xl-60 {
    font-family: var(--font-heading-xl-60-family);
    font-size: var(--font-heading-xl-60-size);
    font-weight: var(--font-heading-xl-60-weight);
    line-height: var(--font-heading-xl-60-line-height);
  }
  .text-heading-lg-61 {
    font-family: var(--font-heading-lg-61-family);
    font-size: var(--font-heading-lg-61-size);
    font-weight: var(--font-heading-lg-61-weight);
    line-height: var(--font-heading-lg-61-line-height);
  }
  .text-caption-62 {
    font-family: var(--font-caption-62-family);
    font-size: var(--font-caption-62-size);
    font-weight: var(--font-caption-62-weight);
    line-height: var(--font-caption-62-line-height);
  }
  .text-caption-63 {
    font-family: var(--font-caption-63-family);
    font-size: var(--font-caption-63-size);
    font-weight: var(--font-caption-63-weight);
    line-height: var(--font-caption-63-line-height);
  }
  .text-body-64 {
    font-family: var(--font-body-64-family);
    font-size: var(--font-body-64-size);
    font-weight: var(--font-body-64-weight);
    line-height: var(--font-body-64-line-height);
  }
  .text-heading-md-65 {
    font-family: var(--font-heading-md-65-family);
    font-size: var(--font-heading-md-65-size);
    font-weight: var(--font-heading-md-65-weight);
    line-height: var(--font-heading-md-65-line-height);
  }
  .text-caption-66 {
    font-family: var(--font-caption-66-family);
    font-size: var(--font-caption-66-size);
    font-weight: var(--font-caption-66-weight);
    line-height: var(--font-caption-66-line-height);
  }
  .text-heading-xl-67 {
    font-family: var(--font-heading-xl-67-family);
    font-size: var(--font-heading-xl-67-size);
    font-weight: var(--font-heading-xl-67-weight);
    line-height: var(--font-heading-xl-67-line-height);
  }
  .text-caption-68 {
    font-family: var(--font-caption-68-family);
    font-size: var(--font-caption-68-size);
    font-weight: var(--font-caption-68-weight);
    line-height: var(--font-caption-68-line-height);
  }
  .text-heading-md-69 {
    font-family: var(--font-heading-md-69-family);
    font-size: var(--font-heading-md-69-size);
    font-weight: var(--font-heading-md-69-weight);
    line-height: var(--font-heading-md-69-line-height);
  }
  .text-heading-md-70 {
    font-family: var(--font-heading-md-70-family);
    font-size: var(--font-heading-md-70-size);
    font-weight: var(--font-heading-md-70-weight);
    line-height: var(--font-heading-md-70-line-height);
  }
  .text-heading-xl-71 {
    font-family: var(--font-heading-xl-71-family);
    font-size: var(--font-heading-xl-71-size);
    font-weight: var(--font-heading-xl-71-weight);
    line-height: var(--font-heading-xl-71-line-height);
  }
  .text-body-72 {
    font-family: var(--font-body-72-family);
    font-size: var(--font-body-72-size);
    font-weight: var(--font-body-72-weight);
    line-height: var(--font-body-72-line-height);
  }
  .text-heading-xl-73 {
    font-family: var(--font-heading-xl-73-family);
    font-size: var(--font-heading-xl-73-size);
    font-weight: var(--font-heading-xl-73-weight);
    line-height: var(--font-heading-xl-73-line-height);
  }
  .text-heading-lg-74 {
    font-family: var(--font-heading-lg-74-family);
    font-size: var(--font-heading-lg-74-size);
    font-weight: var(--font-heading-lg-74-weight);
    line-height: var(--font-heading-lg-74-line-height);
  }
  .text-body-75 {
    font-family: var(--font-body-75-family);
    font-size: var(--font-body-75-size);
    font-weight: var(--font-body-75-weight);
    line-height: var(--font-body-75-line-height);
  }
  .text-heading-xl-76 {
    font-family: var(--font-heading-xl-76-family);
    font-size: var(--font-heading-xl-76-size);
    font-weight: var(--font-heading-xl-76-weight);
    line-height: var(--font-heading-xl-76-line-height);
  }
  .text-heading-lg-77 {
    font-family: var(--font-heading-lg-77-family);
    font-size: var(--font-heading-lg-77-size);
    font-weight: var(--font-heading-lg-77-weight);
    line-height: var(--font-heading-lg-77-line-height);
  }
  .text-caption-78 {
    font-family: var(--font-caption-78-family);
    font-size: var(--font-caption-78-size);
    font-weight: var(--font-caption-78-weight);
    line-height: var(--font-caption-78-line-height);
  }
  .text-caption-79 {
    font-family: var(--font-caption-79-family);
    font-size: var(--font-caption-79-size);
    font-weight: var(--font-caption-79-weight);
    line-height: var(--font-caption-79-line-height);
  }
  .text-caption-80 {
    font-family: var(--font-caption-80-family);
    font-size: var(--font-caption-80-size);
    font-weight: var(--font-caption-80-weight);
    line-height: var(--font-caption-80-line-height);
  }
  .text-body-81 {
    font-family: var(--font-body-81-family);
    font-size: var(--font-body-81-size);
    font-weight: var(--font-body-81-weight);
    line-height: var(--font-body-81-line-height);
  }
  .text-caption-82 {
    font-family: var(--font-caption-82-family);
    font-size: var(--font-caption-82-size);
    font-weight: var(--font-caption-82-weight);
    line-height: var(--font-caption-82-line-height);
  }
  .text-heading-lg-83 {
    font-family: var(--font-heading-lg-83-family);
    font-size: var(--font-heading-lg-83-size);
    font-weight: var(--font-heading-lg-83-weight);
    line-height: var(--font-heading-lg-83-line-height);
  }
  .text-heading-md-84 {
    font-family: var(--font-heading-md-84-family);
    font-size: var(--font-heading-md-84-size);
    font-weight: var(--font-heading-md-84-weight);
    line-height: var(--font-heading-md-84-line-height);
  }
  .text-heading-xl-85 {
    font-family: var(--font-heading-xl-85-family);
    font-size: var(--font-heading-xl-85-size);
    font-weight: var(--font-heading-xl-85-weight);
    line-height: var(--font-heading-xl-85-line-height);
  }
  .text-body-86 {
    font-family: var(--font-body-86-family);
    font-size: var(--font-body-86-size);
    font-weight: var(--font-body-86-weight);
    line-height: var(--font-body-86-line-height);
  }
  .text-body-sm-87 {
    font-family: var(--font-body-sm-87-family);
    font-size: var(--font-body-sm-87-size);
    font-weight: var(--font-body-sm-87-weight);
    line-height: var(--font-body-sm-87-line-height);
  }
  .text-caption-88 {
    font-family: var(--font-caption-88-family);
    font-size: var(--font-caption-88-size);
    font-weight: var(--font-caption-88-weight);
    line-height: var(--font-caption-88-line-height);
  }
  .text-heading-xl-89 {
    font-family: var(--font-heading-xl-89-family);
    font-size: var(--font-heading-xl-89-size);
    font-weight: var(--font-heading-xl-89-weight);
    line-height: var(--font-heading-xl-89-line-height);
  }
  .text-caption-90 {
    font-family: var(--font-caption-90-family);
    font-size: var(--font-caption-90-size);
    font-weight: var(--font-caption-90-weight);
    line-height: var(--font-caption-90-line-height);
  }
  .text-heading-md-91 {
    font-family: var(--font-heading-md-91-family);
    font-size: var(--font-heading-md-91-size);
    font-weight: var(--font-heading-md-91-weight);
    line-height: var(--font-heading-md-91-line-height);
  }
  .text-caption-92 {
    font-family: var(--font-caption-92-family);
    font-size: var(--font-caption-92-size);
    font-weight: var(--font-caption-92-weight);
    line-height: var(--font-caption-92-line-height);
  }
  .text-caption-93 {
    font-family: var(--font-caption-93-family);
    font-size: var(--font-caption-93-size);
    font-weight: var(--font-caption-93-weight);
    line-height: var(--font-caption-93-line-height);
  }
  .text-body-sm-94 {
    font-family: var(--font-body-sm-94-family);
    font-size: var(--font-body-sm-94-size);
    font-weight: var(--font-body-sm-94-weight);
    line-height: var(--font-body-sm-94-line-height);
  }
  .text-body-sm-95 {
    font-family: var(--font-body-sm-95-family);
    font-size: var(--font-body-sm-95-size);
    font-weight: var(--font-body-sm-95-weight);
    line-height: var(--font-body-sm-95-line-height);
  }
  .text-caption-96 {
    font-family: var(--font-caption-96-family);
    font-size: var(--font-caption-96-size);
    font-weight: var(--font-caption-96-weight);
    line-height: var(--font-caption-96-line-height);
  }
  .text-heading-md-97 {
    font-family: var(--font-heading-md-97-family);
    font-size: var(--font-heading-md-97-size);
    font-weight: var(--font-heading-md-97-weight);
    line-height: var(--font-heading-md-97-line-height);
  }
  .text-heading-lg-98 {
    font-family: var(--font-heading-lg-98-family);
    font-size: var(--font-heading-lg-98-size);
    font-weight: var(--font-heading-lg-98-weight);
    line-height: var(--font-heading-lg-98-line-height);
  }
  .text-caption-99 {
    font-family: var(--font-caption-99-family);
    font-size: var(--font-caption-99-size);
    font-weight: var(--font-caption-99-weight);
    line-height: var(--font-caption-99-line-height);
  }
  .text-body-100 {
    font-family: var(--font-body-100-family);
    font-size: var(--font-body-100-size);
    font-weight: var(--font-body-100-weight);
    line-height: var(--font-body-100-line-height);
  }
  .text-heading-xl-101 {
    font-family: var(--font-heading-xl-101-family);
    font-size: var(--font-heading-xl-101-size);
    font-weight: var(--font-heading-xl-101-weight);
    line-height: var(--font-heading-xl-101-line-height);
  }
  .text-caption-102 {
    font-family: var(--font-caption-102-family);
    font-size: var(--font-caption-102-size);
    font-weight: var(--font-caption-102-weight);
    line-height: var(--font-caption-102-line-height);
  }
  .text-caption-103 {
    font-family: var(--font-caption-103-family);
    font-size: var(--font-caption-103-size);
    font-weight: var(--font-caption-103-weight);
    line-height: var(--font-caption-103-line-height);
  }
  .text-caption-104 {
    font-family: var(--font-caption-104-family);
    font-size: var(--font-caption-104-size);
    font-weight: var(--font-caption-104-weight);
    line-height: var(--font-caption-104-line-height);
  }
  .text-caption-105 {
    font-family: var(--font-caption-105-family);
    font-size: var(--font-caption-105-size);
    font-weight: var(--font-caption-105-weight);
    line-height: var(--font-caption-105-line-height);
  }
  .text-body-sm-106 {
    font-family: var(--font-body-sm-106-family);
    font-size: var(--font-body-sm-106-size);
    font-weight: var(--font-body-sm-106-weight);
    line-height: var(--font-body-sm-106-line-height);
  }
  .text-caption-107 {
    font-family: var(--font-caption-107-family);
    font-size: var(--font-caption-107-size);
    font-weight: var(--font-caption-107-weight);
    line-height: var(--font-caption-107-line-height);
  }
  .text-caption-108 {
    font-family: var(--font-caption-108-family);
    font-size: var(--font-caption-108-size);
    font-weight: var(--font-caption-108-weight);
    line-height: var(--font-caption-108-line-height);
  }
  .text-heading-lg-109 {
    font-family: var(--font-heading-lg-109-family);
    font-size: var(--font-heading-lg-109-size);
    font-weight: var(--font-heading-lg-109-weight);
    line-height: var(--font-heading-lg-109-line-height);
  }
  .text-heading-lg-110 {
    font-family: var(--font-heading-lg-110-family);
    font-size: var(--font-heading-lg-110-size);
    font-weight: var(--font-heading-lg-110-weight);
    line-height: var(--font-heading-lg-110-line-height);
  }
  .text-body-sm-111 {
    font-family: var(--font-body-sm-111-family);
    font-size: var(--font-body-sm-111-size);
    font-weight: var(--font-body-sm-111-weight);
    line-height: var(--font-body-sm-111-line-height);
  }
  .text-caption-112 {
    font-family: var(--font-caption-112-family);
    font-size: var(--font-caption-112-size);
    font-weight: var(--font-caption-112-weight);
    line-height: var(--font-caption-112-line-height);
  }
  .text-heading-xl-113 {
    font-family: var(--font-heading-xl-113-family);
    font-size: var(--font-heading-xl-113-size);
    font-weight: var(--font-heading-xl-113-weight);
    line-height: var(--font-heading-xl-113-line-height);
  }
  .text-heading-xl-114 {
    font-family: var(--font-heading-xl-114-family);
    font-size: var(--font-heading-xl-114-size);
    font-weight: var(--font-heading-xl-114-weight);
    line-height: var(--font-heading-xl-114-line-height);
  }
  .text-heading-lg-115 {
    font-family: var(--font-heading-lg-115-family);
    font-size: var(--font-heading-lg-115-size);
    font-weight: var(--font-heading-lg-115-weight);
    line-height: var(--font-heading-lg-115-line-height);
  }
  .text-heading-xl-116 {
    font-family: var(--font-heading-xl-116-family);
    font-size: var(--font-heading-xl-116-size);
    font-weight: var(--font-heading-xl-116-weight);
    line-height: var(--font-heading-xl-116-line-height);
  }
  .text-heading-lg-117 {
    font-family: var(--font-heading-lg-117-family);
    font-size: var(--font-heading-lg-117-size);
    font-weight: var(--font-heading-lg-117-weight);
    line-height: var(--font-heading-lg-117-line-height);
  }
  .text-body-118 {
    font-family: var(--font-body-118-family);
    font-size: var(--font-body-118-size);
    font-weight: var(--font-body-118-weight);
    line-height: var(--font-body-118-line-height);
  }
  .text-body-sm-119 {
    font-family: var(--font-body-sm-119-family);
    font-size: var(--font-body-sm-119-size);
    font-weight: var(--font-body-sm-119-weight);
    line-height: var(--font-body-sm-119-line-height);
  }
  .text-body-120 {
    font-family: var(--font-body-120-family);
    font-size: var(--font-body-120-size);
    font-weight: var(--font-body-120-weight);
    line-height: var(--font-body-120-line-height);
  }

  @media (max-width: 768px) {
    body {
      font-size: var(--font-body-sm-2-size);
      line-height: var(--font-body-sm-2-line-height);
    }

    .hide-mobile {
      display: none !important;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .hide-tablet {
      display: none !important;
    }
  }

  @media (min-width: 1025px) {
    .hide-desktop {
      display: none !important;
    }
  }
`;

const theme = {
  colors,
  spacing,
  radii,
  shadows,
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },
} as const;

export type AppTheme = typeof theme;

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return createElement(
    StyledThemeProvider,
    { theme },
    createElement(GlobalStyle),
    children,
  );
}

export default theme;
