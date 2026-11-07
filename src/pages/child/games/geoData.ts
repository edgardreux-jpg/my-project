// Pays de la carte (noms de world-atlas, 110m) rangés par continent
const C: Record<string, string> = {
  'Afrique': 'Tanzania|W. Sahara|Dem. Rep. Congo|Somalia|Kenya|Sudan|Chad|South Africa|Lesotho|Zimbabwe|Botswana|Namibia|Senegal|Mali|Mauritania|Benin|Niger|Nigeria|Cameroon|Togo|Ghana|Côte d\'Ivoire|Guinea|Guinea-Bissau|Liberia|Sierra Leone|Burkina Faso|Central African Rep.|Congo|Gabon|Eq. Guinea|Zambia|Malawi|Mozambique|eSwatini|Angola|Burundi|Madagascar|Gambia|Tunisia|Algeria|Eritrea|Morocco|Egypt|Libya|Ethiopia|Djibouti|Somaliland|Uganda|Rwanda|S. Sudan',
  'Amérique du Nord': 'Canada|United States of America|Haiti|Dominican Rep.|Bahamas|Greenland|Mexico|Panama|Costa Rica|Nicaragua|Honduras|El Salvador|Guatemala|Belize|Puerto Rico|Jamaica|Cuba|Trinidad and Tobago',
  'Amérique du Sud': 'Argentina|Chile|Falkland Is.|Uruguay|Brazil|Bolivia|Peru|Colombia|Venezuela|Guyana|Suriname|Ecuador|Paraguay',
  'Europe': 'Norway|France|Sweden|Belarus|Ukraine|Poland|Austria|Hungary|Moldova|Romania|Lithuania|Latvia|Estonia|Germany|Bulgaria|Greece|Albania|Croatia|Switzerland|Luxembourg|Belgium|Netherlands|Portugal|Spain|Ireland|Italy|Denmark|United Kingdom|Iceland|Slovenia|Finland|Slovakia|Czechia|Bosnia and Herz.|Macedonia|Serbia|Montenegro|Kosovo|Russia',
  'Asie': 'Kazakhstan|Uzbekistan|Indonesia|Timor-Leste|Israel|Lebanon|Palestine|Jordan|United Arab Emirates|Qatar|Kuwait|Iraq|Oman|Cambodia|Thailand|Laos|Myanmar|Vietnam|North Korea|South Korea|Mongolia|India|Bangladesh|Bhutan|Nepal|Pakistan|Afghanistan|Tajikistan|Kyrgyzstan|Turkmenistan|Iran|Syria|Armenia|Turkey|Sri Lanka|China|Taiwan|Azerbaijan|Georgia|Philippines|Malaysia|Brunei|Japan|Yemen|Saudi Arabia|N. Cyprus|Cyprus|Russia',
  'Océanie': 'Fiji|Papua New Guinea|Vanuatu|New Caledonia|Solomon Is.|New Zealand|Australia',
  'Antarctique': 'Antarctica|Fr. S. Antarctic Lands',
}
export const CONTINENT_OF: Record<string, string[]> = {}
for (const [k, v] of Object.entries(C)) for (const n of v.split('|')) (CONTINENT_OF[n] ??= []).push(k)
export const CONTINENTS = Object.keys(C)

export const FR: Record<string, string> = {
  France: 'la France', Spain: 'l’Espagne', Italy: 'l’Italie', Germany: 'l’Allemagne', Belgium: 'la Belgique', Switzerland: 'la Suisse', 'United Kingdom': 'le Royaume-Uni',
  Portugal: 'le Portugal', Netherlands: 'les Pays-Bas', Poland: 'la Pologne', Greece: 'la Grèce', Ireland: 'l’Irlande', Norway: 'la Norvège', Sweden: 'la Suède',
  Finland: 'la Finlande', Austria: 'l’Autriche', Romania: 'la Roumanie', Ukraine: 'l’Ukraine', Denmark: 'le Danemark', Iceland: 'l’Islande', Czechia: 'la Tchéquie', Hungary: 'la Hongrie',
  'United States of America': 'les États-Unis', Canada: 'le Canada', Mexico: 'le Mexique', Brazil: 'le Brésil', Argentina: 'l’Argentine', Chile: 'le Chili', Peru: 'le Pérou',
  Russia: 'la Russie', China: 'la Chine', India: 'l’Inde', Japan: 'le Japon', Australia: 'l’Australie', Egypt: 'l’Égypte', Algeria: 'l’Algérie', Morocco: 'le Maroc',
  'South Africa': 'l’Afrique du Sud', Nigeria: 'le Nigeria', Madagascar: 'Madagascar', 'Saudi Arabia': 'l’Arabie saoudite', Indonesia: 'l’Indonésie', Turkey: 'la Turquie',
  Kenya: 'le Kenya', Greenland: 'le Groenland', Mongolia: 'la Mongolie', 'New Zealand': 'la Nouvelle-Zélande', Colombia: 'la Colombie', Iran: 'l’Iran', 'Dem. Rep. Congo': 'la RD Congo',
}
export const EUROPE_Q = ['France', 'Spain', 'Italy', 'Germany', 'Belgium', 'Switzerland', 'United Kingdom', 'Portugal', 'Netherlands', 'Poland', 'Greece', 'Ireland', 'Norway', 'Sweden', 'Finland', 'Austria', 'Romania', 'Ukraine', 'Denmark', 'Iceland', 'Czechia', 'Hungary']
export const WORLD_Q = ['France', 'United States of America', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Chile', 'Peru', 'Russia', 'China', 'India', 'Japan', 'Australia', 'Egypt', 'Algeria', 'Morocco', 'South Africa', 'Nigeria', 'Madagascar', 'Saudi Arabia', 'Indonesia', 'Turkey', 'Kenya', 'Greenland', 'Mongolia', 'New Zealand', 'Colombia', 'Iran', 'Dem. Rep. Congo', 'Spain', 'Italy', 'United Kingdom', 'Germany']

/** Océan sous un point (longitude, latitude) : découpage simplifié, suffisant pour un jeu. */
export function oceanAt(lon: number, lat: number): string {
  if (lat > 66) return 'Arctique'
  if (lat < -58) return 'Austral'
  if (lon > 20 && lon < 120 && lat < 28) return lon > 100 && lat > -5 ? 'Pacifique' : 'Indien'
  if (lon >= 120 && lon < 147 && lat < -12) return 'Indien'
  // Atlantique : entre les Amériques et l'Europe/Afrique
  const west = lat > 10 ? -100 + (lat - 10) * 0.2 : lat > -10 ? -80 : -70
  if (lon > west && lon <= 20) return 'Atlantique'
  return 'Pacifique'
}
export const OCEANS = ['Atlantique', 'Pacifique', 'Indien', 'Arctique', 'Austral']
