import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[50vh] flex-col items-start justify-center py-24">
      <p className="text-[14px] text-foreground-muted">404</p>
      <h1 className="mt-3 text-[48px] font-medium leading-none md:text-[84px]">Page not found</h1>
      <p className="mt-6 max-w-md text-[16px] text-foreground-muted md:text-[18px]">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full border border-pill-border px-6 py-4 text-[16px] transition-colors hover:bg-foreground hover:text-background"
      >
        Back home
      </Link>
    </section>
  );
}
