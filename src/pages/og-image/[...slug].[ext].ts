import SFProRoundedBold from "@/assets/fonts/SF-Pro-Rounded-Bold.latin.base.ttf";
import SFProRoundedSemibold from "@/assets/fonts/SF-Pro-Rounded-Semibold.latin.base.ttf";
import SFProRoundedMedium from "@/assets/fonts/SF-Pro-Rounded-Medium.latin.base.ttf";
import SFProRoundedRegular from "@/assets/fonts/SF-Pro-Rounded-Regular.latin.base.ttf";
import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site.config";
import { getFormattedDate } from "@/utils/date";
import { Resvg } from "@resvg/resvg-js";
import type { APIContext } from "astro";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";

const ogOptions: SatoriOptions = {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: "SF Pro Rounded",
      data: Buffer.from(SFProRoundedRegular),
      weight: 400,
      style: "normal",
    },
    {
      name: "SF Pro Rounded",
      data: Buffer.from(SFProRoundedMedium),
      weight: 500,
      style: "normal",
    },
    {
      name: "SF Pro Rounded",
      data: Buffer.from(SFProRoundedSemibold),
      weight: 600,
      style: "normal",
    },
    {
      name: "SF Pro Rounded",
      data: Buffer.from(SFProRoundedBold),
      weight: 700,
      style: "normal",
    },
  ],
};

const size = {
  width: 1200,
  height: 630,
};

const markup = (title: string, pubDate: string) => html`
  <div
    style="display: flex; flex-direction: column; justify-content: space-between; width: 100%; height: 100%; padding: 64px; background: linear-gradient(to bottom right, #ba1a1a, #870000); color: white;"
  >
    <div>
      <p style="font-size: 1.875rem; margin-bottom: 1rem; color: #ffd7d7;">${pubDate}</p>
      <h1 style="font-size: 3.75rem; font-weight: 700; line-height: 1.2;">${title}</h1>
    </div>
    <div
      style="display: flex; align-items: flex-end; justify-content: space-between; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.2); margin-top: 3rem;"
    >
      <div style="display: flex; align-items: center;">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTAsMTIwIEw0OCwyOCBMNjYsNTggTDgyLDMwIEwxMjgsMTIwIFoiIGZpbGw9IndoaXRlIi8+CiAgPGxpbmUgeDE9IjgyIiB5MT0iMzAiIHgyPSI4MiIgeTI9IjEwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogIDxwb2x5Z29uIHBvaW50cz0iODIsMTAgMTA0LDIyIDgyLDM0IiBmaWxsPSIjZmZkN2Q3IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4="
          width="64"
          height="64"
          alt="Olimp Logo"
        />
        <p style="margin-left: 1rem; font-size: 2.5rem; font-weight: 700;">Olimp Run</p>
      </div>
      <p style="font-size: 1.875rem; color: #ffd7d7;">by ${siteConfig.author}</p>
    </div>
  </div>
`;

export async function GET(context: APIContext) {
  const { pubDate, title } = context.props as {
    pubDate: string;
    title: string;
  };

  const formattedDate = getFormattedDate(pubDate, {
    month: "long",
    weekday: "long",
  });

  const svg = await satori(markup(title, formattedDate), ogOptions);

  if (context.url.pathname.endsWith(".png")) {
    const png = new Resvg(svg).render().asPng();
    return new Response(png, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": "image/png",
      },
    });
  }

  if (context.url.pathname.endsWith(".svg")) {
    return new Response(svg, {
      headers: {
        "Cache-Control": "public, max-age=31536000",
        "Content-Type": "image/svg+xml; charset=utf-8",
      },
    });
  }

  return new Response("Unsupported format", { status: 400 });
}

export async function getStaticPaths() {
  const posts = await getAllPosts();

  return posts
    .filter(({ data }) => !data.ogImage)
    .flatMap((post) =>
      ["png", "svg"].map((ext) => ({
        params: { slug: post.id, ext },
        props: {
          pubDate: post.data.updatedDate ?? post.data.publishDate,
          title: post.data.title,
        },
      }))
    );
}

