import Item from '../models/NewsItemModel.js';

// TODO: replace items with data from back-end (not part of this user story)
const content1 = [
  { id: 1, text: null, bold: false, image: require('../../assets/examples/startnummer1.png') },
  { id: 2, text: null, bold: false, image: require('../../assets/examples/startnummer2.png') },
  { id: 3, text: null, bold: false, image: require('../../assets/examples/startnummer3.png') },
  { id: 4, text: null, bold: false, image: require('../../assets/examples/startnummer4.png') },
];

const content2 = [
  { id: 1, text: "Na enkele ongebruikelijke jaren, barst het carnavalsfeest op 17 februari weer op de vertrouwde manier los. Eén ding is wel veranderd in die tijd van afwezigheid en dat is dat we niet meer als Landerd en Uden door het leven gaan, maar dat we sinds 1 januari 2022 met zes dorpen de gemeente Maashorst vormen.", bold: false, image: null },
  { id: 2, text: "Daar hoort natuurlijk een andere invulling van de Sleuteloverdracht (oud gemeente Uden) en Erewijn (oud gemeente Landerd) bij. Wij willen de start van carnaval 2023 graag met jullie vieren in de Knoerissenstal op de Markt in Uden. Op 17 februari bent u van harte uitgenodigd om de start van het carnaval in de gemeente Maashorst met ons te vieren. Vanaf 16:00 zal de tent geopend zijn en zullen diverse kapellen van zich laten horen. Vanaf 17:00 zullen de hoogheden van de zes kernen, die samen de gemeente Maashorst vormen, de strijd met elkaar en de burgemeester aangaan om de sleutel van ieders eigen dorp te bemachtigen.", bold: false, image: null },
  { id: 3, text: "Nadat wij de sleutel bemachtigd hebben trappen we samen het carnaval af onder het genot van een hapje, een drankje en optredens van onder andere de Boeremoeskapel, Dweilorkest Ongerakt en de dansgardes van de Knoerissen en de Piepers. Het evenement wordt op spectaculaire wijze afgesloten door Stef Ekkel, waarna het Carnaval kan beginnen! Iedereen is welkom, er is geen entree. Bij binnenkomst kan iedereen een heerlijke Schrobelèr pakken.", bold: false, image: null },
  { id: 4, text: "Graag tot 17 februari!", bold: false, image: null },
];

const content3 = [
  { id: 1, text: "Moeslandse Pronkzitting als vanouds druk bezocht en met vol en uitblinkend programma.", bold: true, image: null },
  { id: 2, text: "Op 14, 20 en 21 januari vond de Moeslande Pronkzitting plaats, en deze bestond dit jaar alweer 44 jaar en stond dan ook in het teken van een feestje, met als thema ‘Let’s celebrate’. En dat was te merken, er werd groots uitgepakt, met vooruitblikken naar de toekomst, maar ook teruggekeken naar de geschiedenis van de Moeslandse Pronkzitting.", bold: false, image: null },
  { id: 3, text: null, bold: false, image: require('../../assets/examples/verslag1.png') },
  { id: 4, text: "Zo kwam een oude bekende ten tonele; Gert van Boxtel, die 11 jaar geleden eigenlijk zijn 28-jarige pronkzitting-carrière aan wilgen had gehangen. Niemand minder dan Prins Djarek d’n urste wist hem te overtuigen van een deelname in dit jubileumjaar, en dat bleek een gouden greep. Prins Djarek wist de zaal warm te krijgen voor zijn Gert van Boxtel fanclub, en toen Gert daar ook bij besloot aan te sluiten en zijn oude nummer Tussen Herpen en Zelland ten gehore bracht was iedereen weer terug in oude Moeslandse sferen. Alle avonden in de Phoenix waren uitverkocht, waarbij er voldaan teruggekeken kan worden naar meer dan 1000 bezoekers in de afgelopen weekenden.", bold: false, image: null },
  { id: 5, text: null, bold: false, image: require('../../assets/examples/verslag2.png') },
  { id: 6, text: "Met 'High Wine' werd de pronkzitting letterlijk én figuurlijk tot grote hoogte gebracht, door hun ‘stomme’ act met veel mimiek en weinig tekst zorgden zij voor een schouwspel van hoogstaande kwaliteit.", bold: false, image: null },
  { id: 7, text: "Een psychedelisch toneelspel met dans en muziek werd opgevoerd door the Skittles, een groep welke al jaren in anonimiteit meedoet aan de Moeslandse Pronkzitting. Ook werd er dit jaar anoniem deelgenomen door ‘the invisible man’, waarbij het beloop bij de Moesmunt-affaire eens goed onder de loep werd genomen.", bold: false, image: null },
  { id: 8, text: null, bold: false, image: require('../../assets/examples/verslag3.png') },
  { id: 9, text: null, bold: false, image: require('../../assets/examples/verslag4.png') },
  { id: 10, text: "Andere deelnemende groepen waren ‘Dansgroep Extra Smeuïg’ en ‘Verrekt’, waarbij er bij beide acts werd gespeeld met optische illusie. Van belabberde dansers die uiteindelijk toch een radslag bleken te kunnen maken, tot een bezoek aan de fysiotherapeut, waarbij de patiënt opeens toch wel heel erg lenig bleek te zijn. Acts waarbij de bezoekers aan de Moeslandse Pronkzitting werden meegenomen in verrassende wendingen en absurditeit.", bold: false, image: null },
  { id: 11, text: null, bold: false, image: require('../../assets/examples/verslag5.png') },
  { id: 12, text: "Maar ook vele andere oude rotten in het vak kwamen voorbij, met acts, buuts, sketches, dansen en schouwspel van ander kaliber. Zo maakten ook de Moeskantjes, Bennie de Snelste, Koentje Carnaval, Tieske en (1) Lamme Herder en Robert van de Bolt weer hun opwachting.", bold: false, image: null },
  { id: 13, text: "Er kan teruggekeken worden op een Moeslandse Pronkzitting als vanouds, van Moeslandse kwaliteit, waarbij de lachspieren weer eens goed getraind zijn en zijn opgewarmd voor de aanstaande carnaval.", bold: false, image: null },
  { id: 14, text: null, bold: false, image: require('../../assets/examples/verslag6.png') },
];

const content4 = [
  { id: 1, text: "Drukproef Moesblad 2023 gereed, rond 28 januari huis-aan-huis bezorgd.", bold: true, image: null },
  { id: 2, text: "Ook dit jaar verschijnt er weer een prachtige carnavalskrant in het Moesland. De drukproef werd op donderdag 12 januari aangeboden aan Prins Djarek en Prinses Senne. De krant wordt op 27, 28 en 29 januari weer huis-aan-huis verspreid, ook in de buitengebieden.", bold: true, image: null },
  { id: 3, text: "De krant staat vol met vele fraaie foto’s en lezenswaardige stukjes, zoals de proclamatie van Prins Djarek d’n Urste. Plus vele grappige ingezonden artikelen van onze Moeslandse carnavalsclubs. Bijzonder onderdeel van de krant is het Jeugdmoesblad waarin jeugdprins Mats en jeugdprinses Isabelle en hun hele gevolg zich aan u voorstellen.", bold: false, image: null },
  { id: 4, text: "U kunt de leden van de Raad van Elf, de Dansgarde, de Jeugdcarnaval of de Boeremoeskapel weer aan uw deur verwachten om deze fraaie editie persoonlijk bij u te bezorgen. Zij vragen een kleine bijdrage om de kosten te dekken en om alle carnavalsactiviteiten te kunnen blijven organiseren. Bijvoorbeeld het KeeMoesbal, de fruitmanden voor onze zieken en het Jeugdcarnaval. Zij stellen uw bijdrage zeer op prijs!", bold: false, image: null },
  { id: 5, text: "Als u niet thuis bent, kunt u via de QR-code in de krant altijd nog een vrijwillige bijdrage doen. Ook kunt u uw bijdrage in de bus doen bij de daarvoor bestemde collectebus bij de klantenservice van Albert Heijn, Jumbo of bij De Spijker. Daar zijn voor de liefhebbers ook extra kranten gratis af te halen.", bold: false, image: null },
  { id: 6, text: null, bold: false, image: require('../../assets/examples/moesblad1.png') },
  { id: 7, text: "Mocht u onverhoopt geen carnavalskrant ontvangen, stuur dan een mailtje naar krant@moesland.nl. Wij zorgen ervoor dat u er alsnog een in de bus krijgt. En mocht u meerdere exemplaren willen ontvangen, laat dat dan ook even weten.", bold: false, image: null },
  { id: 8, text: null, bold: false, image: require('../../assets/examples/moesblad2.png') },
]

const content5 = [
  { id: 1, text: "Digitale kaartverkoop Moeslandse Pronkzitting op woensdag 21 december.", bold: false, image: null },
  { id: 2, text: "Het is dit jaar maar liefst de 44e editie van de Moeslandse Pronkzittingen “Bekek ’t mar”!!! Al die jaren schitteren er artiesten, groot en klein, op het Schaijkse podium, voor het fantastische publiek. Een succesvolle formule moet je natuurlijk niet aanpassen en deze formule kan nog jarenlang mee! Wij zijn er natuurlijk groot voorstander van om te vieren wat je vieren kunt. Vandaar dat wij dit dan ook met beide handen aanpakken, en dit jaar het thema “Let’s celebrate!” hebben gekozen!", bold: false, image: null },
  { id: 3, text: "In 2022 hebben we de “alles is anders”-Pronkzitting gehad in de feesttent! Later dan normaal en op een andere plek, maar ook dat was weer een waar feest. Het was fantastisch om dit met verschillende partijen en vele vrijwilligers in ons Moesland neer te zetten. Na afloop van het goedgevulde programma, hebben we op het podium afscheid genomen van Jeroen van Zuijlen als voorzitter van de Commissie Pronkzitting, onze streep. Hij heeft zich jarenlang met hart en ziel ingezet voor de Pronkzitting en gelukkig hoeven we hem niet te missen, want we blijven hem op het podium zien bij de Hofkapel.", bold: false, image: null },
  { id: 4, text: "We zijn blij om te kunnen melden dat we een nieuwe voorzitter voor de Commissie Pronkzitting hebben gevonden. Jan van der Linden is onze nieuwe streep. Jan is natuurlijk geen onbekende in Moesland en is al jarenlang succesvolle artiest bij de Pronkzitting.", bold: false, image: null },
  { id: 5, text: null, bold: false, image: require('../../assets/examples/pronkzitting1.png') },
  { id: 6, text: "Deze keer zullen we werken met een digitale kaartverkoop. Dit is nieuw, om te zien of we iedereen zo beter kunnen bedienen. Hoe gezellig ook het ook altijd was, je hoeft niet meer fysiek in de rij voor de kaartverkoop in de Phoenix. Om te zorgen dat iedereen voor hun eigen groep de kaarten kan kopen, kun je per persoon 11 kaarten in één keer kopen. De kaarten voor de avondvoorstellingen zijn 15,80 Euro per stuk (inclusief 0,80 Euro servicekosten per stuk), de kaarten voor de zaterdagmiddagvoorstelling zijn Euro 13,30 Euro (inclusief 0,80 Euro servicekosten per stuk) bij een digitaal kaartje. Het kopen van de digitale kaarten wijst zichzelf, met je digitale device klaar zitten, naar de juiste link gaan (kan via www.moesland.nl), in de digitale rij wachten, je gegevens invullen aantal kaarten selecteren en betalen. Je kunt de tickets dan direct downloaden en je krijgt de digitale kaarten per mail binnen. Voorafgaand aan de voorstellingen in dorpshuis De Phoenix wordt de streepjescode op je entreebewijs gescand. Je kunt de tickets vooraf uitprinten en op papier meenemen óf vanaf je telefoon laten scannen.", bold: false, image: null },
  { id: 7, text: "Ook de Moeskwekers krijgen digitale kaarten, per mail, voor de door hun geselecteerde voorstelling.", bold: false, image: null },
  { id: 8, text: "De digitale kaartverkoop (max. 11 p.p.) is woensdag 21 december vanaf stipt 20:00uur via de link: https://www.ticketkantoor.nl/events/pronkzittingmoesland Mocht je vooraf al weten dat je er digitaal echt niet uitkomt, dan kun je tijdens de verkoop naar de Phoenix komen waar we je kunnen helpen.", bold: false, image: null },
  { id: 8, text: null, bold: false, image: require('../../assets/examples/pronkzitting2.png') },
  { id: 8, text: "De voorstellingen van deze 44e editie in dorpshuis De Phoenix zijn op: \nzaterdagmiddag 14 januari – ook kaartverkoop via KBO zaterdagavond \n14 januari vrijdagavond \n20 januari zaterdagavond \n21 januari", bold: false, image: null },
  { id: 8, text: "LET OP: Nieuw dit jaar is ook de fastlane voor de Moeskwekers. Er zijn daarmee dus géén gereserveerde plekken. Met de avondvoorstelling gaat de zaal voor de Moeskwekers een kwartier eerder open, zodat zij de gelegenheid hebben om plaats te nemen in de zaal. De fastlane is van 19:00uur tot 19:15uur, daarna gaat de zaal regulier open. Moeskwekers mogen natuurlijk ook na 19:15uur komen, maar sluiten dan gewoon in de rij aan. Het enthousiasme vanuit de Commissie en de artiesten is groot en ongetwijfeld ook vanuit alle Moeszakken en Moeszakkinnen, die weer een middag of avond ouderwets gezellig willen genieten!", bold: false, image: null },
  { id: 8, text: "Natuurlijk met onze Prins Djarek, Prinses Senne en Secondant Rick, die met hun hele gevolg in de bak op het podium zitten. Met een goei stukske muziek van onze eigen Hofkapel, genieten van de artiesten! Toi, toi!", bold: false, image: null },
  { id: 8, text: "Commissie Pronkzitting – Moesland", bold: false, image: null },
  { id: 8, text: null, bold: false, image: require('../../assets/examples/pronkzitting3.png') },
]

const content6 = [
  { id: 1, text: "Ben JIJ de ontwerper van het nieuwe logo voor het 66-jarig jubileumjaar van Stichting Carnaval de Moeslanden?", bold: false, image: null },
  { id: 2, text: "Op 11-11 2023 zal de aftrap gegeven gaan worden voor het 66e carnavalsjaar van Stichting Carnaval de Moeslanden. Er wordt al hard gewerkt om dat jaar een feestjaar te maken. Maar wat is een feestjaar zonder eigen logo?", bold: false, image: null },
  { id: 3, text: "Daarom dagen we jou uit om een passend logo te maken. Hoe dit logo eruit zal dat bepaal jij, je mag al je creativiteit gebruiken.Er is eigenlijk maar 1 ding belangrijk het logo moet bruikbaar zijn voor pr-doeleinden. Oftewel het logo moet herkenbaar zijn en blijven bij gebruik op Instagram, Facebook, etc. etc.", bold: false, image: null },
  { id: 4, text: "Hoe gaan we te werk? Alle inzendingen worden opgestuurd naar onze penningmeester (penningmeester@moesland.nl). De penningmeester zal dan alle namen van de ontwerpers van de inzendingen verwijderen en de inzendingen aan het bestuur van het 66 jaar overleggen. Deze kiezen dan het winnende logo wat veel, vaak en overal te zien zal zijn. Wil jij de boeken is als DE ontwerper van het logo voor het feestjaar van 66 jaar carnaval in het Moesland? Stuur dan je ontwerp in voor 03 februari 2023.", bold: false, image: null },
  { id: 5, text: "Voorzitter bestuur 66 jaar Stichting Carnaval de Moeslanden, Maarten.", bold: false, image: null },
]

const dummyItems = [
  new Item(1, "07-02-2023", "Startnummers Grote Moeslandse Optocht", require('../../assets/examples/example_image_1.png'), content1),
  new Item(2, "30-01-2023", 'Sleuteloverdracht', require('../../assets/examples/example_image_2.png'), content2),
  new Item(3, "26-01-2023", 'Verslag Pronkzitting 2023', require('../../assets/examples/example_image_3.png'), content3),
  new Item(4, "16-01-2023", 'Bezorging Moesblad \'23', require('../../assets/examples/example_image_4.png'), content4),
  new Item(5, "07-12-2022", 'Digitale kaartverkoop Pronkzitting', require('../../assets/examples/example_image_5.png'), content5),
  new Item(6, "07-12-2022", 'Ontwerp jij het logo voor het 66-jarig bestaan?', require('../../assets/examples/example_image_6.png'), content6),
];

export default class NewsItemController {

  static getAllItems() {
    return dummyItems;
  }
}