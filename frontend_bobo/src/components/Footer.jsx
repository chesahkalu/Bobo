'use client'

import Link from 'next/link'

const Footer = () => {
    return (
      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-800 font-semibold">© 2023 Bobo</p>
            </div>
            <div>
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="text-gray-800 hover:text-gray-600">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-800 hover:text-gray-600">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-gray-800 hover:text-gray-600">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  