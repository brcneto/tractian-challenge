import { Company } from "@/tools/api";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

export default async function Navbar() {
  const resCompanies = await Company.getCompanies();

  return (
    <header className="w-full p-3 bg-navbar">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
        <h1>
          <Link href="/">
            <Image
              src="/images/LOGO-TRACTIAN.png"
              width={103}
              height={14}
              alt="Tractian Logo"
              className="w-[103px] h-[14px]"
            />
          </Link>
        </h1>

        <ul className="flex items-center gap-[10px]">
          {resCompanies.map((company) => (
            <NavLink key={company.id} href={company.id}>
              {company.name}
            </NavLink>
          ))}
        </ul>
      </div>
    </header>
  );
}
