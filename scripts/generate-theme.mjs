import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const namedColors = {
  primary: '#00000000',
  secondary: '#ffffff',
  accent: '#c8a47e',
  background: '#637381',
  surface: '#b71d18',
  'text-primary': '#000000',
  'text-secondary': '#828282',
  border: '#ff5630',
  error: '#ffffff0c',
  success: '#e0e0e0',
  warning: '#ff563028',
  info: '#c8a47e19',
};

const numberedColors = {
  13: '#1877f2',
  14: '#919eab',
  15: '#959595',
  16: '#0b0b0b',
  17: '#22c55e',
  18: '#bdbdbd',
  19: '#333333',
  20: '#ffffff19',
  21: '#f2f2f2',
  22: '#14100d',
  23: '#c8a47e33',
  24: '#0e0d0d',
  25: '#090014',
  26: '#2f2f2f',
  27: '#d9d9d9',
  28: '#212b36',
  29: '#62503d00',
  30: '#f332f6',
  31: '#51ca7e',
  32: '#c8a47e7f',
  33: '#2e00ff',
  34: '#b355d8',
  35: '#b356d9',
  36: '#b355d826',
  37: '#faad4f',
  38: '#dd2a7b',
  39: '#9537b0',
  40: '#515bd4',
  41: '#f7f2ec',
  42: '#0f0f0f',
  43: '#00000001',
  44: '#1a1919',
  45: '#7200ff',
  46: '#0072ce',
  47: '#c8a47e26',
  48: '#0b0b0b00',
  49: '#ffb032',
  50: '#22c55e33',
  51: '#ff2f2f',
  52: '#a732f6',
  53: '#494949',
  54: '#020102',
  55: '#eaeaea',
  56: '#1c101d',
  57: '#666666',
  58: '#616161',
  59: '#3a3541',
  60: '#ebebeb',
  61: '#f1f1ef',
  62: '#0000003f',
  63: '#383838',
  64: '#2f271f',
  65: '#c8a47e4c',
  66: '#ffffff4c',
  67: '#32f680',
  68: '#473e33',
  69: '#6c00f0',
  70: '#030303',
  71: '#c2c2c2',
  72: '#07295d',
  73: '#8b6843',
  74: '#efe4d9',
  75: '#44413e',
  76: '#c8a47e3f',
  77: '#1c1916',
  78: '#1e1e1e',
  79: '#ffdd55',
  80: '#3771c8',
  81: '#232323',
  82: '#ffffff00',
  83: '#191919',
  84: '#3b6c4f',
  85: '#6c5082',
  86: '#376292',
  87: '#1a1a19',
  88: '#1a1a197f',
  89: '#1a1a1a',
  90: '#c5a3a3',
  91: '#fdfdfd',
  92: '#fefffc',
  93: '#182620',
  94: '#105d39',
  95: '#4e4b4b',
  96: '#858585',
  97: '#0000007f',
  98: '#ff543e',
  99: '#c837ab',
  100: '#6600ff00',
  101: '#000001',
  102: '#8b6842',
  103: '#11161c',
  104: '#4b92eb99',
  105: '#050505',
  106: '#1d1a1a',
  107: '#1d1818',
  108: '#ef7b16',
  109: '#8a43e1',
  110: '#d511fd',
  111: '#554545',
  112: '#ff004f',
  113: '#00f7ef',
  114: '#4285f4',
  115: '#34a853',
  116: '#ea4335',
  117: '#fbbc04',
  118: '#c5221f',
  119: '#00e510',
  120: '#007ebb',
  121: '#402631',
  122: '#e53a71',
  123: '#03f7b51e',
  124: '#788d871e',
  125: '#d8d8d8',
  126: '#872bff',
  127: '#00000019',
  128: '#d9d9d8',
  129: '#ffffff14',
  130: '#bebbb9',
  131: '#646261',
  132: '#272727',
};

const typography = [
  ['body', 'Almarai', '16.0px', 400, '17.856000900268555px'],
  ['body-sm-2', 'Almarai', '14.0px', 400, '15.624000549316406px'],
  ['body-3', 'Almarai', '18.0px', 400, '28.0px'],
  ['caption-4', 'Public Sans', '12.0px', 400, '18.0px'],
  ['caption-5', 'Public Sans', '12.0px', 700, '20.0px'],
  ['body-6', 'Almarai', '18.0px', 400, '20.088001251220703px'],
  ['caption-7', 'Almarai', '12.0px', 400, '13.392000198364258px'],
  ['caption-8', 'Almarai', '13.999999046325684px', 400, '15.62399959564209px'],
  ['caption-9', 'Almarai', '10.000000953674316px', 300, '11.160001754760742px'],
  ['caption-10', 'Almarai', '7.777777671813965px', 400, '8.680000305175781px'],
  ['heading-md-11', 'Almarai', '22.0px', 400, '24.552001953125px'],
  ['caption-12', 'Almarai', '6.80555534362793px', 400, '7.595000267028809px'],
  ['caption-13', 'Almarai', '4.861111640930176px', 300, '5.4250006675720215px'],
  ['heading-md-14', 'Almarai', '20.0px', 400, '22.32000160217285px'],
  ['body-15', 'Almarai', '16.0px', 400, '22.0px'],
  ['body-16', 'Almarai', '16.0px', 400, '26.0px'],
  ['body-17', 'Almarai', '18.0px', 700, '20.088001251220703px'],
  ['body-sm-18', 'Almarai', '14.0px', 300, '15.624000549316406px'],
  ['heading-lg-19', 'EB Garamond', '30.0px', 500, '39.14999771118164px'],
  ['caption-20', 'Public Sans', '5.8333330154418945px', 400, '8.75px'],
  ['caption-21', 'Public Sans', '5.8333330154418945px', 700, '9.722222328186035px'],
  ['caption-22', 'Almarai', '9.146902084350586px', 400, '10.207942962646484px'],
  ['body-sm-23', 'Almarai', '14.0px', 700, '15.624000549316406px'],
  ['body-sm-24', 'Almarai', '14.0px', 400, '22.0px'],
  ['body-25', 'Public Sans', '19.69230842590332px', 600, '29.538463592529297px'],
  ['heading-lg-26', 'EB Garamond', '24.0px', 600, '31.31999969482422px'],
  ['body-sm-27', 'Public Sans', '14.0px', 600, '22.0px'],
  ['caption-28', 'Almarai', '8.75px', 400, '13.61111068725586px'],
  ['body-29', 'Almarai', '16.0px', 300, '17.856000900268555px'],
  ['caption-30', 'Public Sans', '12.0px', 600, '14.09999942779541px'],
  ['heading-lg-31', 'Almarai', '24.0px', 700, '26.784000396728516px'],
  ['body-sm-32', 'Fellix', '15.0px', 600, '20.0px', '0.22499999999999998px'],
  ['body-33', 'Almarai', '16.0px', 400, '16.0px'],
  ['body-34', 'Almarai', '18.0px', 400, '24.0px'],
  ['heading-xl-35', 'EB Garamond', '32.0px', 500, '41.7599983215332px'],
  ['heading-xl-36', 'EB Garamond', '50.0px', 500, '65.25px'],
  ['heading-xl-37', 'EB Garamond', '42.0px', 500, '54.80999755859375px'],
  ['caption-38', 'Almarai', '8.003539085388184px', 400, '8.931949615478516px'],
  ['heading-lg-39', 'EB Garamond', '30.0px', 600, '39.14999771118164px'],
  ['caption-40', 'Almarai', '8.0px', 400, '8.928000450134277px'],
  ['heading-lg-41', 'Almarai', '24.0px', 400, '26.784000396728516px'],
  ['caption-42', 'Public Sans', '6.864686965942383px', 400, '10.297030448913574px'],
  ['caption-43', 'Public Sans', '6.864686965942383px', 700, '11.441144943237305px'],
  ['body-44', 'Public Sans', '17.6842098236084px', 400, '27.789472579956055px'],
  ['heading-xl-45', 'EB Garamond', '84.0px', 400, '109.6199951171875px'],
  ['body-46', 'Almarai', '16.0px', 400, '28.0px'],
  ['heading-xl-47', 'Almarai', '41.389190673828125px', 800, '46.190338134765625px'],
  ['caption-48', 'Inter', '12.0px', 400, '14.0px', '0.4000000059604645px'],
  ['caption-49', 'Almarai', '12.0px', 400, '18.0px'],
  ['caption-50', 'Almarai', '8.008801460266113px', 400, '8.937823295593262px'],
  ['heading-lg-51', 'EB Garamond', '26.0px', 500, '33.93000030517578px'],
  ['caption-52', 'Almarai', '6.80555534362793px', 400, '10.69444465637207px'],
  ['caption-53', 'Almarai', '7.0px', 400, '7.812000274658203px'],
  ['caption-54', 'Almarai', '6.920904159545898px', 400, '7.723729610443115px'],
  ['body-55', 'Almarai', '16.0px', 700, '17.856000900268555px'],
  ['caption-56', 'Almarai', '10.0px', 400, '11.160000801086426px'],
  ['heading-md-57', 'EB Garamond', '22.0px', 600, '28.709999084472656px'],
  ['heading-xl-58', 'EB Garamond', '36.0px', 600, '46.97999954223633px'],
  ['heading-lg-59', 'EB Garamond', '26.0px', 600, '33.93000030517578px'],
  ['heading-xl-60', 'EB Garamond', '80.0px', 400, '104.39999389648438px'],
  ['caption-61', 'Almarai', '9.152915954589844px', 400, '10.214654922485352px'],
  ['caption-62', 'Almarai', '9.448482513427734px', 400, '10.544507026672363px'],
  ['caption-63', 'Almarai', '6.7489166259765625px', 300, '7.5317912101745605px'],
  ['heading-md-64', 'Almarai', '20.0px', 400, '28.0px'],
  ['caption-65', 'Almarai', '7.488888740539551px', 400, '8.357600212097168px'],
  ['heading-md-66', 'Almarai', '20.0px', 400, '30.0px'],
  ['heading-xl-67', 'EB Garamond', '34.0px', 600, '44.369998931884766px'],
  ['heading-lg-68', 'EB Garamond', '24.0px', 500, '31.31999969482422px'],
  ['body-69', 'Almarai', '16.0px', 400, '20.0px'],
  ['heading-xl-70', 'EB Garamond', '32.0px', 500, '32.0px'],
  ['heading-lg-71', 'Almarai', '28.0px', 400, '31.248001098632812px'],
  ['caption-72', 'EB Garamond', '12.638888359069824px', 600, '16.49374771118164px'],
  ['body-73', 'EB Garamond', '17.150442123413086px', 500, '22.38132667541504px'],
  ['heading-lg-74', 'EB Garamond', '30.0px', 400, '39.14999771118164px'],
  ['heading-md-75', 'EB Garamond', '20.0px', 500, '26.099998474121094px'],
  ['heading-xl-76', 'EB Garamond', '38.0px', 500, '49.589996337890625px'],
  ['body-77', 'Almarai', '16.0px', 400, '24.0px'],
  ['body-sm-78', 'EB Garamond', '14.583333015441895px', 500, '19.031248092651367px'],
  ['caption-79', 'Public Sans', '6.80555534362793px', 600, '10.69444465637207px'],
  ['heading-xl-80', 'EB Garamond', '60.0px', 400, '78.29999542236328px'],
  ['caption-81', 'Almarai', '7.6898932456970215px', 400, '8.581921577453613px'],
  ['caption-82', 'Almarai', '7.4666666984558105px', 400, '8.33280086517334px'],
  ['caption-83', 'Almarai', '6.728656768798828px', 400, '7.509181499481201px'],
  ['heading-md-84', 'EB Garamond', '20.580530166625977px', 600, '26.85759162902832px'],
  ['body-sm-85', 'Almarai', '14.0px', 400, '20.0px'],
  ['heading-lg-86', 'Almarai', '30.0px', 400, '33.480003356933594px'],
  ['caption-87', 'Almarai', '12.0px', 300, '13.392000198364258px'],
  ['body-88', 'Almarai', '18.0px', 700, '26.0px'],
  ['caption-89', 'Public Sans', '6.0px', 600, '7.049999713897705px'],
  ['heading-xl-90', 'EB Garamond', '84.0px', 500, '90.0px'],
  ['caption-91', 'EB Garamond', '13.999999046325684px', 500, '18.26999855041504px'],
  ['caption-92', 'Almarai', '5.599999904632568px', 400, '6.249600410461426px'],
  ['caption-93', 'Public Sans', '5.93220329284668px', 600, '6.970338821411133px'],
  ['caption-94', 'Almarai', '7.909605026245117px', 400, '8.827119827270508px'],
  ['caption-95', 'Public Sans', '5.767419815063477px', 400, '8.651129722595215px'],
  ['caption-96', 'Public Sans', '5.767419815063477px', 700, '9.612366676330566px'],
  ['caption-97', 'Almarai', '7.777777671813965px', 400, '10.69444465637207px'],
  ['caption-98', 'EB Garamond', '10.69444465637207px', 600, '13.956250190734863px'],
  ['body-sm-99', 'Almarai', '14.583333015441895px', 400, '16.274999618530273px'],
  ['caption-100', 'Almarai', '5.8333330154418945px', 300, '6.509999752044678px'],
  ['caption-101', 'Public Sans', '5.8333330154418945px', 600, '6.854166030883789px'],
  ['heading-lg-102', 'Kalam', '28.049240112304688px', 700, '38.80799865722656px'],
  ['heading-lg-103', 'EB Garamond', '24.010618209838867px', 500, '31.33385467529297px'],
  ['caption-104', 'Public Sans', '6.864686965942383px', 600, '8.066006660461426px'],
  ['caption-105', 'Public Sans', '8.008801460266113px', 600, '12.585259437561035px'],
  ['body-sm-106', 'Almarai', '14.0px', 400, '18.0px'],
  ['body-sm-107', 'EB Garamond', '14.041666030883789px', 500, '18.324373245239258px'],
  ['caption-108', 'Almarai', '5.616666793823242px', 400, '6.268200397491455px'],
  ['caption-109', 'Almarai', '6.5527777671813965px', 400, '7.312900543212891px'],
  ['heading-xl-110', 'EB Garamond', '120.0px', 400, '156.59999084472656px'],
  ['heading-xl-111', 'EB Garamond', '55.0px', 500, '71.77499389648438px'],
  ['heading-lg-112', 'EB Garamond', '28.0px', 400, '36.53999710083008px'],
  ['heading-lg-113', 'EB Garamond', '24.0px', 500, '30.0px'],
  ['heading-md-114', 'EB Garamond', '20.0px', 600, '26.099998474121094px'],
  ['body-115', 'Public Sans', '16.0px', 600, '18.799999237060547px'],
  ['body-sm-116', 'Space Grotesk', '14.0px', 500, '17.86400032043457px'],
  ['body-117', 'Almarai', '18.0px', 400, '48.0px'],
];

const spacing = {
  'gap-52': '52px',
  'gap-1': '1px',
  'gap-26': '26px',
  'gap--2': '-2px',
  'gap-48': '48px',
  'gap-36': '36px',
  'gap--6': '-6px',
  'gap-32': '32px',
  'gap-815': '815px',
  'gap-15': '15px',
  'padding-8': '8px',
  'padding-20': '20px',
  'padding-6': '6px',
  'padding-16': '16px',
  'padding-10': '10px',
  'padding-7': '7px',
  'padding-24': '24px',
  'padding-12': '12px',
  'padding-3': '3px',
  'padding-4': '4px',
  'padding-2': '2px',
  'padding-11': '11px',
  'padding-9': '9px',
  'padding-14': '14px',
  'padding-30': '30px',
  'padding-15': '15px',
  'padding-5': '5px',
  'padding-40': '40px',
  'padding-13': '13px',
  'padding-50': '50px',
  'padding-36': '36px',
  'padding-0': '0px',
  'padding-17': '17px',
  'padding-60': '60px',
  'padding-32': '32px',
  'padding-1': '1px',
  'padding-22': '22px',
  'gap-10': '10px',
  'gap-6': '6px',
  'gap-8': '8px',
  'gap-16': '16px',
  'gap-4': '4px',
  'gap-20': '20px',
  'gap-7': '7px',
  'gap-5': '5px',
  'gap-12': '12px',
  'gap-2': '2px',
  'gap-14': '14px',
  'gap-9': '9px',
  'gap-3': '3px',
  'gap-30': '30px',
  'gap-24': '24px',
  'gap-40': '40px',
  'gap-11': '11px',
  'gap-71': '71px',
  'gap-624': '624px',
  'gap-18': '18px',
  'gap--1': '-1px',
  'gap-44': '44px',
  'gap-75': '75px',
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
  padding: '20px',
  gap: '10px',
};

const borderRadius = {
  small: '6px',
  medium: '10px',
  'radius-6': '6px',
  'radius-10': '10px',
  'radius-8': '8px',
  'radius-10000': '10000px',
  'radius-3': '3px',
  'radius-2': '2px',
  'radius-1000': '1000px',
  'radius-500': '500px',
  'radius-4': '4px',
  'radius-60709': '60709px',
  'radius-16': '16px',
  'radius-20': '20px',
  'radius-27': '27px',
  'radius-5': '5px',
  'radius-100': '100px',
  'radius-100000': '100000px',
  'radius-1': '1px',
  'radius-29511': '29511px',
  'radius-50': '50px',
  'radius-30': '30px',
  'radius-24': '24px',
  'radius-4861': '4861px',
  'radius-243': '243px',
  'radius-9': '9px',
  'radius-25': '25px',
  'radius-64': '64px',
  'radius-60': '60px',
  'radius-486': '486px',
  'radius-7': '7px',
  'radius-300': '300px',
  'radius-40972': '40972px',
  'radius-8666': '8666px',
  'radius-15000': '15000px',
  'radius-4806': '4806px',
  'radius-480': '480px',
  'radius-571': '571px',
  'radius-572': '572px',
  'radius-286': '286px',
  'radius-12': '12px',
  'radius-4680': '4680px',
  'radius-649': '649px',
  'radius-5720': '5720px',
  'radius-5716': '5716px',
  'radius-69': '69px',
  'radius-535': '535px',
  'radius-4666': '4666px',
  'radius-240': '240px',
  'radius-11': '11px',
  'radius-28': '28px',
  'radius-7000': '7000px',
};

const effects = {
  glass: 'glass, offset (0, 0), blur 0',
  'layer-blur-2': 'filter: blur(394.0px);',
  'layer-blur-3': 'filter: blur(514.0px);',
  'layer-blur-4': 'filter: blur(276.1745910644531px);',
  'drop-shadow-5': 'box-shadow: -3.0px 0px 25.0px 0px #00000019;',
  'layer-blur-6': 'filter: blur(211.69802856445312px);',
  'layer-blur-7': 'filter: blur(191.4674072265625px);',
  'layer-blur-8': 'filter: blur(121.02381896972656px);',
  'layer-blur-9': 'filter: blur(157.8838653564453px);',
  'background-blur-10': 'backdrop-filter: blur(15.0px);',
  'drop-shadow-11': 'box-shadow: 0px 4.0px 4.0px 0px #0000003f;',
  'layer-blur-12': 'filter: blur(320.0px);',
  'drop-shadow-13':
    'box-shadow: 0px 2.8704702854156494px 3.588087797164917px -2.201871156692505px #16181d19;',
  'drop-shadow-14':
    'box-shadow: 0px 0px 7.176175594329834px -1.651403546333313px #16181d19;',
  'drop-shadow-15':
    'box-shadow: -1.4583332538604736px 0px 12.152777671813965px 0px #00000019;',
  'layer-blur-16': 'filter: blur(94.0px);',
  'drop-shadow-17':
    'box-shadow: -1.4418549537658691px 0px 12.015458106994629px 0px #00000019;',
  'drop-shadow-18': 'box-shadow: 0px 44.0px 54.0px 0px #3b3b3b72;',
  'drop-shadow-19': 'box-shadow: 0px 34.0px 44.0px 0px #00000072;',
  'background-blur-20': 'backdrop-filter: blur(6.458558082580566px);',
  'layer-blur-21': 'filter: blur(339.35546875px);',
  'background-blur-22': 'backdrop-filter: blur(4.0px);',
  'layer-blur-23': 'filter: blur(224.0px);',
  'drop-shadow-24':
    'box-shadow: 0px 1.8666666746139526px 18.66666603088379px 0px #00000019;',
  'background-blur-25': 'backdrop-filter: blur(1.9444444179534912px);',
  'drop-shadow-26':
    'box-shadow: 0px 1.9444444179534912px 1.9444444179534912px 0px #0000003f;',
  'drop-shadow-27': 'box-shadow: -10.0px -20.0px 34.0px 0px #000000f2;',
  'drop-shadow-28': 'box-shadow: 0px 0px 2.0px 0px #ffffff14;',
  'drop-shadow-29': 'box-shadow: 10.0px 10.0px 20.0px 0px #0000007f;',
  'drop-shadow-30':
    'box-shadow: -1.7161717414855957px 0px 14.301431655883789px 0px #00000019;',
  'layer-blur-31': 'filter: blur(28.584068298339844px);',
  'background-blur-32': 'backdrop-filter: blur(7.176175594329834px);',
  'drop-shadow-33': 'box-shadow: 20.0px -10.0px 34.0px 0px #000000f2;',
  'drop-shadow-34':
    'box-shadow: -1.4041666984558105px 0px 11.701388359069824px 0px #00000019;',
  'drop-shadow-35':
    'box-shadow: 0px 1.8722221851348877px 18.72222137451172px 0px #00000019;',
  'layer-blur-36': 'filter: blur(1954.410888671875px);',
  'drop-shadow-37': 'box-shadow: 0px 4.0px 34.0px 0px #c8a47e33;',
  'layer-blur-38': 'filter: blur(50.0px);',
  'drop-shadow-39': 'box-shadow: 0px 4.0px 40.0px 0px #00000019;',
  'drop-shadow-40': 'box-shadow: 0px 8.0px 16.0px 0px #919eab28;',
  gradient: 'background-image: linear-gradient(180deg, #2f2f2f 0%, #090014 100%);',
  'gradient-2':
    'background-image: linear-gradient(180deg, #c8a47e33 0%, #62503d00 100%);',
  'gradient-3':
    'background-image: linear-gradient(180deg, #faad4f 0%, #dd2a7b 35%, #9537b0 62%, #515bd4 100%);',
  'gradient-4': 'background-image: linear-gradient(180deg, #ffffff 96%);',
  'gradient-5':
    'background-image: linear-gradient(180deg, #0b0b0b 0%, #0b0b0b00 100%);',
  'gradient-6': 'background-image: linear-gradient(180deg, #000000 0%, #666666 100%);',
  'gradient-7':
    'background-image: linear-gradient(180deg, #c8a47e19 0%, #c8a47e 67%);',
  'gradient-8':
    'background-image: linear-gradient(180deg, #c8a47e 24%, #ffffff 49%, #8b6843 72%);',
  'gradient-9':
    'background-image: linear-gradient(180deg, #c8a47e3f 0%, #62503d00 100%);',
  'gradient-10':
    'background-image: linear-gradient(180deg, #182620 0%, #105d39 100%);',
  'gradient-11':
    'background-image: radial-gradient(circle at 30% 20%, #ffdd55 0%, #ffdd55 10%, #ff543e 50%, #c837ab 100%);',
  'gradient-12':
    'background-image: radial-gradient(circle at 30% 20%, #3771c8 0%, #3771c8 13%, #6600ff00 100%);',
  'gradient-13':
    'background-image: linear-gradient(180deg, #0b0b0b00 0%, #000001 100%);',
  'gradient-14':
    'background-image: linear-gradient(180deg, #c8a47e 24%, #ffffff 49%, #c8a47e 72%);',
  'gradient-15':
    'background-image: linear-gradient(180deg, #c8a47e 0%, #8b6842 100%);',
  'gradient-16':
    'background-image: linear-gradient(180deg, #11161c 0%, #4b92eb99 100%);',
  'gradient-17':
    'background-image: linear-gradient(180deg, #14100d 0%, #050505 100%);',
  'gradient-18':
    'background-image: linear-gradient(180deg, #00000000 0%, #000000 100%);',
  'gradient-19':
    'background-image: linear-gradient(180deg, #ff2f2f 0%, #ef7b16 36%, #8a43e1 70%, #d511fd 100%);',
  'gradient-20':
    'background-image: linear-gradient(180deg, #14100d 0%, #402631 100%);',
  'gradient-21':
    'background-image: linear-gradient(180deg, #ffffff00 0%, #ffffff 100%);',
};

function quoteKey(key) {
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(key) ? key : `'${key}'`;
}

function serializeStringRecord(record, indent) {
  const pad = ' '.repeat(indent);
  return Object.entries(record)
    .map(([key, value]) => `${pad}${quoteKey(key)}: ${JSON.stringify(value)},`)
    .join('\n');
}

const colors = {
  ...namedColors,
  ...Object.fromEntries(
    Object.entries(numberedColors).map(([n, hex]) => [`color-${n}`, hex]),
  ),
};

const typographyObjectLines = typography
  .map((entry) => {
    const [name, fontFamily, fontSize, fontWeight, lineHeight, letterSpacing] =
      entry;
    const extras = letterSpacing
      ? `,\n    letterSpacing: ${JSON.stringify(letterSpacing)}`
      : '';
    return `  ${quoteKey(name)}: {
    fontFamily: ${JSON.stringify(fontFamily)},
    fontSize: ${JSON.stringify(fontSize)},
    fontWeight: ${fontWeight},
    lineHeight: ${JSON.stringify(lineHeight)}${extras},
  },`;
  })
  .join('\n');

const file = `export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
} as const;

export const colors = {
${serializeStringRecord(colors, 2)}
} as const;

export const typography = {
  bodyFamily: 'Almarai',
  bodySize: '16px',
  heading: 'EB Garamond',
${typographyObjectLines}
} as const;

export const spacing = {
${serializeStringRecord(spacing, 2)}
} as const;

export const borderRadius = {
${serializeStringRecord(borderRadius, 2)}
} as const;

export const shadows = {
  dropShadow: '0px 4px 4px rgba(0, 0, 0, 0.3)',
} as const;

export const effects = {
${serializeStringRecord(effects, 2)}
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  effects,
  breakpoints,
} as const;

export type Theme = typeof theme;

export type TypographyToken = {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing?: string;
};

function cssVarName(prefix: string, key: string): string {
  return \`--\${prefix}-\${key}\`;
}

function usableCssValue(declaration: string): string {
  const prefixes = [
    'box-shadow: ',
    'filter: ',
    'backdrop-filter: ',
    'background-image: ',
  ];
  for (const prefix of prefixes) {
    if (declaration.startsWith(prefix)) {
      return declaration.slice(prefix.length).replace(/;$/, '');
    }
  }
  return declaration;
}

export function buildCssVariables(): string {
  const lines: string[] = [];

  for (const [key, value] of Object.entries(colors)) {
    lines.push(\`\${cssVarName('color', key)}: \${value};\`);
  }

  for (const [key, value] of Object.entries(typography)) {
    if (typeof value === 'string') {
      lines.push(\`\${cssVarName('typography', key)}: \${value};\`);
      continue;
    }
    lines.push(\`\${cssVarName('typography', key + '-font-family')}: \${value.fontFamily};\`);
    lines.push(\`\${cssVarName('typography', key + '-font-size')}: \${value.fontSize};\`);
    lines.push(\`\${cssVarName('typography', key + '-font-weight')}: \${String(value.fontWeight)};\`);
    lines.push(\`\${cssVarName('typography', key + '-line-height')}: \${value.lineHeight};\`);
    if ('letterSpacing' in value && value.letterSpacing) {
      lines.push(
        \`\${cssVarName('typography', key + '-letter-spacing')}: \${value.letterSpacing};\`,
      );
    }
  }

  for (const [key, value] of Object.entries(spacing)) {
    lines.push(\`\${cssVarName('spacing', key)}: \${value};\`);
  }

  for (const [key, value] of Object.entries(borderRadius)) {
    lines.push(\`\${cssVarName('radius', key)}: \${value};\`);
  }

  for (const [key, value] of Object.entries(shadows)) {
    lines.push(\`\${cssVarName('shadow', key === 'dropShadow' ? 'drop-shadow' : key)}: \${value};\`);
  }

  for (const [key, value] of Object.entries(effects)) {
    lines.push(\`\${cssVarName('effect', key)}: \${usableCssValue(value)};\`);
  }

  for (const [key, value] of Object.entries(breakpoints)) {
    lines.push(\`\${cssVarName('breakpoint', key)}: \${value};\`);
  }

  return lines.join('\\n');
}
`;

const outPath = fileURLToPath(new URL('../src/theme/theme.ts', import.meta.url));
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, file);
console.log(`Wrote ${outPath}`);
