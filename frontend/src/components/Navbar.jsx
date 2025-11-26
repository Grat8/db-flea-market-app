export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-10 py-4 shadow bg-white">
      <div className="text-2xl font-bold">Fleamarket</div>

      <div className="flex space-x-6">
        <a href="/" className="hover:text-blue-600">Home</a>
        <a href="/vendors" className="hover:text-blue-600">Vendors</a>
        <a href="/login" className="hover:text-blue-600">Login</a>
        <a href="/booths" className="hover:text-blue-600">Booths</a>
        <a href="/reserve" className="hover:text-blue-600">Reserve Booth</a>
        <a href="/about" className="hover:text-blue-600">About</a>
      </div>
    </nav>
  );
}
