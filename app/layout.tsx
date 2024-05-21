import { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Providers } from "@/redux/providers";
import { reduxStore } from "@/redux/store";
import { IGlobal } from "@/redux/slices/global/types";
import ApplicationLayout from "@/components/ApplicationLayout/ApplicationLayout";
import "@/styles/styles.scss";

export async function generateMetadata(): Promise<Metadata> {
  const { name }: IGlobal = reduxStore.getState().global;

  return {
    title: {
      default: name,
      template: `%s | ${name}`,
    },
    applicationName: name,
    authors: [{ name }],
    creator: name,
    publisher: name,
    keywords: [
      "Genesis",
      "Mallorca",
      "Obtera",
      "Web",
      "Front",
      "End",
      "Designer",
      "Developer",
      "Engineer",
      "HTML",
      "CSS",
      "JavaScript",
      "NodeJs",
      "ReactJs",
      "NextJs",
      "VueJs",
      "NuxtJs",
      "AngularJs",
      "ElectronJs",
      "SEO",
      "Search",
      "Engine",
      "Optimization",
      "PWA",
      "Product",
      "Progressive",
      "App",
      "Application",
    ],
  };
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  const isProduction = process?.env?.NODE_ENV === "production";
  const { versionHash }: IGlobal = reduxStore.getState().global;

  return (
    <html lang="en">
      <head>
        {/* Meta */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="user-scalable=yes, width=device-width, initial-scale=1" />

        {/* Android & iOS */}
        <meta name="theme-color" content="#0b0b0c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        {/* Windows */}
        <meta name="msapplication-TileColor" content="#0b0b0c" />
        <meta name="msapplication-square70x70logo" content={`/images/app/windows-70x70.png?v=${versionHash}`} />
        <meta name="msapplication-square150x150logo" content={`/images/app/windows-150x150.png?v=${versionHash}`} />
        <meta name="msapplication-wide310x150logo" content={`/images/app/windows-310x150.png?v=${versionHash}`} />
        <meta name="msapplication-square310x310logo" content={`/images/app/windows-310x310.png?v=${versionHash}`} />

        {/* Icon */}
        <link rel="icon" type="image/png" href={`/favicon.png?v=${versionHash}`} />
        <link rel="icon shortcut" type="image/png" href={`/favicon.png?v=${versionHash}`} />

        {/* Manifest */}
        <link rel="manifest" href={`/manifest.json?v=${versionHash}`} />

        {/*
          Google tag Manager
          Reference: https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-tag-manager
        */}
        {isProduction && <GoogleTagManager gtmId="GTM-WW9KLJ4N" />}
      </head>
      <body>
        <Providers>
          <ApplicationLayout>{children}</ApplicationLayout>
        </Providers>
        {isProduction && (
          <>
            {/* Service Worker */}
            <script
              type="application/javascript"
              dangerouslySetInnerHTML={{
                __html: `
                  if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
                    window.addEventListener('load', async function() {
                      try {
                        const serviceWorkerRegistered = await navigator
                          .serviceWorker
                          .register(
                            '/service-worker.js?version=${versionHash}',
                            {
                              scope: '/',
                              useCache: false
                            }
                          );
                        if (serviceWorkerRegistered) {
                          console.info('ServiceWorker registration successful!');
                        }
                      } catch(error) {
                        console.info('ServiceWorker registration failed!');
                      }
                    });
                  }
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
