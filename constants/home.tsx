import { ShoppingCart, LayoutDashboard, BarChart, Users } from "lucide-react";
import { ReactNode } from "react";

type TFeature = {
  icon: ReactNode;
  title: string;
  description: string;
};

export const features: TFeature[] = [
  {
    icon: <ShoppingCart className="w-12 h-12 text-primary" />,
    title: "Seamless Checkout",
    description:
      "A fast, intuitive, and secure checkout process that boosts conversion rates.",
  },
  {
    icon: <LayoutDashboard className="w-12 h-12 text-primary" />,
    title: "Custom Storefronts",
    description:
      "Easily customize your storefront to match your brand with our drag-and-drop editor.",
  },
  {
    icon: <BarChart className="w-12 h-12 text-primary" />,
    title: "Powerful Analytics",
    description:
      "Gain insights into your sales, customers, and performance with our analytics dashboard.",
  },
  {
    icon: <Users className="w-12 h-12 text-primary" />,
    title: "Customer Management",
    description:
      "Manage your customers, view their order history, and build relationships.",
  },
];
