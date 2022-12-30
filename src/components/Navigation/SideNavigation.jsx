import { NavLink } from "react-router-dom";

const linkDefaultStyle = `w-full p-4 flex items-center gap-2 hover:bg-zinc-800 hover:text-zinc-50`;

export default function SideNavigation({ user, links }) {
    return (
        <div className="__sidenav__ | flex flex-col items-start border-r w-56">
            {links.map((link) => {
                if (link.roles === "any" || link.roles.includes(user.role)) {
                    return (
                        <NavLink
                            key={link.text}
                            to={link.to}
                            className={({ isActive }) =>
                                isActive
                                    ? `${linkDefaultStyle} bg-zinc-800 text-zinc-50 font-bold`
                                    : `${linkDefaultStyle}`
                            }
                        >
                            {link.icon} {link.text}
                        </NavLink>
                    );
                }
            })}
        </div>
    );
}
