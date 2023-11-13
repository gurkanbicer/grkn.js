import Link from "next/link";

function NavigationItem({ href, name }: { href: string; name: string }) {
  return (
    <>
      <div>
        <Link href={href}>{name}</Link>
      </div>
    </>
  );
}

export default function Navigation() {
  return (
    <>
      <NavigationItem href="/" name="Home" />
      <NavigationItem href="/blog" name="Blog" />
    </>
  );
}
