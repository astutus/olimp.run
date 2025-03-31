import { readFileSync } from "fs";
import path from "path";
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

// Załaduj background jako data:image/png;base64
const backgroundDataUrl = (() => {
  const imgPath = path.resolve("./public/images/og-background.png");
  const buffer = readFileSync(imgPath);
  const base64 = buffer.toString("base64");
  return `data:image/png;base64,${base64}`;
})();

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

const markup = (title: string, date: string) => html`
  <div
    style="
      width: 1200px;
      height: 630px;
      background-image: url('${backgroundDataUrl}');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 40px 60px 60px 60px;
      color: white;
      font-family: 'SF Pro Rounded', sans-serif;
    "
  >
    <div style="align-self: flex-start; display: flex; flex-direction: column;">
      <div style="font-size: 28px; margin-bottom: 20px;">${date}</div>
      <div style="font-size: 58px; font-weight: bold; line-height: 1.2;">
        ${title}
      </div>
    </div>

    <div
      style="
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 18px;
        font-weight: 600;
      "
    >
      <span>Olimp Run</span>
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

