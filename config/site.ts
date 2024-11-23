/* eslint-disable prettier/prettier */
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Tienda de la UTPL",
  description: "Hermosa tienda para la UTPL TEC",
  navItems: [
    {
      label: "Inicio",
      href: "/",
    },
    {
      label: "Productos",
      href: "/productos",
    },
    {
      label: "Crear Productos",
      href: "/productos/CrearProducto",
    },
  ],
  navMenuItems: [],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
