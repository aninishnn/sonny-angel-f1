import sonnyRedBull from "../assets/figures/teams/sonny-redbull.png";
import sonnyFerrari from "../assets/figures/teams/sonny-ferrari.png";
import sonnyMercedes from "../assets/figures/teams/sonny-mercedes.png";
import sonnyMcLaren from "../assets/figures/teams/sonny-mclaren.png";
import sonnyAston from "../assets/figures/teams/sonny-aston.png";
import sonnyAlpine from "../assets/figures/teams/sonny-alpine.png";
import sonnyWilliams from "../assets/figures/teams/sonny-williams.png";
import sonnyHaas from "../assets/figures/teams/sonny-haas.png";
import sonnyAudi from "../assets/figures/teams/sonny-audi.png";
import sonnyCadillac from "../assets/figures/teams/sonny-cadillac.png";
import sonnyRacingBulls from "../assets/figures/teams/sonny-racingbulls.png";
import sonnySurprise from "../assets/figures/teams/sonny-leclerc.png";

export const teams = {
  red_bull: {
    key: "red_bull",
    label: "Red Bull",
    color: "#1B2A6B",
    secondary: "#FFC93C",
    file: "sonny-redbull.png",
    imageUrl: sonnyRedBull,
  },
  ferrari: {
    key: "ferrari",
    label: "Ferrari",
    color: "#E8333D",
    secondary: "#14171c",
    file: "sonny-ferrari.png",
    imageUrl: sonnyFerrari,
  },
  mercedes: {
    key: "mercedes",
    label: "Mercedes",
    color: "#00A19B",
    secondary: "#c8cdd3",
    file: "sonny-mercedes.png",
    imageUrl: sonnyMercedes,
  },
  mclaren: {
    key: "mclaren",
    label: "McLaren",
    color: "#FF8000",
    secondary: "#14171c",
    file: "sonny-mclaren.png",
    imageUrl: sonnyMcLaren,
  },
  aston_martin: {
    key: "aston_martin",
    label: "Aston Martin",
    color: "#1f6f4a",
    secondary: "#14171c",
    file: "sonny-aston.png",
    imageUrl: sonnyAston,
  },
  alpine: {
    key: "alpine",
    label: "Alpine",
    color: "#1c4fd6",
    secondary: "#F4B8C4",
    file: "sonny-alpine.png",
    imageUrl: sonnyAlpine,
  },
  williams: {
    key: "williams",
    label: "Williams",
    color: "#1c6fd6",
    secondary: "#ffffff",
    file: "sonny-williams.png",
    imageUrl: sonnyWilliams,
  },
  haas: {
    key: "haas",
    label: "Haas",
    color: "#000000",
    secondary: "#ffffff",
    file: "sonny-haas.png",
    imageUrl: sonnyHaas,
  },
  audi: {
    key: "audi",
    label: "Audi",
    color: "#B8B8B8",
    secondary: "#000000",
    file: "sonny-audi.png",
    imageUrl: sonnyAudi,
  },
  cadillac: {
    key: "cadillac",
    label: "Cadillac",
    color: "#FFD700",
    secondary: "#000000",
    file: "sonny-cadillac.png",
    imageUrl: sonnyCadillac,
  },
  rb: {
    key: "rb",
    label: "Racing Bulls",
    color: "#FF0000",
    secondary: "#FFFFFF",
    file: "sonny-racingbulls.png",
    imageUrl: sonnyRacingBulls,
  },
  surprise: {
    key: "surprise",
    label: "Surprise",
    color: "#4C6FFF",
    secondary: "#FFFFFF",
    file: "sonny-leclerc.png",
    imageUrl: sonnySurprise,
  },
};

export const getTeamByKey = (key) => teams[key];
