// stationshapes.ts is a collection of all the station shapes in the system basically the whole metro network in geojson form you can get this data either from openstreetmaps or ai models (which may give slop) or offical agency(this is preffered).
// **THIS IS REQUIRED TO DISPLAY THE METRO STATIONS ON THE MAP**

export const STATIONS: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Dilshad Garden", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.321495, 28.675991] },
    },
    {
      type: "Feature",
      properties: { name: "Jhilmil", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.312393, 28.675648] },
    },
    {
      type: "Feature",
      properties: { name: "Mansrover park", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.301178, 28.675352] },
    },
    {
      type: "Feature",
      properties: { name: "Shahdara", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.28727, 28.673531] },
    },
    {
      type: "Feature",
      properties: { name: "Welcome", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.277931, 28.671986] },
    },
    {
      type: "Feature",
      properties: { name: "Seelam Pur", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.267311, 28.670324] },
    },
    {
      type: "Feature",
      properties: { name: "Shastri Park", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.250404, 28.668451] },
    },
    {
      type: "Feature",
      properties: { name: "Kashmere Gate", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.228012, 28.667879] },
    },
    {
      type: "Feature",
      properties: { name: "Tis Hazari", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.216721, 28.667137] },
    },
    {
      type: "Feature",
      properties: { name: "Pul Bangash", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.206329, 28.66571] },
    },
    {
      type: "Feature",
      properties: { name: "Pratap Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.196869, 28.666632] },
    },
    {
      type: "Feature",
      properties: { name: "Shastri Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.181679, 28.670135] },
    },
    {
      type: "Feature",
      properties: { name: "Inderlok", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.170235, 28.673452] },
    },
    {
      type: "Feature",
      properties: { name: "Kanhaiya Nagar", interchange: 0 },
      geometry: {
        type: "Point",
        coordinates: [77.16516215191596, 28.681680009399244],
      },
    },
    {
      type: "Feature",
      properties: { name: "Keshav Puram", interchange: 0 },
      geometry: {
        type: "Point",
        coordinates: [77.16169246530573, 28.688849820898568],
      },
    },
    {
      type: "Feature",
      properties: { name: "Netaji Subash Place", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.152428, 28.695637] },
    },
    {
      type: "Feature",
      properties: { name: "Kohat Enclave", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.140465, 28.697943] },
    },
    {
      type: "Feature",
      properties: { name: "Pitampura", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.132355, 28.70318] },
    },
    {
      type: "Feature",
      properties: { name: "Rohini East", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.125732, 28.707941] },
    },
    {
      type: "Feature",
      properties: { name: "Rohini West", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.115746, 28.715008] },
    },
    {
      type: "Feature",
      properties: { name: "Rithala", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.105042, 28.720821] },
    },
    {
      type: "Feature",
      properties: { name: "Mundka", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.028282, 28.682411] },
    },
    {
      type: "Feature",
      properties: { name: "Rajdhani Park", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.043869, 28.682217] },
    },
    {
      type: "Feature",
      properties: { name: "Nangloi Railway Station", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.05619, 28.682091] },
    },
    {
      type: "Feature",
      properties: { name: "Nangloi", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.064728, 28.682356] },
    },
    {
      type: "Feature",
      properties: { name: "Maharaja Surajmal Stadium", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.073891, 28.681833] },
    },
    {
      type: "Feature",
      properties: { name: "Udyog Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.078674, 28.681047] },
    },
    {
      type: "Feature",
      properties: { name: "Peera Garhi", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.092491, 28.67972] },
    },
    {
      type: "Feature",
      properties: { name: "Paschim Vihar (West)", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.102119, 28.678539] },
    },
    {
      type: "Feature",
      properties: { name: "Paschim Vihar (East)", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.112251, 28.677305] },
    },
    {
      type: "Feature",
      properties: { name: "Madipur", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.117294, 28.676418] },
    },
    {
      type: "Feature",
      properties: { name: "Shivaji Park", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.128258, 28.674965] },
    },
    {
      type: "Feature",
      properties: { name: "Punjabi Bagh", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.146011, 28.672943] },
    },
    {
      type: "Feature",
      properties: { name: "Ashok Park Main", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.155159, 28.671572] },
    },
    {
      type: "Feature",
      properties: { name: "Satguru Ram Singh Marg", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.157829, 28.662188] },
    },
    {
      type: "Feature",
      properties: { name: "Samaypur Badli", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.1377, 28.745] },
    },
    {
      type: "Feature",
      properties: { name: "Rohini Sector 18-19", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.1399, 28.7384] },
    },
    {
      type: "Feature",
      properties: { name: "Haiderpur Badli Mor", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.1492, 28.73] },
    },
    {
      type: "Feature",
      properties: { name: "Jahangirpuri", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.16124, 28.72818] },
    },
    {
      type: "Feature",
      properties: { name: "Adarsh Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.208809, 28.696377] },
    },
    {
      type: "Feature",
      properties: { name: "Azadpur", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.179863, 28.707287] },
    },
    {
      type: "Feature",
      properties: { name: "Model Town", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.193764, 28.702833] },
    },
    {
      type: "Feature",
      properties: { name: "Guru Tegh Bahadur Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.206985, 28.698195] },
    },
    {
      type: "Feature",
      properties: { name: "Vishwavidyalaya", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.212418, 28.694765] },
    },
    {
      type: "Feature",
      properties: { name: "Vidhan Sabha", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.221626, 28.687845] },
    },
    {
      type: "Feature",
      properties: { name: "Civil Lines", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.224953, 28.676945] },
    },
    {
      type: "Feature",
      properties: { name: "Chandni Chowk", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.229218, 28.656443] },
    },
    {
      type: "Feature",
      properties: { name: "Chawri Bazar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.22628, 28.649635] },
    },
    {
      type: "Feature",
      properties: { name: "New Delhi", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.222351, 28.642944] },
    },
    {
      type: "Feature",
      properties: { name: "Rajiv Chowk", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.219574, 28.632896] },
    },
    {
      type: "Feature",
      properties: { name: "Patel Chowk", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.212288, 28.622967] },
    },
    {
      type: "Feature",
      properties: { name: "Central Secretariat", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.212029, 28.614973] },
    },
    {
      type: "Feature",
      properties: { name: "Udyog Bhawan", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.210052, 28.611525] },
    },
    {
      type: "Feature",
      properties: { name: "Lok Kalyan Marg", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.209122, 28.597519] },
    },
    {
      type: "Feature",
      properties: { name: "Jorbagh", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.212662, 28.587234] },
    },
    {
      type: "Feature",
      properties: { name: "Dilli Haat - INA", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.209473, 28.575195] },
    },
    {
      type: "Feature",
      properties: { name: "AIIMS", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.207947, 28.568199] },
    },
    {
      type: "Feature",
      properties: { name: "Green Park", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.206902, 28.559853] },
    },
    {
      type: "Feature",
      properties: { name: "Hauz Khas", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.206673, 28.543346] },
    },
    {
      type: "Feature",
      properties: { name: "Malviya Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.205612, 28.52817] },
    },
    {
      type: "Feature",
      properties: { name: "Saket", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.199379, 28.520638] },
    },
    {
      type: "Feature",
      properties: { name: "Qutab Minar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.185791, 28.512714] },
    },
    {
      type: "Feature",
      properties: { name: "Chhattarpur", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.174866, 28.506584] },
    },
    {
      type: "Feature",
      properties: { name: "Sultanpur", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.161362, 28.499214] },
    },
    {
      type: "Feature",
      properties: { name: "Ghitorni", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.149071, 28.49383] },
    },
    {
      type: "Feature",
      properties: { name: "Arjan Garh", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.12587, 28.48082] },
    },
    {
      type: "Feature",
      properties: { name: "Gurudronacharya", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.102219, 28.482075] },
    },
    {
      type: "Feature",
      properties: { name: "Sikanderpur", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.092995, 28.481352] },
    },
    {
      type: "Feature",
      properties: { name: "MG Road", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.080444, 28.47967] },
    },
    {
      type: "Feature",
      properties: { name: "IFFCO Chowk", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.072502, 28.472137] },
    },
    {
      type: "Feature",
      properties: { name: "Huda City Centre", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.072586, 28.459118] },
    },
    {
      type: "Feature",
      properties: { name: "Vaishali", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.337608, 28.650059] },
    },
    {
      type: "Feature",
      properties: { name: "Kaushambi", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.322273, 28.645428] },
    },
    {
      type: "Feature",
      properties: { name: "Anand Vihar", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.316185, 28.647005] },
    },
    {
      type: "Feature",
      properties: { name: "Karkarduma", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.304581, 28.648653] },
    },
    {
      type: "Feature",
      properties: { name: "Preet Vihar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.295158, 28.641352] },
    },
    {
      type: "Feature",
      properties: { name: "Nirman Vihar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.287872, 28.637049] },
    },
    {
      type: "Feature",
      properties: { name: "Laxmi Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.276428, 28.629843] },
    },
    {
      type: "Feature",
      properties: { name: "Noida City Centre", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.356117, 28.574593] },
    },
    {
      type: "Feature",
      properties: { name: "Golf Course", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.345726, 28.566917] },
    },
    {
      type: "Feature",
      properties: { name: "Botanical Garden", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.334656, 28.564198] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sec -18", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.326088, 28.570843] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sec -16", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.318115, 28.577921] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sec -15", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.311584, 28.585018] },
    },
    {
      type: "Feature",
      properties: { name: "New Ashok Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.30146, 28.58847] },
    },
    {
      type: "Feature",
      properties: { name: "Mayur Vihar Ext", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.294495, 28.594124] },
    },
    {
      type: "Feature",
      properties: { name: "Mayur Vihar-I", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.289421, 28.604425] },
    },
    {
      type: "Feature",
      properties: { name: "Akshardham", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.279816, 28.618364] },
    },
    {
      type: "Feature",
      properties: { name: "Yamuna Bank", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.267937, 28.623178] },
    },
    {
      type: "Feature",
      properties: { name: "Indraprastha", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.250076, 28.620272] },
    },
    {
      type: "Feature",
      properties: { name: "Supreme Court", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.2425, 28.623438] },
    },
    {
      type: "Feature",
      properties: { name: "Mandi House", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.234726, 28.625816] },
    },
    {
      type: "Feature",
      properties: { name: "Barakhamba", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.224876, 28.629662] },
    },
    {
      type: "Feature",
      properties: { name: "RK Ashram Marg", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.206291, 28.639217] },
    },
    {
      type: "Feature",
      properties: { name: "Jhandewalan", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.199791, 28.644312] },
    },
    {
      type: "Feature",
      properties: { name: "Karol Bagh", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.188416, 28.643925] },
    },
    {
      type: "Feature",
      properties: { name: "Rajendra Place", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.1782, 28.6422] },
    },
    {
      type: "Feature",
      properties: { name: "Patel Nagar", interchange: 0 },
      geometry: {
        type: "Point",
        coordinates: [77.16930601173074, 28.645003568888143],
      },
    },
    {
      type: "Feature",
      properties: { name: "Shadipur", interchange: 0 },
      geometry: {
        type: "Point",
        coordinates: [77.15868413940038, 28.65140601864574],
      },
    },
    {
      type: "Feature",
      properties: { name: "Kirti Nagar", interchange: 1 },
      geometry: {
        type: "Point",
        coordinates: [77.15176891024281, 28.65508818916797],
      },
    },
    {
      type: "Feature",
      properties: { name: "Moti Nagar", interchange: 0 },
      geometry: {
        type: "Point",
        coordinates: [77.14265628310737, 28.657854546475065],
      },
    },
    {
      type: "Feature",
      properties: { name: "Ramesh Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.131462, 28.652809] },
    },
    {
      type: "Feature",
      properties: { name: "Rajouri Garden", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.122749, 28.649157] },
    },
    {
      type: "Feature",
      properties: { name: "Tagore Garden", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.112747, 28.643795] },
    },
    {
      type: "Feature",
      properties: { name: "Subash Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.10273, 28.640381] },
    },
    {
      type: "Feature",
      properties: { name: "Tilak Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.096336, 28.636568] },
    },
    {
      type: "Feature",
      properties: { name: "Janak Puri East", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.086578, 28.633121] },
    },
    {
      type: "Feature",
      properties: { name: "Janak Puri West", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.077866, 28.629637] },
    },
    {
      type: "Feature",
      properties: { name: "Uttam Nagar East", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.063126, 28.624643] },
    },
    {
      type: "Feature",
      properties: { name: "Uttam Nagar West", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.055664, 28.621672] },
    },
    {
      type: "Feature",
      properties: { name: "Nawada", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.044991, 28.620222] },
    },
    {
      type: "Feature",
      properties: { name: "Dwarka Mor", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.033188, 28.619366] },
    },
    {
      type: "Feature",
      properties: { name: "Dwarka", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.022629, 28.614899] },
    },
    {
      type: "Feature",
      properties: { name: "Dwarka Sector - 14", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.02594, 28.602232] },
    },
    {
      type: "Feature",
      properties: { name: "Dwarka Sector - 13", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.033043, 28.59705] },
    },
    {
      type: "Feature",
      properties: { name: "Dwarka Sector - 12", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.040558, 28.592234] },
    },
    {
      type: "Feature",
      properties: { name: "Dwarka Sector - 11", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.049255, 28.58642] },
    },
    {
      type: "Feature",
      properties: { name: "Dwarka Sector - 10", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.05719, 28.581108] },
    },
    {
      type: "Feature",
      properties: { name: "Dwarka Sector - 9", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.065086, 28.574284] },
    },
    {
      type: "Feature",
      properties: { name: "Dwarka Sector - 8", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.064896, 28.565706] },
    },
    {
      type: "Feature",
      properties: { name: "Dwarka Sector - 21", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.056198, 28.552322] },
    },
    {
      type: "Feature",
      properties: { name: "ITO", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.240952, 28.627205] },
    },
    {
      type: "Feature",
      properties: { name: "Janpath", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.2192, 28.6251] },
    },
    {
      type: "Feature",
      properties: { name: "Khan Market", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.228096, 28.602682] },
    },
    {
      type: "Feature",
      properties: { name: "Jawahar Lal Nehru Stadium", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.23307, 28.590475] },
    },
    {
      type: "Feature",
      properties: { name: "Jangpura", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.239662, 28.583231] },
    },
    {
      type: "Feature",
      properties: { name: "Lajpat Nagar", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.233124, 28.570705] },
    },
    {
      type: "Feature",
      properties: { name: "Moolchand", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.234222, 28.564629] },
    },
    {
      type: "Feature",
      properties: { name: "Kailash Colony", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.239738, 28.554617] },
    },
    {
      type: "Feature",
      properties: { name: "Nehru Place", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.251511, 28.551134] },
    },
    {
      type: "Feature",
      properties: { name: "Kalkaji Mandir", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.258789, 28.549532] },
    },
    {
      type: "Feature",
      properties: { name: "Govind Puri", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.264259, 28.544413] },
    },
    {
      type: "Feature",
      properties: { name: "Harkesh Nagar Okhla", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.275955, 28.543194] },
    },
    {
      type: "Feature",
      properties: { name: "Jasola-Apollo", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.285538, 28.538084] },
    },
    {
      type: "Feature",
      properties: { name: "Sarita Vihar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.288345, 28.528622] },
    },
    {
      type: "Feature",
      properties: { name: "Mohan Estate", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.294518, 28.51959] },
    },
    {
      type: "Feature",
      properties: { name: "Tughlakabad Station", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.29866, 28.502232] },
    },
    {
      type: "Feature",
      properties: { name: "Badarpur Border", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.30085, 28.4932] },
    },
    {
      type: "Feature",
      properties: { name: "Sarai", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.304932, 28.47794] },
    },
    {
      type: "Feature",
      properties: { name: "NHPC Chowk", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.305252, 28.462435] },
    },
    {
      type: "Feature",
      properties: { name: "Mewala Maharajpur", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.308098, 28.4485] },
    },
    {
      type: "Feature",
      properties: { name: "Sector-28", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.305992, 28.440586] },
    },
    {
      type: "Feature",
      properties: { name: "Badkal Mor", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.310234, 28.422707] },
    },
    {
      type: "Feature",
      properties: { name: "Old Faridabad", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.311272, 28.412172] },
    },
    {
      type: "Feature",
      properties: { name: "Neelam Chowk Ajronda", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.309105, 28.400707] },
    },
    {
      type: "Feature",
      properties: { name: "Bata Chowk", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.3134, 28.386] },
    },
    {
      type: "Feature",
      properties: { name: "Escorts Mujesar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.315002, 28.370199] },
    },
    {
      type: "Feature",
      properties: { name: "Phase 2 (Rapid Metro)", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.092865, 28.488371] },
    },
    {
      type: "Feature",
      properties: { name: "Belvedere Towers (Rapid Metro)", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.088142, 28.492065] },
    },
    {
      type: "Feature",
      properties: { name: "Cyber City (Rapid Metro)", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.089088, 28.498478] },
    },
    {
      type: "Feature",
      properties: { name: "Moulsari Avenue (Rapid Metro)", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.094536, 28.501572] },
    },
    {
      type: "Feature",
      properties: { name: "Phase 3 (Rapid Metro)", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.093552, 28.494329] },
    },
    {
      type: "Feature",
      properties: { name: "IGI Airport", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.087921, 28.554869] },
    },
    {
      type: "Feature",
      properties: { name: "Delhi Aerocity", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.120743, 28.548792] },
    },
    {
      type: "Feature",
      properties: { name: "Dhaula Kuan", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.161545, 28.591776] },
    },
    {
      type: "Feature",
      properties: { name: "Shivaji Stadium", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.209213, 28.629007] },
    },
    {
      type: "Feature",
      properties: { name: "Delhi Gate", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.240303, 28.640488] },
    },
    {
      type: "Feature",
      properties: { name: "Jama Masjid", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.237556, 28.650393] },
    },
    {
      type: "Feature",
      properties: { name: "Lal Quila", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.236595, 28.657576] },
    },
    {
      type: "Feature",
      properties: { name: "Okhla Bird Sanctuary", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.321564, 28.552816] },
    },
    {
      type: "Feature",
      properties: { name: "Kalindi Kunj", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.310173, 28.542835] },
    },
    {
      type: "Feature",
      properties: { name: "Jasola Vihar Shaheen Bagh", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.296715, 28.546005] },
    },
    {
      type: "Feature",
      properties: { name: "Okhla Vihar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.291916, 28.561255] },
    },
    {
      type: "Feature",
      properties: { name: "Jamia Millia Islamia", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.286209, 28.562944] },
    },
    {
      type: "Feature",
      properties: { name: "Sukhdev Vihar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.275116, 28.559887] },
    },
    {
      type: "Feature",
      properties: { name: "Okhla NSIC", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.26487, 28.554575] },
    },
    {
      type: "Feature",
      properties: { name: "Phase-I (Rapid Metro)", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.094009, 28.471981] },
    },
    {
      type: "Feature",
      properties: { name: "Sector 42-43 (Rapid Metro)", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.09684, 28.458475] },
    },
    {
      type: "Feature",
      properties: { name: "Sector 53-54 (Rapid Metro)", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.100487, 28.447533] },
    },
    {
      type: "Feature",
      properties: { name: "Sector 54 Chowk (Rapid Metro)", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.104782, 28.434212] },
    },
    {
      type: "Feature",
      properties: { name: "Sector 55-56 (Rapid Metro)", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.105042, 28.424587] },
    },
    {
      type: "Feature",
      properties: { name: "Majlis Park", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.182068, 28.724157] },
    },
    {
      type: "Feature",
      properties: { name: "Shalimar Bagh", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.165184, 28.70182] },
    },
    {
      type: "Feature",
      properties: { name: "Shakurpur", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.149651, 28.685781] },
    },
    {
      type: "Feature",
      properties: { name: "Punjabi Bagh West", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.139183, 28.672747] },
    },
    {
      type: "Feature",
      properties: { name: "ESI Basai Darapur", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.127319, 28.658159] },
    },
    {
      type: "Feature",
      properties: { name: "Mayapuri", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.129738, 28.637098] },
    },
    {
      type: "Feature",
      properties: { name: "Naraina Vihar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.136482, 28.624121] },
    },
    {
      type: "Feature",
      properties: { name: "Delhi Cantt", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.140373, 28.608641] },
    },
    {
      type: "Feature",
      properties: { name: "Durgabai Deshmukh South Campus", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.169518, 28.589376] },
    },
    {
      type: "Feature",
      properties: { name: "Nehru Enclave", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.25116, 28.545856] },
    },
    {
      type: "Feature",
      properties: { name: "Greater Kailash", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.238243, 28.541836] },
    },
    {
      type: "Feature",
      properties: { name: "Chirag Delhi", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.229385, 28.541229] },
    },
    {
      type: "Feature",
      properties: { name: "Panchsheel Park", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.220512, 28.542339] },
    },
    {
      type: "Feature",
      properties: { name: "IIT", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.193832, 28.547194] },
    },
    {
      type: "Feature",
      properties: { name: "RK Puram", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.184952, 28.550486] },
    },
    {
      type: "Feature",
      properties: { name: "Munirka", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.174026, 28.557821] },
    },
    {
      type: "Feature",
      properties: { name: "Vasant Vihar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.160774, 28.558378] },
    },
    {
      type: "Feature",
      properties: { name: "Shankar Vihar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.140442, 28.560787] },
    },
    {
      type: "Feature",
      properties: { name: "Terminal 1- IGI Airport", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.122391, 28.565275] },
    },
    {
      type: "Feature",
      properties: { name: "Sadar Bazar Contonment", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.111305, 28.577108] },
    },
    {
      type: "Feature",
      properties: { name: "Palam", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.082954, 28.589067] },
    },
    {
      type: "Feature",
      properties: { name: "Dashrath Puri", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.08255, 28.602333] },
    },
    {
      type: "Feature",
      properties: { name: "Dabri Mor - Janakpuri South", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.085258, 28.615904] },
    },
    {
      type: "Feature",
      properties: { name: "Mundka Industrial Area (M.I.A)", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.0173, 28.6834] },
    },
    {
      type: "Feature",
      properties: { name: "Ghevra Metro station", interchange: 0 },
      geometry: { type: "Point", coordinates: [76.993584, 28.685289] },
    },
    {
      type: "Feature",
      properties: { name: "Tikri Kalan", interchange: 0 },
      geometry: { type: "Point", coordinates: [76.977249, 28.686899] },
    },
    {
      type: "Feature",
      properties: { name: "Tikri Border", interchange: 0 },
      geometry: { type: "Point", coordinates: [76.963783, 28.687876] },
    },
    {
      type: "Feature",
      properties: { name: "Pandit Shree Ram Sharma", interchange: 0 },
      geometry: { type: "Point", coordinates: [76.951088, 28.689213] },
    },
    {
      type: "Feature",
      properties: { name: "Bahadurgarh City", interchange: 0 },
      geometry: { type: "Point", coordinates: [76.935265, 28.690784] },
    },
    {
      type: "Feature",
      properties: { name: "Brigadier Hoshiyar Singh", interchange: 0 },
      geometry: { type: "Point", coordinates: [76.919128, 28.697428] },
    },
    {
      type: "Feature",
      properties: { name: "Sir Vishweshwaraiah Moti Bagh", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.175713, 28.578529] },
    },
    {
      type: "Feature",
      properties: { name: "Bhikaji Cama Place", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.187866, 28.570208] },
    },
    {
      type: "Feature",
      properties: { name: "Sarojini Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.187866, 28.570208] },
    },
    {
      type: "Feature",
      properties: { name: "South Extension", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.219818, 28.5686] },
    },
    {
      type: "Feature",
      properties: { name: "Trilokpuri Sanjay Lake", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.308678, 28.613506] },
    },
    {
      type: "Feature",
      properties: { name: "East Vinod Nagar - Mayur Vihar-II", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.305588, 28.620052] },
    },
    {
      type: "Feature",
      properties: { name: "Mandawali - West Vinod Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.304146, 28.624861] },
    },
    {
      type: "Feature",
      properties: { name: "IP Extension", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.310898, 28.631599] },
    },
    {
      type: "Feature",
      properties: { name: "Karkarduma Court", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.2956, 28.6536] },
    },
    {
      type: "Feature",
      properties: { name: "Krishna Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.290306, 28.65782] },
    },
    {
      type: "Feature",
      properties: { name: "East Azad Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.284599, 28.665043] },
    },
    {
      type: "Feature",
      properties: { name: "Jafrabad", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.27507, 28.682943] },
    },
    {
      type: "Feature",
      properties: { name: "Maujpur - Babarpur", interchange: 0 },
      geometry: {
        type: "Point",
        coordinates: [77.2796342874342, 28.69210470829996],
      },
    },
    {
      type: "Feature",
      properties: { name: "Gokulpuri", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.286301, 28.703009] },
    },
    {
      type: "Feature",
      properties: { name: "Johri Enclave", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.290154, 28.713297] },
    },

    {
      type: "Feature",
      properties: { name: "Yamuna Vihar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.277409, 28.702488] },
    },
    {
      type: "Feature",
      properties: { name: "Bhajanpura", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.263417, 28.703706] },
    },
    {
      type: "Feature",
      properties: { name: "Khajuri Khas", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.254404, 28.705306] },
    },
    {
      type: "Feature",
      properties: { name: "Nanaksar - Sonia Vihar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.241775, 28.708919] },
    },
    {
      type: "Feature",
      properties: { name: "Soorghat", interchange: 0 },
      geometry: {
        type: "Point",
        coordinates: [77.22741053313834, 28.710454743278948],
      },
    },
    {
      type: "Feature",
      properties: { name: "Jagatpur - Wazirabad", interchange: 0 },
      geometry: {
        type: "Point",
        coordinates: [77.22331686503469, 28.721097575718456],
      },
    },
    {
      type: "Feature",
      properties: { name: "Jharoda Majra", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.213668, 28.724896] },
    },
    {
      type: "Feature",
      properties: { name: "Burari", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.199463, 28.730057] },
    },

    {
      type: "Feature",
      properties: { name: "Shiv Vihar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.289635, 28.721863] },
    },
    {
      type: "Feature",
      properties: { name: "Sant Surdas (Sihi)", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.316261, 28.354666] },
    },
    {
      type: "Feature",
      properties: { name: "Raja Nahar Singh", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.3164, 28.3398] },
    },
    {
      type: "Feature",
      properties: { name: "Vinobapuri", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.249367, 28.566179] },
    },
    {
      type: "Feature",
      properties: { name: "Ashram", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.25753, 28.576065] },
    },
    {
      type: "Feature",
      properties: { name: "Sarai Kale Khan - Nizamuddin", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.2571, 28.5893] },
    },
    {
      type: "Feature",
      properties: { name: "Mayur Vihar Pocket 1", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.296326, 28.606598] },
    },
    {
      type: "Feature",
      properties: { name: "Shaheed Sthal (New Bus Adda)", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.416031, 28.670177] },
    },
    {
      type: "Feature",
      properties: { name: "Hindon River", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.40654, 28.673508] },
    },
    {
      type: "Feature",
      properties: { name: "Arthala", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.391876, 28.6772] },
    },
    {
      type: "Feature",
      properties: { name: "Mohan Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.384209, 28.67856] },
    },
    {
      type: "Feature",
      properties: { name: "Shyam Park", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.370911, 28.678217] },
    },
    {
      type: "Feature",
      properties: { name: "Major Mohit Sharma Rajender Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.359528, 28.678095] },
    },
    {
      type: "Feature",
      properties: { name: "Raj Bagh", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.346466, 28.677122] },
    },
    {
      type: "Feature",
      properties: { name: "Shaheed Nagar", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.333809, 28.676615] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sec-34", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.363518, 28.580229] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sec-52", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.372749, 28.586849] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sec-61", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.372368, 28.597677] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sec-59", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.372955, 28.609089] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sec-62", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.373611, 28.616991] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Electronic City", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.375229, 28.628685] },
    },
    {
      type: "Feature",
      properties: { name: "Nangli", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.010345, 28.61722] },
    },
    {
      type: "Feature",
      properties: { name: "Najafgarh", interchange: 0 },
      geometry: { type: "Point", coordinates: [76.986259, 28.613316] },
    },
    {
      type: "Feature",
      properties: { name: "Dhansa Bus Stand", interchange: 0 },
      geometry: { type: "Point", coordinates: [76.975426, 28.611858] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sector 51", interchange: 1 },
      geometry: { type: "Point", coordinates: [77.375374, 28.585548] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sector 50", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.378357, 28.574547] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sector 76", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.37973, 28.565445] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sector 101", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.385056, 28.556065] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sector 81", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.390099, 28.549259] },
    },
    {
      type: "Feature",
      properties: { name: "NSEZ", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.394951, 28.532248] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sector 83", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.396477, 28.522284] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sector 137", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.403625, 28.510817] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sector 142", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.412567, 28.498999] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sector 143", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.422318, 28.494246] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sector 144", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.432968, 28.486376] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sector 145", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.442307, 28.47913] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sector 146", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.455101, 28.468822] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sector 147", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.465965, 28.4594] },
    },
    {
      type: "Feature",
      properties: { name: "Noida Sector 148", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.476692, 28.448021] },
    },
    {
      type: "Feature",
      properties: { name: "Knowledge Park", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.500298, 28.456865] },
    },
    {
      type: "Feature",
      properties: { name: "Pari Chowk", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.508308, 28.463331] },
    },
    {
      type: "Feature",
      properties: { name: "Alpha 1", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.512718, 28.470879] },
    },
    {
      type: "Feature",
      properties: { name: "Delta 1", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.525581, 28.478374] },
    },
    {
      type: "Feature",
      properties: { name: "GNIDA Office", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.536621, 28.484531] },
    },
    {
      type: "Feature",
      properties: { name: "Depot Station", interchange: 0 },
      geometry: { type: "Point", coordinates: [77.544075, 28.488651] },
    },
  ],
};
