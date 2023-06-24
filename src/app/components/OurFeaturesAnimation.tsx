"use client";
import { motion } from "framer-motion";

type Sector = {
  name: string;
  bgColor: string;
  color?: string;
};

const colorOptions = {
  darkGreen: "#2B5F49",
  red: "#D43731",
  milk: "#E6E6E6",
  maroon: "#713045",
  blue: "#4266AC",
  yellow: "#FFCD29",
  lightGreen: "#DFEBE9",
  mediumGreen: "#7CB855",
  lightMaroon: "#8C284A",
  lightBlue: "#5F94CB",
  orange: "#E37138",
  darkBlue: "#304471",
};
const sectors1: Sector[] = [
  { name: "Hunger", bgColor: colorOptions.darkGreen },
  { name: "Wildlife", bgColor: colorOptions.darkGreen },
  { name: "Poverty", bgColor: colorOptions.red },
  { name: "Disaster", bgColor: colorOptions.milk, color: "black" },

  { name: "Charity", bgColor: colorOptions.darkGreen },
  { name: "Academics", bgColor: colorOptions.maroon },
  { name: "Medical", bgColor: colorOptions.blue },
  { name: "Community", bgColor: colorOptions.yellow, color: "black" },
  { name: "Crisis", bgColor: colorOptions.lightGreen, color: "black" },
  { name: "Events", bgColor: colorOptions.mediumGreen, color: "black" },
  // {name : "Hunger", color : colorOptions.darkGreen },
];
const sectors2: Sector[] = [
  { name: "Equality", bgColor: colorOptions.lightMaroon },
  { name: "Climate", bgColor: colorOptions.maroon },
  { name: "Legal", bgColor: colorOptions.red },
  { name: "Political", bgColor: colorOptions.blue },

  { name: "Housing", bgColor: colorOptions.maroon },
  { name: "Health", bgColor: colorOptions.lightBlue },
  { name: "Women", bgColor: colorOptions.orange },
  { name: "Disability", bgColor: colorOptions.darkBlue },
  { name: "Enviroment", bgColor: colorOptions.orange },
  { name: "Youth", bgColor: colorOptions.darkGreen },
  // {name : "Hunger", color : colorOptions.darkGreen },
];

const OurFeaturesAnimation = () => {
  return (
    <>
      <ul
        style={{
          display: "flex",
          overflow: "hidden",
          justifyContent: "space-between",
          width: "100vw",
          gap: "60px",
        }}
      >
        {sectors1.map((sector, index) => (
          <motion.li
            key={index}
            style={{
              background: sector.bgColor,
              color: sector?.color || "white",
            }}
            initial={{ x: "-100vw" }}
            animate={{ x: "100vw" }}
            transition={{
              duration: 10,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
              delay: 0.25,
            }}
          >
            {sector.name}
          </motion.li>
        ))}
      </ul>
      <ul
        style={{
          display: "flex",
          overflow: "hidden",
          justifyContent: "space-between",
          width: "100vw",
          gap: "60px",
        }}
      >
        {sectors2.map((sector, index) => (
          <motion.li
            key={index}
            style={{
              background: sector.bgColor,
              color: sector?.color || "white",
            }}
            initial={{ x: "100vw" }}
            animate={{ x: "-100vw" }}
            transition={{
              duration: 10,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
              delay: 0.2,
            }}
          >
            {sector.name}
          </motion.li>
        ))}
      </ul>
    </>
  );
};

export default OurFeaturesAnimation;
