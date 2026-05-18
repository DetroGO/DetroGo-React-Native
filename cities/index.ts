export interface CityConfig {
  id: string;
  name: string;
  companies: string;
  logo: string;
  center: [number, number];
  bounds?: [[number, number], [number, number]];
  gtfsVersion?: string;
  available: boolean; // false = shown but locked (coming soon)
}

export const CITIES: CityConfig[] = [
  {
    id: "delhi",
    name: "Delhi NCR",
    companies: "DMRC | NMRC | GMRL",
    logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogoeps.com%2Fwp-content%2Fuploads%2F2014%2F08%2F50953-delhi-metro-logo-icon-vector-icon-vector-eps.png&f=1&nofb=1&ipt=e8d55169a746a48ca25e75e9301809734e9a0afa6fa32c1e6d26923b4c8479ea",
    center: [77.2195, 28.6329],
    bounds: [
      [76.8, 28.4],
      [77.6, 28.9],
    ],
    gtfsVersion: "2025-03",
    available: true,
  },
  {
    id: "mumbai",
    name: "Mumbai",
    companies: "MMRC | MMOPL",
    logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flatestlogo.com%2Fwp-content%2Fuploads%2F2024%2F09%2Fmaha-mumbai-metro-operation-corporation-limited.png&f=1&nofb=1&ipt=5634b32135888c280bc42a0bb75faf15dd62b6ce61463758524b618c255ac065",
    center: [72.85, 19.05],
    available: false,
  },
  {
    id: "bangalore", // fixed typo from "banglore"
    name: "Bangalore",
    companies: "BMRCL",
    logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F50%2F50639.png&f=1&nofb=1&ipt=6f5db3a9d447d2698cb2160fe6876f28027e8334d1f77aaa398f824ac1c63fe1",
    center: [77.6, 12.9],
    available: false,
  },
  {
    id: "chennai",
    name: "Chennai",
    companies: "CMRL",
    logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-27hT8cQBdQM%2FUQAOzJJps_I%2FAAAAAAAAAP4%2Ftv_eWsw4Wb4%2Fs1600%2FCMRL.png&f=1&nofb=1&ipt=31f5416b49a72a19fdabe19ccbc76fbddee9b8332538b869a47e0a74ad4d7312",
    center: [80.2, 13.0],
    available: false,
  },
];
