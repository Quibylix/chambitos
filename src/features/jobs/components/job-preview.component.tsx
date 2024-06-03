import { Chip, Link } from "@nextui-org/react";

export type JobPreviewProps = {
  image: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
};

export default function JobPreview({
  image,
  title,
  description,
  url,
  tags,
}: JobPreviewProps) {
  return (
    <article className="flex flex-col items-center sm:flex-row sm:items-start gap-4 gap-x-5">
      <figure className="w-full sm:w-auto text-center">
        <img
          className="inline-block h-auto w-full max-w-64 sm:w-auto sm:min-w-40 rounded-md"
          src={image}
          alt={title}
          width={200}
          height={200}
        />
      </figure>
      <div>
        <h2 className="font-bold text-xl">{title}</h2>
        <p className="mt-2">
          {description}{" "}
          <Link href={url} size="sm">
            Leer más
          </Link>
        </p>
        <ul className="flex gap-2 mt-2">
          {tags.map(tag => (
            <li key={tag}>
              <Chip
                className="border-1"
                size="sm"
                color="primary"
                variant="bordered"
              >
                {tag}
              </Chip>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
