import { VscGithub } from "react-icons/vsc";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
  return (
    <div className="w-full p-4 bg-secondary/50 sticky top-0 backdrop-blur border-b border-border/70 z-50">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="logo.png"
            className="w-10 h-10 object-contain"
            alt="Youtube Thumbnail Downloader"
          />
          <p className="hidden md:block">Youtube Thumbnail downloader</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://github.com/theviralboy/Youtube-Thumbnail-Extracter"
            target="_blank"
            className={buttonVariants({
              variant: "secondary",
              className: "gap-2",
            })}
          >
            <VscGithub size={20} />
            Get repo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
