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

const mountainSVGBase64 = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNIDAgNTYwIEwgMTIwIDQzMCBMIDIyMCA0NzAgTCAzMzAgMzkwIEwgNDAwIDQ0MCBMIDUwMCAzMjAgTCA2MDAgMzYwIEwgNzAwIDI4MCBMIDgwMCAzMzAgTCAxMDAwIDEwMCBMIDEyMDAgNTYwIFoiIC8+PC9zdmc+";

const markup = (title: string, pubDate: string) => html`
  <div
    tw="flex flex-col justify-between w-full h-full text-white p-14"
    style="background: linear-gradient(to bottom right, #9a031e, #d00000); position: relative;"
  >
    <div
      style="position: absolute; inset: 0; background-image: url('data:image/svg+xml;base64,${mountainSVGBase64}'); background-repeat: no-repeat; background-size: cover; background-position: bottom right; opacity: 0.3; z-index: 0;"
    ></div>

    <div tw="flex flex-col" style="z-index: 1;">
      <p tw="text-3xl text-[#fcd5ce] font-medium mb-4">${pubDate}</p>
      <h1 tw="text-6xl font-bold leading-tight text-white">${title}</h1>
    </div>

    <div
      tw="flex items-center justify-between border-t border-[#e0e0e0]/20 pt-6 mt-12"
      style="z-index: 1;"
    >
      <div tw="flex items-center">
        <p tw="text-5xl font-bold text-white">${siteConfig.title}</p>
      </div>
      <p tw="text-3xl text-[#fcd5ce] font-medium">by ${siteConfig.author}</p>
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

