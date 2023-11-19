import Link from "next/link";

function NavigationItem({ href, name }: { href: string; name: string }) {
  return (
    <>
      <li>
        <Link href={href}>{name}</Link>
      </li>
    </>
  );
}

export default function Navigation() {
  return (
    <>
      <ul id="navMenu">
        <NavigationItem href="/" name="Home" />
        <NavigationItem href="/blog" name="Blog" />
        <NavigationItem href="/contact" name="Contact" />
      </ul>
    </>
  );
}
