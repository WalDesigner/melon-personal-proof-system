import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default [
  ...nextVitals,
  ...nextTypeScript,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "components/**",
      "hooks/**",
      "information/**",
      "lib/**",
      "providers/**",
      "content/**",
      "config/constants.ts",
      "config/contributions.ts",
      "config/experience.ts",
      "config/pages.ts",
      "config/projects.ts",
      "config/routes.ts",
      "config/skills.ts",
      "config/socials.ts",
    ],
  },
];
