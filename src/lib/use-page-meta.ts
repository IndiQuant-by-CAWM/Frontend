import { useEffect } from "react";

type PageMeta = {
  title: string;
  description: string;
};

const SITE_NAME = "IndiQuant";

export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    document.title = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute("content", description);
  }, [title, description]);
}
