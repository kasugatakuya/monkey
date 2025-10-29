"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    // クライアントサイドでのみ実行される
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="text-md py-20 text-center angled-border">
      <div className="punk-section mx-auto max-w-md p-6 mb-8">
        <div className="text-2xl text-distressed text-accent mb-4">
          SNS FOLLOW
        </div>
        <div className="flex justify-center items-center space-x-8 mb-6">
          <Link
            href="https://x.com/monkey39714"
            className="text-2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/x-icon.webp" width={70} height={70} alt="X" />
          </Link>
          <Link
            href="https://www.youtube.com/@MONKEY%E3%83%91%E3%83%B3%E3%82%AF%E3%83%90%E3%83%B3%E3%83%89"
            className="text-2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/youtube.webp"
              width={35}
              height={35}
              alt="youtube"
              className="rounded"
            />
          </Link>
          {/* <Link href="#" className="text-2xl">
            <Image
              src="/instagram-img.webp"
              width={35}
              height={35}
              alt="instagram"
            />
          </Link> */}
          {/* <Link href="#" className="text-2xl px-2">
            <Image
              src="/facebook-icon.webp"
              width={49}
              height={49}
              alt="facebook"
            />
          </Link> */}
        </div>
      </div>
      <p>© MONKEY 2024 - {currentYear}</p>
    </footer>
  );
}
