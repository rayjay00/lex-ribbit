import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>LxTrfrg</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>LEX TREEFROG</h1>

        <iframe
          width="100%"
          height="300"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/554852817&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
        ></iframe>
        <div
          style={{
            fontSize: "10px",
            color: "#cccccc",
            lineBreak: "anywhere",
            wordBreak: "normal",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            fontFamily:
              "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
            fontWeight: "100",
          }}
        ></div>

        <p className={styles.description}>
          {isLoading ? (
            <marquee>
              <code className={styles.code}>
                Ur download should begin soon.... Thank you.
              </code>
            </marquee>
          ) : (
            <a
              className="button"
              href="/api/getSong"
              onClick={() => setIsLoading(true)}
              download
              style={{
                display: "block",
              }}
            >
              DOWNLOAD NOW FOLKS
            </a>
          )}
        </p>
      </main>
    </div>
  );
}
