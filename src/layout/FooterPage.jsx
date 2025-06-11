import React from "react";

const FooterPage = () => {
  return (
    <div>
      <footer className="bg-gradient-to-br bg-green-900 mt-[30px] from-green-900 to-emerald-800 text-white   w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          {/* About Growvana */}
          <div>
            <h2 className="text-lg font-bold text-lime-400">Growvana 🌱</h2>
            <p className="mt-2 text-gray-300">
              Growvana means "green paradise." Embark on your plant-parent
              journey with fun quests, badges, and rewards!
            </p>
            <div className="flex gap-3 mt-3">
              <a href="#" className="hover:text-lime-300">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="hover:text-lime-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-lime-300">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-lime-400">
              Quick Links 🎮
            </h3>
            <ul className="mt-2 space-y-1 text-gray-300">
              <li>
                <a href="#" className="hover:text-white">
                  🌿 Plant Quest
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  🎁 Daily Rewards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  📦 Track Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  🔁 Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  💬 Support Chat
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-lime-400">
              Get in Touch ✉️
            </h3>
            <p className="mt-2 text-gray-300">
              Metro station, 17, 20th Main Road, Chord Rd, beside Mahalakshmi
              Layout, 1st R Block, Rajajinagar, Bengaluru, Karnataka 560010
              <br />
              Support:{" "}
              <a
                href="tel:+918376885182"
                className="text-lime-300 hover:underline"
              >
                +91 8033003333
              </a>
              <br />
              Email:{" "}
              <a
                href="mailto:support@growvana.co"
                className="text-lime-300 hover:underline"
              >
                support@growvana.co
              </a>
            </p>
            <p className="mt-2 text-gray-400 text-xs">
              Mon-Fri: 10AM–6PM | Sat: 10AM–2PM
            </p>
          </div>
        </div>
        <div className="text-center py-2 text-xs text-gray-400 border-t border-green-700">
          © 2025 Growvana. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default FooterPage;
