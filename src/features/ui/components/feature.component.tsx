import { Card, Link } from "@nextui-org/react";
import NextLink from "next/link";

export type FeatureProps = {
  title: string;
  description: string;
  category: string;
};

export default function Feature({
  title,
  description,
  category,
}: FeatureProps) {
  return (
    <Card className="bloc shadow-sm block border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
      <span className="bg-secondary-50 text-secondary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 mb-2">
        {category}
      </span>
      <h3 className="text-2xl md:text-3xl font-extrabold mb-2">{title}</h3>
      <p className="md:text-lg font-normal text-gray-500 dark:text-gray-400 md:mb-4">
        {description}
      </p>
      <Link
        as={NextLink}
        href="/features"
        color="secondary"
        showAnchorIcon
        isExternal
      >
        Leer más
      </Link>
    </Card>
  );
}
