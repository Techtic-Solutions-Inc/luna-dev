import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const colorEntries = [
  ['color-14', '#959595'],
  ['primary', '#00000000'],
  ['secondary', '#ffffff'],
  ['accent', '#c8a47e'],
  ['background', '#637381'],
  ['surface', '#b71d18'],
  ['text-primary', '#000000'],
  ['text-secondary', '#828282'],
  ['border', '#ff5630'],
  ['error', '#ff563028'],
  ['success', '#ffffff0c'],
  ['warning', '#e0e0e0'],
  ['info', '#c8a47e19'],
  ['color-13', '#919eab'],
  ['color-15', '#1877f2'],
  ['color-16', '#0b0b0b'],
  ['color-17', '#22c55e'],
  ['color-18', '#bdbdbd'],
  ['color-19', '#333333'],
  ['color-20', '#14100d'],
  ['color-21', '#f2f2f2'],
  ['color-22', '#ffffff19'],
  ['color-23', '#0e0d0d'],
  ['color-24', '#d9d9d9'],
  ['color-25', '#212b36'],
  ['color-26', '#c8a47e33'],
  ['color-27', '#f332f6'],
  ['color-28', '#51ca7e'],
  ['color-29', '#7200ff'],
  ['color-30', '#c8a47e7f'],
  ['color-31', '#2e00ff'],
  ['color-32', '#f7f2ec'],
  ['color-33', '#0f0f0f'],
  ['color-34', '#00000001'],
  ['color-35', '#ffb032'],
  ['color-36', '#1a1919'],
  ['color-37', '#0072ce'],
  ['color-38', '#a732f6'],
  ['color-39', '#22c55e33'],
  ['color-40', '#ebebeb'],
  ['color-41', '#232323'],
  ['color-42', '#eaeaea'],
  ['color-43', '#1c101d'],
  ['color-44', '#0000003f'],
  ['color-45', '#ff2f2f'],
  ['color-46', '#616161'],
  ['color-47', '#3a3541'],
  ['color-48', '#f1f1ef'],
  ['color-49', '#383838'],
  ['color-50', '#2f271f'],
  ['color-51', '#6c00f0'],
  ['color-52', '#c8a47e4c'],
  ['color-53', '#ffffff4c'],
  ['color-54', '#efe4d9'],
  ['color-55', '#32f680'],
  ['color-56', '#473e33'],
  ['color-57', '#858585'],
  ['color-58', '#0000007f'],
  ['color-59', '#030303'],
  ['color-60', '#666666'],
  ['color-61', '#c2c2c2'],
  ['color-62', '#07295d'],
  ['color-63', '#44413e'],
  ['color-64', '#1c1916'],
  ['color-65', '#1e1e1e'],
  ['color-66', '#191919'],
  ['color-67', '#3b6c4f'],
  ['color-68', '#6c5082'],
  ['color-69', '#376292'],
  ['color-70', '#1a1a19'],
  ['color-71', '#1a1a197f'],
  ['color-72', '#1a1a1a'],
  ['color-73', '#c5a3a3'],
  ['color-74', '#fdfdfd'],
  ['color-75', '#fefffc'],
  ['color-76', '#4e4b4b'],
  ['color-77', '#ff004f'],
  ['color-78', '#00f7ef'],
  ['color-79', '#4285f4'],
  ['color-80', '#34a853'],
  ['color-81', '#ea4335'],
  ['color-82', '#fbbc04'],
  ['color-83', '#c5221f'],
  ['color-84', '#00e510'],
  ['color-85', '#007ebb'],
  ['color-86', '#e53a71'],
  ['color-87', '#d8d8d8'],
  ['color-88', '#090014'],
  ['color-89', '#872bff'],
  ['color-90', '#00000019'],
  ['color-91', '#d9d9d8'],
  ['color-92', '#ffffff14'],
  ['color-93', '#bebbb9'],
  ['color-94', '#646261'],
  ['color-95', '#272727'],
];

const typographyRaw = `
body: Almarai / 16.0px / weight 400 / lh 17.856000900268555px
body-sm-2: Almarai / 14.0px / weight 400 / lh 15.624000549316406px
body-3: Almarai / 18.0px / weight 400 / lh 28.0px
caption-4: Public Sans / 12.0px / weight 400 / lh 18.0px
caption-5: Public Sans / 12.0px / weight 700 / lh 20.0px
body-6: Almarai / 18.0px / weight 400 / lh 20.088001251220703px
caption-7: Almarai / 13.999999046325684px / weight 400 / lh 15.62399959564209px
caption-8: Almarai / 10.000000953674316px / weight 300 / lh 11.160001754760742px
caption-9: Almarai / 7.777777671813965px / weight 400 / lh 8.680000305175781px
heading-md-10: Almarai / 22.0px / weight 400 / lh 24.552001953125px
caption-11: Almarai / 6.80555534362793px / weight 400 / lh 7.595000267028809px
caption-12: Almarai / 12.0px / weight 400 / lh 13.392000198364258px
caption-13: Almarai / 4.861111640930176px / weight 300 / lh 5.4250006675720215px
caption-14: Almarai / 7.909605026245117px / weight 400 / lh 8.827119827270508px
caption-15: Public Sans / 5.767419815063477px / weight 400 / lh 8.651129722595215px
caption-16: Public Sans / 5.767419815063477px / weight 700 / lh 9.612366676330566px
caption-17: Public Sans / 5.8333330154418945px / weight 400 / lh 8.75px
caption-18: Public Sans / 5.8333330154418945px / weight 700 / lh 9.722222328186035px
caption-19: Almarai / 6.920904159545898px / weight 400 / lh 7.723729610443115px
heading-md-20: Almarai / 20.0px / weight 400 / lh 22.32000160217285px
body-21: Almarai / 16.0px / weight 400 / lh 26.0px
body-22: Almarai / 18.0px / weight 700 / lh 20.088001251220703px
body-sm-23: Almarai / 14.0px / weight 300 / lh 15.624000549316406px
heading-lg-24: EB Garamond / 30.0px / weight 500 / lh 39.14999771118164px
caption-25: Almarai / 8.0px / weight 400 / lh 8.928000450134277px
caption-26: Almarai / 9.146902084350586px / weight 400 / lh 10.207942962646484px
caption-27: Public Sans / 6.864686965942383px / weight 400 / lh 10.297030448913574px
caption-28: Public Sans / 6.864686965942383px / weight 700 / lh 11.441144943237305px
body-sm-29: Almarai / 14.0px / weight 700 / lh 15.624000549316406px
body-30: Public Sans / 19.69230842590332px / weight 600 / lh 29.538463592529297px
heading-lg-31: EB Garamond / 24.0px / weight 600 / lh 31.31999969482422px
caption-32: Almarai / 8.75px / weight 400 / lh 13.61111068725586px
caption-33: Almarai / 8.008801460266113px / weight 400 / lh 8.937823295593262px
body-34: Almarai / 16.0px / weight 300 / lh 17.856000900268555px
body-sm-35: Public Sans / 14.0px / weight 600 / lh 22.0px
heading-lg-36: Almarai / 24.0px / weight 700 / lh 26.784000396728516px
caption-37: Public Sans / 12.0px / weight 600 / lh 14.09999942779541px
body-sm-38: Almarai / 14.0px / weight 400 / lh 22.0px
caption-39: Almarai / 7.0px / weight 400 / lh 7.812000274658203px
body-sm-40: Fellix / 15.0px / weight 600 / lh 20.0px / ls 0.22499999999999998
body-41: Almarai / 16.0px / weight 400 / lh 16.0px
caption-42: Almarai / 10.0px / weight 400 / lh 11.160000801086426px
body-43: Almarai / 18.0px / weight 400 / lh 24.0px
heading-xl-44: EB Garamond / 32.0px / weight 500 / lh 41.7599983215332px
heading-xl-45: EB Garamond / 50.0px / weight 500 / lh 65.25px
heading-xl-46: EB Garamond / 42.0px / weight 500 / lh 54.80999755859375px
caption-47: Almarai / 8.003539085388184px / weight 400 / lh 8.931949615478516px
heading-lg-48: EB Garamond / 30.0px / weight 600 / lh 39.14999771118164px
heading-lg-49: Almarai / 24.0px / weight 400 / lh 26.784000396728516px
caption-50: Almarai / 9.152915954589844px / weight 400 / lh 10.214654922485352px
caption-51: Almarai / 7.488888740539551px / weight 400 / lh 8.357600212097168px
body-52: Public Sans / 17.6842098236084px / weight 400 / lh 27.789472579956055px
heading-xl-53: EB Garamond / 84.0px / weight 400 / lh 109.6199951171875px
caption-54: Almarai / 6.728656768798828px / weight 400 / lh 7.509181499481201px
body-55: Almarai / 16.0px / weight 400 / lh 28.0px
heading-xl-56: Almarai / 41.389190673828125px / weight 800 / lh 46.190338134765625px
caption-57: Inter / 12.0px / weight 400 / lh 14.0px / ls 0.4000000059604645
caption-58: Almarai / 12.0px / weight 400 / lh 18.0px
heading-lg-59: EB Garamond / 26.0px / weight 500 / lh 33.93000030517578px
caption-60: Almarai / 6.80555534362793px / weight 400 / lh 10.69444465637207px
body-61: Almarai / 16.0px / weight 700 / lh 17.856000900268555px
heading-md-62: EB Garamond / 22.0px / weight 600 / lh 28.709999084472656px
heading-xl-63: EB Garamond / 36.0px / weight 600 / lh 46.97999954223633px
heading-lg-64: EB Garamond / 26.0px / weight 600 / lh 33.93000030517578px
heading-xl-65: EB Garamond / 80.0px / weight 400 / lh 104.39999389648438px
caption-66: Almarai / 9.448482513427734px / weight 400 / lh 10.544507026672363px
caption-67: Almarai / 6.7489166259765625px / weight 300 / lh 7.5317912101745605px
body-68: Almarai / 16.0px / weight 400 / lh 22.0px
heading-md-69: Almarai / 20.0px / weight 400 / lh 28.0px
caption-70: Public Sans / 5.93220329284668px / weight 600 / lh 6.970338821411133px
caption-71: Almarai / 7.488888740539551px / weight 400 / lh 9.36111068725586px
heading-md-72: Almarai / 20.0px / weight 400 / lh 30.0px
heading-xl-73: EB Garamond / 34.0px / weight 600 / lh 44.369998931884766px
heading-lg-74: EB Garamond / 24.0px / weight 500 / lh 31.31999969482422px
body-75: Almarai / 16.0px / weight 400 / lh 20.0px
heading-xl-76: EB Garamond / 32.0px / weight 500 / lh 32.0px
heading-lg-77: Almarai / 28.0px / weight 400 / lh 31.248001098632812px
caption-78: Public Sans / 6.80555534362793px / weight 600 / lh 10.69444465637207px
caption-79: Almarai / 7.6898932456970215px / weight 400 / lh 8.581921577453613px
caption-80: EB Garamond / 12.638888359069824px / weight 600 / lh 16.49374771118164px
body-81: EB Garamond / 17.150442123413086px / weight 500 / lh 22.38132667541504px
caption-82: Public Sans / 6.728656768798828px / weight 600 / lh 10.573603630065918px
heading-lg-83: EB Garamond / 30.0px / weight 400 / lh 39.14999771118164px
heading-md-84: EB Garamond / 20.0px / weight 500 / lh 26.099998474121094px
heading-xl-85: EB Garamond / 38.0px / weight 500 / lh 49.589996337890625px
body-86: Almarai / 16.0px / weight 400 / lh 24.0px
body-sm-87: EB Garamond / 14.583333015441895px / weight 500 / lh 19.031248092651367px
caption-88: Public Sans / 6.0px / weight 600 / lh 7.049999713897705px
heading-xl-89: EB Garamond / 60.0px / weight 400 / lh 78.29999542236328px
caption-90: Almarai / 7.4666666984558105px / weight 400 / lh 8.33280086517334px
heading-md-91: EB Garamond / 20.580530166625977px / weight 600 / lh 26.85759162902832px
caption-92: Public Sans / 6.864686965942383px / weight 600 / lh 8.066006660461426px
caption-93: Public Sans / 8.008801460266113px / weight 600 / lh 12.585259437561035px
body-sm-94: Almarai / 14.0px / weight 400 / lh 20.0px
body-sm-95: EB Garamond / 14.041666030883789px / weight 500 / lh 18.324373245239258px
caption-96: Almarai / 5.616666793823242px / weight 400 / lh 6.268200397491455px
heading-lg-97: Almarai / 30.0px / weight 400 / lh 33.480003356933594px
caption-98: Almarai / 12.0px / weight 300 / lh 13.392000198364258px
body-99: Almarai / 18.0px / weight 700 / lh 26.0px
heading-xl-100: EB Garamond / 84.0px / weight 500 / lh 90.0px
caption-101: EB Garamond / 13.999999046325684px / weight 500 / lh 18.26999855041504px
caption-102: Almarai / 5.599999904632568px / weight 400 / lh 6.249600410461426px
caption-103: Almarai / 7.777777671813965px / weight 400 / lh 10.69444465637207px
caption-104: EB Garamond / 10.69444465637207px / weight 600 / lh 13.956250190734863px
body-sm-105: Almarai / 14.583333015441895px / weight 400 / lh 16.274999618530273px
caption-106: Almarai / 5.8333330154418945px / weight 300 / lh 6.509999752044678px
caption-107: Public Sans / 5.8333330154418945px / weight 600 / lh 6.854166030883789px
heading-lg-108: Kalam / 28.049240112304688px / weight 700 / lh 38.80799865722656px
heading-lg-109: EB Garamond / 24.010618209838867px / weight 500 / lh 31.33385467529297px
body-sm-110: Almarai / 14.0px / weight 400 / lh 18.0px
caption-111: Almarai / 6.5527777671813965px / weight 400 / lh 7.312900543212891px
heading-xl-112: EB Garamond / 120.0px / weight 400 / lh 156.59999084472656px
heading-xl-113: EB Garamond / 55.0px / weight 500 / lh 71.77499389648438px
heading-lg-114: EB Garamond / 28.0px / weight 400 / lh 36.53999710083008px
heading-lg-115: EB Garamond / 24.0px / weight 500 / lh 30.0px
heading-md-116: EB Garamond / 20.0px / weight 600 / lh 26.099998474121094px
body-117: Public Sans / 16.0px / weight 600 / lh 18.799999237060547px
body-sm-118: Space Grotesk / 14.0px / weight 500 / lh 17.86400032043457px
body-119: Almarai / 18.0px / weight 400 / lh 48.0px
`.trim();

const spacingRaw = `
gap-71: 71px
gap-18: 18px
gap--1: -1px
padding-20: 20px
padding-8: 8px
padding-6: 6px
padding-16: 16px
padding-7: 7px
padding-10: 10px
padding-24: 24px
padding-3: 3px
padding-12: 12px
padding-2: 2px
padding-4: 4px
padding-9: 9px
padding-11: 11px
padding-14: 14px
padding-5: 5px
padding-30: 30px
padding-15: 15px
padding-40: 40px
padding-13: 13px
padding-0: 0px
padding-50: 50px
padding-36: 36px
padding-17: 17px
padding-1: 1px
padding-60: 60px
padding-32: 32px
padding-22: 22px
gap-10: 10px
gap-6: 6px
gap-4: 4px
gap-8: 8px
gap-16: 16px
gap-20: 20px
gap-2: 2px
gap-7: 7px
gap-5: 5px
gap-3: 3px
gap-14: 14px
gap-12: 12px
gap-9: 9px
gap-30: 30px
gap-1: 1px
gap-24: 24px
gap-40: 40px
gap-11: 11px
gap-26: 26px
gap--2: -2px
gap-48: 48px
gap-36: 36px
gap--6: -6px
gap-32: 32px
gap-815: 815px
gap-15: 15px
gap-52: 52px
gap-44: 44px
gap-75: 75px
gap-624: 624px
gap-50: 50px
gap-465: 465px
gap-303: 303px
gap-17: 17px
gap-42: 42px
gap-113: 113px
gap-125: 125px
gap--10: -10px
gap-60: 60px
gap-13: 13px
gap-102: 102px
gap-43: 43px
gap-101: 101px
gap-832: 832px
`.trim();

const radiusRaw = `
radius-6: 6px
radius-10: 10px
radius-3: 3px
radius-2: 2px
radius-10000: 10000px
radius-4: 4px
radius-8: 8px
radius-1000: 1000px
radius-500: 500px
radius-60709: 60709px
radius-16: 16px
radius-20: 20px
radius-27: 27px
radius-5: 5px
radius-100000: 100000px
radius-1: 1px
radius-29511: 29511px
radius-24: 24px
radius-50: 50px
radius-30: 30px
radius-243: 243px
radius-240: 240px
radius-4861: 4861px
radius-9: 9px
radius-480: 480px
radius-486: 486px
radius-25: 25px
radius-64: 64px
radius-4806: 4806px
radius-7: 7px
radius-286: 286px
radius-4680: 4680px
radius-60: 60px
radius-572: 572px
radius-300: 300px
radius-12: 12px
radius-100: 100px
radius-40972: 40972px
radius-8666: 8666px
radius-15000: 15000px
radius-5720: 5720px
radius-571: 571px
radius-649: 649px
radius-11: 11px
radius-5716: 5716px
radius-28: 28px
radius-69: 69px
radius-535: 535px
radius-4666: 4666px
radius-7000: 7000px
`.trim();

const shadowRaw = `
glass: glass, offset (0, 0), blur 0
layer-blur-2: layer-blur, offset (0, 0), blur 394.0
layer-blur-3: layer-blur, offset (0, 0), blur 514.0
layer-blur-4: layer-blur, offset (0, 0), blur 276.1745910644531
layer-blur-5: layer-blur, offset (0, 0), blur 211.69802856445312
drop-shadow-6: drop-shadow, offset (-3.0, 0.0), blur 25.0, color #00000019
layer-blur-7: layer-blur, offset (0, 0), blur 191.4674072265625
layer-blur-8: layer-blur, offset (0, 0), blur 121.02381896972656
layer-blur-9: layer-blur, offset (0, 0), blur 157.8838653564453
background-blur-10: background-blur, offset (0, 0), blur 15.0
drop-shadow-11: drop-shadow, offset (0.0, 4.0), blur 4.0, color #0000003f
drop-shadow-12: drop-shadow, offset (-1.4418549537658691, 0.0), blur 12.015458106994629, color #00000019
layer-blur-13: layer-blur, offset (0, 0), blur 320.0
drop-shadow-14: drop-shadow, offset (0.0, 2.8704702854156494), blur 3.588087797164917, spread -2.201871156692505, color #16181d19
drop-shadow-15: drop-shadow, offset (0.0, 0.0), blur 7.176175594329834, spread -1.651403546333313, color #16181d19
drop-shadow-16: drop-shadow, offset (-1.4583332538604736, 0.0), blur 12.152777671813965, color #00000019
layer-blur-17: layer-blur, offset (0, 0), blur 94.0
drop-shadow-18: drop-shadow, offset (0.0, 44.0), blur 54.0, color #3b3b3b72
drop-shadow-19: drop-shadow, offset (10.0, 10.0), blur 20.0, color #0000007f
drop-shadow-20: drop-shadow, offset (0.0, 34.0), blur 44.0, color #00000072
background-blur-21: background-blur, offset (0, 0), blur 6.458558082580566
drop-shadow-22: drop-shadow, offset (-1.4041666984558105, 0.0), blur 11.701388359069824, color #00000019
drop-shadow-23: drop-shadow, offset (0.0, 1.8722221851348877), blur 18.72222137451172, color #00000019
layer-blur-24: layer-blur, offset (0, 0), blur 339.35546875
background-blur-25: background-blur, offset (0, 0), blur 4.0
layer-blur-26: layer-blur, offset (0, 0), blur 224.0
drop-shadow-27: drop-shadow, offset (0.0, 1.8666666746139526), blur 18.66666603088379, color #00000019
background-blur-28: background-blur, offset (0, 0), blur 1.9444444179534912
drop-shadow-29: drop-shadow, offset (0.0, 1.9444444179534912), blur 1.9444444179534912, color #0000003f
drop-shadow-30: drop-shadow, offset (-10.0, -20.0), blur 34.0, color #000000f2
drop-shadow-31: drop-shadow, offset (0.0, 0.0), blur 2.0, color #ffffff14
drop-shadow-32: drop-shadow, offset (-1.7161717414855957, 0.0), blur 14.301431655883789, color #00000019
layer-blur-33: layer-blur, offset (0, 0), blur 28.584068298339844
background-blur-34: background-blur, offset (0, 0), blur 7.176175594329834
drop-shadow-35: drop-shadow, offset (20.0, -10.0), blur 34.0, color #000000f2
layer-blur-36: layer-blur, offset (0, 0), blur 1954.410888671875
drop-shadow-37: drop-shadow, offset (0.0, 4.0), blur 34.0, color #c8a47e33
layer-blur-38: layer-blur, offset (0, 0), blur 50.0
drop-shadow-39: drop-shadow, offset (0.0, 4.0), blur 40.0, color #00000019
drop-shadow-40: drop-shadow, offset (0.0, 8.0), blur 16.0, color #919eab28
`.trim();

function isSafeIdent(name) {
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(name);
}

function key(name) {
  return isSafeIdent(name) ? name : `'${name}'`;
}

function px(value) {
  const n = Number(value);
  return Number.isFinite(n) ? `${n}px` : `${value}px`;
}

function parseKv(raw) {
  return raw.split('\n').map((line) => {
    const idx = line.indexOf(':');
    return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
  });
}

function parseTypography(line) {
  const idx = line.indexOf(':');
  const name = line.slice(0, idx).trim();
  const rest = line.slice(idx + 1).trim();
  const lsMatch = rest.match(/\/ ls ([0-9.]+)$/);
  const letterSpacing = lsMatch ? `${lsMatch[1]}px` : undefined;
  const withoutLs = lsMatch ? rest.slice(0, lsMatch.index).trim() : rest;
  const parts = withoutLs.split(' / ').map((p) => p.trim());
  const fontFamily = parts[0];
  const fontSize = parts[1].replace(/\.0px$/, 'px');
  const fontWeight = Number(parts[2].replace('weight ', ''));
  const lineHeight = parts[3].replace(/^lh /, '').replace(/\.0px$/, 'px');
  return { name, fontFamily, fontSize, fontWeight, lineHeight, letterSpacing };
}

function parseShadow(line) {
  const idx = line.indexOf(':');
  const name = line.slice(0, idx).trim();
  const rest = line.slice(idx + 1).trim();
  const type = rest.split(',')[0].trim();
  const offset = rest.match(/offset \(([^)]+)\)/);
  const [offsetXRaw, offsetYRaw] = offset
    ? offset[1].split(',').map((v) => v.trim())
    : ['0', '0'];
  const blurMatch = rest.match(/blur ([0-9.-]+)/);
  const spreadMatch = rest.match(/spread ([0-9.-]+)/);
  const colorMatch = rest.match(/color (#[0-9a-fA-F]+)/);
  const offsetX = px(offsetXRaw);
  const offsetY = px(offsetYRaw);
  const blur = px(blurMatch ? blurMatch[1] : '0');
  const spread = spreadMatch ? px(spreadMatch[1]) : undefined;
  const color = colorMatch ? colorMatch[1] : undefined;

  let css = 'none';
  if (type === 'glass') {
    css = 'backdrop-filter: blur(0px); background: transparent;';
  } else if (type === 'layer-blur') {
    css = `filter: blur(${blur});`;
  } else if (type === 'background-blur') {
    css = `backdrop-filter: blur(${blur});`;
  } else if (type === 'drop-shadow') {
    css = spread
      ? `box-shadow: ${offsetX} ${offsetY} ${blur} ${spread} ${color};`
      : `box-shadow: ${offsetX} ${offsetY} ${blur} ${color};`;
  }

  return { name, type, offsetX, offsetY, blur, spread, color, css };
}

const typography = typographyRaw.split('\n').map(parseTypography);
const spacing = parseKv(spacingRaw);
const radius = parseKv(radiusRaw);
const shadows = shadowRaw.split('\n').map(parseShadow);

const colorBlock = colorEntries
  .map(([name, value]) => `  ${key(name)}: '${value}',`)
  .join('\n');

const typeBlock = typography
  .map((t) => {
    return `  ${key(t.name)}: {
    fontFamily: '${t.fontFamily}',
    fontSize: '${t.fontSize}',
    fontWeight: ${t.fontWeight},
    lineHeight: '${t.lineHeight}',
    letterSpacing: ${t.letterSpacing ? `'${t.letterSpacing}'` : 'undefined'},
  },`;
  })
  .join('\n');

const spacingBlock = spacing
  .map(([name, value]) => `  ${key(name)}: '${value}',`)
  .join('\n');

const radiusBlock = radius
  .map(([name, value]) => `  ${key(name)}: '${value}',`)
  .join('\n');

const shadowBlock = shadows
  .map((s) => {
    return `  ${key(s.name)}: {
    type: '${s.type}',
    offsetX: '${s.offsetX}',
    offsetY: '${s.offsetY}',
    blur: '${s.blur}',
    spread: ${s.spread ? `'${s.spread}'` : 'undefined'},
    color: ${s.color ? `'${s.color}'` : 'undefined'},
    css: '${s.css}',
  },`;
  })
  .join('\n');

const file = `export interface TypographyToken {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing?: string;
}

export interface ShadowToken {
  type: 'glass' | 'layer-blur' | 'drop-shadow' | 'background-blur';
  offsetX: string;
  offsetY: string;
  blur: string;
  spread?: string;
  color?: string;
  css: string;
}

export const colors = {
${colorBlock}
} as const;

export const typography = {
${typeBlock}
} as const satisfies Record<string, TypographyToken>;

export const spacing = {
${spacingBlock}
} as const;

export const radius = {
${radiusBlock}
} as const;

export const shadows = {
${shadowBlock}
} as const satisfies Record<string, ShadowToken>;

export type ColorToken = keyof typeof colors;
export type TypographyTokenName = keyof typeof typography;
export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
export type ShadowTokenName = keyof typeof shadows;

export const tokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
} as const;

export default tokens;
`;

const outPath = join(root, 'src/theme/tokens.ts');
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, file);
console.log(`Wrote ${outPath}`);
console.log({
  colors: colorEntries.length,
  typography: typography.length,
  spacing: spacing.length,
  radius: radius.length,
  shadows: shadows.length,
});
