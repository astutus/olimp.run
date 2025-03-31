import SFProRoundedBold from "@/assets/fonts/SF-Pro-Rounded-Bold.latin.base.ttf";
import SFProRoundedSemibold from "@/assets/fonts/SF-Pro-Rounded-Semibold.latin.base.ttf";
import SFProRoundedMedium from "@/assets/fonts/SF-Pro-Rounded-Medium.latin.base.ttf";
import SFProRoundedRegular from "@/assets/fonts/SF-Pro-Rounded-Regular.latin.base.ttf";
import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site.config";
import { getFormattedDate } from "@/utils/date";
import { Resvg } from "@resvg/resvg-js";
import type { APIContext, InferGetStaticPropsType } from "astro";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";

const ogOptions: SatoriOptions = {
  // debug: true,
  fonts: [
    {
      data: Buffer.from(SFProRoundedRegular),
      name: "SF Pro Rounded",
      style: "normal",
      weight: 400,
    },
	
    {
      data: Buffer.from(SFProRoundedMedium),
      name: "SF Pro Rounded",
      style: "normal",
      weight: 500,
    },
    {
      data: Buffer.from(SFProRoundedSemibold),
      name: "SF Pro Rounded",
      style: "normal",
      weight: 600,
    },
    {
      data: Buffer.from(SFProRoundedBold),
      name: "SF Pro Rounded",
      style: "normal",
      weight: 700,
    },
  ],
  height: 630,
  width: 1200,
};

const markup = (title: string, pubDate: string) =>
  html`
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        background-color: #fef2f2;
        color: #1f1f1f;
        padding: 56px;
      "
    >
      <div>
        <p style="font-size: 36px; color: #d62828; font-weight: 500; margin-bottom: 16px;">
          ${pubDate}
        </p>
        <h1 style="font-size: 64px; font-weight: bold; line-height: 1.1; color: #ba1a1a;">
          ${title}
        </h1>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 2px solid #e0e0e0;
          padding-top: 24px;
          margin-top: 48px;
        "
      >
        <div style="display: flex; align-items: center;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="64" height="64">
            <path d="M0,120 L48,28 L66,58 L82,30 L128,120 Z" fill="#d62828" />
            <line x1="82" y1="30" x2="82" y2="10" stroke="white" stroke-width="3" />
            <polygon points="82,10 104,22 82,34" fill="#9a031e" stroke="white" stroke-width="1" />
          </svg>
          <p style="margin-left: 16px; font-size: 48px; color: #9a031e; font-weight: bold;">
            ${siteConfig.title}
          </p>
        </div>
        <p style="font-size: 32px; color: #b91c1c; font-weight: 500;">
          by ${siteConfig.author}
        </p>
      </div>
    </div>
  `;


type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export async function GET(context: APIContext) {
  const { pubDate, title } = context.props as Props;
  const postDate = getFormattedDate(pubDate, {
    month: "long",
    weekday: "long",
  });
  const svg = await satori(markup(title, postDate), ogOptions);

  // Проверяем, запрашивает ли пользователь PNG
  if (context.url.pathname.endsWith(".png")) {
    const png = new Resvg(svg).render().asPng();
    return new Response(png, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": "image/png",
      },
    });
  }

  // Проверяем, запрашивает ли пользователь SVG
  if (context.url.pathname.endsWith(".svg")) {
    return new Response(svg, {
      headers: {
        "Cache-Control": "public, max-age=31536000",
        "Content-Type": "image/svg+xml; charset=utf-8",
      },
    });
  }

  // Если запрос не заканчивается на .png или .svg, возвращаем ошибку
  return new Response("Unsupported format", { status: 400 });
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return posts
    .filter(({ data }) => !data.ogImage)
    .flatMap((post) => {
      return [
        {
          params: { slug: post.id, ext: "png" },
          props: {
            pubDate: post.data.updatedDate ?? post.data.publishDate,
            title: post.data.title,
          },
        },
        {
          params: { slug: post.id, ext: "svg" },
          props: {
            pubDate: post.data.updatedDate ?? post.data.publishDate,
            title: post.data.title,
          },
        },
      ];
    });
}
