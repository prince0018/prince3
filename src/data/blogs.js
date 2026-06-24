const markdownModules = import.meta.glob("../content/blogs/**/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

const imageModules = import.meta.glob("../content/blogs/**/*.{png,jpg,jpeg,webp,gif,svg}", {
  eager: true,
  import: "default",
  query: "?url",
});

function slugFromPath(path) {
  return path.split("/").pop().replace(/\.md$/, "");
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizePath(path) {
  return path.split("/").reduce((parts, part) => {
    if (!part || part === ".") return parts;
    if (part === "..") {
      if (parts.length && parts[parts.length - 1] !== "..") {
        return parts.slice(0, -1);
      }

      return [...parts, part];
    }

    return [...parts, part];
  }, []).join("/");
}

function parseFrontmatter(markdown) {
  if (!markdown.startsWith("---")) {
    return { attributes: {}, body: markdown.trim() };
  }

  const end = markdown.indexOf("\n---", 3);
  if (end === -1) {
    return { attributes: {}, body: markdown.trim() };
  }

  const rawAttributes = markdown.slice(3, end).trim();
  const body = markdown.slice(end + 4).trim();
  const attributes = rawAttributes.split("\n").reduce((items, line) => {
    const separator = line.indexOf(":");
    if (separator === -1) return items;

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    return { ...items, [key]: value };
  }, {});

  return { attributes, body };
}

function resolveAsset(markdownPath, assetPath) {
  if (!assetPath) return "";
  if (/^(https?:)?\/\//.test(assetPath) || assetPath.startsWith("/")) return assetPath;

  const markdownDirectory = markdownPath.split("/").slice(0, -1).join("/");
  const normalized = normalizePath(`${markdownDirectory}/${assetPath}`);
  return imageModules[normalized] || "";
}

function getFirstHeading(markdown) {
  return markdown
    .split("\n")
    .find((line) => line.startsWith("# "))
    ?.replace(/^#\s+/, "")
    .trim();
}

function getFirstImage(markdown) {
  const match = markdown.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  if (!match) return { alt: "", src: "" };

  return {
    alt: match[1],
    src: match[2],
  };
}

function markdownToText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createExcerpt(markdown, wordCount = 30) {
  const words = markdownToText(markdown).split(" ").filter(Boolean);
  const excerpt = words.slice(0, wordCount).join(" ");
  return words.length > wordCount ? `${excerpt}...` : excerpt;
}

function parseMarkdownBlocks(markdown, markdownPath) {
  const lines = markdown.split("\n");
  const blocks = [];
  let paragraph = [];
  let listItems = [];
  let codeLines = [];
  let inCodeBlock = false;
  let codeLanguage = "";

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() });
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push({ type: "list", items: listItems });
    listItems = [];
  };

  const flushCode = () => {
    blocks.push({ type: "code", language: codeLanguage, code: codeLines.join("\n") });
    codeLines = [];
    codeLanguage = "";
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        flushCode();
        inCodeBlock = false;
        return;
      }

      flushParagraph();
      flushList();
      inCodeBlock = true;
      codeLanguage = trimmed.replace(/^```/, "").trim();
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      return;
    }

    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "image",
        alt: imageMatch[1],
        src: resolveAsset(markdownPath, imageMatch[2]),
      });
      return;
    }

    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2],
      });
      return;
    }

    const listMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      listItems.push(listMatch[1]);
      return;
    }

    paragraph.push(trimmed);
  });

  flushParagraph();
  flushList();

  if (inCodeBlock) {
    flushCode();
  }

  return blocks;
}

function createBlog(markdownPath, markdown) {
  const slug = slugFromPath(markdownPath);
  const { attributes, body } = parseFrontmatter(markdown);
  const firstImage = getFirstImage(body);
  const image = resolveAsset(markdownPath, attributes.image || firstImage.src);

  return {
    slug,
    title: attributes.title || getFirstHeading(body) || titleFromSlug(slug),
    date: attributes.date || "",
    order: Number(attributes.order) || Number.POSITIVE_INFINITY,
    image,
    imageAlt: attributes.imageAlt || firstImage.alt || attributes.title || titleFromSlug(slug),
    summary: attributes.summary || createExcerpt(body),
    blocks: parseMarkdownBlocks(body, markdownPath).filter(
      (block, index) => !(index === 0 && block.type === "heading" && block.level === 1),
    ),
  };
}

export const blogs = Object.entries(markdownModules)
  .map(([path, markdown]) => createBlog(path, markdown))
  .sort((first, second) => {
    if (first.order !== second.order) return first.order - second.order;
    return second.date.localeCompare(first.date);
  });
