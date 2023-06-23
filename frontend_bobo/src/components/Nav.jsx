import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="flex justify-center items-center py-4">
      <div className="mr-2">
        <img src="../public/Bobo_icon.svg" alt="Bobo Logo" className="w-20 h-20" />
      </div>
      <div className="font-bold text-xl">BOBO</div>
      <div className="flex ml-auto">
        <Link href="/features">
          <div className="ml-4">Features</div>
        </Link>
        <Link href="/about">
          <div className="ml-4">About</div>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
