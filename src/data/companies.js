export const CATEGORIES = ['Tech', 'Media', 'Athlete Organization'];

export const AUDIENCE_COLORS = {
  Athlete:     '#F59E0B',
  Institution: '#3B82F6',
  Brand:       '#8B5CF6',
  Consumer:    '#10B981',
};

const DB_ID = "37936e139da180429084e0a60e46cae9";
const VIEW_ID = "37936e139da180af9adb000c84d41519";
export const notionUrl = (pageId) =>
  `https://app.notion.com/p/${DB_ID}?v=${VIEW_ID}&p=${pageId}&pm=s`;

export const COMPANIES = [
  // TECH
  { name: "Ekkobar", builtFor: ["Institution"], category: "Tech", stage: "Early Growth", founded: "2021", funding: "$550K - Elevate Ventures, Comcast SportsTech, 1752vc, GrowthX Capital, Atlantis Capital", website: "https://ekkobar.ai/", notionId: "37936e139da1805db02feade57b4d014" },
  { name: "Launchpoint", builtFor: ["Athlete", "Brand"], category: "Tech", stage: "Early Growth", founded: "2024", funding: "Undisclosed", website: "https://www.launchpointhq.com/", notionId: "37936e139da18009a96fcc12b965ee63" },
  { name: "Athlytic", builtFor: ["Brand"], category: "Tech", stage: "Early Growth", founded: "2020", funding: "$775K - Andreessen Horowitz, Northwestern Mutual, ACT House, Gener8tor", website: "https://www.athlytic.io/", notionId: "37936e139da18003badee9db8bd4a3fa" },
  { name: "Out2Win", builtFor: ["Brand", "Institution"], category: "Tech", stage: "Early Growth", founded: "2021", funding: "$1.3M - John Brody/Learfield, Michael Gibbons, Barbara Jones", website: "https://www.out2win.io/", notionId: "37936e139da180289a08c3efb904312c" },
  { name: "NIL Club", builtFor: ["Athlete"], category: "Tech", stage: "Early Growth", founded: "2021", funding: "Undisclosed", website: "https://nilclub.com/", notionId: "37936e139da18056b6c0c1c0101817be" },
  { name: "MarketPryce", builtFor: ["Brand"], category: "Tech", stage: "Early Growth", founded: "2021", funding: "Undisclosed", website: "https://www.marketpryce.com/", notionId: "37a36e139da18037bd5be3bb05040d0c" },
  { name: "MOGL", builtFor: ["Athlete"], category: "Tech", stage: "Early Growth", founded: "2019", funding: "$5.5M - Magarac Venture Partners, Penske Media Corp", website: "https://www.mogl.online/", notionId: "37a36e139da1808087eed7a75ed34d24" },
  { name: "Tykoon AI", builtFor: ["Athlete", "Brand", "Institution"], category: "Tech", stage: "Early Growth", founded: "2023", funding: "Bootstrapped (~$5K prize)", website: "https://tykoon.ai/", notionId: "37a36e139da180f38487f353c38e0f70" },
  { name: "AthlynXAI", builtFor: ["Athlete"], category: "Tech", stage: "Early Growth", founded: "2025", funding: "~$100K", website: "https://athlynx.ai/", notionId: "37a36e139da180019969e5e3015254d6" },
  { name: "TheLinkU", builtFor: ["Institution"], category: "Tech", stage: "Early Growth", founded: "2022", funding: "Bootstrapped", website: "https://www.thelinku.com/", notionId: "37a36e139da180b3a6f6ee1e47ca9889" },
  { name: "SponsorFlo", builtFor: ["Brand", "Institution"], category: "Tech", stage: "Early Growth", founded: "2024", funding: "Pre-seed", website: "https://www.sponsorflo.ai/", notionId: "37b36e139da1806e8b17f76e7cf56dce" },
  { name: "SponsorCX", builtFor: ["Brand", "Institution"], category: "Tech", stage: "Established", founded: "2017", funding: "$12.6M - Kickstart Fund + Series A extension", website: "https://www.sponsorcx.com/", notionId: "37b36e139da18091ab77ebe969919aca" },
  { name: "NIL Shield", builtFor: ["Athlete"], category: "Tech", stage: "Early Growth", founded: "2024", funding: "Pre-prototype", website: "https://nilshield.app/", notionId: "37b36e139da18050bd16eed861b465b6" },
  { name: "Athliance", builtFor: ["Athlete", "Brand", "Institution"], category: "Tech", stage: "Early Growth", founded: "2020", funding: "$8.69M - NewGate Capital", website: "https://athliance.com/", notionId: "37b36e139da18091b40ef6f21d0fee50" },
  { name: "Cache AI", builtFor: ["Athlete", "Institution"], category: "Tech", stage: "Early Growth", founded: "2024", funding: "$500K angel", website: "https://cachescore.com/", notionId: "38036e139da1801a82ead9daec1da76c" },
  { name: "Tracking Football", builtFor: ["Institution"], category: "Tech", stage: "Early Growth", founded: "2015", funding: "Bootstrapped", website: "https://www.trackingfootball.com/", notionId: "38136e139da18084a272d4cccd3c9378" },
  { name: "Machina Sports", builtFor: ["Institution"], category: "Tech", stage: "Early Growth", founded: "2023", funding: "$125K - Antler", website: "https://machina.gg/", notionId: "38136e139da1808cb1f6d788246a6b07" },
  { name: "AthleteAgent", builtFor: ["Athlete"], category: "Tech", stage: "Early Growth", founded: "2021", funding: "$5M+ - Aaron Rodgers, Scott Boras, Google for Startups", website: "https://www.athleteagent.com/", notionId: "38136e139da180219b26f9abef725b13" },
  { name: "Ballin AI", builtFor: ["Athlete", "Institution"], category: "Tech", stage: "Early Growth", founded: "2023", funding: "$500K angel - Slauson & Co., Oregon Sports Angels", website: "https://www.ballin.ai/", notionId: "38136e139da180b5a7d9c8412361277b" },
  { name: "Student Athlete Score", builtFor: ["Athlete", "Brand", "Institution"], category: "Tech", stage: "Early Growth", founded: "2024", funding: "Bootstrapped", website: "https://www.studentathletescore.com/", notionId: "38136e139da180eebd46c66cdbb134f3" },
  { name: "CoachIQ", builtFor: ["Institution"], category: "Tech", stage: "Early Growth", founded: "2019", funding: "$1.3M pre-seed - Startup Ignition Ventures", website: "https://www.coachiq.io/", notionId: "38136e139da180f7bd8bff8a601863f6" },
  { name: "Equipe", builtFor: ["Institution"], category: "Tech", stage: "Early Growth", founded: "2023", funding: "$1.5M seed - Game Changers Ventures", website: "https://equipehq.com/", notionId: "38136e139da180899936c770c100dea3" },
  { name: "Sportlight", builtFor: ["Institution"], category: "Tech", stage: "Early Growth", founded: "2017", funding: "£4M Series A - Sport Republic, Bolt Ventures", website: "https://www.sportlight.ai/", notionId: "38136e139da1801bbe40f11ebe64c2df" },
  { name: "Reel Analytics", builtFor: ["Institution"], category: "Tech", stage: "Early Growth", founded: "2019", funding: "$160K - Netcapital, BIP Ventures", website: "https://reel-analytics.com/", notionId: "38136e139da1805ba380e1d415b7de66" },
  { name: "GMTM", builtFor: ["Athlete", "Institution"], category: "Tech", stage: "Early Growth", founded: "2019", funding: "$3.95M - Horseplay Ventures, LAUNCH/Jason Calacanis", website: "https://gmtm.com/", notionId: "38136e139da1809e9619c39924bc5566" },
  { name: "NextPlay", builtFor: ["Institution"], category: "Tech", stage: "Early Growth", founded: "2023", funding: "Bootstrapped", website: "https://www.next-play.co/", notionId: "38136e139da1800f959ee7100446a140" },
  { name: "Just Play Solutions", builtFor: ["Institution"], category: "Tech", stage: "Established", founded: "2014", funding: "Undisclosed - Brian McClendon board member", website: "https://www.justplaysolutions.com/", notionId: "38136e139da18085bcbeed62e474b2d6" },
  { name: "Super Quick Question", builtFor: ["Institution", "Brand"], category: "Tech", stage: "Early Growth", founded: "2020", funding: "$3.44M - Techstars Sports 2024", website: "https://www.superquickquestion.com/", notionId: "38136e139da1808197e0e935b95d75dc" },
  { name: "Fanbase", builtFor: ["Athlete"], category: "Tech", stage: "Early Growth", founded: "2018", funding: "$12.7M+ equity crowdfunding - StartEngine", website: "https://fanbase.com/", notionId: "38236e139da1805182c0fa6b45ffc9ee" },
  { name: "Athlete+", builtFor: ["Athlete"], category: "Tech", stage: "Early Growth", founded: "2022", funding: "Wefunder community round", website: "https://athleteplus.com/", notionId: "38236e139da180c6b57febaea15c00a7" },
  { name: "WolfCycle", builtFor: ["Institution"], category: "Tech", stage: "Early Growth", founded: "2021", funding: "Bootstrapped", website: "https://www.wolfcycle.ai/", notionId: "38236e139da180e19dd0f9fc0064a3b5" },
  { name: "Tixologi", builtFor: ["Institution"], category: "Tech", stage: "Early Growth", founded: "2021", funding: "$3.13M - Acquired by Punchup Live Apr 2025", website: "https://producer.tixologi.com/login", notionId: "38236e139da180ccb4dbd1a1a72e7530" },
  { name: "Splash Sports", builtFor: ["Consumer"], category: "Tech", stage: "Established", founded: "2021", funding: "$29.1M Series B - Dream Ventures, EP Golf Ventures", website: "https://splashsports.com/", notionId: "38236e139da18090b598d8ae9ad63e35" },
  { name: "Ludex", builtFor: ["Consumer"], category: "Tech", stage: "Early Growth", founded: "2021", funding: "$13.3M - Brian Urlacher, Cassius Marsh, Wefunder", website: "https://www.ludex.com/", notionId: "38236e139da18089b947ed563d3131b4" },
  { name: "Tradable Bits", builtFor: ["Institution"], category: "Tech", stage: "Early Growth", founded: "2010", funding: "$1M disclosed", website: "https://tradablebits.com/", notionId: "38236e139da180abab9de3d9962e77ec" },
  { name: "FEVO", builtFor: ["Institution"], category: "Tech", stage: "Established", founded: "2011", funding: "$95.4M+ Series C - Addition, DRIVE by DraftKings, HBSE Ventures", website: "https://fevo.com/", notionId: "38236e139da180089049e4e1c93a6c22" },
  { name: "Thryve AI", builtFor: ["Athlete"], category: "Tech", stage: "Early Growth", founded: "2024", funding: "Pre-launch", website: "https://www.thryveai.ai/", notionId: "38636e139da1803c8826df1fa320284b" },
  { name: "RallyFuel", builtFor: ["Consumer"], category: "Tech", stage: "Early Growth", founded: "2025", funding: "Bootstrapped", website: "https://rallyfuel.com/", notionId: "38636e139da180ddbe37f86d633828c8" },
  { name: "Top Tier Lessons", builtFor: ["Athlete"], category: "Tech", stage: "Early Growth", founded: "2023", funding: "M25 seed investment", website: "https://www.toptierlessons.com/", notionId: "38636e139da1804abaf8d85179192e20" },
  { name: "AthleteUp", builtFor: ["Athlete"], category: "Tech", stage: "Early Growth", founded: "2022", funding: "Bootstrapped", website: "https://athleteup.com/", notionId: "38636e139da180bd8bd3f51a5000f511" },
  { name: "Presto Sports", builtFor: ["Institution"], category: "Tech", stage: "Established", founded: "2002", funding: "Acquired by Jonas/Constellation Software", website: "https://www.prestosports.com/", notionId: "38636e139da180aabf92e23fa3661578" },
  { name: "Athlete Creator Lab", builtFor: ["Athlete"], category: "Tech", stage: "Early Growth", founded: "2023", funding: "Bootstrapped", website: "https://athletecreatorlab.com/", notionId: "38836e139da1809eaf72cbc54f2baff3" },

  // MEDIA
  { name: "OZ Sports", builtFor: ["Institution"], category: "Media", stage: "Early Growth", founded: "2018", funding: "Undisclosed - Comcast NBCUniversal SportsTech", website: "https://ozsports.is/", notionId: "37a36e139da1804d98e8d84f9428ab6e" },
  { name: "Peripheral", builtFor: ["Institution"], category: "Media", stage: "Early Growth", founded: "2021", funding: "Undisclosed", website: "https://www.peripheral.so/", notionId: "37a36e139da180b0889bf61014986762" },
  { name: "WePlayed", builtFor: ["Institution"], category: "Media", stage: "Early Growth", founded: "2017", funding: "$3.66M - Accomplice, Techstars, Correlation Ventures", website: "https://weplayed.com/", notionId: "37a36e139da180058ebbe43c32ae6cf8" },
  { name: "Bolt6", builtFor: ["Institution"], category: "Media", stage: "Established", founded: "2021", funding: "AO Ventures - undisclosed", website: "https://www.bolt6.ai/", notionId: "37a36e139da1807396aeca58f82df0e2" },
  { name: "Greenfly", builtFor: ["Institution"], category: "Media", stage: "Established", founded: "2014", funding: "$65.3M Series C - ADvantage/Adidas, NBA Equity", website: "https://www.greenfly.com/", notionId: "37a36e139da18073a71cf94a4e4af1a0" },
  { name: "SwitcherStudio", builtFor: ["Institution"], category: "Media", stage: "Early Growth", founded: "2014", funding: "$3.41M - Thornton Capital, Render Capital", website: "https://www.switcherstudio.com/", notionId: "37a36e139da18025b8d2f4cc6cb5d36e" },
  { name: "Players Era", builtFor: ["Institution"], category: "Media", stage: "Early Growth", founded: "2024", funding: "RedBird IMI (~$10B vehicle) - EverWonder Studio", website: "https://www.playersera.com/", notionId: "38636e139da180959478c352cd36dc18" },

  // ATHLETE ORGANIZATION
  { name: "Pathway Sports & Entertainment", builtFor: ["Athlete"], category: "Athlete Organization", stage: "Early Growth", founded: "2024", funding: "Investor-backed, undisclosed", website: "https://pwse.com/", notionId: "38636e139da1800b9290fc43e129fbce" },
  { name: "NOCAP Sports", builtFor: ["Athlete", "Brand", "Institution"], category: "Athlete Organization", stage: "Early Growth", founded: "2020", funding: "$2.5M seed - Florida Funders", website: "https://www.nocapsports.io/", notionId: "38636e139da1800c96c5cebc98e93974" },
  { name: "Athlete Mogul", builtFor: ["Athlete"], category: "Athlete Organization", stage: "Early Growth", founded: "2023", funding: "Bootstrapped", website: "https://athletemogul.com/nil/", notionId: "38636e139da1809990d0e11ac1801d55" },
];
