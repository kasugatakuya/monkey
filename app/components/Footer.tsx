import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-md py-20 text-center angled-border">
      <div className="punk-section mx-auto max-w-md p-6 mb-8">
        <div className="text-2xl text-distressed text-accent mb-4">
          SNS FOLLOW
        </div>
        <div className="flex justify-center items-center space-x-5 mb-6">
          <Link
            href="https://x.com/monkey39714"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/x-app.png" width={35} height={35} alt="X" />
          </Link>
          <Link
            href="https://www.youtube.com/@MONKEY%E3%83%91%E3%83%B3%E3%82%AF%E3%83%90%E3%83%B3%E3%83%89"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/youtube-app.png"
              width={35}
              height={35}
              alt="youtube"
              className="rounded"
            />
          </Link>
          <Link
            href="https://www.instagram.com/monkey240919?igsh=MWQ2cnpqNDN3dTdhNQ=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/instagram-app.png"
              width={35}
              height={35}
              alt="instagram"
            />
          </Link>
          <Link
            href="https://www.facebook.com/share/17mKzZRAFu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/facebook-app2.webp"
              width={35}
              height={35}
              alt="facebook"
            />
          </Link>
          {/* <Link
            href="https://www.facebook.com/share/17mKzZRAFu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/facebook-app.png"
              width={35}
              height={35}
              alt="facebook"
              unoptimized
            />
          </Link> */}
          <Link
            href="https://monkey8.bandcamp.com/album/monkey"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/bandcamp-app.png"
              width={35}
              height={35}
              alt="bandcamp"
            />
          </Link>
        </div>
      </div>
      <p>© MONKEY 2024 - {currentYear}</p>
    </footer>
  );
}
