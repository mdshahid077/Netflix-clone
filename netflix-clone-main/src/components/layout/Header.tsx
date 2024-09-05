import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import {
  IoMdArrowDropdown,
  IoMdArrowDropup,
  IoMdHelpCircleOutline,
} from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { CiUser } from "react-icons/ci";

import {
  LOGO,
  SEARCH_INPUT_PLACEHOLDERS,
  SUPPORTED_LANGUAGES,
  USER_AVATAR,
} from "../../utils/constants";
import { auth } from "../../utils/firebase";
import toast from "react-hot-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom } from "../../utils/recoil-atoms/authAtom";
import { configAtom } from "../../utils/recoil-atoms/configAtom";
import openai from "../../utils/openai";
import { movieSearchAtom } from "../../utils/recoil-atoms/movieSearchAtom";
import { useWindowSize } from "../../utils/hooks/useWindowSize";

type Language = "en" | "hi" | "es" | "fr" | "ur";

const Header: React.FC = () => {
  const searchInputDivRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isLoggedIn } = useRecoilValue(authAtom);
  const setLanguage = useSetRecoilState(configAtom);
  const { language } = useRecoilValue(configAtom);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const moviesFromSearch = useSetRecoilState(movieSearchAtom);
  const navigate = useNavigate();
  const width = useWindowSize();

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const isMobile = width < 768;

  // Handle click outside to close the search input
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputDivRef.current &&
        !searchInputDivRef.current.contains(event.target as Node)
      ) {
        setShowSearchInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchInputDivRef]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        toast.success("Signed out successfully");
        sessionStorage.removeItem("recoil-auth-persist");
      })
      .catch((error) => toast.error(error.message));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle search when user clicks search button
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate(
      `/search?q=${encodeURIComponent(searchInputRef.current?.value ?? "")}`
    );

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchInputRef.current?.value +
      ". give me names of my movie prompt and similar movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      if (
        response.choices[0]?.message?.content?.includes(
          "I'm sorry, I don't understand."
        )
      ) {
        toast.error("Your query didn't return any results");
      } else if (response.choices && response.choices.length > 0) {
        moviesFromSearch(
          response.choices[0]?.message?.content?.split(",") ?? []
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // Event Handler for search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();

    if (query.length !== 0) {
      // Update the URL if the query is not empty
      const newUrl = `search?q=${encodeURIComponent(query)}`;
      window.history.pushState({}, "", newUrl);
    } else {
      // Navigate to /browse if the query is empty
      navigate("/browse");
    }
  };

  return (
    <nav
      className={`w-full absolute z-10 ${
        isLoggedIn && "flex items-center justify-between"
      }`}
    >
      <Link to={isLoggedIn ? "/browse" : "/"}>
        <img className="w-28 md:w-44" src={LOGO} alt="logo" />
      </Link>

      {isMobile && isLoggedIn && (
        <button
          onClick={toggleMenu}
          className="absolute text-white hamburger-icon right-5 top-3"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}

      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-[200px] bg-black bg-opacity-75">
          <ul className="text-white p-4">
            <li onClick={toggleMenu}>Profile</li>
            <li onClick={toggleMenu}>Settings</li>
            <li onClick={handleSignOut}>Sign out</li>
          </ul>
        </div>
      )}

      {!isMobile && isLoggedIn && (
        <div className="flex items-center gap-x-8" ref={searchInputDivRef}>
          <select
            name="languages"
            id="language-options"
            value={language}
            className="bg-transparent text-white outline-none px-2 py-1"
            onChange={(e) => {
              setLanguage({ language: e.target.value });
              toast.success("Search Box Language changed successfully");
            }}
          >
            {SUPPORTED_LANGUAGES.map((language) => (
              <option
                key={language.identifier}
                value={language.identifier}
                className="bg-[#111] text-white"
              >
                {language.name}
              </option>
            ))}
          </select>
          <IoSearchOutline
            className="w-7 h-7 cursor-pointer text-white"
            onClick={toggleSearchInput}
          />
          {showSearchInput && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <input
                type="text"
                placeholder={SEARCH_INPUT_PLACEHOLDERS[language as Language]}
                className="relative px-2 bg-black text-white border border-white w-72 py-1"
                ref={searchInputRef}
                onChange={handleSearchInputChange}
              />
              <button
                type="submit"
                className="absolute text-white top-6 right-44"
              >
                Search
              </button>
            </form>
          )}
          <IoNotificationsOutline className="w-7 h-7 cursor-pointer text-white" />
          <div
            className="relative flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(!isHovered)}
          >
            <img
              src={USER_AVATAR}
              alt="avatar"
              className="w-9 h-9 rounded-sm cursor-pointer mr-1"
            />
            {isHovered ? (
              <IoMdArrowDropup className="text-white cursor-pointer" />
            ) : (
              <IoMdArrowDropdown className="text-white cursor-pointer" />
            )}
            {isHovered && (
              <div className="absolute right-0 top-9 w-56 bg-[#373737] text-white text-start shadow-lg rounded-md overflow-hidden">
                <ul className="text-lg">
                  <li className="px-4 py-2 flex items-center justify-start gap-x-1 hover:underline cursor-pointer">
                    <GrEdit className="w-5" />
                    Manage Profiles
                  </li>
                  <li className="px-4 py-2 flex items-center justify-start gap-x-1 hover:underline cursor-pointer">
                    <CiUser className="w-5" />
                    Account
                  </li>
                  <li className="px-4 py-2 flex items-center justify-start gap-x-1 hover:underline cursor-pointer">
                    <IoMdHelpCircleOutline className="w-5" />
                    Help Center
                  </li>
                  <li
                    className="px-4 py-2 mt-2 border-t border-[#ccc] hover:underline cursor-pointer"
                    onClick={handleSignOut}
                  >
                    Sign out of Netflix
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
